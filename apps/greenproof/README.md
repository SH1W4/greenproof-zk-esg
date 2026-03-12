# 🍃 GreenProof Platform

**The Sovereign Implementation of UEAP for Institutional ESG Assets**

---

<div align="center">
<img src="./public/assets/branding/trinity_cinematic_final.png" width="100%" alt="GreenProof Banner">
</div>

> [!NOTE]
> GreenProof has been refactored into a reference application built on top of the **Universal Event Attestation Protocol (UEAP)**. See the `protocol/ueap` directory for the core logic.

## 🚀 Overview

GreenProof is the institutional gateway to verifiable ESG compliance. It utilizes the **UEAP** to register real-world environmental data (carbon, biodiversity, energy) as cryptographically secure RWA certificates.

## 🏗️ Architecture

GreenProof extends the base UEAP pipeline:
1.  **Orchestration**: Chainlink CRE nodes coordinate between modular engines (Th3m1s, SEVE).
2.  **Attestation**: Aggregated results are hashed as a UEAP Event.
3.  **Proof**: A ZK-SNARK (Groth16) validates the compliance threshold privately.
4.  **Register**: The `GreenProofNFT` registers the attestation and mints the certificate.

## 🛠️ Getting Started

### Installation
From the root of the monorepo:
```bash
npm install
```

### Run Dashboard
```bash
npm run dev -w apps/greenproof
```

---

*Powered by Universal Event Attestation Protocol (UEAP)*
