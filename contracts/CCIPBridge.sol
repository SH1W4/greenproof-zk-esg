// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@chainlink/contracts-ccip/contracts/interfaces/IRouterClient.sol";
import "@chainlink/contracts-ccip/contracts/libraries/Client.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

/**
 * @title CCIPBridge
 * @dev Sovereign Bridge for GreenProof Protocol.
 * Security Audit Fix: Implementing AccessControl and Emergency Withdrawal logic.
 */
/**
 * @title CCIPBridge
 * @notice Sovereign Cross-chain Bridge for GreenProof Protocol.
 * @dev Utilizes Chainlink CCIP to synchronize ESG credentials across chains.
 */
contract CCIPBridge is AccessControl {
    /// @notice Role authorized to trigger bridge operations
    bytes32 public constant BRIDGER_ROLE = keccak256("BRIDGER_ROLE");
    
    /// @notice The Chainlink CCIP Router contract
    IRouterClient public router;
    
    /// @notice The LINK token address on the current chain
    address public linkToken;

    /**
     * @notice Initializes the CCIP Bridge contract.
     * @param _router CCIP Router address.
     * @param _link LINK token address.
     */
    constructor(address _router, address _link) {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(BRIDGER_ROLE, msg.sender);
        router = IRouterClient(_router);
        linkToken = _link;
    }

    /**
     * @notice Dispatches a cross-chain proof verification request.
     * @dev Only accounts with BRIDGER_ROLE can execute this.
     * @param destinationChainSelector The target chain selector (Chainlink standard).
     * @param receiver The receiving contract on the target chain.
     * @param tokenId The GreenProof NFT ID to synchronize.
     */
    function bridgeGreenProof(
        uint64 destinationChainSelector,
        address receiver,
        uint256 tokenId
    ) external payable onlyRole(BRIDGER_ROLE) {
        Client.EVM2AnyMessage memory message = Client.EVM2AnyMessage({
            receiver: abi.encode(receiver),
            data: abi.encode(tokenId),
            tokenAmounts: new Client.EVMTokenAmount[](0),
            extraArgs: Client._argsToBytes(Client.EVMExtraArgsV1({gasLimit: 200_000})),
            feeToken: address(0) // Pay with native gas for demo ease
        });

        router.ccipSend{value: msg.value}(destinationChainSelector, message);
    }

    /**
     * @notice Emergency withdrawal of native funds.
     * @dev Restricted to DEFAULT_ADMIN_ROLE.
     * @param to Recipient address.
     */
    function withdraw(address to) external onlyRole(DEFAULT_ADMIN_ROLE) {
        uint256 amount = address(this).balance;
        (bool success, ) = to.call{value: amount}("");
        require(success, "Withdraw failed");
    }

    /// @notice Enabling the contract to receive native gas (for CCIP fees)
    receive() external payable {}
}
