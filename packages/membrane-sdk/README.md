# 🧬 @greenproof/membrane-sdk

The official TypeScript SDK for the **GreenProof Universal Trust Protocol**.

Integrate sovereign ESG attestation, ZK-proof verification, and cross-chain RWA minting into any application or AI agent in minutes.

## Installation

```bash
npm install @greenproof/membrane-sdk
```

## Quick Start

```typescript
import { MembraneSDK } from "@greenproof/membrane-sdk";

const sdk = new MembraneSDK({ network: "sepolia" });

// ✅ Verify a certificate
const cert = await sdk.verifyCertificate("GP-2026-NUCLEUS-01");
console.log(cert.consensus.quorum); // true
console.log(cert.score);            // 91

// 🔎 Get Trinity consensus status
const status = await sdk.getTrinityStatus("GP-2026-NUCLEUS-01");
status.nuclei.forEach(n => console.log(`${n.nucleus}: ${n.status}`));
// physical: VALIDATED
// juridical: VALIDATED
// ethical: VALIDATED

// 🏛️ Mint a sovereign RWA attestation
const result = await sdk.mintAttestation({
  score: 87,
  metadata: {
    assetName: "Fazenda Verde Cerrado",
    assetType: "carbon_credit",
    sector: "agriculture",
    owner: "0x742d35Cc6634C0532925a3b8D4C9C7E19e1b4f2",
  },
  autoBridge: true,
  targetNetwork: "avalanche-fuji",
});

console.log(result.cid);          // GP-2026-FAZENDA-XXXXX
console.log(result.txHash);       // 0xe0d5...
console.log(result.ccipMessageId); // CCIP bridge confirmed
```

## API Reference

### `new MembraneSDK(config)`

| Config | Type | Default | Description |
|:---|:---|:---|:---|
| `network` | `NetworkId` | — | Target chain (`sepolia`, `avalanche-fuji`, `mainnet`) |
| `rpcUrl` | `string?` | Public RPC | Custom RPC endpoint |
| `contractAddress` | `string?` | Deployed address | Override contract address |
| `timeout` | `number?` | `30000` | Request timeout in ms |

### Methods

| Method | Description |
|:---|:---|
| `verifyCertificate(cid)` | ZK-verify an existing certificate |
| `getTrinityStatus(cid)` | Get Physical/Juridical/Ethical consensus |
| `mintAttestation(request)` | Mint a new RWA compliance NFT |
| `health()` | Check connection status and latency |

## Score Threshold

A minimum score of **80%** is required for the Groth16 ZK-circuit to approve any attestation. This is enforced cryptographically and cannot be bypassed.

---

*Part of the GreenProof ecosystem by [Symbeon Labs](https://github.com/symbeon-labs).*
