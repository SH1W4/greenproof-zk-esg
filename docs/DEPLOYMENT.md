# 🚀 Deployment Guide: GreenProof

This guide details how to deploy the **GreenProof** protocol and its dashboard for the Chainlink Convergence Hackathon 2026.

---

## 1️⃣ Blockchain Deployment (Smart Contracts)

### Prerequisites
- [Foundry](https://getfoundry.sh/) or [Hardhat](https://hardhat.org/)
- A wallet with Sepolia ETH and Fuji AVAX test tokens.
- Chainlink LINK tokens (for CCIP fees).

### Step 1: Automated Deployment (Recommended)
You can deploy the entire protocol using the provided Node.js script.
```bash
# 1. Install dependencies
npm install

# 2. Configure .env with your DEPLOYER_PRIVATE_KEY
# 3. Run the deployment script
npx ts-node scripts/deploy.ts
```

### Step 2: Manual Deployment (Foundry/Hardhat)
If you prefer manual deployment:
```bash
# Example using Foundry
forge create --rpc-url $SEPOLIA_RPC --private-key $PRIVATE_KEY contracts/GreenProofNFT.sol:GreenProofNFT
```

---

## 2️⃣ Frontend Deployment (Vercel)

The GreenProof dashboard is built with **Next.js** and optimized for Vercel.

### Step 1: Configure Environment Variables
Copy `.env.example` to `.env.local` and fill in the deployed contract addresses.

### Step 2: Push to GitHub
Wait for the Vercel auto-deployment or run:
```bash
vercel --prod
```
> **Note:** The official deployment account is linked to `neo.sh1w4@gmail.com`. Ensure you are logged into this account via `vercel login`.

---

## 3️⃣ Chainlink CRE Execution
To run the programmatic orchestration locally or via the CRE CLI:
```bash
npx chainlink-cre run cre/workflow.ts --args '{"ownerAddress": "0x..."}'
```

---

## 🏁 Summary
Once deployed, the dashboard will interact with the **GreenProof Layer**, triggering ZK proofs and Chainlink CCIP bridges in a single, seamless user flow.
