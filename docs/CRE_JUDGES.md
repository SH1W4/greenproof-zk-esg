# 🔗 GreenProof CRE Workflow — Judge-Oriented Explanation

This document provides a high-level walkthrough of the **GreenProof** programmatic orchestration layer, implemented using the **Chainlink Runtime Environment (CRE)**.

![GreenProof Technical Ecosystem](docs/Public/Assets/technical_infographic.png)

---

## 🏗️ The Execution Backbone
In GreenProof, **Chainlink CRE** is not just an oracle; it is the **execution backbone** that coordinates a complex, multi-stage compliance lifecycle:

### 1️⃣ Triple Oracle Consensus (Anti-Greenwashing)
ESG data is ingested from three independent dimensions of reality to ensure absolute integrity:
1. **Physical Reality (IoT Sensors):** Real-time environmental signals (carbon, energy, water).
2. **Legal Reality (Juridical Audit Engine):** Automated regulatory compliance and jurisdictional verification.
3. **Ethical Reality (Ethical Integrity Engine):** Proprietary logic for deep value alignment and transparency.

> **📌 Why this matters:** Greenwashing typically occurs when ESG scores rely on a single, manipulable source. GreenProof enforces a **"Trinity of Proof"**—combining hard telemetry (IoT) with autonomous legal verification and ethical intelligence.

```typescript
// Conceptual logic executed by CRE
const consensusScore = (iotData.score + juridicalAudit.score + ethicalAudit.score) / 3;

if (consensusScore < 80) {
  throw new Error("Consensus failed: ESG Score below 80% threshold.");
}
```

### 2️⃣ Zero-Knowledge Proof Layer (Privacy by Design)
Once consensus is reached, CRE triggers an off-chain ZK-SNARK computation using **Circom**.

> **📌 Why this matters:** Companies often avoid transparency to protect sensitive operational data. Our ZK layer proves the statement **"ESG ≥ 80%"** without ever revealing raw data, scores, or internal metrics to the blockchain.

```typescript
const zkProof = await ZK.prove("circom/ESGScore.circom", {
  score: consensusScore,
  threshold: 80
});
```

### 3️⃣ On-Chain Certification (NFT as Credential)
CRE mints a **GreenProof NFT** on Ethereum Sepolia. This NFT contains a cryptographic commitment to the ZK proof, acting as a portable, immutable credential.

> **📌 Why this matters:** The NFT is a lightweight certificate of compliance, not a data-heavy container, ensuring blockchain efficiency.

### 4️⃣ Cross-Chain Portability (Chainlink CCIP)
Finally, CRE uses **Chainlink CCIP** to bridge the ESG credential to other networks (e.g., Avalanche Fuji).

> **📌 Why this matters:** This turns ESG compliance into a **chain-agnostic RWA primitive**, allowing green bonds and carbon credits to be traded globally and verified on any chain in one click.

---

![Process Icons](docs/Public/Assets/icon_grid.png)

## 🏁 Summary
The entire lifecycle — **data → proof → asset → bridge** — is fully executed and coordinated by **Chainlink CRE**, demonstrating the power of programmable trust.
