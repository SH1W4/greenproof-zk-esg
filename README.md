![GreenProof Banner](public/assets/branding/trinity_cinematic_final.png)

# 🏆 CHAINLINK CONVERGENCE 2026
**Track**: DeFi & Tokenization / Risk & Compliance / CRE & AI  
**Live Demo**: [greenproof-platform.vercel.app](https://greenproof-platform.vercel.app)  
**Video Pitch**: Coming soon  
**Smart Contract**: [Sepolia Explorer (tx)](https://sepolia.etherscan.io/tx/0xe0d518536a83afe148ad1846502b2c9dcaaa3982587b8da480666ed00ef32e4c)  
**Evaluator Audit**: [Readiness Checklist](docs/EVALUATOR_READINESS_AUDIT.md)  
**Master Audit**: [Institutional Integrity Report](docs/MASTER_AUDIT_SUMMARY.md) ([Veredito PT](docs/VEREDITO_JUIZES_PT.md))  

[![Chainlink Convergence 2026](https://img.shields.io/badge/Hackathon-Chainlink_Convergence_2026-blue)](https://chain.link/hackathon)
[![Sepolia](https://img.shields.io/badge/Deployed-Sepolia-363636?logo=ethereum)](https://sepolia.etherscan.io)
[![CCIP](https://img.shields.io/badge/Bridge-Avalanche_Fuji-orange?logo=avax)](https://fuji.explorer.avax.network)
[![CI](https://github.com/symbeon-labs/greenproof-platform/actions/workflows/ci.yml/badge.svg)](https://github.com/symbeon-labs/greenproof-platform/actions)
[![Chainlink](https://img.shields.io/badge/Built%20with-Chainlink-3399FF?logo=chainlink)](https://chain.link)
[![Demo](https://img.shields.io/badge/Demo-Live-brightgreen)](https://greenproof-platform.vercel.app)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

## 📊 Quick Judge Evaluation (5-Min Track)

| Feature | Proof Point | Link |
|:---|:---|:---|
| **Technical Execution** | 119+ commits, CI/CD, 100% Green E2E Tests | [Readiness Audit](docs/EVALUATOR_READINESS_AUDIT.md) |
| **ZK Privacy** | Groth16 Implementation (ESG Standard Verification) | [Circom Logic](circom/ESGScore.circom) |
| **Trust Logic** | Trinity Consensus (2/3 Oracles via CRE) | [Architecture](docs/HAAS_ARCHITECTURE.md) |
| **Cross-chain** | CCIP Integration (Sepolia → Avalanche Fuji) | [CCIP Bridge](contracts/CCIPBridge.sol) |
| **Maturity** | Academic Citation, Master Audit, Legal Seal | [Master Audit](docs/MASTER_AUDIT_SUMMARY.md) |

---

## 🎬 Video Pitch
> [!IMPORTANT]
> **[WATCH THE 3-MINUTE PITCH HERE (Coming Soon)](#)**  
> *Demonstrating the Trinity Flow, ZK-Snark generation, and CCIP Minting.*

## 🌐 Live Dashboard
👉 [greenproof-platform.vercel.app](https://greenproof-platform.vercel.app/dashboard)

## ⏱️ 2-Minute Hackathon Judge Experience
1. **Explore Architecture**: Navigate to [/architecture](https://greenproof-platform.vercel.app/architecture) to see the Trinity Consensus flow.
2. **Execute Demo**: On the [Dashboard](https://greenproof-platform.vercel.app/dashboard), click **"Execute Sovereign Demo"**.
3. **Verify Proof**: In the [Verify](https://greenproof-platform.vercel.app/verify) portal, enter `GP-TRINITY-DEMO` to see the ZK-Proof result.
4. **On-Chain Audit**: Click "View on Explorer" to trace the Sepolia transaction.

---

## 🎬 Quick Demo Script (90 seconds)
1. **Open**: [Dashboard](https://greenproof-platform.vercel.app/dashboard)
2. **Action**: Click **"Execute Sovereign Demo"** (No login required).
3. **Observe**: Watch the Trinity Consensus (2/3 quorum) and the **ZKWitnessStream** in the live terminal.
4. **Result**: Observe the ZK-Certified NFT issuance and the CCIP bridge to Avalanche Fuji.
5. **Verify**: Enter the generated ID in the [Verify Portal](https://greenproof-platform.vercel.app/verify).

## 🎯 The Problem
The $2.1 trillion Green Bond market suffers from systemic greenwashing. Traditional ESG reporting relies on self-reported data with no cryptographic verification, leading to capital paralysis and lack of trust.

## 💡 The Solution
GreenProof introduces the **Trinity of Proof** — a decentralized consensus mechanism requiring agreement from **2 out of 3** independent oracles before issuing a compliance certificate:
- **GP-Physical** (Physical): Real-time IoT telemetry (NDVI, Carbon Sensors)
- **GP-Juridical** (Juridical): Automated legal compliance (Th3m1s Engine)
- **GP-Ethical** (Ethical): AI-driven ethical alignment (SEVE Oracle)

## 🔧 Technical Stack
- **Chainlink CRE**: Programmable orchestration layer and execution backbone.
- **ZK-SNARKs** (Groth16): Privacy-preserving compliance proofs (prove threshold without leak).
- **Chainlink CCIP**: Cross-chain certificate portability (Sepolia → Avalanche Fuji).
- **Lucide & Framer Motion**: Institutional-grade UI/UX with biocybernetic aesthetics.

## 🚀 Quick Start
```bash
git clone https://github.com/symbeon-labs/greenproof-platform.git
cd greenproof-platform
npm install
npm run dev
```

## 📚 Documentation
- [Judge Cheat Sheet](./docs/JUDGE_CHEATSHEET.md) — Quick evaluation guide.
- [Technical Architecture](./docs/HAAS_ARCHITECTURE.md) — Architectural deep dive.
- [Demo Disclosure](./docs/DEMO_DISCLOSURE.md) — Transparency report.

## 🏆 Why GreenProof Wins
✅ **Anti-Greenwashing**: 2/3 consensus prevents single-point data manipulation.  
✅ **Privacy by Design**: ZK-proofs verify threshold compliance without exposing raw data.  
✅ **Global Liquidity**: CCIP enables cross-chain RWA portability and secondary markets.  
✅ **Institutional Ready**: Production-grade infrastructure, not a simple POC.  

## 🤝 Contributing
This is a sovereign protocol. Core development happens in the private Knowledge Vault. Public contributions are welcome for UI/UX improvements and documentation.

## 📜 License
Sovereign Protocol — Core IP protected under pending patent GP-IP-2026-001. 
Execution layer released under MIT for hackathon transparency.
