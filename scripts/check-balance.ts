import { ethers } from "ethers";
import * as dotenv from "dotenv";

dotenv.config();

async function check() {
    const rpcUrl = process.env.NEXT_PUBLIC_SEPOLIA_RPC_URL;
    const privateKey = process.env.DEPLOYER_PRIVATE_KEY;

    if (!rpcUrl || !privateKey) {
        console.error("Missing config");
        return;
    }

    const provider = new ethers.JsonRpcProvider(rpcUrl);
    const wallet = new ethers.Wallet(privateKey, provider);
    const balance = await provider.getBalance(wallet.address);

    console.log(`Address: ${wallet.address}`);
    console.log(`Balance: ${ethers.formatEther(balance)} ETH`);
}

check().catch(console.error);
