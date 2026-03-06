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
- **Sepolia Tx**: [0xe0d5...2e4c](https://sepolia.etherscan.io/tx/0xe0d518536a83afe148ad1846502b2c9dcaaa3982587b8da480666ed00ef32e4c)
- **CCIP Explorer**: Verify status on [CCIP Explorer](https://ccip.chain.link/).
- **ZK Proof**: Generated proofs are logged in the browser console during the demo.

## Why This Matters
GreenProof solves the **Privacy-Transparency Dilemma** for Institutional RWAs. By starting with **ESG**, we prove that compliance can be verified without exposing sensitive industrial or legal data — providing the definitive trust layer for the next trillion dollars of tokenized assets.

---
*Designed for Chainlink Convergence 2026. Transforming compliance into a sovereign asset.*
