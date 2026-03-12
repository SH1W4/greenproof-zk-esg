import { expect } from "chai";
import { ethers } from "hardhat";
import { CCIPBridge, MockRouter } from "../../typechain-types";
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";

describe("CCIPBridge", function () {
  let bridge: CCIPBridge;
  let mockRouter: MockRouter;
  let admin: HardhatEthersSigner;
  let bridger: HardhatEthersSigner;
  let receiver: HardhatEthersSigner;
  let stranger: HardhatEthersSigner;

  const MOCK_LINK_ADDRESS = "0x1111111111111111111111111111111111111111";
  const DESTINATION_CHAIN = 16015286601757825753n; // Avalanche Fuji selector
  const TOKEN_ID = 42n;
  const MOCK_FEE = ethers.parseEther("0.001");

  beforeEach(async function () {
    [admin, bridger, receiver, stranger] = await ethers.getSigners();

    // Deploy mock router with a 0.001 ETH fee
    const MockRouterFactory = await ethers.getContractFactory("MockRouter");
    mockRouter = (await MockRouterFactory.deploy(MOCK_FEE)) as MockRouter;

    // Deploy the bridge
    const BridgeFactory = await ethers.getContractFactory("CCIPBridge");
    bridge = (await BridgeFactory.deploy(
      await mockRouter.getAddress(),
      MOCK_LINK_ADDRESS
    )) as CCIPBridge;

    // Grant BRIDGER_ROLE to bridger account
    const BRIDGER_ROLE = await bridge.BRIDGER_ROLE();
    await bridge.grantRole(BRIDGER_ROLE, bridger.address);
  });

  // ─── Deployment ──────────────────────────────────────────────────────────────

  describe("Deployment", function () {
    it("should configure router and linkToken correctly", async function () {
      expect(await bridge.router()).to.equal(await mockRouter.getAddress());
      expect(await bridge.linkToken()).to.equal(MOCK_LINK_ADDRESS);
    });

    it("should grant DEFAULT_ADMIN_ROLE to deployer", async function () {
      const ADMIN_ROLE = await bridge.DEFAULT_ADMIN_ROLE();
      expect(await bridge.hasRole(ADMIN_ROLE, admin.address)).to.be.true;
    });
  });

  // ─── Fee Estimation ───────────────────────────────────────────────────────────

  describe("getFee", function () {
    it("should return the estimated CCIP fee from router", async function () {
      const fee = await bridge.getFee(
        DESTINATION_CHAIN,
        receiver.address,
        TOKEN_ID
      );
      expect(fee).to.equal(MOCK_FEE);
    });
  });

  // ─── bridgeGreenProof ─────────────────────────────────────────────────────────

  describe("bridgeGreenProof", function () {
    it("should emit BridgeDispatched with correct args", async function () {
      const tx = bridge.connect(bridger).bridgeGreenProof(
        DESTINATION_CHAIN,
        receiver.address,
        TOKEN_ID,
        { value: MOCK_FEE }
      );

      await expect(tx)
        .to.emit(bridge, "BridgeDispatched")
        .withArgs(
          DESTINATION_CHAIN,
          receiver.address,
          TOKEN_ID,
          // messageId is the mock's keccak256("GreenProof.MockRouter.MessageId")
          (id: string) => id.startsWith("0x")
        );
    });

    it("should revert if caller lacks BRIDGER_ROLE", async function () {
      await expect(
        bridge.connect(stranger).bridgeGreenProof(
          DESTINATION_CHAIN,
          receiver.address,
          TOKEN_ID,
          { value: MOCK_FEE }
        )
      ).to.be.reverted;
    });

    it("should revert when paused", async function () {
      await bridge.connect(admin).pause();
      await expect(
        bridge.connect(bridger).bridgeGreenProof(
          DESTINATION_CHAIN,
          receiver.address,
          TOKEN_ID,
          { value: MOCK_FEE }
        )
      ).to.be.reverted;
    });
  });

  // ─── Withdraw ────────────────────────────────────────────────────────────────

  describe("withdraw", function () {
    it("should allow admin to withdraw and emit FundsWithdrawn", async function () {
      // Fund the contract
      await admin.sendTransaction({ to: await bridge.getAddress(), value: ethers.parseEther("0.05") });

      await expect(bridge.connect(admin).withdraw(admin.address))
        .to.emit(bridge, "FundsWithdrawn")
        .withArgs(admin.address, ethers.parseEther("0.05"));
    });

    it("should revert if non-admin tries to withdraw", async function () {
      await expect(
        bridge.connect(stranger).withdraw(stranger.address)
      ).to.be.reverted;
    });
  });

  // ─── Pausable ─────────────────────────────────────────────────────────────────

  describe("Pausable", function () {
    it("should allow admin to pause and unpause", async function () {
      await bridge.connect(admin).pause();
      await bridge.connect(admin).unpause();
      // After unpause, bridge should work again
      await expect(
        bridge.connect(bridger).bridgeGreenProof(
          DESTINATION_CHAIN, receiver.address, TOKEN_ID, { value: MOCK_FEE }
        )
      ).to.emit(bridge, "BridgeDispatched");
    });

    it("should revert if stranger tries to pause", async function () {
      await expect(bridge.connect(stranger).pause()).to.be.reverted;
    });
  });
});
