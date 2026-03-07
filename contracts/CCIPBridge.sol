// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@chainlink/contracts-ccip/contracts/interfaces/IRouterClient.sol";
import "@chainlink/contracts-ccip/contracts/libraries/Client.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";

/**
 * @title CCIPBridge
 * @notice Sovereign Cross-chain Bridge for GreenProof Protocol.
 * @dev Utilizes Chainlink CCIP to synchronize ESG credentials across chains.
 * Security: RBAC (BRIDGER_ROLE), Pausable emergency stop, native withdrawal guard.
 */
contract CCIPBridge is AccessControl, Pausable {
    /// @notice Role authorized to trigger bridge operations
    bytes32 public constant BRIDGER_ROLE = keccak256("BRIDGER_ROLE");

    /// @notice The Chainlink CCIP Router contract
    IRouterClient public router;

    /// @notice The LINK token address on the current chain
    address public linkToken;

    // ─── Events ────────────────────────────────────────────────────────────────

    /**
     * @notice Emitted when a cross-chain proof synchronization is dispatched.
     * @param destinationChain The Chainlink chain selector of the target chain.
     * @param receiver         The receiving contract on the target chain.
     * @param tokenId          The GreenProof NFT ID being synchronized.
     * @param messageId        The Chainlink CCIP message ID for tracking.
     */
    event BridgeDispatched(
        uint64 indexed destinationChain,
        address indexed receiver,
        uint256 tokenId,
        bytes32 messageId
    );

    /**
     * @notice Emitted when the admin withdraws native funds.
     * @param to     Recipient address.
     * @param amount Amount in wei.
     */
    event FundsWithdrawn(address indexed to, uint256 amount);

    // ─── Constructor ────────────────────────────────────────────────────────────

    /**
     * @notice Initializes the CCIP Bridge contract.
     * @param _router CCIP Router address.
     * @param _link   LINK token address.
     */
    constructor(address _router, address _link) {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(BRIDGER_ROLE, msg.sender);
        router = IRouterClient(_router);
        linkToken = _link;
    }

    // ─── Core Logic ─────────────────────────────────────────────────────────────

    /**
     * @notice Dispatches a cross-chain proof verification request.
     * @dev Only accounts with BRIDGER_ROLE can execute. Contract must not be paused.
     *      Requires msg.value >= estimated CCIP fee.
     * @param destinationChainSelector The target chain selector (Chainlink standard).
     * @param receiver                 The receiving contract on the target chain.
     * @param tokenId                  The GreenProof NFT ID to synchronize.
     */
    function bridgeGreenProof(
        uint64 destinationChainSelector,
        address receiver,
        uint256 tokenId
    ) external payable onlyRole(BRIDGER_ROLE) whenNotPaused {
        // 1. Prepare CCIP Message
        Client.EVM2AnyMessage memory message = Client.EVM2AnyMessage({
            receiver: abi.encode(receiver),
            data: abi.encode(tokenId),
            tokenAmounts: new Client.EVMTokenAmount[](0),
            extraArgs: Client._argsToBytes(Client.EVMExtraArgsV1({gasLimit: 200_000})),
            feeToken: address(0) // Pay with native gas (ETH/MATIC/AVAX)
        });

        // 2. Fee Validation
        uint256 fee = router.getFee(destinationChainSelector, message);
        require(msg.value >= fee, "CCIPBridge: Insufficient fee for cross-chain transfer");

        // 3. Dispatch via Router
        bytes32 messageId = router.ccipSend{value: fee}(destinationChainSelector, message);

        // 4. Return excess fee to sender
        uint256 excess = msg.value - fee;
        if (excess > 0) {
            (bool success, ) = msg.sender.call{value: excess}("");
            require(success, "CCIPBridge: Failed to return excess fee");
        }

        emit BridgeDispatched(destinationChainSelector, receiver, tokenId, messageId);
    }

    /**
     * @notice Returns the estimated CCIP fee for a bridge operation.
     * @param destinationChainSelector The target chain selector.
     * @param receiver                 The receiving contract on the target chain.
     * @param tokenId                  The GreenProof NFT ID to synchronize.
     * @return fee Estimated fee in native gas (wei).
     */
    function getFee(
        uint64 destinationChainSelector,
        address receiver,
        uint256 tokenId
    ) external view returns (uint256 fee) {
        Client.EVM2AnyMessage memory message = Client.EVM2AnyMessage({
            receiver: abi.encode(receiver),
            data: abi.encode(tokenId),
            tokenAmounts: new Client.EVMTokenAmount[](0),
            extraArgs: Client._argsToBytes(Client.EVMExtraArgsV1({gasLimit: 200_000})),
            feeToken: address(0)
        });
        return router.getFee(destinationChainSelector, message);
    }

    // ─── Admin ───────────────────────────────────────────────────────────────────

    /**
     * @notice Pauses the bridge. Emergency stop.
     * @dev Restricted to DEFAULT_ADMIN_ROLE.
     */
    function pause() external onlyRole(DEFAULT_ADMIN_ROLE) {
        _pause();
    }

    /**
     * @notice Unpauses the bridge.
     * @dev Restricted to DEFAULT_ADMIN_ROLE.
     */
    function unpause() external onlyRole(DEFAULT_ADMIN_ROLE) {
        _unpause();
    }

    /**
     * @notice Emergency withdrawal of native funds.
     * @dev Restricted to DEFAULT_ADMIN_ROLE.
     * @param to Recipient address.
     */
    function withdraw(address to) external onlyRole(DEFAULT_ADMIN_ROLE) {
        uint256 amount = address(this).balance;
        (bool success, ) = to.call{value: amount}("");
        require(success, "CCIPBridge: Withdraw failed");
        emit FundsWithdrawn(to, amount);
    }

    /// @notice Enables the contract to receive native gas (for CCIP fees)
    receive() external payable {}
}
