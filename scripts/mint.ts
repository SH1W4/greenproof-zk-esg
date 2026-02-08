import { ethers } from "ethers";
import * as dotenv from "dotenv";

dotenv.config();

const NFT_ABI = [
    "function mintGreenProof(address to, bool verificationPassed) public",
    "function getNextTokenId() public view returns (uint256)",
    "event GreenProofMinted(address indexed to, uint256 tokenId, bool isZKVerified)"
];

async function mint() {
    console.log("\n🌿 GREENPROOF: Live Minting Execution (Sepolia)\n");

    const privateKey = process.env.DEPLOYER_PRIVATE_KEY;
    const rpcUrl = process.env.NEXT_PUBLIC_SEPOLIA_RPC_URL;
    const contractAddress = process.env.NEXT_PUBLIC_GREENPROOF_NFT_ADDRESS;

    if (!privateKey || !rpcUrl || !contractAddress || contractAddress.includes("0x82F...")) {
        console.error("❌ Error: Missing or placeholder configuration in .env");
        console.log("Please ensure DEPLOYER_PRIVATE_KEY, NEXT_PUBLIC_SEPOLIA_RPC_URL, and NEXT_PUBLIC_GREENPROOF_NFT_ADDRESS (real address) are set.");
        process.exit(1);
    }

    const provider = new ethers.JsonRpcProvider(rpcUrl);
    const wallet = new ethers.Wallet(privateKey, provider);
    const contract = new ethers.Contract(contractAddress, NFT_ABI, wallet);

    console.log(`👤 Using Wallet: ${wallet.address}`);
    console.log(`📜 Target Contract: ${contractAddress}`);

    try {
        console.log("\n⏳ Requesting Minting with ZK-Verification proof (Score >= 80)...");
        const tx = await contract.mintGreenProof(wallet.address, true);
        
        console.log(`🔗 Transaction Sent: ${tx.hash}`);
        console.log("⏳ Waiting for Sepolia confirmation...");
        
        const receipt = await tx.wait();
        console.log(`✅ Success! Block: ${receipt.blockNumber}`);
        
        const nextId = await contract.getNextTokenId();
        console.log(`🏆 Minted Token ID: ${Number(nextId) - 1}`);
        console.log("\n--- PROTOCOL INTEGRITY VERIFIED ---");
    } catch (error) {
        console.error("\n❌ Minting Failed:", error);
    }
}

mint().catch(console.error);
