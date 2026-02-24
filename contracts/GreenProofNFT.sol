// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

/**
 * @title GreenProofNFT
 * @dev "GreenProof" - Sovereign Threshold Attestation Protocol.
 * Security Audit Fix: Implementing RBAC (Role-Based Access Control) for institutional integrity.
 */
interface IVerifier {
    function verifyProof(
        uint[2] memory a,
        uint[2][2] memory b,
        uint[2] memory c,
        uint[1] memory input
    ) external view returns (bool);
}

contract GreenProofNFT is ERC721, AccessControl {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    IVerifier public verifier;
    uint256 private _nextTokenId;

    event GreenProofMinted(address indexed to, uint256 tokenId, bool isZKVerified);

    constructor(address verifierAddress) ERC721("GreenProof Certification", "GPROOF") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
        verifier = IVerifier(verifierAddress);
    }

    function supportsInterface(bytes4 interfaceId) public view override(ERC721, AccessControl) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    /**
     * @dev Mints a GreenProof NFT after ON-CHAIN ZK-SNARK verification.
     * Restricted to authorized Chainlink CRE nodes (MINTER_ROLE).
     */
    function mintGreenProof(
        address to,
        uint[2] memory a,
        uint[2][2] memory b,
        uint[2] memory c,
        uint[1] memory input
    ) public onlyRole(MINTER_ROLE) {
        // The cryptographic verifier ensures the proof is valid and the score was >= 80.
        require(verifier.verifyProof(a, b, c, input), "GPROOF: Cryptographic ZK-SNARK verification failed");
        require(input[0] == 1, "GPROOF: Threshold not met (isCompliant must be 1)");
        
        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
        
        emit GreenProofMinted(to, tokenId, true);
    }

    function getNextTokenId() public view returns (uint256) {
        return _nextTokenId;
    }

    function setVerifier(address verifierAddress) public onlyRole(DEFAULT_ADMIN_ROLE) {
        verifier = IVerifier(verifierAddress);
    }
}
