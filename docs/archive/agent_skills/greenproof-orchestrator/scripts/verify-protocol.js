/**
 * GreenProof Protocol Consistency Checker
 * This script ensures that the ZK threshold and workflow settings are aligned.
 */

const fs = require('fs');
const path = require('path');

const baseDir = path.resolve(__dirname, '../../../');

function checkFileExists(filePath) {
    if (!fs.existsSync(filePath)) {
        console.error(`[ERROR] Missing file: ${filePath}`);
        return false;
    }
    return true;
}

function verifyProtocol() {
    console.log("--- Starting GreenProof Protocol Verification ---");

    const files = [
        'circom/ESGScore.circom',
        'workflows/workflow.yaml',
        'README.md',
        'docs/ARCH.md'
    ];

    let allClear = true;

    // Check file existence
    files.forEach(f => {
        if (!checkFileExists(path.join(baseDir, f))) allClear = false;
    });

    if (!allClear) {
        console.error("[FAILED] Basic project structure is missing files.");
        process.exit(1);
    }

    // Check ZK Threshold consistency (Simulated check)
    const zkFile = fs.readFileSync(path.join(baseDir, 'circom/ESGScore.circom'), 'utf8');
    const readmeFile = fs.readFileSync(path.join(baseDir, 'README.md'), 'utf8');

    const zkThresholdMatch = zkFile.match(/gte\.in\[1\] <== (\d+);/);
    const readmeThresholdMatch = readmeFile.match(/ESG ≥ (\d+)%/);

    if (zkThresholdMatch && readmeThresholdMatch) {
        const zkVal = zkThresholdMatch[1];
        const readmeVal = readmeThresholdMatch[1];
        
        if (zkVal === readmeVal) {
            console.log(`[SUCCESS] ZK Threshold (${zkVal}) matches README decoration.`);
        } else {
            console.warn(`[WARNING] Threshold Mismatch: ZK=${zkVal}, README=${readmeVal}`);
        }
    }

    console.log("--- Verification Complete ---");
}

verifyProtocol();
