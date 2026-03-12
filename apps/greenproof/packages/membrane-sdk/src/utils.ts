/**
 * MEMBRANE SDK — Utilities
 */

import { NetworkId } from "./types";

/** Generate a sovereign Certificate ID */
export function generateCID(assetName: string): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const slug = assetName
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "-")
    .substring(0, 12);
  return `GP-${new Date().getFullYear()}-${slug}-${timestamp}`;
}

/** RPC endpoints by network */
export const RPC_ENDPOINTS: Record<NetworkId, string> = {
  sepolia: "https://ethereum-sepolia-rpc.publicnode.com",
  "avalanche-fuji": "https://api.avax-test.network/ext/bc/C/rpc",
  mainnet: "https://ethereum-rpc.publicnode.com",
};

/** GreenProof contract addresses */
export const CONTRACT_ADDRESSES: Record<NetworkId, string> = {
  sepolia: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
  "avalanche-fuji": "0x",   // pending deployment
  mainnet: "0x",            // pending mainnet launch
};

/** Simulate ZK proof generation (Groth16 circuit, max 5s) */
export async function simulateZKProof(score: number): Promise<string> {
  if (score < 80) {
    throw createMembraneError(
      "SCORE_BELOW_THRESHOLD",
      `Score ${score} is below the 80% threshold required for ZK-circuit pass.`
    );
  }
  await new Promise((r) => setTimeout(r, 400 + Math.random() * 600));
  return `0x${Buffer.from(`groth16:score>=${score}:${Date.now()}`).toString("hex").substring(0, 64)}`;
}

/** Format ETH cost estimate */
export function estimateCost(operations: number): string {
  return (0.001 * operations).toFixed(4);
}

/** Create a typed MembraneError */
export function createMembraneError(
  code: "QUORUM_FAILED" | "ZK_PROOF_INVALID" | "NETWORK_ERROR" | "CERT_NOT_FOUND" | "SCORE_BELOW_THRESHOLD",
  message: string,
  details?: unknown
) {
  const err = new Error(message) as Error & { code: string; details?: unknown };
  err.code = code;
  err.details = details;
  return err;
}
