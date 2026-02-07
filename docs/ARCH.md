# System Architecture: GreenProof

## Overview
GreenProof is a decentralized protocol for private ESG compliance verification. It uses Chainlink CRE as the central nervous system, orchestrating off-chain compute (ZK) and data (Oracles) to produce on-chain trust.

## Flow Diagram

```text
       [ IoT Sensors ]   [ LLM ESG Scorer ]   [ 3rd Party Audit ]
                \               |               /
                 \              |              /
                  v             v             v
                [    Triple Oracle Consensus     ]
                [   (Orchestrated by CL CRE)    ]
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

1. **Trigger:** User initiates verification via Dashboard.
2. **Orchestration (Chainlink CRE):**
    - **Step A:** Query 3 Oracles (IoT, LLM, Audit) -> Generate Consensus ESG Score.
    - **Step B:** Execute ZK-Compute (Circom) -> Prove Score >= 80.
    - **Step C:** Mint NFT (Sepolia) -> Permanent record of compliance.
    - **Step D:** Bridge NFT (CCIP) -> Cross-chain portability.

## Components
- **Frontend:** Next.js 14 + Tailwind + shadcn/ui.
- **ZK Circuit:** Circom (snarkjs) - Verifies `score >= 80`.
- **Contracts:** 
    - `GreenProofNFT.sol`: ERC-721 certification on Sepolia.
    - `CCIPBridge.sol`: Reference for bridging credentials.
- **Workflow:** Chainlink CRE `workflow.yaml`.

## Scope Control & Non-Goals
- **Mock Data:** All sensor and audit data is mocked for the hackathon version.
- **Production Scale:** The ZK trusted setup and proof generation are localized/mocked for demo speed (8-10s flow).
- **Audit:** Smart contracts are for demonstration only and not audited for production value.
- **Identity:** Assumes single-entity verification (Address = Company).
