const fs = require("fs");
const path = require("path");
const solc = require("solc");

async function compile() {
    console.log("🛠️  Compiling Smart Contracts...");

    const contractsDir = path.join(__dirname, "../contracts");
    const artifactsDir = path.join(__dirname, "../artifacts");

    if (!fs.existsSync(artifactsDir)) {
        fs.mkdirSync(artifactsDir);
    }

    const input = {
        language: "Solidity",
        sources: {
            "GreenProofNFT.sol": {
                content: fs.readFileSync(path.join(contractsDir, "GreenProofNFT.sol"), "utf8")
            },
            "CCIPBridge.sol": {
                content: fs.readFileSync(path.join(contractsDir, "CCIPBridge.sol"), "utf8")
            }
        },
        settings: {
            outputSelection: {
                "*": {
                    "*": ["abi", "evm.bytecode"]
                }
            },
            optimizer: {
                enabled: true,
                runs: 200
            }
        }
    };

    function findImports(importPath) {
        try {
            const nodeModulesPath = path.join(__dirname, "../node_modules", importPath);
            if (fs.existsSync(nodeModulesPath)) {
                return { contents: fs.readFileSync(nodeModulesPath, "utf8") };
            }
        } catch (e) {
            return { error: "File not found" };
        }
        return { error: "File not found" };
    }

    const output = JSON.parse(solc.compile(JSON.stringify(input), { import: findImports }));

    if (output.errors) {
        let hasError = false;
        output.errors.forEach((err) => {
            console.error(err.formattedMessage);
            if (err.severity === 'error') hasError = true;
        });
        if (hasError) process.exit(1);
    }

    for (const contractFile in output.contracts) {
        for (const contractName in output.contracts[contractFile]) {
            const artifact = output.contracts[contractFile][contractName];
            fs.writeFileSync(
                path.join(artifactsDir, `${contractName}.json`),
                JSON.stringify(artifact, null, 2)
            );
            console.log(`✅ Compiled: ${contractName}`);
        }
    }
}

compile().catch(console.error);
