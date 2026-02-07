# 🏆 CONVERGENCE HACKATHON 2026
**Track**: Tokenization/RWA  
**Live Demo**: [greenproof.vercel.app](https://greenproof.vercel.app)  
**Video**: [3min Pitch (YouTube)](https://youtube.com/watch?v=placeholder)  
**Contract**: [Sepolia Explorer (tx)](https://sepolia.etherscan.io/tx/placeholder)  

---

<p align="center">
  <img src="branding/banner.svg" alt="GreenProof Banner" width="800">
</p>

# 🌿 GREENPROOF

<p align="center">
  <img src="branding/logo.svg" alt="GreenProof Logo" width="120">
</p>

### **"Prove ESG ≥ 80% without revealing private data. Bridge it to any chain in 1 click."**
> *“Designed to eliminate greenwashing at the protocol level.”*

**TAGLINE:** Anti-greenwashing by design via Chainlink CRE + ZK + Triple Oracle Consensus

[![Chainlink](https://img.shields.io/badge/Chainlink-CRE%20%7C%20CCIP%20%7C%20Functions-3382ed?logo=chainlink)](https://chain.link/)
[![ZK-SNARK](https://img.shields.io/badge/ZK--SNARK-Circom-green)](https://iden3.io/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## 🚀 The Challenge
Current ESG (Environmental, Social, and Governance) reporting is plagued by two major issues:
1. **Greenwashing:** Companies manipulate data to appear more sustainable than they actually are.
2. **Data Privacy:** Detailed operational data is sensitive; companies are reluctant to share raw datasets with the public or competitors.

## 💡 The Solution
**GreenProof** is a protocol that allows entities to prove their compliance with high ESG standards without revealing any raw data. 

By combining **Zero-Knowledge Proofs (ZK)** for privacy and **Chainlink Runtime Environment (CRE)** for decentralized orchestration, we create a trustless, anti-greenwashing system.

## 🛠 How it Works
1. **Triple Oracle Consensus:** Chainlink oracles ingest data from multiple sources (IoT sensors, LLM-based analysis of reports, and third-party audits). A 2/3 consensus ensures data integrity.
2. **ZK Verification:** Once the ESG score is calculated off-chain, a ZK-SNARK circuit proves that `Score >= 80`. **Crucially, we do NOT prove the exact score; we only prove that it passes the required threshold.**
3. **On-chain Certification:** A successful proof triggers a Chainlink CRE automation to mint a "GreenProof" NFT on Ethereum Sepolia.
4. **CCIP Interoperability:** With one click, the NFT (and its proof of compliance) is bridged to any other chain (e.g., Avalanche Fuji) via Chainlink CCIP.

## 🔗 How Chainlink CRE Is Used

GreenProof uses **Chainlink Runtime Environment (CRE)** as its execution backbone — not just as an oracle, but as a programmable orchestration layer. CRE coordinates the full ESG certification lifecycle:

- **Data Ingestion:** CRE ingests signals from IoT sensors, **Themis Juridical Engine** (legal compliance), and **SEVE Ethical Engine** (value alignment).
- **Anti-Greenwashing Consensus:** CRE enforces a triple-oracle model. Only entities reaching a ≥80 score through consensus can proceed.
- **Zero-Knowledge Proof Execution:** CRE triggers an off-chain ZK-SNARK computation to prove compliance without revealing private data.
- **On-Chain Certification:** CRE mints a GreenProof ERC-721 NFT on Sepolia with a cryptographic commitment.
- **Cross-Chain Portability:** Using **Chainlink CCIP**, CRE enables bridging the credential to other chains (e.g., Avalanche Fuji) in a single action.

*By using CRE as a programmatic coordinator, GreenProof demonstrates how Chainlink orchestrates complex, real-world compliance workflows across off-chain computation and on-chain execution.*

---

## 🔗 Why Chainlink is Essential
- **Chainlink Runtime Environment (CRE):** The execution backbone of the protocol. Programmatic TypeScript workflows (`cre/workflow.ts`) coordinating data, ZK, and cross-chain actions.
- **Chainlink CCIP:** Ensures Global RWA portability, allowing ESG NFTs to move across chains seamlessly.
- **Chainlink Functions:** Powers the LLM-based ESG scoring, converting unstructured textual reports into verifiable metrics.

## 🏆 Why this wins Tokenization / RWA
Green credentials are the ultimate RWA (Real World Asset) metadata. By making ESG proofs verifiable, private, and cross-chain, GreenProof creates the infrastructure for:
- **Green Bonds:** Automated compliance for sovereign and corporate green debt.
- **Carbon Credits:** Verifiable origin and secondary market liquidity.
- **ESG-linked Assets:** Real-time yield adjustment based on private sustainability data.

> **Privacy Note:** We do NOT prove the score. We only prove that it passes the threshold.

## ⚡ Quick Start (Judges Only)
To verify the core protocol logic in seconds:
```bash
# 1. Start the local simulation
npm install
npm run dev

# 2. (Optional) Run the programmatic CRE workflow
cd cre && cre run
```

---

## 🛠 Demo Execution (45s total)

### Option A: Complete Simulation (CRE CLI)
Execute the real programmatic workflow logic using the Chainlink CRE CLI:
```bash
cd cre
cre run
```

### Option B: Interactive Dashboard
1. **[3s]** Click **"Start Verification"** on the dashboard.
2. **[5s] Triple Oracle Consensus:** Watch the orbs (**IoT, Themis Legal, SEVE Ethical**) analyze data and light up green.
3. **[12s] ZK Proof Generation:** Off-chain cryptographic verification that the score meets the required threshold without ever revealing the underlying data.
*GreenProof turns ESG compliance into a portable, verifiable, and privacy-preserving digital asset.*
4. **[10s] NFT Minting:** Certification recorded on the Ethereum Sepolia testnet.
5. **[15s] CCIP Bridge:** Seamless cross-chain migration of the ESG NFT to Avalanche Fuji.

> **Pro Tip:** Check out our [JUDGES_README.md](docs/JUDGES_README.md) for a deep dive into our technical impact.

## 🛡️ Demo Stability (Mocks Enabled for Presentation)
To ensure a flawless experience for judges regardless of testnet volatility (RPC latency, gas spikes), the demo utilizes **strategic mocks** for non-critical network calls. This preserves the narrative flow while accurately simulating the ZK and CCIP logic.

## ⚠️ Disclaimer
*This project uses mock data for sensors and audits to demonstrate the protocol flow. The goal is to showcase the integration of Chainlink CRE, ZK, and CCIP.*
