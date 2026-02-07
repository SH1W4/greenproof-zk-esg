# 🧠 Documentação Técnica: GreenProof Orchestrator

Bem-vindo à documentação oficial do **GreenProof**. Este documento foi criado para fornecer uma compreensão profunda e estratégica do projeto, utilizando a **Skill** integrada como guia.

---

## 1. Visão Geral do Projeto
O **GreenProof** é um protocolo de conformidade ESG (Ambiental, Social e Governança) focado em privacidade e combate ao *greenwashing*.

### A Proposta de Valor
> "Prove que seu Score ESG é ≥ 80% sem revelar dados privados. Faça a ponte para qualquer rede com 1 clique."
> *“Projetado para eliminar o greenwashing em nível de protocolo.”*

## 2. A Arquitetura "Chainlink-First"
O projeto utiliza o ecossistema Chainlink como o sistema nervoso central:

```text
       [ Sensores IoT ]   [ LLM ESG Scorer ]   [ Auditoria ]
                \               |               /
                 \              |              /
                  v             v             v
                [    Consenso Triple Oracle      ]
                [   (Orquestrado por CL CRE)    ]
                                |
                                v
                [     Auto-Compute ZK (Prover)  ]
                [    "Score passa de ≥ 80?"     ]
                                |
                                v
                [   Verificação On-Chain &      ]
                [    Mint do NFT GreenProof     ]
                                |
                                v
                [    Chainlink CCIP Bridge      ]
                [  (Sepolia -> Fuji Portável)   ]
```

- **Chainlink CRE (Runtime Environment):** A espinha dorsal de execução do protocolo, orquestrando todo o fluxo.
- **Consenso de Oráculo Triplo:** Para evitar manipulação de dados (anti-greenwashing), consultamos três fontes distintas: Sensores IoT, análise de relatórios via LLM e auditorias de terceiros. 2/3 de consenso são necessários para validar o score.
- **Chainlink CCIP:** Garante que a prova de conformidade (o NFT GreenProof) possa ser levada para qualquer blockchain, habilitando a interoperabilidade global.

## 3. Privacidade com Zero-Knowledge (ZK)
O grande diferencial tecnológico é o uso de **ZK-SNARKs**.
- **O Problema:** Empresas não querem expor dados operacionais detalhados.
- **A Solução:** O circuito ZK em `circom/ESGScore.circom` verifica matematicamente se `Score >= 80`. **É fundamental entender: nós NÃO provamos o score exato, apenas que ele atinge o limite necessário.** Isso mantém a privacidade total.

## 4. Guia da Skill do Projeto
A **Skill** (`skills/greenproof-orchestrator`) não é apenas documentação, é um conjunto de ferramentas para gerenciar o protocolo.

### Componentes da Skill:
1. **`SKILL.md`**: O manual de instruções para IAs e desenvolvedores. Define onde cada peça do quebra-cabeça está (`contracts`, `workflows`, `circom`).
2. **`scripts/verify-protocol.js`**: Um script de integridade. Se você mudar a regra no ZK (ex: para Score >= 70%) mas esquecer de atualizar o README, este script avisará sobre a inconsistência.

## 5. Fluxo da Demo (Como explicar aos juízes)
Ao apresentar o repositório, siga este flow:
1. **Ingestão:** Os oráculos coletam dados (Simulado no dashboard).
2. **Consenso:** O sistema mostra que múltiplas fontes concordam com o score.
3. **ZK Proof:** O computador gera a prova off-chain (Privacidade).
4. **Verificação on-chain:** O contrato inteligente verifica a prova e emite o NFT na Sepolia.
5. **Bridge:** O usuário clica em "Bridge" e o CCIP envia o certificado para a rede Fuji.

### Por que isso vence em RWA?
O GreenProof transforma conformidade ambiental no metadado definitivo para RWA (Real World Assets):
- **Green Bonds:** Automação de compliance para dívidas sustentáveis.
- **Créditos de Carbono:** Origem verificável e liquidez imediata.
- **Ativos Atrelados a ESG:** Ajuste de rendimento em tempo real baseado em dados privados.

---

## 🛡️ Confiabilidade e QA
- **Resiliente a Falhas:** O demo foi projetado com mocks para garantir fluidez mesmo com instabilidades na rede.
- **Lógica ZK:** Lembre-se—nunca revelamos o score, apenas o "checkmark" verde.

---
*Documentação gerada pela IA Unificada para o Hackathon Chainlink Convergence 2026.*
