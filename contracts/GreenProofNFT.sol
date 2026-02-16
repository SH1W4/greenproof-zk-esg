// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

/**
 * @title GreenProofNFT
 * @dev "GreenProof" - Sovereign Threshold Attestation Protocol.
 * Security Audit Fix: Implementing RBAC (Role-Based Access Control) for institutional integrity.
 */
contract GreenProofNFT is ERC721, AccessControl {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    uint256 private _nextTokenId;

    event GreenProofMinted(address indexed to, uint256 tokenId, bool isZKVerified);

    constructor() ERC721("GreenProof Certification", "GPROOF") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
    }

    function supportsInterface(bytes4 interfaceId) public view override(ERC721, AccessControl) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    /**
     * @dev Mints a GreenProof NFT after ZK-SNARK verification.
     * Restricted to authorized Chainlink CRE nodes (MINTER_ROLE).
     */
    function mintGreenProof(address to, bool verificationPassed) public onlyRole(MINTER_ROLE) {
        require(verificationPassed, "GPROOF: ZK Verification failed (ESG < 80)");
        
        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
        
        emit GreenProofMinted(to, tokenId, true);
    }

    function getNextTokenId() public view returns (uint256) {
        return _nextTokenId;
    }
}
