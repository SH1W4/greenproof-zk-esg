# GreenProof Deployment Guide

**Complete deployment instructions for the GreenProof Protocol and Dashboard.**

---

## Prerequisites

Before deploying, ensure you have:

- **Node.js** v18+ and **npm** installed
- **Testnet funds**:
  - Sepolia ETH (get from [Alchemy Faucet](https://sepoliafaucet.com))
  - Fuji AVAX (get from [Avalanche Faucet](https://core.app/tools/testnet-faucet))
  - LINK tokens on both networks
- **API Keys** (optional, for contract verification):
  - [Etherscan API Key](https://etherscan.io/myapikey)
  - [Snowtrace API Key](https://snowtrace.io/myapikey)

---

## One-Click Deployment

### Step 1: Clone and Install

```bash
git clone https://github.com/symbeon-labs/greenproof-platform
cd greenproof-platform
npm install
```

### Step 2: Configure Environment

Copy the example environment file and fill in your credentials:

```bash
cp .env.example .env
```

**Required variables in `.env`:**

```bash
# Deployer Private Key (NEVER commit this!)
DEPLOYER_PRIVATE_KEY=your_private_key_here

# RPC URLs
NEXT_PUBLIC_SEPOLIA_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR_API_KEY
NEXT_PUBLIC_FUJI_RPC_URL=https://api.avax-test.network/ext/bc/C/rpc

# Optional: For contract verification
ETHERSCAN_API_KEY=your_etherscan_api_key
SNOWTRACE_API_KEY=your_snowtrace_api_key
```

### Step 3: Deploy Contracts (One Command!)

```bash
npm run deploy
```

This single command will:
1. ✅ Compile all Solidity contracts
2. ✅ Deploy `GreenProofNFT` to Sepolia
3. ✅ Deploy `CCIPBridge` to Sepolia
4. ✅ Save deployment addresses to `deployments/sepolia-{timestamp}.json`
5. ✅ Display contract addresses for your `.env` file
6. ✅ Provide Etherscan links for verification

**Expected Output:**

```
🌿 GREENPROOF: Institutional Deployment Script
════════════════════════════════════════════════════════════

👤 Deployer Address: 0x1234...
💰 Sepolia Balance: 0.5 ETH

════════════════════════════════════════════════════════════
📦 PHASE 1: Deploying GreenProofNFT to Ethereum Sepolia
════════════════════════════════════════════════════════════
⏳ Deploying GreenProofNFT...
📤 Transaction: 0xabc...
✅ GreenProofNFT deployed at: 0x82F...

════════════════════════════════════════════════════════════
🔗 PHASE 2: Deploying CCIPBridge to Sepolia
════════════════════════════════════════════════════════════
⏳ Deploying CCIPBridge with:
   Router: 0x0BF3d143412Fcd293a1F0F836dEF03D2A687391C
   LINK:   0x779877A7B0D9E8603169DdbD7836e478b4624789
📤 Transaction: 0xdef...
✅ CCIPBridge deployed at: 0x456...

════════════════════════════════════════════════════════════
🎉 DEPLOYMENT COMPLETE
════════════════════════════════════════════════════════════

📋 UPDATE YOUR .ENV FILE WITH THESE VALUES:
────────────────────────────────────────────────────────────
NEXT_PUBLIC_GREENPROOF_NFT_ADDRESS=0x82F...
NEXT_PUBLIC_CCIP_BRIDGE_ADDRESS=0x456...
────────────────────────────────────────────────────────────
```

### Step 4: Update `.env` with Contract Addresses

Copy the addresses from the deployment output and paste them into your `.env` file.

### Step 5: Deploy Frontend to Vercel

```bash
# Build the Next.js app
npm run build

# Deploy to Vercel (requires Vercel CLI)
vercel --prod
```

Or simply push to GitHub and Vercel will auto-deploy if connected.

---

## Advanced Deployment Options

### Deploy Without Recompiling

If you've already compiled contracts and just want to redeploy:

```bash
npm run deploy:quick
```

### Manual Compilation Only

```bash
npm run compile
```

### Verify Contracts Manually

If automatic verification fails, use Hardhat or Foundry:

```bash
# Using Hardhat (if configured)
npx hardhat verify --network sepolia <CONTRACT_ADDRESS>

# Using Foundry
forge verify-contract <CONTRACT_ADDRESS> GreenProofNFT --chain sepolia
```

---

## Chainlink CRE Execution

To run the Chainlink Compute Runtime Environment (CRE) workflow locally:

```bash
npx chainlink-cre run cre/workflow.ts --args '{"ownerAddress": "0x..."}'
```

---

## Deployment Artifacts

All deployment information is saved to `deployments/sepolia-{timestamp}.json`:

```json
{
  "timestamp": "2026-02-08T16:00:00.000Z",
  "network": "sepolia",
  "deployer": "0x1234...",
  "contracts": {
    "GreenProofNFT": "0x82F...",
    "CCIPBridge": "0x456..."
  },
  "transactions": {
    "GreenProofNFT": "0xabc...",
    "CCIPBridge": "0xdef..."
  }
}
```

---

## Troubleshooting

### "Artifact not found" Error

**Solution:** Run `npm run compile` first to generate contract artifacts.

### "Insufficient funds" Error

**Solution:** Get testnet ETH from [Sepolia Faucet](https://sepoliafaucet.com).

### "Nonce too low" Error

**Solution:** Wait a few seconds and try again, or reset your wallet nonce.

### Contract Verification Fails

**Solution:** Verify manually using the Etherscan/Snowtrace UI or Hardhat verify plugin.

---

## Quick Reference

| Command | Description |
|---------|-------------|
| `npm run compile` | Compile Solidity contracts |
| `npm run deploy` | Compile + Deploy to Sepolia |
| `npm run deploy:quick` | Deploy without recompiling |
| `npm run dev` | Run Next.js dev server |
| `npm run build` | Build Next.js for production |
| `vercel --prod` | Deploy frontend to Vercel |

---

## Post-Deployment Checklist

- [ ] Contracts deployed to Sepolia
- [ ] Contract addresses added to `.env`
- [ ] Contracts verified on Etherscan
- [ ] CCIPBridge funded with LINK tokens
- [ ] Frontend deployed to Vercel
- [ ] Test the full user flow (mint NFT, cross-chain bridge)

---

**🌿 GreenProof Protocol is now live!**

View your deployment:
- **Dashboard:** https://greenproof.vercel.app
- **Etherscan:** https://sepolia.etherscan.io/address/{YOUR_CONTRACT_ADDRESS}
