/**
 * @greenproof/membrane-sdk
 * 
 * The official SDK for the GreenProof Universal Trust Protocol.
 * Sovereign RWA attestation, ZK verification, and CCIP interoperability.
 */

export { MembraneSDK } from "./client";
export type {
  MembraneConfig,
  Certificate,
  TrinityConsensus,
  TrinityNucleusStatus,
  AttestationRequest,
  AttestationResult,
  ConsensusStatus,
  TrustNucleus,
  NetworkId,
  MembraneError,
} from "./types";
export { generateCID, simulateZKProof, estimateCost } from "./utils";
