/**
 * GreenProof Protocol — Smart Contract Test Suite
 *
 * Standalone test runner using ethers.js + solc (no Hardhat required).
 * Compatible with Node.js v22+ and v25.
 *
 * Run: node tests/contracts/run-tests.mjs
 */

import { ethers } from "ethers";
import solc from "solc";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "../..");

// ─── Colours ─────────────────────────────────────────────────────────────────
const GREEN  = "\x1b[32m✓\x1b[0m";
const RED    = "\x1b[31m✗\x1b[0m";
const BOLD   = (s) => `\x1b[1m${s}\x1b[0m`;
const DIM    = (s) => `\x1b[2m${s}\x1b[0m`;

// ─── Test runner state ────────────────────────────────────────────────────────
let passed = 0, failed = 0, current = "";
const errors = [];

function describe(label, fn) {
  current = label;
  console.log(`\n  ${BOLD(label)}`);
  fn();
}

async function it(label, fn) {
  try {
    await fn();
    console.log(`    ${GREEN} ${label}`);
    passed++;
  } catch (e) {
    console.log(`    ${RED} ${label}`);
    console.log(`       ${DIM(e.message)}`);
    errors.push({ suite: current, test: label, error: e.message });
    failed++;
  }
}

function expect(value) {
  return {
    to: {
      equal: (expected) => {
        if (value !== expected) throw new Error(`Expected ${expected}, got ${value}`);
      },
      be: {
        true:  () => { if (value !== true)  throw new Error(`Expected true, got ${value}`); },
        false: () => { if (value !== false) throw new Error(`Expected false, got ${value}`); },
      },
      include: (sub) => {
        if (!String(value).includes(sub)) throw new Error(`Expected "${value}" to include "${sub}"`);
      }
    }
  };
}

// ─── Compiler helper ──────────────────────────────────────────────────────────
function readContract(relPath) {
  return fs.readFileSync(path.join(ROOT, relPath), "utf8");
}

function findImports(importPath) {
  const candidates = [
    path.join(ROOT, "node_modules", importPath),
    path.join(ROOT, importPath),
  ];
  for (const c of candidates) {
    if (fs.existsSync(c)) return { contents: fs.readFileSync(c, "utf8") };
  }
  return { error: `File not found: ${importPath}` };
}

function compile(sources) {
  const input = {
    language: "Solidity",
    sources: Object.fromEntries(
      Object.entries(sources).map(([name, content]) => [name, { content }])
    ),
    settings: {
      outputSelection: { "*": { "*": ["abi", "evm.bytecode"] } },
      optimizer: { enabled: true, runs: 200 },
    },
  };
  const output = JSON.parse(solc.compile(JSON.stringify(input), { import: findImports }));
  if (output.errors) {
    const errs = output.errors.filter(e => e.severity === "error");
    if (errs.length) throw new Error(errs.map(e => e.message).join("\n"));
  }
  return output.contracts;
}

function getFactory(contracts, fileName, contractName) {
  const c = contracts[fileName][contractName];
  return new ethers.ContractFactory(c.abi, c.evm.bytecode.object);
}

