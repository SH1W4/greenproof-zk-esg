<div align="center">
<img src="./apps/greenproof/public/assets/branding/trinity_cinematic_final.png" width="100%" alt="GreenProof Banner">

# GreenProof Platform
**Sovereign ESG Compliance Oracle & Institutional RWA Attestation**

[![Live Demo](https://img.shields.io/badge/🟢_Live_Demo-Vercel-00FF88?style=for-the-badge)](https://greenproof.vercel.app)
[![CI Build](https://img.shields.io/badge/CI%2FCD-Passing-00FF88?style=for-the-badge&logo=github-actions&logoColor=white)](https://github.com/symbeon-labs/greenproof-platform/actions)
[![Contract Tests](https://img.shields.io/badge/Tests-16_Passing-00FF88?style=for-the-badge&logo=solidity&logoColor=white)](apps/greenproof/tests/contracts/run-tests.mjs)

</div>

---

## 🏛️ Protocol Snapshot (15 seconds)

GreenProof is a **Cryptographic Method for Real-World Asset Attestation** powered by Distributed Consensus and Zero-Knowledge Proofs.

It replaces manual compliance auditing with a deterministic, privacy-preserving verification pipeline:

```
Real-World Signals → Trinity Consensus → ZK Proof (Groth16) → On-Chain Certificate → Cross-Chain RWA
```

**What you will see in the demo:**
- Oracle consensus (Physical, Legal, Ethical) via **Chainlink CRE**
- **Groth16 ZK-proof** of asset compliance (without exposing sensitive data)
- On-chain certificate **NFT mint** on Ethereum Sepolia
- **Cross-chain portability** via Chainlink CCIP to Arbitrum Sepolia

---

## 🏛️ Technical Verification & Due Diligence

Investors and grant providers can validate the protocol's Proof of Concept (PoC) in under 2 minutes:

| Step | Action | Evidence |
|:---:|:---|:---|
| 1 | Open **Live Dashboard** | [greenproof.vercel.app/dashboard](https://greenproof.vercel.app/dashboard) |
| 2 | Execute **Sovereign Demo** | Triggers the 2/3 Oracle Quorum (CRE-orchestrated) |
| 3 | Monitor **Consensus Event** | High-fidelity log stream available on dashboard |
| 4 | Audit **ZK-Verifier Status** | [/verify ↗](https://greenproof.vercel.app/verify) |
| 5 | Verify **On-Chain Settlement** | [NFT Contract ↗](https://sepolia.etherscan.io/address/0x3fcf2C7f9a0A966810fD7858A99FA915d5326B54) |

---

## 🛡️ [UEAP Protocol Layer](./protocol/ueap)
GreenProof is built on top of the **Universal Event Attestation Protocol**. A generic, ZK-powered layer for creating verifiable evidence of any real-world event.

- **Objective**: Decouple Trust from Semantics.
- **Reference App**: [GreenProof](./apps/greenproof)

---

## 🚀 Rapid Deployment

### Monorepo Setup (Workspaces)
```bash
npm install
```

### Run GreenProof Reference App
```bash
npm run dev
```

---

## 🏗️ Repository Architecture

This repository has been refactored into a **Dual-Layer Architecture** (UEAP + GreenProof) to provide both a generalized protocol and a specific reference implementation.

```mermaid
graph TD
    Root["/ (Root)"] --> P["protocol/ueap/"]
    Root --> A["apps/greenproof/"]
    Root --> I["infrastructure/"]
    
    subgraph "L1: Universal Protocol"
        P --> PC["ueap/contracts"]
        P --> PS["ueap/sdk"]
    end
    
    subgraph "L2: Reference App"
        A --> GPC["greenproof/src"]
        A --> GPE["greenproof/engines"]
    end
```

---

<div align="center">

*Built with ❤️ and sovereign intelligence by **[Symbeon Labs](https://github.com/symbeon-labs)** for the Decentralized Future.*

**[Live Demo](https://greenproof.vercel.app)** · **[Architecture](docs/protocol/ARCHITECTURE.md)**

</div>
