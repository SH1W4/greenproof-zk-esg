import { Link } from "wouter";
import { Shield, FileText, DollarSign, Code } from "lucide-react";

export default function Home() {
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
              <Link href="/contrato" className="text-slate-700 hover:text-blue-600 transition-colors">
                Contrato
              </Link>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-slate-900 mb-6">
            Protocolo de Certificação Ética para IA
          </h1>
          <p className="text-xl text-slate-600 mb-8">
            Um framework de governança e auditoria para garantir que sistemas de Inteligência Artificial sejam desenvolvidos e operados de forma ética, transparente e benéfica para a humanidade.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link href="/protocolo" className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
              <FileText className="w-5 h-5" />
              Ler o Protocolo
            </Link>
            <Link href="/logica" className="inline-flex items-center gap-2 bg-white text-slate-900 px-6 py-3 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors">
              <DollarSign className="w-5 h-5" />
              Lógica Monetária
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">
            <FileText className="w-12 h-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-bold text-slate-900 mb-2">Protocolo PCE-IA</h3>
            <p className="text-slate-600 mb-4">
              Princípios fundamentais, 4 pilares de certificação e arquitetura de tokenização NFT para o Certificado Ético URTN.
            </p>
            <Link href="/protocolo" className="text-blue-600 hover:underline">
              Saiba mais →
            </Link>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">
            <DollarSign className="w-12 h-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-bold text-slate-900 mb-2">Lógica Operacional e Monetária</h3>
            <p className="text-slate-600 mb-4">
              Fluxo de trabalho de 7 etapas, papéis dos agentes e modelo econômico sustentável com incentivos descentralizados.
            </p>
            <Link href="/logica" className="text-blue-600 hover:underline">
              Saiba mais →
            </Link>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">
            <Code className="w-12 h-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-bold text-slate-900 mb-2">Contrato Inteligente</h3>
            <p className="text-slate-600 mb-4">
              Código Solidity do URTNCertification.sol que gerencia a emissão e revogação do NFT de Certificação Ética.
            </p>
            <Link href="/contrato" className="text-blue-600 hover:underline">
              Ver código →
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-8 mt-20">
        <div className="container text-center">
          <p>© 2025 PCE-IA. Protocolo de Certificação Ética para IA.</p>
        </div>
      </footer>
    </div>
  );
}
