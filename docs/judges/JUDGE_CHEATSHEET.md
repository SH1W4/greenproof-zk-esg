# GreenProof: Judge Cheat Sheet

## Core Links
- **Live Dashboard**: [greenproof-platform.vercel.app](https://greenproof-platform.vercel.app/dashboard)
- **Repo Origin**: [github.com/symbeon-labs/greenproof-platform](https://github.com/symbeon-labs/greenproof-platform)
- **Protocol Engine (MAS Core)**: [github.com/symbeon-labs/mas-core](https://github.com/symbeon-labs/mas-core)

## 90-Second Demo
Watch our submission video to see the full "Sovereign Proof" lifecycle:
1. **Trinity Consensus**: 2/3 agreement triggered by ESG audit via Chainlink CRE.
2. **ZK-Proof Generation**: Groth16 verification (privacy-first) using Circom.
3. **CCIP Bridge**: Certificate migration from Sepolia to Avalanche Fuji.

## Technical Proofs
| Component | Location | Logic Link |
|-----------|----------|------------|
| **ZK Circuits** | `/circom` | [Groth16 Logic](../circom/ESGScore.circom) |
| **Orchestrator** | `/cre` | [Chainlink CRE Logic](../cre/greenproof-orchestrator.ts) |
| **Contracts** | `/contracts` | [Attestation Logic](../contracts/GreenProofNFT.sol) |

## Speed Run (No Login Required)
Follow these steps for an instant evaluation:
1. Visit the [Live Dashboard](https://greenproof-platform.vercel.app/dashboard).
2. Click **"Execute Sovereign Demo"**.
3. Observe the **ZKWitnessStream** in the terminal simulating proof generation. 
   *(Note: For environments without `circom`, use our verified [Logic Audit Tool](../scripts/test-zk-logic.mjs) via `npm run test:zk`).*
4. Verify the **Success State**: NFT Minted + CCIP Synchronization confirmed.

## Verification Paths
- **Ethereum Sepolia**: [Verified Contract](https://sepolia.etherscan.io/address/0x3fcf2C7f9a0A966810fD7858A99FA915d5326B54)
- **Arbitrum Sepolia**: [Verified NFT](https://sepolia.arbiscan.io/address/0x024BD05B6bE89e64024174Ce8980fca2F36C361a) | [Verifier](https://sepolia.arbiscan.io/address/0xB0a0250331e479dBb3bd9e4447040d292215642e)
- **Avalanche Fuji**: [Verified Contract](https://testnet.snowtrace.io/address/0x3fcf2C7f9a0A966810fD7858A99FA915d5326B54)
- **CCIP Explorer**: [Real-time Status](https://ccip.chain.link/)
- **ZK Proof**: Generated proofs are logged in the browser console during the demo.

## Why This Matters
GreenProof solves the **Privacy-Transparency Dilemma** for Institutional RWAs. By starting with **ESG**, we prove that compliance can be verified without exposing sensitive industrial or legal data — providing the definitive trust layer for the next trillion dollars of tokenized assets.

---
*Designed for Chainlink Convergence 2026. Transforming compliance into a sovereign asset.*
