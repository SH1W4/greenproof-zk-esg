// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@chainlink/contracts-ccip/src/v0.8/ccip/interfaces/IRouterClient.sol";
import "@chainlink/contracts-ccip/src/v0.8/ccip/libraries/Client.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title CCIPBridge
 * @dev Simple reference for CCIP-based bridge for GreenProof.
 * "Bridge it to any chain in 1 click."
 */
contract CCIPBridge is Ownable {
    IRouterClient public router;
    address public linkToken;

    constructor(address _router, address _link) Ownable(msg.sender) {
        router = IRouterClient(_router);
        linkToken = _link;
    }

    /**
     * @dev Sends a message to another chain to mint/replicate a GreenProof.
     */
    function bridgeGreenProof(
        uint64 destinationChainSelector,
        address receiver,
        uint256 tokenId
    ) external payable {
        Client.EVM2AnyMessage memory message = Client.EVM2AnyMessage({
            receiver: abi.encode(receiver),
            data: abi.encode(tokenId),
            tokenAmounts: new Client.EVMTokenAmount[](0),
            extraArgs: Client._argsToBytes(Client.EVMExtraArgsV1({gasLimit: 200_000})),
            feeToken: address(0) // Pay with native gas for demo ease
        });

        router.ccipSend{msg.value}(destinationChainSelector, message);
    }

    receive() external payable {}
}
