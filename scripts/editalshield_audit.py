import sys
import os
from pathlib import Path

# Resolve paths dynamically relative to this script's location
SCRIPT_DIR = Path(__file__).resolve().parent
PROJECT_ROOT = SCRIPT_DIR.parent  # greenproof-platform/
CORE_SYSTEMS = PROJECT_ROOT.parent  # symbeon-protocol/ or 01_CORE_SYSTEMS/

# Adiciona o diretório do EditalShield ao PYTHONPATH
sys.path.append(str(CORE_SYSTEMS / "editalshield" / "src"))

try:
    from editalshield.modules.memorial_protector import MemorialProtector
except ImportError as e:
    print(f"Erro ao importar EditalShield: {e}")
    sys.exit(1)

def run_audit(files_to_audit):
    print("=" * 80)
    print("🛡️  GREENPROOF INSTITUTIONAL AUDIT (POWERED BY EDITALSHIELD)")
    print("=" * 80)
    
    protector = MemorialProtector()
    
    for file_path in files_to_audit:
        if not os.path.exists(file_path):
            print(f"⚠️  Arquivo não encontrado: {file_path}")
            continue
            
        print(f"\n🔍 Auditando: {os.path.basename(file_path)}")
        
        with open(file_path, "r", encoding="utf-8") as f:
            content = f.read()
            
        analysis = protector.analyze_memorial(content)
        report = protector.generate_report(analysis)
        
        print(report)
        
        # Gera o relatório em formato MD para o cofre
        audit_filename = f"AUDIT_{os.path.basename(file_path).replace('.', '_')}.md"
        audit_path = PROJECT_ROOT / "docs" / "audits" / audit_filename
        audit_path.parent.mkdir(parents=True, exist_ok=True)
        
        with open(audit_path, "w", encoding="utf-8") as af:
            af.write(f"# Audit Report: {os.path.basename(file_path)}\n\n")
            af.write(report)
            
        print(f"✅ Relatório salvo em: {audit_path}")

if __name__ == "__main__":
    target_files = [
        str(PROJECT_ROOT / "README.md"),
        str(PROJECT_ROOT / "ARCHITECTURE.md"),
        str(PROJECT_ROOT / "docs" / "JURIDICAL_SEAL.md")
    ]
    run_audit(target_files)
