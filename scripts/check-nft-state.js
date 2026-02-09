const { ethers } = require("ethers");
require("dotenv").config();

async function checkState() {
    console.log("🔍 [JS] Checking GreenProof NFT state...");
    const rpcUrl = process.env.NEXT_PUBLIC_SEPOLIA_RPC_URL;
    const contractAddress = process.env.NEXT_PUBLIC_GREENPROOF_NFT_ADDRESS;

    if (!rpcUrl || !contractAddress) {
        console.error("❌ Missing env vars.");
        return;
    }

    try {
        const provider = new ethers.JsonRpcProvider(rpcUrl);
        const nextId = await provider.call({
            to: contractAddress,
            data: "0x3344d932" // getNextTokenId() selector
        });
        console.log(`✅ Connection Stable. Next Token ID hex: ${nextId}`);
    } catch (error) {
        console.error("❌ Diagnostic Failed:", error.message);
    }
}

checkState();
