---
name: greenproof-vault
description: Strategic intelligence management, encryption protocols, and foundational logic synthesis for the GreenProof private vault.
---

# 🔐 GreenProof Knowledge Vault Skill

## 1. Skill Purpose
This skill manages the **Knowledge Vault** (`_vault/`), a proprietary repository of strategic, technical, and business intelligence for the GreenProof protocol. It ensures that sensitive core logic remains Git-ignored while providing a structured way to enrich it for NotebookLM and private whitepaper generation.

## 2. Core Directives
- **Zero-Visibility:** Never allow files from `_vault/` to be committed to the public repository.
- **Foundational Synthesis:** When new strategic insights are gained from conversations, update the `_vault/` files to maintain a "Living Foundation."
- **NotebookLM Optimization:** Maintain the `NOTEBOOK_LM_BUNDLE.md` as a high-density source of truth for AI analysis.

## 3. Vault Components
- **`PROTOCOL_FOUNDATIONS.md`**: Biocybernetic principles and core identity.
- **`BUSINESS_STRATEGY.md`**: Market moats, monetization, and adoption roadmaps.
- **`TECHNICAL_ARCHITECTURE.md`**: In-depth logic of CRE, ZK, and CCIP integrations.
- **`NOTEBOOK_LM_BUNDLE.md`**: Consolidated AI-ready data.

## 4. Interaction Protocol
1. **Identify**: Detect sensitive or high-value strategic logic that should not be public.
2. **Extract**: Isolate the logic and categorize it (Technical, Business, Ethical).
3. **Vault**: Append or update the relevant file inside `_vault/`.
4. **Sync**: Update the `NOTEBOOK_LM_BUNDLE.md` to reflect the latest state.

---
**Status**: ACTIVE
**Layer**: Private Strategy
