# UEAP Architecture

## Overview
The Universal Event Attestation Protocol (UEAP) follows a decoupled architecture where the logic of event generation is separated from the cryptographic proof and the final registry.

## Components

### 1. Protocol Core (`protocol/ueap/core`)
- **Schema Management**: Standardized TypeScript interfaces for events.
- **Hashing**: Deterministic Keccak256 hashing of event fields.

### 2. Proof Layer (`protocol/ueap/proofs`)
- **ZK-SNARKs**: Groth16 circuits for private attribute verification.
- **Oracle Adapters**: Chainlink CRE bridge for off-chain signal validation.

### 3. Registry Layer (`protocol/ueap/contracts`)
- **AttestationRegistry**: The single source of truth for all protocol attestations.

### 4. SDK (`protocol/ueap/sdk`)
- High-level tools for developers to integrate UEAP into any language (TS first).

## Data Flow
1. **Emit**: Actor generates a `UEAPEvent`.
2. **Prove**: Prover generates a `Proof` (ZK or Oracle).
3. **Register**: `AttestationRegistry` stores the `Attestation(EventHash, Proof)`.
4. **Verify**: Any consumer can verify the `Attestation` using the generic interface.
