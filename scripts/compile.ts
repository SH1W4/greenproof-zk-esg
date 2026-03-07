
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const solc = require("solc");

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootDir = path.resolve(__dirname, "..");
const contractsDir = path.resolve(rootDir, "contracts");
const artifactsDir = path.resolve(rootDir, "artifacts");

if (!fs.existsSync(artifactsDir)) {
  fs.mkdirSync(artifactsDir);
}

function findImports(importPath: string) {
  if (importPath.startsWith("@openzeppelin/")) {
    const nodeModulesPath = path.resolve(rootDir, "node_modules", importPath);
    return { contents: fs.readFileSync(nodeModulesPath, "utf8") };
  }
  if (importPath.startsWith("@chainlink/")) {
    const nodeModulesPath = path.resolve(rootDir, "node_modules", importPath);
    return { contents: fs.readFileSync(nodeModulesPath, "utf8") };
  }
  const localPath = path.resolve(contractsDir, importPath);
  if (fs.existsSync(localPath)) {
    return { contents: fs.readFileSync(localPath, "utf8") };
  }
  return { error: "File not found" };
}

async function compile() {
  const contractFiles = fs.readdirSync(contractsDir).filter(f => f.endsWith(".sol"));
  console.log(`🔍 Found ${contractFiles.length} contracts to compile.`);

  const sources: any = {};
  for (const file of contractFiles) {
    sources[file] = { content: fs.readFileSync(path.resolve(contractsDir, file), "utf8") };
  }

  const input = {
    language: "Solidity",
    sources: sources,
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
      outputSelection: {
        "*": {
          "*": ["abi", "evm.bytecode"],
        },
      },
    },
  };

  console.log("⏳ Compiling...");
  const output = JSON.parse(solc.compile(JSON.stringify(input), { import: findImports }));

  if (output.errors) {
    let hasError = false;
    output.errors.forEach((err: any) => {
      console.log(err.formattedMessage);
      if (err.severity === "error") hasError = true;
    });
    if (hasError) process.exit(1);
  }

  for (const contractFile in output.contracts) {
    for (const contractName in output.contracts[contractFile]) {
      const artifact = output.contracts[contractFile][contractName];
      const filePath = path.resolve(artifactsDir, `${contractName}.json`);
      fs.writeFileSync(filePath, JSON.stringify(artifact, null, 2));
      console.log(`✅ Saved artifact: artifacts/${contractName}.json`);
    }
  }
  console.log("🎉 Compilation complete.");
}

compile().catch(console.error);
