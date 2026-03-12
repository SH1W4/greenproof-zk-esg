import { Link } from "wouter";
import { Shield, ArrowLeft, Code } from "lucide-react";

export default function Contrato() {
  const solidityCode = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract URTNCertification is ERC721, Ownable {
    // Mapeamento do asset_hash (URTN-Core) para o Token ID
    mapping(bytes32 => uint256) private assetHashToTokenId;
    // Contador para o próximo Token ID
    uint256 private _nextTokenId;

    // Endereço do Contrato de Governança (DAO Curadoria DeGov)
    address public immutable daoGovernance;

    event CertificateMinted(uint256 indexed tokenId, bytes32 indexed assetHash, address indexed creator);
    event CertificateRevoked(uint256 indexed tokenId, bytes32 indexed assetHash);

    constructor(address _daoGovernance) ERC721("URTN Ethical Certificate", "URTN-EC") {
        daoGovernance = _daoGovernance;
        _nextTokenId = 1;
    }

    // Função restrita ao DAO para emitir o Certificado Ético
    function mintCertificate(address to, bytes32 assetHash, string memory tokenURI) public {
        require(msg.sender == daoGovernance, "URTNCertification: Caller is not the DAO Governance");
        require(assetHashToTokenId[assetHash] == 0, "URTNCertification: Asset already certified");

        uint256 tokenId = _nextTokenId++;
        assetHashToTokenId[assetHash] = tokenId;

        _safeMint(to, tokenId);
        _setTokenURI(tokenId, tokenURI);

        emit CertificateMinted(tokenId, assetHash, to);
    }

    // Função restrita ao DAO para revogar (queimar) o Certificado
    function revokeCertificate(uint256 tokenId) public {
        require(msg.sender == daoGovernance, "URTNCertification: Caller is not the DAO Governance");
        require(_exists(tokenId), "URTNCertification: Token does not exist");

        _burn(tokenId);
        emit CertificateRevoked(tokenId, bytes32(0));
    }

    // Função para obter o Token ID a partir do Asset Hash
    function getTokenIdByAssetHash(bytes32 assetHash) public view returns (uint256) {
        return assetHashToTokenId[assetHash];
    }
}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-50">
        <div className="container py-4">
          <nav className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 text-xl font-bold text-slate-900">
              <Shield className="w-6 h-6 text-blue-600" />
              PCE-IA
            </Link>
            <div className="flex items-center gap-6">
              <Link href="/protocolo" className="text-slate-700 hover:text-blue-600 transition-colors">
                Protocolo
              </Link>
              <Link href="/logica" className="text-slate-700 hover:text-blue-600 transition-colors">
                Lógica Operacional
              </Link>
              <Link href="/contrato" className="text-blue-600 font-semibold">
                Contrato
              </Link>
            </div>
          </nav>
        </div>
      </header>

      {/* Content */}
      <main className="container py-12">
        <Link href="/" className="inline-flex items-center gap-2 text-slate-600 hover:text-blue-600 transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" />
          Voltar para Home
        </Link>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 md:p-12 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <Code className="w-8 h-8 text-blue-600" />
              <h1 className="text-3xl font-bold text-slate-900">Contrato Inteligente URTNCertification.sol</h1>
            </div>
            <p className="text-slate-600 mb-6">
              O contrato inteligente <code className="bg-slate-100 px-2 py-1 rounded text-sm">URTNCertification.sol</code> gerencia o ciclo de vida do <strong>Certificado Ético URTN (NFT)</strong>. Ele herda as funcionalidades do padrão ERC-721 e inclui lógica específica de governança para emissão e revogação controlada pelo DAO.
            </p>

            <div className="bg-slate-900 rounded-lg p-6 overflow-x-auto">
              <pre className="text-sm text-slate-100 font-mono">
                <code>{solidityCode}</code>
              </pre>
            </div>

            <div className="mt-8 space-y-4">
              <h2 className="text-2xl font-bold text-slate-900">Funcionalidades Principais</h2>
              <ul className="space-y-2 text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span><strong>mintCertificate:</strong> Emite um novo NFT de Certificação Ética, restrito ao endereço do DAO.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span><strong>revokeCertificate:</strong> Revoga (queima) um NFT existente, também restrito ao DAO.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span><strong>getTokenIdByAssetHash:</strong> Permite consultar o Token ID a partir do Asset Hash do URTN-Core.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-8 mt-20">
        <div className="container text-center">
          <p>© 2025 PCE-IA. Protocolo de Certificação Ética para IA.</p>
        </div>
      </footer>
    </div>
  );
}
