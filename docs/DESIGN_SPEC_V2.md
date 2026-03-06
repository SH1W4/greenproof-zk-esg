# 🎨 GreenProof UI/UX Design System (V2)

A interface **Institutional V2** foi projetada para transmitir confiança, precisão técnica e soberania. Abandonamos o look de "Dashboard Genérico" em favor de uma estética **Premium Biocibernética**.

## 🧬 Princípios de Design

### 1. Institutional Dark Mode
- **Base**: `#000000` (Pure Black) para contraste infinito e economia de energia.
- **Accent**: `#17cf54` (Primary Green) - Representa a vitalidade do ESG e a segurança da Chainlink. 
- **Surface**: Backgrounds em `slate-900/40` com bordas sutis `slate-800`.
- **UX Goal**: Reduzir a fadiga visual do gestor que monitora dados 24/7.

### 2. Hierarquia de Informação (The "Eagle Eye")
- **Sidebar**: Focada em utilidade pura. Ícones da `lucide-react` com estados de hover suaves e indicadores de "Active Path" em verde.
- **Header**: Limpo, com busca global de ativos e perfil institucional. Reflete organização e controle.
- **Metric Cards**: Usamos o componente `MetricCard.tsx` com variações de tendência. Verde para crescimento sustentável, cinza para neutralidade.

### 3. Glassmorphism & Micro-interações
- Usamos `backdrop-blur` e gradientes lineares sutis (ex: `from-transparent via-white/10 to-transparent`) para criar profundidade sem poluição visual.
- Notificações pulsantes em verde representam o "batimento cardíaco" do oráculo (ZKWitnessStream).

---

## 🛠️ Detalhes de UX por Módulo

### 📊 Dashboard Overview
- **UX**: Foco em KPIs de alto nível (Score ESG Médio, Créditos de Carbono). 
- **UI**: Gráficos minimalistas que mostram a tendência sem excesso de "chart noise".

### 📋 Asset Performance
- **UX**: Tabela dinâmica com filtros rápidos. O usuário deve encontrar um ativo problemático em menos de 2 cliques.
- **UI**: Badges de status (`CONNECTED`, `IDLE`, `SYNCED`) com cores semânticas.

### 🛡️ Compliance Hub
- **UX**: Visualização circular de "Readiness" (Prontidão). Transforma regulamentações complexas em progresso visual.
- **UI**: Anéis de progresso com espessura fina para manter o visual "high-tech".

### 💎 Mint RWA
- **UX**: O ponto alto da plataforma. O formulário é limpo, mas o **Preview do Token** é cinemático.
- **UI**: O Preview do NFT usa gradientes radiantes e ícones de segurança, induzindo a sensação de valor e solidez do ativo real.

---

## 🎯 Por que isso ganha o Hackathon?
A maioria dos projetos foca apenas na lógica do contrato. Ao entregar uma **Sovereign UI (V2)** que parece um software de $10k/mês da Bloomberg ou BlackRock, demonstramos que o GreenProof não é apenas ciência, é um **produto pronto para o mercado**.
