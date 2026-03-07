import { ethers } from "ethers";
import * as dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

dotenv.config();

// Chainlink CCIP and Router configs
const CONFIGS: any = {
  sepolia: {
    name: "Ethereum Sepolia",
    rpc: process.env.NEXT_PUBLIC_SEPOLIA_RPC_URL,
    router: "0x0BF3d143412Fcd293a1F0F836dEF03D2A687391C",
    link: "0x779877A7B0D9E8603169DdbD7836e478b4624789",
    explorer: "https://sepolia.etherscan.io/address/"
  },
  arbitrum: {
    name: "Arbitrum Sepolia",
    rpc: "https://sepolia-rollup.arbitrum.io/rpc",
    router: "0x2a138c363931bc3296c8d350af3238ac9b9060b4", // Arbitrum Sepolia Router
    link: "0xb1d4538b4571d411f07960ef2838ce337fe1e80e",   // Arbitrum Sepolia LINK
    explorer: "https://sepolia-explorer.arbitrum.io/address/"
  },
  fuji: {
    name: "Avalanche Fuji",
    rpc: process.env.NEXT_PUBLIC_FUJI_RPC_URL || "https://api.avax-test.network/ext/bc/C/rpc",
    router: "0x554472a2720E5E7D5D3C817529aBA05EEd5F82D8",
    link: "0x0b9d5D9136855f6FEc3c0993feE6E9CE8a297846",
    explorer: "https://testnet.snowtrace.io/address/"
  }
};

async function multiDeploy() {
  const networkKey = process.argv[2] as string;
  const config = CONFIGS[networkKey];

  if (!config) {
    console.error(`❌ Error: Invalid network key "${networkKey}". Use: sepolia, arbitrum, or fuji.`);
    process.exit(1);
  }

  console.log(`\n🚀 DEPLOYING TO: ${config.name.toUpperCase()}\n`);
  console.log("═".repeat(60));

  const privateKey = process.env.DEPLOYER_PRIVATE_KEY;
  if (!privateKey) {
    console.error("❌ Error: Missing DEPLOYER_PRIVATE_KEY in .env");
    process.exit(1);
  }

  const provider = new ethers.JsonRpcProvider(config.rpc);
  const wallet = new ethers.Wallet(privateKey, provider);

  console.log(`👤 Deployer: ${wallet.address}`);
  const balance = await provider.getBalance(wallet.address);
  console.log(`💰 Balance:  ${ethers.formatEther(balance)} native tokens`);

  if (balance === BigInt(0)) {
    console.error(`❌ Error: Insufficient funds on ${config.name}.`);
    process.exit(1);
  }

  const loadArtifact = (name: string) => {
    const artifactPath = path.resolve(rootDir, "artifacts", `${name}.json`);
    if (!fs.existsSync(artifactPath)) {
      throw new Error(`❌ Artifact ${name}.json not found. Run 'npm run compile' first.`);
    }
    return JSON.parse(fs.readFileSync(artifactPath, "utf8"));
  };

  // 1️⃣ Deploy Verifier
  console.log("\n🛡️ Phase 1: Deploying Verifier...");
  const verifierArtifact = loadArtifact("Verifier");
  const VerifierFactory = new ethers.ContractFactory(
    verifierArtifact.abi, 
    verifierArtifact.evm.bytecode.object, 
    wallet
  );
  const verifierContract = await VerifierFactory.deploy();
  await verifierContract.waitForDeployment();
  const verifierAddress = await verifierContract.getAddress();
  console.log(`✅ Verifier:       ${verifierAddress}`);

  // 2️⃣ Deploy GreenProofNFT
  console.log("\n📦 Phase 2: Deploying GreenProofNFT...");
  const nftArtifact = loadArtifact("GreenProofNFT");
  const NftFactory = new ethers.ContractFactory(
    nftArtifact.abi, 
    nftArtifact.evm.bytecode.object, 
    wallet
  );
  
  const nftContract = await NftFactory.deploy(verifierAddress);
  await nftContract.waitForDeployment();
  const nftAddress = await nftContract.getAddress();
  console.log(`✅ GreenProofNFT:  ${nftAddress}`);

  // 3️⃣ Deploy CCIPBridge
  console.log("\n🔗 Phase 3: Deploying CCIPBridge...");
  const ccipArtifact = loadArtifact("CCIPBridge");
  const BridgeFactory = new ethers.ContractFactory(
    ccipArtifact.abi, 
    ccipArtifact.evm.bytecode.object, 
    wallet
  );
  
  const bridgeContract = await BridgeFactory.deploy(config.router, config.link);
  await bridgeContract.waitForDeployment();
  const bridgeAddress = await bridgeContract.getAddress();
  console.log(`✅ CCIPBridge:    ${bridgeAddress}`);

  console.log("\n" + "═".repeat(60));
  console.log("🎉 DEPLOYMENT COMPLETE");
  console.log("═".repeat(60));
  console.log(`   Verifier: ${config.explorer}${verifierAddress}`);
  console.log(`   NFT:      ${config.explorer}${nftAddress}`);
  console.log(`   Bridge:   ${config.explorer}${bridgeAddress}`);

  // Save to deployments history
  const historyPath = path.join(__dirname, "../deployments");
  if (!fs.existsSync(historyPath)) fs.mkdirSync(historyPath);
  const historyFile = path.join(historyPath, `${networkKey}-latest.json`);
  fs.writeFileSync(historyFile, JSON.stringify({
    network: networkKey,
    verifier: verifierAddress,
    nft: nftAddress,
    bridge: bridgeAddress,
    timestamp: new Date().toISOString()
  }, null, 2));
}

multiDeploy().catch(console.error);
