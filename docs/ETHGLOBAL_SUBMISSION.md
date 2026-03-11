# GreenProof × ETHGlobal: Submission Guide

> Ready-to-use submission notes for the next ETHGlobal hackathon.

---

## Project Name
**GreenProof** — A Cryptographic Method for Environmental Attestation via Distributed Consensus and Zero-Knowledge Proofs

## One-Liner
> *Making greenwashing mathematically impossible via ZK-SNARKs and a 2/3 sovereign consensus oracle.*

## Relevant Tracks

| Track | Why We Qualify |
|:---|:---|
| **🔐 Privacy & ZK** | Groth16 circuit proves `score ≥ 80%` without exposing industrial telemetry |
| **🌎 Real-World Assets** | ERC-721 certificates are backed by on-chain, verifiable oracle consensus |
| **🤖 AI x Blockchain** | AQUILA (GP-Architect) autonomously orchestrates the oracle pipeline via MCP |

---

## What Was Built

1. **Trinity Consensus Engine** (`cre/greenproof-orchestrator.ts`) — 3 oracle nodes, 2/3 quorum.
2. **ZK-SNARK Circuit** (`circom/ESGScore.circom`) — Groth16 proof of compliance.
3. **On-Chain Certification** (`contracts/GreenProofNFT.sol`) — ERC-721 with RBAC.
4. **Cross-Chain Bridge** (`contracts/CCIPBridge.sol`) — Sepolia → Arbitrum.
5. **Developer SDK** (`@greenproof/membrane-sdk`) — TypeScript, dual ESM/CJS.
6. **Autonomous Agent** (`aquila-ark`) — MCP-native orchestrator.

---

## Proof of Work

| Artifact | Link |
|:---|:---|
| Live Demo | https://greenproof.vercel.app |
| On-Chain TX | [Sepolia Etherscan](https://sepolia.etherscan.io/tx/0xe0d518536a83afe148ad1846502b2c9dcaaa3982587b8da480666ed00ef32e4c) |
| Membrane SDK | https://github.com/symbeon-labs/membrane-sdk |
| AQUILA Agent | https://github.com/symbeon-labs/aquila-ark |
