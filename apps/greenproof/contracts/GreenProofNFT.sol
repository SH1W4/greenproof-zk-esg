// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "../../../protocol/ueap/contracts/AttestationRegistry.sol";

/**
 * @title GreenProofNFT
 * @notice Reference implementation of UEAP for ESG Compliance Certificates.
 */
contract GreenProofNFT is ERC721, AccessControl, Pausable, ReentrancyGuard, AttestationRegistry {
    uint256 private _nextTokenId;

    event GreenProofMinted(
        address indexed to,
        uint256 indexed tokenId,
        bytes32 attestationId,
        uint256 timestamp
    );

    constructor(address verifierAddress) ERC721("GreenProof Certification", "GPROOF") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
        _grantRole(ISSUER_ROLE, msg.sender);
    }

    /**
     * @notice Mints a GreenProof NFT using the UEAP AttestationRegistry.
     */
    function mintGreenProof(
        address to,
        bytes32 eventHash,
        bytes calldata proof
    ) public onlyRole(MINTER_ROLE) whenNotPaused nonReentrant {
        // 1. Register attestation in UEAP layer
        bytes32 attestationId = attest(eventHash, proof);

        // 2. Mint NFT representing the certificate
        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);

        emit GreenProofMinted(to, tokenId, attestationId, block.timestamp);
    }

    function supportsInterface(bytes4 interfaceId)
        public view override(ERC721, AccessControl) returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
