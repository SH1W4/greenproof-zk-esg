/**
 * GREENPROOF MEMBRANE SDK - Core Types
 * The Universal Trust Protocol for RWA attestation
 */

export type TrustNucleus = 'physical' | 'juridical' | 'ethical';
export type ConsensusStatus = 'VALIDATED' | 'PENDING' | 'FAILED';
export type NetworkId = 'sepolia' | 'avalanche-fuji' | 'mainnet';

export interface MembraneConfig {
  /** Target network */
  network: NetworkId;
  /** Optional: RPC endpoint override */
  rpcUrl?: string;
  /** Optional: Contract address override */
  contractAddress?: string;
  /** Timeout in milliseconds (default: 30000) */
  timeout?: number;
}

export interface TrinityNucleusStatus {
  nucleus: TrustNucleus;
  status: ConsensusStatus;
  confidence: number; // 0-100
  proof: string;      // cryptographic proof hash
  validator: string;  // oracle address
  timestamp: number;
}

export interface TrinityConsensus {
  cid: string;
  quorum: boolean;           // true if >= 2/3 validated
  score: number;             // aggregated ESG score (0-100)
  nuclei: TrinityNucleusStatus[];
  zkProofHash?: string;      // Groth16 proof (if generated)
  mintedNFT?: string;        // NFT token ID (if minted)
  network: NetworkId;
  timestamp: number;
}

export interface Certificate {
  cid: string;
  owner: string;
  score: number;
  issuedAt: number;
  expiresAt: number;
  networks: NetworkId[];     // chains where the cert exists
  zkProof: string;
  consensus: TrinityConsensus;
  status: 'ACTIVE' | 'EXPIRED' | 'REVOKED';
}

export interface AttestationRequest {
  /** Score must be >= 80 to pass the ZK circuit */
  score: number;
  metadata: {
    assetName: string;
    assetType: 'carbon_credit' | 'green_bond' | 'rwa' | 'supply_chain' | string;
    sector?: string;
    jurisdiction?: string;
    owner: string;
    [key: string]: unknown;
  };
  /** Whether to auto-bridge to secondary chain via CCIP */
  autoBridge?: boolean;
  targetNetwork?: NetworkId;
}

export interface AttestationResult {
  cid: string;
  txHash: string;
  nftId: string;
  network: NetworkId;
  ccipMessageId?: string;    // CCIP bridge message if autoBridge enabled
  duration: number;          // ms to complete
  cost: string;              // in ETH
}

export interface MembraneError extends Error {
  code: 'QUORUM_FAILED' | 'ZK_PROOF_INVALID' | 'NETWORK_ERROR' | 'CERT_NOT_FOUND' | 'SCORE_BELOW_THRESHOLD';
  details?: unknown;
}
