---
name: GreenProof Orchestrator
description: Specialized skill for managing the GreenProof ESG protocol, including ZK verification logic and Chainlink CRE orchestration.
---

# GreenProof Orchestrator Skill

This skill allows an agent to manage, extend, and verify the GreenProof protocol. It focuses on the intersection of Zero-Knowledge Proofs, Chainlink CRE, and Cross-Chain credentials.

## 🛠 Core Protocol Components

1. **Triple Oracle Consensus:**
   - **File:** `workflows/workflow.yaml`
   - **Logic:** Aggregates three independent data sources (IoT, LLM, Audit) via Chainlink CRE.
   - **Modification:** To add a new source, update the `oracles` list in the YAML config.

2. **ZK Score Verification:**
   - **File:** `circom/ESGScore.circom`
   - **Threshold:** Currently set to `80`.
   - **Modification:** To change the compliance threshold, modify the `gte.in[1] <== 80;` line and re-generate the proof.

3. **Smart Contract Certification:**
   - **NFT:** `contracts/GreenProofNFT.sol`
   - **Bridge:** `contracts/CCIPBridge.sol`
   - **Task:** Ensure the `verificationPassed` boolean is correctly mapped from the CRE workflow output to the `mintGreenProof` function.

## 🚀 Common Workflows

### Update Compliance Threshold
1. Open `circom/ESGScore.circom`.
2. Update the threshold constant.
3. Update the `ARCH.md` and `README.md` to reflect the new standard.
4. Run `skills/greenproof-orchestrator/scripts/verify-protocol.js` to ensure consistency.

### Add New Chain Integration (CCIP)
1. Add a new step to `workflows/workflow.yaml` under the `transaction` type.
2. Specify the new `chainSelector` for the target network.
3. Verify that the `CCIPBridge.sol` router address is updated for the new chain in the `project.yaml` (simulated).

## 🌍 Localization / Localização
- **English:** `SKILL.md` (Main)
- **Português:** [DOCUMENTAÇÃO.md](file:///c:/Users/Jo%C3%A3o/Desktop/Hackertons/greenproof-zk-esg/skills/greenproof-orchestrator/DOCUMENTA%C3%87%C3%83O.md)

## 🛡 Verification & Safety
- **Anti-Greenwashing:** Always ensure at least 2/3 consensus is required for the initial scoring ingestion.
- **Privacy:** Never allow raw score data to be emitted in on-chain events. Use ONLY the ZK verified boolean result.
