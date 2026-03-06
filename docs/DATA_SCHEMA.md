# 📊 GreenProof Data Architecture

O protocolo GreenProof opera sob a premissa da **Verdade Soberana**. Em vez de um banco de dados centralizado suscetível a manipulação, utilizamos uma arquitetura híbrida onde os dados são validados *on-the-fly* e o resultado é selado via ZK-SNARKs.

## 💾 Onde estão os dados?

1.  **Truth Layer (Off-chain)**: Dados brutos de sensores IoT, ERPs e Auditorias.
2.  **Consensus Layer (Oracle)**: O agente **GP-ARCHITECT** e os nós **Chainlink CRE** buscam esses dados e calculam o score ESG.
3.  **Proof Layer (ZK)**: Gera-se uma prova criptográfica de que os dados atendem aos critérios sem revelar os dados sensíveis.
4.  **Registry Layer (On-chain)**: O NFT GreenProof no Sepolia/Avalanche serve como o banco de dados imutável dos certificados emitidos.

---

## 🏗️ Data Schema (Tipos de Dados Validáveis)

O protocolo valida três núcleos fundamentais (A Trindade):

### 1. Dados Físicos (Physical Truth)
*Exemplo: Telemetria de Hardware e IoT*
-   `carbon_emission_ppm`: Nível de CO2 coletado via sensores em tempo real.
-   `energy_efficiency_kwh`: Consumo de energia verificado via smart meters.
-   `reforestation_spectral_index`: Dados de imagem de satélite (NDVI) para projetos de crédito de carbono.

### 2. Dados Jurídicos (Juridical Truth)
*Exemplo: Documentação e ERP*
-   `audit_report_hash`: Hash SHA-256 de relatórios de auditoria assinados digitalmente.
-   `supply_chain_compliance_id`: Identificador único de conformidade em sistemas ERP (SAP/S4HANA).
-   `license_validity_timestamp`: Data de expiração de licenças ambientais verificada via API governamental.

### 3. Dados Éticos (Ethical Truth)
*Exemplo: Governança e DeGov*
-   `community_vote_threshold`: Percentual de aprovação em propostas de governança comunitária.
-   `stakeholder_alignment_index`: Métrica de alinhamento com os protocolos NEXUS Soberanos.

---

## 🛡️ Privacidade (The ZK Approach)

Não armazenamos os valores acima no banco de dados do Vercel ou On-chain. 
-   **Entrada**: [85 ppm CO2, Auditoria Approved, Voto 70%]
-   **Processamento**: Oráculo calcula Score = 92/100.
-   **Saída ZK**: `Proof: Valid | Result: PASS (bit 1)`

Desta forma, o GreenProof protege a propriedade industrial das empresas enquanto garante a integridade para os investidores.
