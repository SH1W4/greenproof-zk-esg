const fs = require('fs');
const path = require('path');

/**
 * @file token-audit.js
 * @description Auditoria automática de design tokens.
 * Detecta valores hexadecimais ou rgba fixos em arquivos CSS/TSX.
 */

const TARGET_DIRS = ['src/app', 'src/components'];
const IGNORE_FILES = ['tokens.css'];
const HEX_REGEX = /#([a-fA-F0-9]{3,8})\b/g;
const RGBA_REGEX = /rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)/g;

let violations = 0;

function auditFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const basename = path.basename(filePath);

  if (IGNORE_FILES.includes(basename)) return;

  let match;
  while ((match = HEX_REGEX.exec(content)) !== null) {
    // Permitir #020c06 apenas em tokens.css (que é ignorado) ou se for um fallback explicitado
    console.error(`[AUDIT ERROR] Hardcoded Hex detected in ${filePath}: ${match[0]}`);
    violations++;
  }

  while ((match = RGBA_REGEX.exec(content)) !== null) {
    console.error(`[AUDIT ERROR] Hardcoded RGBA detected in ${filePath}: ${match[0]}`);
    violations++;
  }
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath);
    } else if (file.endsWith('.css') || file.endsWith('.tsx')) {
      auditFile(fullPath);
    }
  });
}

console.log('--- STARTING DESIGN TOKEN AUDIT ---');
TARGET_DIRS.forEach(dir => {
  const absolutePath = path.resolve(__dirname, '..', dir);
  if (fs.existsSync(absolutePath)) {
    walkDir(absolutePath);
  }
});

if (violations > 0) {
  console.log(`\nAudit failed with ${violations} violations.`);
  process.exit(1);
} else {
  console.log('\nAudit passed. No hardcoded colors found.');
}
