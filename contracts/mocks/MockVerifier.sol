// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title MockVerifier
 * @dev Test double for the Groth16 Verifier.
 * Allows toggling the return value to test pass/fail scenarios.
 */
contract MockVerifier {
    bool private _shouldPass;

    constructor(bool shouldPass) {
        _shouldPass = shouldPass;
    }

    function setResult(bool shouldPass) external {
        _shouldPass = shouldPass;
    }

    function verifyProof(
        uint[2] memory,
        uint[2][2] memory,
        uint[2] memory,
        uint[1] memory
    ) external view returns (bool) {
        return _shouldPass;
    }
}
