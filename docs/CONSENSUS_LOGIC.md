# ⚙️ GreenProof: Trinity Consensus Logic (2/3)

The integrity of the GreenProof protocol rests on the **Trinity of Proof**, a multi-oracle consensus mechanism that utilizes supermajority logic (2/3) to validate Real World Assets (RWA) and ESG compliance.

## 🏛️ The Trinity of Oracles

The system orchestrates three independent data pillars via **Chainlink CRE (Custom Runtime Environment)**:

1.  **GP-Physical (Physical Reality Core)**: Ingesting environmental signals via IoT/Satellite.
2.  **GP-Juridical (Juridical Logic Core)**: Internal arbiter for native legal compliance.
3.  **GP-Ethical (Ethical Value Core)**: Internal guardian for social impact and governance.
    - **Quantification**: Uses a Weighted Heuristic Matrix (WHM) across Human Rights, Community Impact, and Fair Wage compliance.
    - **Auditability**: Each score is backed by a signed JSON-LD metadata blob anchored to the GreenProof MAS.

## ⚖️ 2/3 Consensus Logic (Minimum Quorum)

Unlike binary systems, GreenProof requires at least **two out of the three** oracles to validate the truth of the information before the NFT certificate is issued or updated.

### Why 2/3?
- **Fault Tolerance**: If a physical sensor fails or a juridical oracle is offline for maintenance, the protocol can still operate and issue proofs based on the other two pillars.
- **Collusion Prevention**: Requiring a supermajority mitigates the risk of a single point of data corruption (e.g., bribing an auditor or manipulating a sensor).
- **Reality Consensus**: ESG reality is complex. If the law validates (Juridical) and ethics validate (Ethical), but the physical sensor fails, the protocol may still be correct in a documentary audit context.

## 🕵️ ZK-SNARK Layer (Privacy Preservation)

Once the 2/3 consensus is reached, raw data (the source of truth) is processed off-chain to generate a **Zero-Knowledge Proof (Groth16)**.

- **Threshold Validation**: The ZK circuit only proves that `ConsensusCount >= 2` and `ESG_Score >= Threshold (e.g., 80)`.
- **Industrial Privacy**: The on-chain result is only "VALID" or "INVALID," protecting the company's proprietary data (e.g., revenue, exact location of sensitive sensors) from competitors.

## ⛓️ On-Chain Execution

The consensus result and the ZK proof are submitted to the `GreenProofNFT.sol` contract on the Sepolia network via Chainlink Functions, resulting in the asset state update and, if necessary, bridging via CCIP to other networks.

---
**Status**: Protocol Documented & Validated  
**Authored by**: GreenProof Architect 🦅⚙️🏁
