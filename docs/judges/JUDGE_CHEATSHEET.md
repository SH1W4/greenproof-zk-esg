# GreenProof: Judge Cheat Sheet

## Core Links
- **Live Dashboard**: [greenproof-platform.vercel.app](https://greenproof-platform.vercel.app/dashboard)
- **Repo Origin**: [github.com/symbeon-labs/greenproof-platform](https://github.com/symbeon-labs/greenproof-platform)
- **Protocol Engine (MAS Core)**: [github.com/symbeon-labs/mas-core](https://github.com/symbeon-labs/mas-core)

## 90-Second Demo
Follow this flow for the ultimate GreenProof experience:
1. **Landing Page**: Observe the Cinematic Parallax & Institutional Positioning.
2. **Trinity Architecture**: Visualizing the 3-Oracle Consensus in the Core.
3. **Institutional Dashboard**: Real-time monitoring of the CRE Orchestrator.
4. **Asset Verification**: Anonymous ZK-Proof validation without exposing data.
5. **Mint RWA**: Execution of the Sovereign Proof on-chain.
6. **Transaction Explorer**: Verifiable truth on L1 + L2 + CCIP.

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

## 🔗 Deployment Matrix
| Network | Contract Type | Address |
| :--- | :--- | :--- |
| **Ethereum Sepolia** | GreenProofNFT (L1) | `0x3fcf2C7f9a0A966810fD7858A99FA915d5326B54` |
| **Arbitrum Sepolia** | GreenProofNFT (L2) | `0x024BD05B6bE89e64024174Ce8980fca2F36C361a` |
| **Avalanche Fuji** | Infrastructure (Staged) | `0x863de15091DfE5C044Dc1bD54f85210B6Bb6DA76` |

## Verification Paths
- **Ethereum Explorer**: [Verify NFT #GP-4](https://sepolia.etherscan.io/address/0x3fcf2C7f9a0A966810fD7858A99FA915d5326B54)
- **Arbitrum Explorer**: [Verify NFT L2](https://sepolia.arbiscan.io/address/0x024BD05B6bE89e64024174Ce8980fca2F36C361a)
- **CCIP Explorer**: [Cross-Chain Sync Status](https://ccip.chain.link/)
- **ZK Logic Audit**: Generated proofs are logged in the browser console during the demo.

## Why This Matters
GreenProof solves the **Privacy-Transparency Dilemma** for Institutional RWAs. By starting with **ESG**, we prove that compliance can be verified without exposing sensitive industrial or legal data — providing the definitive trust layer for the next trillion dollars of tokenized assets.

---
*Designed for Chainlink Convergence 2026. Transforming compliance into a sovereign asset.*
