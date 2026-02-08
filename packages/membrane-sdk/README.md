# @greenproof/membrane-sdk
**Sovereign SDK for Zero-Knowledge ESG Proof Ingestion and Orchestration.**

The Membrane SDK provides a high-level, programmatic interface for enterprises to securely ingest ESG telemetry and trigger ZK-SNARK verifications within the GreenProof ecosystem.

---

## 🛠 Installation

```bash
npm install @greenproof/membrane-sdk
```

## 🚀 Quick Start

```typescript
import { MembraneClient } from "@greenproof/membrane-sdk";

const client = new MembraneClient({
  apiKey: "GP_MASTER_72x_01",
  environment: "production"
});

// Submit ESG Telemetry for Triple Oracle Consensus
const result = await client.submitProof({
  iotTelemetry: {
    carbon_emissions: "124kg",
    energy_source: "solar"
  },
  legalComplianceId: "EU-CSRD-2026-X4",
  ethicalStandard: "high"
});

console.log(`Proof Generated: ${result.proofId}`);

// Verify threshold without exposing sensitive data
const isVerified = await client.verifyThreshold(result.proofId);
console.log(`Compliance Verified: ${isVerified}`);
```

## 🧬 Core Features
- **ZK-Encapsulation**: Raw operacional data NEVER leaves your infrastructure. 
- **Chainlink CRE Native**: Directly orchestrates with the Trinity of Proof consensus layer.
- **Institutional Scale**: Designed for RWA issuers and industrial sustainability monitoring.

---
**Status**: ALPHA 1.0.0  
**Security**: ZK-SNARK Orchestrated.
