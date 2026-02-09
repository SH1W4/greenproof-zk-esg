# System Architecture: GreenProof

## Overview
GreenProof is a decentralized protocol for private ESG compliance verification. It uses Chainlink CRE as the central nervous system, orchestrating off-chain compute (ZK) and data (Oracles) to produce on-chain trust.

## Flow Diagram

```text
       [ GP-Sentinel ]   [   GP-Themis   ]   [    GP-Seve    ]
                \               |               /
                 \              |              /
                  v             v             v
                [    Sovereign MAS Consensus    ]
                [   (Orchestrated by Architect) ]
                                |
                                v
                [     ZK Compute (Prover)       ]
                [    "Does Score Pass ≥ 80?"    ]
                                |
                                v
                [   On-Chain Verification &     ]
                [    GreenProof NFT Minting     ]
                                |
                                v
                [    Chainlink CCIP Bridge      ]
                [  (Sepolia -> Fuji Portability) ]
```

1. **Trigger:** User initiates local verification via Dashboard or CLI.
2. **Orchestration (GP-Architect):**
    - **Step A:** Synchronize autonomous agents (GP-Sentinel, GP-Themis, GP-Seve) -> Generate 2/3 Consensus.
    - **Step B:** Execute ZK-Compute (Circom) -> Prove Score >= 80 without data leakage.
    - **Step C:** Mint NFT (Sepolia) -> Immutable proof of compliance.
    - **Step D:** Bridge NFT (CCIP) -> Cross-chain RWA portability.

## Components
- **Sovereign Membrane 2.0:** Next.js 14 + Framer Motion + 3D Cinematic Parallax.
    - `/architecture`: High-density technical deep-dive.
    - `/verify`: Public Truth Explorer for ZK-validation.
    - `/roadmap`: Visual expansion horizon (RWA & DeSci).
- **ZK Circuit:** Circom (snarkjs) - Verifies `score >= 80`.
- **Contracts:** 
    - `GreenProofNFT.sol`: ERC-721 certification on Sepolia.
    - `CCIPBridge.sol`: Reference for bridging credentials.
- **Master Agent:** GP-Architect (Chainlink CRE `workflow.ts`).

## Scope Control & Non-Goals
- **Mock Data:** All sensor and audit data is mocked for the hackathon version.
- **Production Scale:** The ZK trusted setup and proof generation are localized/mocked for demo speed (8-10s flow).
- **Audit:** Smart contracts are for demonstration only and not audited for production value.
- **Identity:** Assumes single-entity verification (Address = Company).
