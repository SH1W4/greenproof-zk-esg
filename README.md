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

## 🔗 Why Chainlink is Essential
- **Chainlink CRE:** The execution backbone of the protocol, orchestrating the entire multi-step workflow from data ingestion to cross-chain bridging.
- **Chainlink CCIP:** Enables the "Global Trust" layer, allowing green credentials to be portable across the fragmented blockchain ecosystem.
- **Chainlink Functions:** Powers the LLM-based ESG scoring, converting unstructured textual reports into verifiable metrics.

## 🏆 Why this wins Tokenization / RWA
Green credentials are the ultimate RWA (Real World Asset) metadata. By making ESG proofs verifiable, private, and cross-chain, GreenProof creates the infrastructure for:
- **Green Bonds:** Automated compliance for sovereign and corporate green debt.
- **Carbon Credits:** Verifiable origin and secondary market liquidity.
- **ESG-linked Assets:** Real-time yield adjustment based on private sustainability data.

> **Privacy Note:** We do NOT prove the score. We only prove that it passes the threshold.

---

## 🛠 Demo Instructions
1. `npm install`
2. `npm run dev`
3. Click **"Start Verification"** on the dashboard.
4. Watch the **Triple Oracle Consensus** orbs light up.
5. Generate the **ZK Proof** (simulated).
6. Confirm the **NFT Minting** on Sepolia.
7. Click **"Bridge to Fuji"** to see CCIP in action.

---

## 🛡️ Reliability & QA
- **Failure-Resilient:** The demo is designed with fallback mocks to ensure a smooth presentation even during RPC instability.
- **ZK Logic:** Remember—we never reveal the raw score. We only prove the checkmark.

## ⚠️ Disclaimer
*This project uses mock data for sensors and audits to demonstrate the protocol flow. The goal is to showcase the integration of Chainlink CRE, ZK, and CCIP.*
