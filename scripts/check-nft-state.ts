import { ethers } from "ethers";
import * as dotenv from "dotenv";

dotenv.config();

const NFT_ABI = [
    "function getNextTokenId() public view returns (uint256)"
];

async function checkState() {
    console.log("🔍 Checking GreenProof NFT state...");
    const rpcUrl = process.env.NEXT_PUBLIC_SEPOLIA_RPC_URL;
    const contractAddress = process.env.NEXT_PUBLIC_GREENPROOF_NFT_ADDRESS;

    if (!rpcUrl || !contractAddress) {
        console.error("❌ Missing env vars.");
        return;
    }

    try {
        const provider = new ethers.JsonRpcProvider(rpcUrl);
        const contract = new ethers.Contract(contractAddress, NFT_ABI, provider);
        const nextId = await contract.getNextTokenId();
        console.log(`✅ Connection Stable. Next Token ID: ${Number(nextId)}`);
    } catch (error) {
        console.error("❌ Diagnostic Failed:", error.message);
    }
}

checkState();
