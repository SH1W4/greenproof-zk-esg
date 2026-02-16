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
contract CCIPBridge is AccessControl {
    bytes32 public constant BRIDGER_ROLE = keccak256("BRIDGER_ROLE");
    IRouterClient public router;
    address public linkToken;

    constructor(address _router, address _link) {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(BRIDGER_ROLE, msg.sender);
        router = IRouterClient(_router);
        linkToken = _link;
    }

    /**
     * @dev Sends a message to another chain to mint/replicate a GreenProof.
     * Restricted to authorized BRIDGER_ROLE.
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
     * @dev Rescue funds accidentally sent to the contract.
     */
    function withdraw(address to) external onlyRole(DEFAULT_ADMIN_ROLE) {
        uint256 amount = address(this).balance;
        (bool success, ) = to.call{value: amount}("");
        require(success, "Withdraw failed");
    }

    receive() external payable {}
}
