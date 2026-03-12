import { ethers } from "ethers";
import * as dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import https from "https";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

// Contract verification helper
async function verifyContract(
  network: "sepolia" | "fuji",
  contractAddress: string,
  constructorArgs: any[] = []
) {
  const apiKey = network === "sepolia" 
    ? process.env.ETHERSCAN_API_KEY 
    : process.env.SNOWTRACE_API_KEY;

  if (!apiKey) {
    console.log(`⚠️  Skipping verification: No API key for ${network}`);
    return;
  }

  const baseUrl = network === "sepolia"
    ? "api-sepolia.etherscan.io"
    : "api-testnet.snowtrace.io";

  console.log(`🔍 Verifying contract on ${network}...`);
  
  // Note: Actual verification requires source code upload
  // This is a simplified version - for production, use hardhat-verify or foundry verify
  console.log(`📝 Contract Address: ${contractAddress}`);
  console.log(`📝 Explorer: https://${baseUrl.replace('api-', '')}/address/${contractAddress}`);
  console.log(`💡 Manual verification: Use 'npx hardhat verify --network ${network} ${contractAddress}'`);
}

async function deploy() {
    console.log("\n🌿 GREENPROOF: Institutional Deployment Script\n");
    console.log("═".repeat(60));

    const privateKey = process.env.DEPLOYER_PRIVATE_KEY;
    const sepoliaRpc = process.env.NEXT_PUBLIC_SEPOLIA_RPC_URL;
    const fujiRpc = process.env.NEXT_PUBLIC_FUJI_RPC_URL;

    if (!privateKey || !sepoliaRpc) {
        console.error("❌ Error: Missing DEPLOYER_PRIVATE_KEY or SEPOLIA_RPC_URL in .env");
        console.error("💡 Copy .env.example to .env and fill in your credentials");
        process.exit(1);
    }

    const providerSepolia = new ethers.JsonRpcProvider(sepoliaRpc);
    const walletSepolia = new ethers.Wallet(privateKey, providerSepolia);

    console.log(`\n👤 Deployer Address: ${walletSepolia.address}`);
    const balance = await providerSepolia.getBalance(walletSepolia.address);
    console.log(`💰 Sepolia Balance: ${ethers.formatEther(balance)} ETH`);

    if (parseFloat(ethers.formatEther(balance)) < 0.01) {
        console.warn("⚠️  Warning: Low balance. Get testnet ETH from https://sepoliafaucet.com");
    }

    // Helper to load artifacts
    const loadArtifact = (name: string) => {
        const artifactPath = path.join(__dirname, `../artifacts/${name}.json`);
        if (!fs.existsSync(artifactPath)) {
            throw new Error(`❌ Artifact ${name}.json not found. Run 'npm run compile' first.`);
        }
        return JSON.parse(fs.readFileSync(artifactPath, "utf8"));
    };

    console.log("\n" + "═".repeat(60));
    console.log("📦 PHASE 1: Deploying GreenProofNFT to Ethereum Sepolia");
    console.log("═".repeat(60));

    const nftArtifact = loadArtifact("GreenProofNFT");
    const NftFactory = new ethers.ContractFactory(
        nftArtifact.abi, 
        nftArtifact.evm.bytecode.object, 
        walletSepolia
    );
    
    console.log("⏳ Deploying GreenProofNFT...");
    const nftContract = await NftFactory.deploy();
    const nftTxHash = nftContract.deploymentTransaction()?.hash;
    console.log(`📤 Transaction: ${nftTxHash}`);
    
    await nftContract.waitForDeployment();
    const nftAddress = await nftContract.getAddress();
    console.log(`✅ GreenProofNFT deployed at: ${nftAddress}`);
    
    // Verify on Etherscan
    await verifyContract("sepolia", nftAddress, []);

    console.log("\n" + "═".repeat(60));
    console.log("🔗 PHASE 2: Deploying CCIPBridge to Sepolia");
    console.log("═".repeat(60));

    const ccipArtifact = loadArtifact("CCIPBridge");
    const BridgeFactory = new ethers.ContractFactory(
        ccipArtifact.abi, 
        ccipArtifact.evm.bytecode.object, 
        walletSepolia
    );
    
    // Chainlink CCIP addresses for Sepolia
    const routerSepolia = process.env.NEXT_PUBLIC_CHAINLINK_ROUTER_SEPOLIA || 
        "0x0BF3d143412Fcd293a1F0F836dEF03D2A687391C";
    const linkSepolia = process.env.NEXT_PUBLIC_LINK_TOKEN_SEPOLIA || 
        "0x779877A7B0D9E8603169DdbD7836e478b4624789";

    const routerSepoliaChecksum = ethers.getAddress(routerSepolia.toLowerCase());
    const linkSepoliaChecksum = ethers.getAddress(linkSepolia.toLowerCase());

    console.log(`⏳ Deploying CCIPBridge with:`);
    console.log(`   Router: ${routerSepoliaChecksum}`);
    console.log(`   LINK:   ${linkSepoliaChecksum}`);

    const bridgeContract = await BridgeFactory.deploy(
        routerSepoliaChecksum, 
        linkSepoliaChecksum
    );
    const bridgeTxHash = bridgeContract.deploymentTransaction()?.hash;
    console.log(`📤 Transaction: ${bridgeTxHash}`);
    
    await bridgeContract.waitForDeployment();
    const bridgeAddress = await bridgeContract.getAddress();
    console.log(`✅ CCIPBridge deployed at: ${bridgeAddress}`);

    // Verify on Etherscan
    await verifyContract("sepolia", bridgeAddress, [
        routerSepoliaChecksum, 
        linkSepoliaChecksum
    ]);

    console.log("\n" + "═".repeat(60));
    console.log("🎉 DEPLOYMENT COMPLETE");
    console.log("═".repeat(60));

    // Save deployment addresses to a file
    const deploymentInfo = {
        timestamp: new Date().toISOString(),
        network: "sepolia",
        deployer: walletSepolia.address,
        contracts: {
            GreenProofNFT: nftAddress,
            CCIPBridge: bridgeAddress
        },
        transactions: {
            GreenProofNFT: nftTxHash,
            CCIPBridge: bridgeTxHash
        }
    };

    const deploymentsDir = path.join(__dirname, "../deployments");
    if (!fs.existsSync(deploymentsDir)) {
        fs.mkdirSync(deploymentsDir);
    }

    const deploymentFile = path.join(deploymentsDir, `sepolia-${Date.now()}.json`);
    fs.writeFileSync(deploymentFile, JSON.stringify(deploymentInfo, null, 2));
    console.log(`\n💾 Deployment info saved to: ${deploymentFile}`);

    console.log("\n" + "─".repeat(60));
    console.log("📋 UPDATE YOUR .ENV FILE WITH THESE VALUES:");
    console.log("─".repeat(60));
    console.log(`NEXT_PUBLIC_GREENPROOF_NFT_ADDRESS=${nftAddress}`);
    console.log(`NEXT_PUBLIC_CCIP_BRIDGE_ADDRESS=${bridgeAddress}`);
    console.log("─".repeat(60));

    console.log("\n🔗 View on Etherscan:");
    console.log(`   GreenProofNFT: https://sepolia.etherscan.io/address/${nftAddress}`);
    console.log(`   CCIPBridge:    https://sepolia.etherscan.io/address/${bridgeAddress}`);

    console.log("\n✨ Next Steps:");
    console.log("   1. Update your .env file with the addresses above");
    console.log("   2. Fund the CCIPBridge with LINK tokens for cross-chain messaging");
    console.log("   3. Deploy the frontend: npm run build && vercel --prod");
    console.log("\n");
}

deploy().catch((error) => {
    console.error("\n❌ Deployment failed:");
    console.error(error);
    process.exit(1);
});
