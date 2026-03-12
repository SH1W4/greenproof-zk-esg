<div align="center">
<img src="./assets/banner_cinematic.png" width="100%" alt="Membrane SDK Banner">

# @greenproof/membrane-sdk

**The Official TypeScript SDK for the GreenProof Universal Trust Protocol**

[![npm version](https://img.shields.io/npm/v/@greenproof/membrane-sdk?color=00FF88&style=for-the-badge)](https://www.npmjs.com/package/@greenproof/membrane-sdk)
[![CI](https://img.shields.io/github/actions/workflow/status/symbeon-labs/membrane-sdk/ci.yml?label=CI&style=for-the-badge&color=00FF88)](https://github.com/symbeon-labs/membrane-sdk/actions)
[![License](https://img.shields.io/badge/License-MIT-white?style=for-the-badge)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Chainlink](https://img.shields.io/badge/Chainlink-CRE-375bd2?style=for-the-badge&logo=chainlink)](https://chain.link/)

*Integrate sovereign ESG attestation, ZK-proof verification, and cross-chain RWA minting into any application or AI agent in minutes.*

</div>

---

## 🏗️ Architecture Overview

```mermaid
graph TD
    App["Your Application"] -->|import| SDK["MembraneSDK Client"]
    
    SDK --> V["verify()"]
    SDK --> T["getTrinityStatus()"]
    SDK --> M["mintAttestation()"]
    SDK --> B["bridge()"]
    
    subgraph "GreenProof Protocol"
        V --> ZK["ZK-SNARK Groth16\nCircuit"]
        T --> Cons["Trinity Consensus\n2/3 Quorum"]
        M --> NFT["GreenProof NFT\nSepolia"]
        B --> CCIP["Chainlink CCIP\nCross-Chain Bridge"]
    end

    Cons --> P["GP-Physical\nIoT / Satellite"]
    Cons --> J["GP-Juridical\nTh3m1s Engine"]
    Cons --> E["GP-Ethical\nSEVE Framework"]
```

---

## 📦 Installation

```bash
npm install @greenproof/membrane-sdk
# or
yarn add @greenproof/membrane-sdk
```

---

## ⚡ Quick Start

```typescript
import { MembraneSDK } from "@greenproof/membrane-sdk";

const sdk = new MembraneSDK({ network: "sepolia" });

// Verify an existing certificate (ZK-proof check)
const isValid = await sdk.verify("GP-2026-NUCLEUS-01");

// Get Trinity Consensus status
const status = await sdk.getTrinityStatus("GP-2026-NUCLEUS-01");
console.log(status.consensus); // "VALIDATED" | "PENDING" | "FAILED"

// Mint a new RWA attestation
const cert = await sdk.mintAttestation({
  assetName: "AmazonAsset-01",
  esgScore: 87,
  jurisdiction: "BR",
});
console.log(cert.id); // "GP-2026-XXXX"
```

---

## 🔄 SDK Data Flow

```mermaid
sequenceDiagram
    autonumber
    participant App as Your App
    participant SDK as MembraneSDK
    participant Protocol as GreenProof Protocol
    participant Chain as Sepolia / CCIP

    App->>SDK: mintAttestation({ score: 87 })
    SDK->>Protocol: Request Trinity Consensus
    Protocol-->>SDK: GP-Physical ✓ + GP-Juridical ✓ + GP-Ethical ✓
    SDK->>Protocol: Trigger ZK-SNARK circuit
    Protocol-->>SDK: Groth16 Proof generated
    SDK->>Chain: Submit proof & mint NFT
    Chain-->>SDK: TxHash + NFT ID
    SDK-->>App: GreenProofCertificate { id, zkProofId, txHash }
```

---

## 📐 Type System

```mermaid
classDiagram
    class MembraneSDK {
        +network: NetworkId
        +verify(certificateId) bool
        +getTrinityStatus(certificateId) TrinityConsensus
        +mintAttestation(params) GreenProofCertificate
        +bridge(certificateId, targetChain) CrossChainResult
    }

    class GreenProofCertificate {
        +id: string
        +assetName: string
        +esgScore: number
        +zkProofId: string
        +nucleiStatus: NucleiStatus
        +txHash: string
        +chainId: number
        +createdAt: number
    }

    class TrinityConsensus {
        +physical: ConsensusStatus
        +juridical: ConsensusStatus
        +ethical: ConsensusStatus
        +consensus: ConsensusStatus
        +quorum: boolean
    }

    class NucleiStatus {
        +physical: boolean
        +juridical: boolean
        +ethical: boolean
    }

    MembraneSDK --> GreenProofCertificate : creates
    MembraneSDK --> TrinityConsensus : reads
    GreenProofCertificate --> NucleiStatus : contains
```

---

## 🌐 Multi-Network Support

| Network | Chain ID | Status |
|:---|:---|:---|
| **Sepolia** (Primary) | `11155111` | ✅ Active |
| **Avalanche Fuji** | `43113` | ✅ CCIP Bridge |
| **Arbitrum Sepolia** | `421614` | 🔜 Planned |
| **Polygon Mumbai** | `80001` | 🔜 Planned |

---

## 🤖 AI Agent Integration (MCP)

The SDK is fully compatible with **OpenCLAW / AQUILA** sovereign agents:

```typescript
// Inside AQUILA's orchestration loop:
const sdk = new MembraneSDK({ network: "sepolia" });

// Agent checks consensus before triggering ZK proof
const trinity = await sdk.getTrinityStatus(assetId);
if (trinity.quorum) {
  const cert = await sdk.mintAttestation({ assetName, esgScore });
  await sdk.bridge(cert.id, "avalanche-fuji");
}
```

---

## 🏛️ Related Repositories

| Repository | Description |
|:---|:---|
| [greenproof-platform](https://github.com/symbeon-labs/greenproof-platform) | Main protocol orchestration layer |
| [aquila-ark](https://github.com/symbeon-labs/aquila-ark) | Sovereign AI agent (AQUILA) |
| [agent-nursery-framework](https://github.com/symbeon-labs/agent_nursery_framework) | Agent incubation and governance |

---

## 📄 License

MIT © [Symbeon Labs](https://github.com/symbeon-labs)
