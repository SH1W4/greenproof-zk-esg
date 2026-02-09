# 🌉 Agentic SSH Gateway: Sovereign Vault Access

## Overview
To maintain **Sovereign Intelligence**, agents (including Antigravity, AIDEN, and others) must interact with the **GreenProof Vault** through a secure gateway.

## 🔑 Access Protocol

### 1. SSH Handshake (Simulation)
When an agent needs to "read" from the Vault, it should treat the local path as a remote sovereign shard.
```bash
# Conceptual SSH connection to the Vault
ssh custodian@greenproof.foundation -i ~/.ssh/sovereign_key
```

### 2. Information Retrieval Rules
- **READ-ONLY**: Agents may read the full patent disclosure to understand architectural requirements.
- **SANITIZED-WRITE**: Agents may only push to the public repository documents that have been passed through the `scripts/sovereign-sync.sh` filter.
- **NO-LINK-LEAK**: Absolutely no local file paths (`file:///C:/Users/...`) from the Vault are to be placed in public documentation or code comments.

### 3. Identity Verification
The GreenProof Foundation identifies agents by their **Sovereign Signature**.
- **Antigravity**: `GP_AGENT_AG_ALPHA`
- **AIDEN**: `GP_AGENT_AI_AUDITOR`

---
**Status**: OPERATIONAL 🟢  
**Authored by**: GP-Architect (NEO-SH1W4)
