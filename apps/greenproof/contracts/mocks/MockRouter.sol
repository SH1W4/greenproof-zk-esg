// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@chainlink/contracts-ccip/contracts/interfaces/IRouterClient.sol";
import "@chainlink/contracts-ccip/contracts/libraries/Client.sol";

/**
 * @title MockRouter
 * @dev Test double for the Chainlink CCIP Router.
 * Returns a deterministic messageId and allows fee configuration.
 */
contract MockRouter is IRouterClient {
    uint256 private _fee;
    bytes32 private constant MOCK_MESSAGE_ID = keccak256("GreenProof.MockRouter.MessageId");

    constructor(uint256 fee) {
        _fee = fee;
    }

    function setFee(uint256 fee) external {
        _fee = fee;
    }

    function isChainSupported(uint64) external pure override returns (bool) {
        return true;
    }

    function getSupportedTokens(uint64) external pure override returns (address[] memory) {
        return new address[](0);
    }

    function getFee(
        uint64,
        Client.EVM2AnyMessage memory
    ) external view override returns (uint256) {
        return _fee;
    }

    function ccipSend(
        uint64,
        Client.EVM2AnyMessage memory
    ) external payable override returns (bytes32) {
        return MOCK_MESSAGE_ID;
    }
}
