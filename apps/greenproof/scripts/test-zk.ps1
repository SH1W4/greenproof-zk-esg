# 🧪 GREENPROOF ZK TEST SCRIPT (PowerShell)
# This script verify the mathematical integrity of the ESGScore circuit.

$testCase = @(
    @{ score = 85; expected = 1; label = "Pass (Institutional Grade)" },
    @{ score = 80; expected = 1; label = "Pass (Threshold Boundary)" },
    @{ score = 79; expected = 0; label = "Fail (Non-Compliant)" },
    @{ score = 40; expected = 0; label = "Fail (Greenwashing Detected)" }
)

Write-Host "🛡️ Initiating ZK-Circuit Integrity Audit..." -ForegroundColor Cyan

# Ensure snarkjs is available (check global or npx)
$snarkjsCmd = "snarkjs"
if (!(Get-Command snarkjs -ErrorAction SilentlyContinue)) {
    Write-Host "⚠️ Global snarkjs not found. Using npx snarkjs..." -ForegroundColor Yellow
    $snarkjsCmd = "npx snarkjs"
}

$circomPath = "circom/ESGScore.circom"
$wasmPath = "circom/ESGScore_js/ESGScore.wasm"

Write-Host "⚙️ Compiling Circuit..."
# Note: This assumes circom is in Path. If not, we skip compilation and used pre-compiled if available.
if (Get-Command circom -ErrorAction SilentlyContinue) {
    circom $circomPath --wasm --r1cs -o circom/
}
else {
    Write-Host "⚠️ 'circom' compiler not found. Skipping compilation, attempting to run tests on existing wasm..." -ForegroundColor Yellow
}

foreach ($test in $testCase) {
    $score = $test.score
    $expected = $test.expected
    $label = $test.label

    # Create input.json
    "{ `"score`": $score }" | Out-File -FilePath "circom/input.json" -Encoding ascii

    Write-Host "🔍 Testing: $label (Score: $score)" -NoNewline

    # Generate witness
    try {
        node circom/ESGScore_js/generate_witness.js $wasmPath circom/input.json circom/witness.wtns
        
        # Read witness (using snarkjs to export to json to verify result)
        Invoke-Expression "$snarkjsCmd wtns export json circom/witness.wtns circom/witness.json"
        $witness = Get-Content circom/witness.json | ConvertFrom-Json
        
        # The output 'isCompliant' is typically at index 1 in this simple circuit
        $result = $witness[1]

        if ($result -eq $expected) {
            Write-Host " ✅ SUCCESS" -ForegroundColor Green
        }
        else {
            Write-Host " ❌ FAILED (Got $result, expected $expected)" -ForegroundColor Red
        }
    }
    catch {
        Write-Host " ❌ ERROR during execution" -ForegroundColor Red
    }
}

Write-Host "🏁 ZK Audit Complete." -ForegroundColor Cyan
