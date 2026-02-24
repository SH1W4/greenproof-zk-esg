# 🦅 GreenProof: Judge Cheat Sheet

## 🔗 Core Links
- **Live Dashboard**: [greenproof.vercel.app/dashboard](https://greenproof-platform.vercel.app/dashboard)
- **Repo Origin**: [github.com/symbeon-labs/greenproof-platform](https://github.com/symbeon-labs/greenproof-platform)
- **Protocol Engine (MAS)**: [github.com/symbeon-labs/mas-core](https://github.com/symbeon-labs/mas-core)

## 🎬 90-Second Demo
Watch our submission video to see the full "Sovereign Proof" lifecycle:
1. **Trinity Consensus**: 2/3 agreement triggered by ESG audit.
2. **ZK-Proof Generation**: Groth16 verification (privacy-first).
3. **CCIP Bridge**: Certificate migration from Sepolia to Avalanche Fuji.

## 🛠️ Technical Proofs
| Component | Location | Logic Link |
|-----------|----------|------------|
| **ZK Circuits** | `/src/zk` | [Groth16 Logic](./src/zk/circuit.js) |
| **Orchestrator** | `/src/app/api/cre` | [Chainlink CRE Logic](./src/app/api/cre/route.ts) |
| **Contracts** | `/contracts` | [Attestation Logic](./contracts/MASAttestationNFT.sol) |

## 🚀 Speed Run (No Login Required)
Follow these steps for an instant evaluation:
1. Visit the [Live Dashboard](https://greenproof-platform.vercel.app/dashboard).
2. Click **"Execute Sovereign Demo"**.
3. Observe the **ZKWitnessStream** in the terminal simulating proof generation.
4. Verify the **Success State**: NFT Minted + CCIP Synchronization confirmed.

## 📊 Verification Paths
- **Sepolia Tx**: Check modern Etherscan for latest `MASAttestationNFT` interactions.
- **CCIP Explorer**: Verify cross-chain status on [CCIP Explorer](https://ccip.chain.link/).
- **ZK Proof**: Generated proofs are logged in the browser console during the demo.

## 💡 Why This Matters
GreenProof solves the **Privacy-Transparency Dilemma** in ESG reporting. We prove compliance without exposing sensitive industrial data — a breakthrough for institutional RWA adoption.

---
*Designed for Chainlink Convergence 2026. Transforming compliance into a sovereign asset.*
