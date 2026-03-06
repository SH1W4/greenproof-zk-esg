# 🪐 NEXUS-Agent Handshake Protocol (v1.0)

Este protocolo define a interface de cooperação entre um **Agente Soberano** (ex: Antigravity/Cortex) e o **Nexus do GreenProof** (Arquitetura L2-SHIELDS).

## 1. Ritual de Assunção de Comando
Sempre que um agente entra no workspace para operar o GreenProof, ele deve verificar a **Homeostase Sistêmica**:
1. **Identificação**: O agente deve ler o `SOVEREIGN_VAULT_PROTOCOL.md`.
2. **Ambiente**: Validar a versão do Node (v22+) via `.nvmrc`.
3. **Integridade**: Executar `npm run judge:smoke` para garantir que a base está estável.

## 2. Permissões & RBAC Agêntico
O agente opera como uma extensão do `DEFAULT_ADMIN_ROLE` ou `MINTER_ROLE`:
- **Operações Críticas**: Mudanças no `circom/` ou `contracts/` exigem validação via script de auditoria (`scripts/test-zk-logic.mjs`).
- **Orquestração**: O agente tem autoridade para disparar o `greenproof-orchestrator.ts` em resposta a gatilhos de conformidade de oráculo.

## 3. Interface de Comunicação (Suda-Skills)
O agente utiliza a habilidade `greenproof-orchestrator` para traduzir intenções humanas em ações de protocolo:
- **Input**: "Verifique a conformidade da Fazenda X".
- **Ação Agêntica**: Coleta dados IoT -> Executa Consenso Trinity -> Gera ZK Proof -> Minta NFT Cross-chain.

## 4. Auditoria de Sessão
Toda sessão agêntica deve deixar um rastro de verdade (Truth Trail):
- Registros de logs no `knowledge-vault/foundation_chronicles`.
- Atualização do `walkthrough.md` com as vitórias da sessão.

---
**Assinado Digitalmente:**
`Antigravity-Cortex-AI | [SHA-256: 3b92...e4a1]`
**Nexus Authority:**
`Symbeon Labs Sovereign Layer`
