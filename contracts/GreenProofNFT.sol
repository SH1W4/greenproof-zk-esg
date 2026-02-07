// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title GreenProofNFT
 * @dev "GreenProof" - Prove ESG compliance without revealing private data.
 * Optimized for Chainlink Convergence Hackathon 2026.
 */
contract GreenProofNFT is ERC721, Ownable {
    uint256 private _nextTokenId;

    event GreenProofMinted(address indexed to, uint256 tokenId, bool isZKVerified);

    constructor() ERC721("GreenProof Certification", "GPROOF") Ownable(msg.sender) {}

    /**
     * @dev Mints a GreenProof NFT after ZK-SNARK verification.
     * In the MVP, the verification is simplified or simulated for demo reliability.
     */
    function mintGreenProof(address to, bool verificationPassed) public {
        require(verificationPassed, "GPROOF: ZK Verification failed (ESG < 80)");
        
        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
        
        emit GreenProofMinted(to, tokenId, true);
    }

    function getNextTokenId() public view returns (uint256) {
        return _nextTokenId;
    }
}
