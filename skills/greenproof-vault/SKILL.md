---
description: GreenProof Operational Field Manual - Deploy, Mint, and Vault Access.
---

# ⚔️ GreenProof Field Manual

Esta skill é o **Painel de Controle** do GreenProof Protocol. Use-a para operar a infraestrutura, realizar deploys e acessar a inteligência estratégica.

## 🚀 Live Action (Hackathon Demo)

O comando único para provar a validade do protocolo em tempo real.
```bash
# Executa a Trinity of Proof e minta o NFT na Sepolia
npx ts-node scripts/terminal-mint.ts
```

## 🛠️ DevOps & Infra

### Instalação & Setup
```bash
npm install
npx hardhat compile
```

### Deploy de Contratos (Sepolia)
```bash
# Implanta GreenProofNFT e CCIPBridge
npx ts-node scripts/deploy.ts
```

### Verificação (Etherscan)
```bash
npx hardhat verify --network sepolia <DEPLOYED_CONTRACT_ADDRESS>
```

---

## 🔐 Acesso ao Cofre (Vault)

O código é público. A estratégia é privada. Acesse os segredos aqui:

### 🗺️ Estratégia de Expansão (2026)
Consulte para saber qual hackathon atacar (Avalanche, Polygon, DeSci).
```bash
code ../greenproof-vault/ROADMAP_EXPANSAO.md
```

### 🖼️ Arsenal Visual (Assets)
Imagens 4K para Pitch Decks e Vídeos.
```bash
code ../greenproof-vault/ASSET_CATALOG.md
```

### 💾 Core Backup (Código Fonte)
Se tudo der errado, o código vital está salvo aqui.
```bash
explorer.exe ../greenproof-vault/core_backup
```

---

## 🤖 Sovereign MAS Governance

O GreenProof opera como um **Sistema Multi-Agente Soberano**. Esta Skill governa a interação e a expansão da nossa inteligência coletiva.

### 👑 GP-Architect (Nível 0)
O "Cérebro Master" (Chainlink CRE). Ele não apenas executa; ele avalia o consenso entre os agentes e decide o destino final dos dados e ativos.

### 🛡️ Agentes de Campo (Nível 1)
- **GP-Themis (O Árbitro)**: Valida a realidade jurídica e a integridade estrutural. Herda a lógica do Th3m1s Core.
- **GP-Seve (O Guardião)**: Garante a simbiose ética e o alinhamento de visão. Herda a lógica do SEVE Framework.
- **GP-Sentinel (O Observador)**: Capta a telemetria física irreversível via IoT e satélites.

### 🔍 Processo de Absorção & Evolução
Para que o sistema absorva nova inteligência:
1. **Identificação**: Determine a nova fronteira de auditoria necessária (ex: Jurídico, Ético).
2. **Skill Mapping**: Crie uma Skill no repositório progenitor detalhando as capacidades a serem herdadas.
3. **Internalização**: Clone a Skill para o GreenProof e registre-a como um novo Agente Soberano no `ARCH.md`.

---
> **Status Integration**: FULLY SYNCHRONIZED 🟢
> **MAS Hierarchy**: GP-Architect >> [GP-Themis, GP-Seve, GP-Sentinel]
