// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/// @notice Interface to the Groth16 on-chain verifier
interface IVerifier {
    function verifyProof(
        uint[2] memory a,
        uint[2][2] memory b,
        uint[2] memory c,
        uint[1] memory input
    ) external view returns (bool);
}

/**
 * @title GreenProofNFT
 * @notice Sovereign Threshold Attestation Protocol — ESG Compliance Certificate.
 * @dev Implements RBAC, ZK-SNARK on-chain verification, Pausable emergency stop,
 *      and ReentrancyGuard for institutional-grade security.
 *
 * Security model:
 *  - MINTER_ROLE: Chainlink CRE oracle nodes authorized to mint
 *  - DEFAULT_ADMIN_ROLE: Protocol admin (multisig in production)
 *  - Pausable: Admin can halt minting in emergency
 *  - ReentrancyGuard: Protection against reentrancy on mint
 */
contract GreenProofNFT is ERC721, AccessControl, Pausable, ReentrancyGuard {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    /// @notice The ZK-SNARK verifier contract address
    IVerifier public verifier;

    uint256 private _nextTokenId;

    // ─── Events ────────────────────────────────────────────────────────────────

    /**
     * @notice Emitted when a new GreenProof certificate is minted.
     * @param to            Recipient of the certificate.
     * @param tokenId       Unique certificate ID.
     * @param isZKVerified  Cryptographic verification status.
     * @param timestamp     Block timestamp of issuance.
     */
    event GreenProofMinted(
        address indexed to,
        uint256 indexed tokenId,
        bool isZKVerified,
        uint256 timestamp
    );

    /**
     * @notice Emitted when the verifier contract is updated.
     * @param oldVerifier Previous verifier address.
     * @param newVerifier New verifier address.
     */
    event VerifierUpdated(address indexed oldVerifier, address indexed newVerifier);

    // ─── Constructor ────────────────────────────────────────────────────────────

    /**
     * @notice Initializes the GreenProof NFT contract.
     * @param verifierAddress The address of the deployed Groth16 Verifier.
     */
    constructor(address verifierAddress) ERC721("GreenProof Certification", "GPROOF") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
        verifier = IVerifier(verifierAddress);
    }

    /// @dev Required override for multiple inheritance.
    function supportsInterface(bytes4 interfaceId)
        public view override(ERC721, AccessControl) returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    // ─── Core Logic ─────────────────────────────────────────────────────────────

    /**
     * @notice Mints a GreenProof NFT after on-chain ZK-SNARK verification.
     * @dev Only MINTER_ROLE (e.g. CRE oracle nodes). Protected by Pausable + ReentrancyGuard.
     * @param to    Recipient address for the credential.
     * @param a     ZK Proof component A.
     * @param b     ZK Proof component B.
     * @param c     ZK Proof component C.
     * @param input Public inputs — input[0] must be 1 (compliance flag).
     */
    function mintGreenProof(
        address to,
        uint[2] memory a,
        uint[2][2] memory b,
        uint[2] memory c,
        uint[1] memory input
    ) public onlyRole(MINTER_ROLE) whenNotPaused nonReentrant {
        require(
            verifier.verifyProof(a, b, c, input),
            "GPROOF: ZK-SNARK verification failed"
        );
        require(input[0] == 1, "GPROOF: Compliance threshold not met");

        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);

        emit GreenProofMinted(to, tokenId, true, block.timestamp);
    }

    // ─── Views ───────────────────────────────────────────────────────────────────

    /**
     * @notice Returns the next available token ID.
     * @return The current value of _nextTokenId.
     */
    function getNextTokenId() public view returns (uint256) {
        return _nextTokenId;
    }

    // ─── Admin ───────────────────────────────────────────────────────────────────

    /**
     * @notice Pauses all minting operations. Emergency stop.
     * @dev Restricted to DEFAULT_ADMIN_ROLE.
     */
    function pause() external onlyRole(DEFAULT_ADMIN_ROLE) {
        _pause();
    }

    /**
     * @notice Unpauses minting operations.
     * @dev Restricted to DEFAULT_ADMIN_ROLE.
     */
    function unpause() external onlyRole(DEFAULT_ADMIN_ROLE) {
        _unpause();
    }

    /**
     * @notice Updates the ZK Verifier contract address.
     * @dev Restricted to DEFAULT_ADMIN_ROLE.
     * @param verifierAddress New verifier address.
     */
    function setVerifier(address verifierAddress) public onlyRole(DEFAULT_ADMIN_ROLE) {
        address old = address(verifier);
        verifier = IVerifier(verifierAddress);
        emit VerifierUpdated(old, verifierAddress);
    }
}
