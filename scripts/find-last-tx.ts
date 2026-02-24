import { ethers } from "ethers";
import * as dotenv from "dotenv";

dotenv.config();

async function findLastTx() {
    const rpcUrl = process.env.NEXT_PUBLIC_SEPOLIA_RPC_URL;
    const privateKey = process.env.DEPLOYER_PRIVATE_KEY;
    
    if (!rpcUrl || !privateKey) {
        console.error("Missing env");
        return;
    }

    const provider = new ethers.JsonRpcProvider(rpcUrl);
    const wallet = new ethers.Wallet(privateKey, provider);
    
    const nonce = await provider.getTransactionCount(wallet.address);
    console.log("Current Nonce:", nonce);
    
    // The transaction we just sent has nonce - 1
    const lastTxNonce = nonce - 1;
    // We can't easily get the hash by nonce from the provider directly 
    // without an indexer, but we can search recent blocks.
    
    const blockNumber = await provider.getBlockNumber();
    console.log("Current Block:", blockNumber);
    
    for (let i = 0; i < 5; i++) {
        const block = await provider.getBlock(blockNumber - i, true);
        if (block) {
            for (const tx of block.prefetchedTransactions) {
                if (tx.from.toLowerCase() === wallet.address.toLowerCase()) {
                    console.log(`Found Tx: ${tx.hash} in Block ${blockNumber - i}`);
                    return;
                }
            }
        }
    }
}

findLastTx();
