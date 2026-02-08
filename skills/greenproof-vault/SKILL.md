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
> **Status**: OPERACIONAL 🟢
> **Network**: Sepolia (Testnet) / Fuji (Destination)
y
