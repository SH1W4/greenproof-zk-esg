import { ethers } from "ethers";
import * as dotenv from "dotenv";
import * as readline from "readline";

dotenv.config();

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const question = (query: string) => new Promise<string>((resolve) => rl.question(query, resolve));

const NFT_ABI = [
    "function mintGreenProof(address to, bool verificationPassed) public",
    "function getNextTokenId() public view returns (uint256)",
    "event GreenProofMinted(address indexed to, uint256 tokenId, bool isZKVerified)"
];

async function terminalMint() {
    console.log("\n🛰️  GREENPROOF: Terminal Interaction Mode\n");

    let privateKey = process.env.DEPLOYER_PRIVATE_KEY;
    let rpcUrl = process.env.NEXT_PUBLIC_SEPOLIA_RPC_URL || "https://eth-sepolia.g.alchemy.com/v2/demo";
    let contractAddress = process.env.NEXT_PUBLIC_GREENPROOF_NFT_ADDRESS;

    if (!privateKey) {
        console.log("⚠️  No Private Key found in .env");
        privateKey = await question("🔑 Enter your Private Key (or press Ctrl+C to cancel): ");
    }

    if (!contractAddress || contractAddress.includes("0x82F...")) {
        console.log("⚠️  No Contract Address found in .env");
        contractAddress = await question("📜 Enter the deployed GreenProofNFT address: ");
    }

    if (!privateKey || !contractAddress) {
        console.error("❌ Aborted: Missing required information.");
        rl.close();
        return;
    }

    try {
        const provider = new ethers.JsonRpcProvider(rpcUrl);
        const wallet = new ethers.Wallet(privateKey, provider);
        const contract = new ethers.Contract(contractAddress, NFT_ABI, wallet);

        console.log(`\n👤 Connected as: ${wallet.address}`);
        console.log(`📜 Target Contract: ${contractAddress}`);
        
        const confirm = await question("\n🚀 Proceed with minting? (y/n): ");
        if (confirm.toLowerCase() !== 'y') {
            console.log("❌ Minting cancelled.");
            rl.close();
            return;
        }

        console.log("⏳ Sending transaction...");
        const tx = await contract.mintGreenProof(wallet.address, true);
        console.log(`🔗 Tx Sent: ${tx.hash}`);
        
        console.log("⏳ Waiting for confirmation...");
        const receipt = await tx.wait();
        console.log(`✅ Success! Token ID: ${Number(await contract.getNextTokenId()) - 1}`);
        console.log(`📍 Block: ${receipt.blockNumber}`);

    } catch (error) {
        console.error("\n❌ Error during terminal minting:", error);
    } finally {
        rl.close();
    }
}

terminalMint();
