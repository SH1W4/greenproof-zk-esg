import { ethers } from "ethers";
import * as dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

async function deploy() {
    console.log("\n🌿 GREENPROOF: Institutional Deployment Script (REAL)\n");

    const privateKey = process.env.DEPLOYER_PRIVATE_KEY;
    const sepoliaRpc = process.env.NEXT_PUBLIC_SEPOLIA_RPC_URL;

    if (!privateKey || !sepoliaRpc) {
        console.error("❌ Error: Missing private key or RPC URLs in .env");
        process.exit(1);
    }

    const providerSepolia = new ethers.JsonRpcProvider(sepoliaRpc);
    const walletSepolia = new ethers.Wallet(privateKey, providerSepolia);

    console.log(`👤 Deployer Address: ${walletSepolia.address}`);
    const balance = await providerSepolia.getBalance(walletSepolia.address);
    console.log(`💰 Balance: ${ethers.formatEther(balance)} ETH`);

    // Helper to load artifacts
    const loadArtifact = (name: string) => {
        const artifactPath = path.join(__dirname, `../artifacts/${name}.json`);
        if (!fs.existsSync(artifactPath)) {
            throw new Error(`Artifact ${name} not found. Run scripts/compile.ts first.`);
        }
        return JSON.parse(fs.readFileSync(artifactPath, "utf8"));
    };

    // --- Phase 1: Deploy GreenProofNFT to Sepolia ---
    console.log("\n📦 Phase 1: Deploying GreenProofNFT to Ethereum Sepolia...");
    const nftArtifact = loadArtifact("GreenProofNFT");
    const NftFactory = new ethers.ContractFactory(nftArtifact.abi, nftArtifact.evm.bytecode.object, walletSepolia);
    
    // Deploying with no arguments
    const nftContract = await NftFactory.deploy();
    console.log(`⏳ Waiting for deployment transaction: ${nftContract.deploymentTransaction()?.hash}`);
    await nftContract.waitForDeployment();
    
    const nftAddress = await nftContract.getAddress();
    console.log(`✅ GreenProofNFT deployed at: ${nftAddress}`);

    // --- Phase 2: Deploy CCIPBridge to Sepolia ---
    console.log("\n🔗 Phase 2: Deploying CCIPBridge to Sepolia...");
    const ccipArtifact = loadArtifact("CCIPBridge");
    const BridgeFactory = new ethers.ContractFactory(ccipArtifact.abi, ccipArtifact.evm.bytecode.object, walletSepolia);
    
    // Constructor arguments for CCIPBridge: (router, linkToken) - Getting from .env or defaults
    const routerSepolia = process.env.NEXT_PUBLIC_CHAINLINK_ROUTER_SEPOLIA || "0x0BF3d143412Fcd293a1F0F836dEF03D2A687391C";
    const linkSepolia = process.env.NEXT_PUBLIC_LINK_TOKEN_SEPOLIA || "0x779877A7B0D9E8603169DdbD7836e478b4624789";

    // Sanitize addresses (lowercase first to allow getAddress to checksum them)
    const routerSepoliaChecksum = ethers.getAddress(routerSepolia.toLowerCase());
    const linkSepoliaChecksum = ethers.getAddress(linkSepolia.toLowerCase());

    const bridgeContract = await BridgeFactory.deploy(routerSepoliaChecksum, linkSepoliaChecksum);
    console.log(`⏳ Waiting for deployment transaction: ${bridgeContract.deploymentTransaction()?.hash}`);
    await bridgeContract.waitForDeployment();

    const bridgeAddress = await bridgeContract.getAddress();
    console.log(`✅ CCIPBridge (Sepolia) deployed at: ${bridgeAddress}`);

    console.log("\n🚀 PROTOCOL LIVE: Contracts Deployed.");
    console.log("\n--- UPDATE YOUR .ENV WITH THESE VALUES ---");
    console.log(`NEXT_PUBLIC_GREENPROOF_NFT_ADDRESS=${nftAddress}`);
    console.log(`NEXT_PUBLIC_CCIP_BRIDGE_ADDRESS=${bridgeAddress}`);
    console.log("------------------------------------------\n");
}

deploy().catch(console.error);
