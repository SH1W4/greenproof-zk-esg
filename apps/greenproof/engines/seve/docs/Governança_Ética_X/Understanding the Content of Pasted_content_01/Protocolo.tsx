import { Link } from "wouter";
import { Shield, ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { Streamdown } from "streamdown";

export default function Protocolo() {
  const [content, setContent] = useState("");

  useEffect(() => {
    fetch("/PCE_IA_Protocolo_Certificacao_Etica_v1.0.md")
      .then((res) => res.text())
      .then((text) => setContent(text))
      .catch((err) => console.error("Erro ao carregar o protocolo:", err));
  }, []);

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
              <Link href="/protocolo" className="text-blue-600 font-semibold">
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

      {/* Content */}
      <main className="container py-12">
        <Link href="/" className="inline-flex items-center gap-2 text-slate-600 hover:text-blue-600 transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" />
          Voltar para Home
        </Link>

        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm border border-slate-200 p-8 md:p-12">
          {content ? (
            <Streamdown className="prose prose-slate max-w-none prose-headings:text-slate-900 prose-a:text-blue-600 prose-code:text-blue-600 prose-pre:bg-slate-900">
              {content}
            </Streamdown>
          ) : (
            <div className="text-center py-12">
              <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto"></div>
              <p className="text-slate-600 mt-4">Carregando protocolo...</p>
            </div>
          )}
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
