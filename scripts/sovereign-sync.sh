#!/bin/bash
# 🌿 Sovereign Sync: GreenProof Foundation Intelligence Gateway
# This script manages the synchronization between public dev and private vault.

VAULT_PATH="c:/Users/João/Desktop/PROJETOS/01_CORE_SYSTEMS/greenproof-vault"
PROJECT_PATH="c:/Users/João/Desktop/Hackertons/greenproof-zk-esg"

echo "--- 🛡️ Initializing Sovereign Sync ---"

# Step 1: Archival (Public to Private)
echo "[ARCHIVE] Synchronizing public artifacts to Vault core_backup..."
cp -r "$PROJECT_PATH/docs" "$VAULT_PATH/core_backup/"
cp -r "$PROJECT_PATH/skills" "$VAULT_PATH/core_backup/"
cp "$PROJECT_PATH/README.md" "$VAULT_PATH/core_backup/README_PUBLIC.md"

# Step 2: Sanitization (Private to Public)
# This is a manual-trigger step in this version to prevent accidental leaks.
if [[ "$1" == "--verify" ]]; then
    echo "[VERIFY] Running Selective Disclosure Audit..."
    # Check for sensitive strings in public docs
    grep -r "file:///" "$PROJECT_PATH/docs" | grep -v "assets"
    echo "✓ Audit Complete."
fi

if [[ "$1" == "--sync" ]]; then
    echo "[SYNC] Pushing sanitized updates from Vault to Project..."
    # Copy only permitted technical docs
    cp "$VAULT_PATH/PROTOCOL_FOUNDATIONS.md" "$PROJECT_PATH/docs/MATHEMATICAL_FOUNDATION.md"
    cp "$VAULT_PATH/ROADMAP_EXPANSAO.md" "$PROJECT_PATH/docs/ROADMAP.md"
    echo "✓ Sync Complete."
fi

echo "--- 🏁 Sovereign Sync Finished ---"
