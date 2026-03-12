import { expect } from "chai";
import { ethers } from "hardhat";
import { GreenProofNFT, MockVerifier } from "../../typechain-types";
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";

describe("GreenProofNFT", function () {
  let nft: GreenProofNFT;
  let mockVerifier: MockVerifier;
  let admin: HardhatEthersSigner;
  let minter: HardhatEthersSigner;
  let recipient: HardhatEthersSigner;
  let stranger: HardhatEthersSigner;

  // Dummy ZK proof data (structure — verification is mocked)
  const VALID_PROOF = {
    a: [1n, 2n] as [bigint, bigint],
    b: [[3n, 4n], [5n, 6n]] as [[bigint, bigint], [bigint, bigint]],
    c: [7n, 8n] as [bigint, bigint],
    input: [1n] as [bigint], // 1 = compliant
  };

  const FAILING_INPUT = [0n] as [bigint]; // 0 = non-compliant

  beforeEach(async function () {
    [admin, minter, recipient, stranger] = await ethers.getSigners();

    // Deploy mock verifier (returns true by default)
    const MockVerifierFactory = await ethers.getContractFactory("MockVerifier");
    mockVerifier = (await MockVerifierFactory.deploy(true)) as MockVerifier;

    // Deploy the NFT contract
    const NFTFactory = await ethers.getContractFactory("GreenProofNFT");
    nft = (await NFTFactory.deploy(await mockVerifier.getAddress())) as GreenProofNFT;

    // Grant MINTER_ROLE to minter account
    const MINTER_ROLE = await nft.MINTER_ROLE();
    await nft.grantRole(MINTER_ROLE, minter.address);
  });

  // ─── Deployment ──────────────────────────────────────────────────────────────

  describe("Deployment", function () {
    it("should set the verifier address correctly", async function () {
      expect(await nft.verifier()).to.equal(await mockVerifier.getAddress());
    });

    it("should grant DEFAULT_ADMIN_ROLE to deployer", async function () {
      const ADMIN_ROLE = await nft.DEFAULT_ADMIN_ROLE();
      expect(await nft.hasRole(ADMIN_ROLE, admin.address)).to.be.true;
    });

    it("should grant MINTER_ROLE to deployer", async function () {
      const MINTER_ROLE = await nft.MINTER_ROLE();
      expect(await nft.hasRole(MINTER_ROLE, admin.address)).to.be.true;
    });

    it("should start with nextTokenId = 0", async function () {
      expect(await nft.getNextTokenId()).to.equal(0n);
    });
  });

  // ─── Minting ─────────────────────────────────────────────────────────────────

  describe("mintGreenProof", function () {
    it("should mint a token when ZK proof passes", async function () {
      await expect(
        nft.connect(minter).mintGreenProof(
          recipient.address,
          VALID_PROOF.a, VALID_PROOF.b, VALID_PROOF.c, VALID_PROOF.input
        )
      ).to.emit(nft, "GreenProofMinted")
        .withArgs(recipient.address, 0n, true, (timestamp: bigint) => timestamp > 0n);

      expect(await nft.ownerOf(0)).to.equal(recipient.address);
      expect(await nft.getNextTokenId()).to.equal(1n);
    });

    it("should revert if ZK proof fails (verifier returns false)", async function () {
      await mockVerifier.setResult(false);
      await expect(
        nft.connect(minter).mintGreenProof(
          recipient.address,
          VALID_PROOF.a, VALID_PROOF.b, VALID_PROOF.c, VALID_PROOF.input
        )
      ).to.be.revertedWith("GPROOF: ZK-SNARK verification failed");
    });

    it("should revert if compliance input is 0 (not compliant)", async function () {
      await expect(
        nft.connect(minter).mintGreenProof(
          recipient.address,
          VALID_PROOF.a, VALID_PROOF.b, VALID_PROOF.c, FAILING_INPUT
        )
      ).to.be.revertedWith("GPROOF: Compliance threshold not met");
    });

    it("should revert if caller lacks MINTER_ROLE", async function () {
      await expect(
        nft.connect(stranger).mintGreenProof(
          recipient.address,
          VALID_PROOF.a, VALID_PROOF.b, VALID_PROOF.c, VALID_PROOF.input
        )
      ).to.be.reverted;
    });

    it("should increment tokenId with each mint", async function () {
      for (let i = 0; i < 3; i++) {
        await nft.connect(minter).mintGreenProof(
          recipient.address,
          VALID_PROOF.a, VALID_PROOF.b, VALID_PROOF.c, VALID_PROOF.input
        );
      }
      expect(await nft.getNextTokenId()).to.equal(3n);
    });
  });

  // ─── Pausable ─────────────────────────────────────────────────────────────────

  describe("Pausable", function () {
    it("should allow admin to pause minting", async function () {
      await nft.connect(admin).pause();
      await expect(
        nft.connect(minter).mintGreenProof(
          recipient.address,
          VALID_PROOF.a, VALID_PROOF.b, VALID_PROOF.c, VALID_PROOF.input
        )
      ).to.be.reverted; // EnforcedPause
    });

    it("should allow admin to unpause and resume minting", async function () {
      await nft.connect(admin).pause();
      await nft.connect(admin).unpause();
      await expect(
        nft.connect(minter).mintGreenProof(
          recipient.address,
          VALID_PROOF.a, VALID_PROOF.b, VALID_PROOF.c, VALID_PROOF.input
        )
      ).to.emit(nft, "GreenProofMinted");
    });

    it("should revert if non-admin tries to pause", async function () {
      await expect(nft.connect(stranger).pause()).to.be.reverted;
    });
  });

  // ─── Verifier Update ─────────────────────────────────────────────────────────

  describe("setVerifier", function () {
    it("should allow admin to update verifier and emit VerifierUpdated", async function () {
      const NewVerifierFactory = await ethers.getContractFactory("MockVerifier");
      const newVerifier = await NewVerifierFactory.deploy(true);
      const newAddr = await newVerifier.getAddress();
      const oldAddr = await mockVerifier.getAddress();

      await expect(nft.connect(admin).setVerifier(newAddr))
        .to.emit(nft, "VerifierUpdated")
        .withArgs(oldAddr, newAddr);

      expect(await nft.verifier()).to.equal(newAddr);
    });

    it("should revert if non-admin tries to update verifier", async function () {
      await expect(
        nft.connect(stranger).setVerifier(ethers.ZeroAddress)
      ).to.be.reverted;
    });
  });
});
