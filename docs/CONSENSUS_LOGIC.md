# ⚙️ GreenProof: Lógica de Consenso Trinitário (2/3)

A integridade do protocolo GreenProof repousa sobre a **Trindade da Prova**, um mecanismo de consenso multi-oráculo que utiliza uma lógica de supermaioria (2/3) para validar ativos de mundo real (RWA) e conformidade ESG.

## 🏛️ A Trindade de Oráculos

O sistema orquestra três pilares independentes de dados via **Chainlink CRE (Custom Runtime Environment)**:

1.  **Oráculo Físico (IoT/Satélite)**: Ingestão de dados de sensores, telemetria e imagens de satélite para provar a existência e o impacto material (ex: regeneração florestal, redução de CO2).
2.  **Oráculo Jurídico ([Th3m1s Engine](file:///c:/Users/João/Desktop/PROJETOS/01_CORE_SYSTEMS/th3m1s-core))**: Auditoria automatizada de contratos, certidões e conformidade legal, garantindo que o ativo possui lastro jurídico e não possui pendências judiciais.
3.  **Oráculo Ético ([S.E.V.E. Framework](file:///c:/Users/João/Desktop/PROJETOS/00_ECOSYSTEM_COMERCIAL/SEVE-FRAMEWORK))**: Avaliação de indicadores sociais, governança corporativa e conformidade com pactos internacionais (ex: direitos humanos, diversidade).

## ⚖️ Lógica de Consenso 2/3 (Quorum Mínimo)

Diferente de sistemas binários, o GreenProof exige que pelo menos **dois dos três** oráculos validem a veracidade das informações para que o certificado NFT seja emitido ou atualizado.

### Por que 2/3?
- **Resiliência a Falhas (Fault Tolerance)**: Se um sensor físico falhar ou um oráculo jurídico estiver offline por manutenção, o protocolo ainda pode operar e emitir provas baseadas nos outros dois pilares.
- **Prevenção de Colusão**: Exigir uma supermaioria mitiga o risco de um único ponto de corrupção de dados (ex: suborno de um auditor ou manipulação de um sensor).
- **Consenso de Realidade**: A realidade ESG é complexa. Se a lei valida (Jurídico) e a ética valida (Ético), mas o sensor físico falha, o protocolo pode ainda estar correto em um contexto de auditoria documental.

## 🕵️ Camada ZK-SNARK (Privacy-Preservance)

Uma vez que o consenso 2/3 é alcançado, os dados brutos (origem da prova) são processados off-chain para gerar um **Zero-Knowledge Proof (Groth16)**.

- **Threshold Validation**: O circuito ZK apenas prova que `ConsensusCount >= 2` e `ESG_Score >= Threshold (ex: 80)`.
- **Privacidade Industrial**: O resultado on-chain é apenas um "VALID" ou "INVALID", protegendo os dados proprietários da empresa (ex: faturamento, localização exata de sensores sensíveis) de competidores.

## ⛓️ Execução On-Chain

O resultado do consenso e a prova ZK são submetidos ao contrato `GreenProofNFT.sol` na rede Sepolia por meio do Chainlink Functions/Functions, resultando na atualização do estado do ativo e, se necessário, no bridging via CCIP para outras redes.

---
> **Status**: Protocolo Documentado & Validado.
