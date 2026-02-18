# 🛡️ GreenProof: Demo Disclosure & Technical Transparency

To ensure absolute transparency for the Chainlink Convergence 2026 judges, this document outlines the current state of the GreenProof Protocol Demo, distinguishing between **Production-Ready Logic** and **POC Simulations**.

## 🟢 Production-Ready (Live On-Chain)
The following components are fully implemented and can be verified via the provided transaction hashes:

- **ZK-SNARK Verification**: Groth16 circuits (`circuit.js`) generate real proofs that are verified on-chain via `Verifier.sol`.
- **Chainlink CCIP**: Cross-chain transfer of the GreenProof Certificate from Sepolia to Avalanche Fuji is functional and verified.
- **Sovereign NFT Minting**: The `MASAttestationNFT.sol` contract correctly handles metadata anchoring and ownership.
- **Trinity Consensus Logic**: The 2/3 agreement rule is enforced by the smart contract logic.

## 🟡 POC Simulations (Mocked for Demo)
For the purpose of this 90-second demonstration, the following inputs are simulated:

- **IoT Telemetry**: In the live dashboard, data ingestion from physical sensors is simulated via `mock_iot_feed.ts`. In a real-world deployment, this would use Chainlink Functions to pull from industrial APIs.
- **Juridical API Response**: The Th3m1s Juridical node uses a pre-validated dataset for the Coffee Cooperative use case to ensure demo speed. 
- **Ethical Scoring Latency**: The SEVE node consensus time is accelerated for the UI experience.

## 🏛️ Verification Paths
Judges can find the raw logic in:
- `contracts/`: Smart contract sources.
- `src/zk/`: ZK-SNARK circuit definitions.
- `src/components/WorkflowDiagram.tsx`: Visual representation of these real-time flows.

---
**Status**: Institutional POC | Transparent Implementation 🦅⚖️🏁
