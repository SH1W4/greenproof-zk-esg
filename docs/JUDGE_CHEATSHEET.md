# 🦅 GreenProof: Judge Cheat Sheet

## 🔗 Core Links
- **Live Dashboard**: [greenproof-platform.vercel.app](https://greenproof-platform.vercel.app/dashboard)
- **Repo Origin**: [github.com/symbeon-labs/greenproof-platform](https://github.com/symbeon-labs/greenproof-platform)
- **Protocol Engine (MAS Core)**: [github.com/symbeon-labs/mas-core](https://github.com/symbeon-labs/mas-core)

## 🎬 90-Second Demo
Watch our submission video to see the full "Sovereign Proof" lifecycle:
1. **Trinity Consensus**: 2/3 agreement triggered by ESG audit via Chainlink CRE.
2. **ZK-Proof Generation**: Groth16 verification (privacy-first) using Circom.
3. **CCIP Bridge**: Certificate migration from Sepolia to Avalanche Fuji.

## 🛠️ Technical Proofs
| Component | Location | Logic Link |
|-----------|----------|------------|
| **ZK Circuits** | `/circom` | [Groth16 Logic](../circom/ESGScore.circom) |
| **Orchestrator** | `/cre` | [Chainlink CRE Logic](../cre/greenproof-orchestrator.ts) |
| **Contracts** | `/contracts` | [Attestation Logic](../contracts/GreenProofNFT.sol) |

## 🚀 Speed Run (No Login Required)
Follow these steps for an instant evaluation:
1. Visit the [Live Dashboard](https://greenproof-platform.vercel.app/dashboard).
2. Click **"Execute Sovereign Demo"**.
3. Observe the **ZKWitnessStream** in the terminal simulating proof generation.
4. Verify the **Success State**: NFT Minted + CCIP Synchronization confirmed.

## 📊 Verification Paths
- **Sepolia Tx**: [0x892d...5be4](https://sepolia.etherscan.io/tx/0x892d8705c671f43783817d4fe57d332e173901ec3c9b0f5c75ac283e85be4)
- **CCIP Explorer**: Verify status on [CCIP Explorer](https://ccip.chain.link/).
- **ZK Proof**: Generated proofs are logged in the browser console during the demo.

## 💡 Why This Matters
GreenProof solves the **Privacy-Transparency Dilemma** in ESG reporting. We prove compliance without exposing sensitive industrial data — a breakthrough for institutional RWA adoption.

---
*Designed for Chainlink Convergence 2026. Transforming compliance into a sovereign asset.*
