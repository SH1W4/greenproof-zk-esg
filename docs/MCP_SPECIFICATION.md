# 🦅 GreenProof Sovereign MCP Specification

O **GreenProof Sovereign MCP** é a camada de orquestração agêntica que traduz a complexidade do protocolo para uma interface compreensível por IAs avançadas. Ele permite que agentes operem como validadores, auditores e emissores de RWAs de forma autônoma.

## 🛠 Ferramentas Disponíveis (Tools)

### 1. `verify_certificate(cid)`
- **Descrição**: Executa a verificação criptográfica ZK-SNARK (Groth16) de um certificado.
- **Uso**: Agentes de auditoria utilizam para validar a integridade de um ativo sem precisar acessar dados sensíveis.

### 2. `get_trinity_status(cid)`
- **Descrição**: Retorna o estado atual do Consenso Trinitário (Físico, Jurídico, Ético).
- **Uso**: Agentes de monitoramento utilizam para garantir que a homeostase do ativo está preservada em tempo real.

### 3. `mint_rwa_attestation(score, metadata)`
- **Descrição**: Aciona o orquestrador Chainlink CRE para mintar um novo NFT de conformidade.
- **Uso**: Agentes de governança utilizam para fechar o ciclo de compliance após validação bem-sucedida.

## 🔐 Segurança e Soberania
- **Stdio Transport**: O servidor opera via stdio, garantindo que o controle permaneça no ambiente local do Agente Soberano.
- **Consenso Nativo**: O MCP não substitui a blockchain; ele age como o "dedo no gatilho" para as transações on-chain via CRE.

## 🚀 Integração com GP-ARCHITECT
O agente `gp-architect` utiliza este MCP para:
1. Escutar demandas de gestores institucionais via Portal V2.
2. Validar pilares de dados via MCP.
3. Liquidar o certificado via CCIP se o consenso for atingido.

---
*GreenProof MCP v1.0.0 - Built for the Agentic Economy.*