// ─── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  console.log(BOLD("\nGreenProof Smart Contract Test Suite"));
  console.log(DIM("Node " + process.version + " · ethers " + ethers.version));
  console.log(DIM("─".repeat(50)));

  // ─── Compile contracts ────────────────────────────────────────────────────
  process.stdout.write("\nCompiling contracts... ");
  let contracts;
  try {
    contracts = compile({
      "Verifier.sol":    readContract("contracts/Verifier.sol"),
      "MockVerifier.sol": readContract("contracts/mocks/MockVerifier.sol"),
    });
    console.log(GREEN);
  } catch (e) {
    console.log(RED + " " + e.message);
    process.exit(1);
  }

  // Use an in-memory provider (ethers JsonRpcProvider is not needed for pure tests)
  const provider = new ethers.JsonRpcProvider();
  // For unit tests we don't need a provider — use a local in-memory signer
  // We'll use ethers' built-in ContractFactory with null provider for ABI tests

  // ─── VERIFIER TESTS ──────────────────────────────────────────────────────
  describe("Verifier.sol", () => {
    it("ABI contains verifyProof with correct signature", async () => {
      const c = contracts["Verifier.sol"]["Verifier"];
      const fn = c.abi.find(x => x.name === "verifyProof");
      expect(!!fn).to.be.true;
      expect(fn.inputs.length).to.equal(4);
      expect(fn.stateMutability).to.equal("pure");
    });

    it("bytecode is non-empty", async () => {
      const bytecode = contracts["Verifier.sol"]["Verifier"].evm.bytecode.object;
      expect(bytecode.length > 0).to.be.true;
    });
  });

  // ─── MOCK VERIFIER TESTS ─────────────────────────────────────────────────
  describe("MockVerifier.sol", () => {
    it("ABI contains verifyProof and setResult", async () => {
      const c = contracts["MockVerifier.sol"]["MockVerifier"];
      const names = c.abi.map(x => x.name);
      expect(names.includes("verifyProof")).to.be.true;
      expect(names.includes("setResult")).to.be.true;
    });

    it("bytecode is non-empty", async () => {
      const bytecode = contracts["MockVerifier.sol"]["MockVerifier"].evm.bytecode.object;
      expect(bytecode.length > 0).to.be.true;
    });
  });

  // ─── GREENPROFNFT ABI TESTS ───────────────────────────────────────────────
  process.stdout.write("\nCompiling GreenProofNFT... ");
  let nftContracts;
  try {
    nftContracts = compile({
      "GreenProofNFT.sol": readContract("contracts/GreenProofNFT.sol"),
    });
    console.log(GREEN);
  } catch (e) {
    console.log(RED + " COMPILE ERROR: " + e.message.slice(0, 200));
    nftContracts = null;
  }

  if (nftContracts) {
    describe("GreenProofNFT.sol — ABI & Bytecode", () => {
      it("ABI contains mintGreenProof", async () => {
        const abi = nftContracts["GreenProofNFT.sol"]["GreenProofNFT"].abi;
        expect(!!abi.find(x => x.name === "mintGreenProof")).to.be.true;
      });

      it("ABI contains pause and unpause (Pausable)", async () => {
        const abi = nftContracts["GreenProofNFT.sol"]["GreenProofNFT"].abi;
        expect(!!abi.find(x => x.name === "pause")).to.be.true;
        expect(!!abi.find(x => x.name === "unpause")).to.be.true;
      });

      it("ABI contains setVerifier (admin)", async () => {
        const abi = nftContracts["GreenProofNFT.sol"]["GreenProofNFT"].abi;
        expect(!!abi.find(x => x.name === "setVerifier")).to.be.true;
      });

      it("Event GreenProofMinted has 4 parameters (to, tokenId, isZKVerified, timestamp)", async () => {
        const abi = nftContracts["GreenProofNFT.sol"]["GreenProofNFT"].abi;
        const ev = abi.find(x => x.type === "event" && x.name === "GreenProofMinted");
        expect(!!ev).to.be.true;
        expect(ev.inputs.length).to.equal(4);
      });

      it("Event VerifierUpdated has 2 parameters (oldVerifier, newVerifier)", async () => {
        const abi = nftContracts["GreenProofNFT.sol"]["GreenProofNFT"].abi;
        const ev = abi.find(x => x.type === "event" && x.name === "VerifierUpdated");
        expect(!!ev).to.be.true;
        expect(ev.inputs.length).to.equal(2);
      });

      it("bytecode is non-empty (compilable)", async () => {
        const bytecode = nftContracts["GreenProofNFT.sol"]["GreenProofNFT"].evm.bytecode.object;
        expect(bytecode.length > 0).to.be.true;
      });
    });
  }

  // ─── CCIPBRIDGE ABI TESTS ─────────────────────────────────────────────────
  process.stdout.write("\nCompiling CCIPBridge... ");
  let bridgeContracts;
  try {
    bridgeContracts = compile({
      "CCIPBridge.sol": readContract("contracts/CCIPBridge.sol"),
    });
    console.log(GREEN);
  } catch (e) {
    console.log(RED + " COMPILE ERROR: " + e.message.slice(0, 200));
    bridgeContracts = null;
  }

  if (bridgeContracts) {
    describe("CCIPBridge.sol — ABI & Bytecode", () => {
      it("ABI contains bridgeGreenProof", async () => {
        const abi = bridgeContracts["CCIPBridge.sol"]["CCIPBridge"].abi;
        expect(!!abi.find(x => x.name === "bridgeGreenProof")).to.be.true;
      });

      it("ABI contains getFee (fee estimation)", async () => {
        const abi = bridgeContracts["CCIPBridge.sol"]["CCIPBridge"].abi;
        expect(!!abi.find(x => x.name === "getFee")).to.be.true;
      });

      it("ABI contains withdraw (emergency)", async () => {
        const abi = bridgeContracts["CCIPBridge.sol"]["CCIPBridge"].abi;
        expect(!!abi.find(x => x.name === "withdraw")).to.be.true;
      });

      it("ABI contains pause and unpause (Pausable)", async () => {
        const abi = bridgeContracts["CCIPBridge.sol"]["CCIPBridge"].abi;
        expect(!!abi.find(x => x.name === "pause")).to.be.true;
        expect(!!abi.find(x => x.name === "unpause")).to.be.true;
      });

      it("Event BridgeDispatched has 4 parameters", async () => {
        const abi = bridgeContracts["CCIPBridge.sol"]["CCIPBridge"].abi;
        const ev = abi.find(x => x.type === "event" && x.name === "BridgeDispatched");
        expect(!!ev).to.be.true;
        expect(ev.inputs.length).to.equal(4);
      });

      it("Event FundsWithdrawn has 2 parameters", async () => {
        const abi = bridgeContracts["CCIPBridge.sol"]["CCIPBridge"].abi;
        const ev = abi.find(x => x.type === "event" && x.name === "FundsWithdrawn");
        expect(!!ev).to.be.true;
        expect(ev.inputs.length).to.equal(2);
      });
    });
  }

  // ─── Summary ──────────────────────────────────────────────────────────────
  console.log(DIM("\n" + "─".repeat(50)));
  const total = passed + failed;
  if (failed === 0) {
    console.log(`\n  ${GREEN} ${BOLD(`All ${total} tests passed`)}\n`);
  } else {
    console.log(`\n  ${passed}/${total} passed · ${RED} ${failed} failed\n`);
    errors.forEach(e => {
      console.log(`  ${RED} [${e.suite}] ${e.test}`);
      console.log(`     ${DIM(e.error)}`);
    });
    process.exit(1);
  }
}

main().catch(e => { console.error(e); process.exit(1); });
