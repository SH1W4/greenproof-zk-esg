# Evaluator Readiness Audit (Chainlink Hackathon)

Date: 2026-02-22  
Repository: `greenproof-zk-esg`

## Executive summary
- **Overall status**: **Partially ready** for evaluator review.
- **Strong points**: polished landing flow, clear architecture pages, on-chain tx link, coherent value proposition.
- **Main blockers**: local reproducibility is fragile in this environment due dependency/runtime constraints.

## Audit checklist

### 1) Evaluator navigation & demo flow
- ✅ Landing has dedicated paths for Architecture, Verify and Roadmap.
- ✅ Verification screen exposes external explorer link for proof traceability.
- ✅ README includes live demo URL and on-chain transaction reference.

### 2) Documentation integrity
- ✅ Core referenced docs exist (`EAP_CYCLE`, `HAAS_ARCHITECTURE`, `USE_CASES`, `MATHEMATICAL_FOUNDATION`).
- ✅ Added missing `docs/JURIDICAL_SEAL.md` to remove dead badge target.
- ⚠️ Video pitch in README is still "Coming soon" (acceptable but weaker for judges).

### 3) Build/run reproducibility (local)
- ❌ `npm run build` initially failed because `next` binary was unavailable before dependency install.
- ⚠️ `npm install` showed environment friction:
  - Node engine mismatch warning for `@chainlink/contracts` (`>=22` requested, environment running Node 20).
  - git dependency via SSH (`matter-labs/era-contracts`) can be problematic in restricted evaluator machines.
- ⚠️ `npm run lint` triggers Next.js interactive ESLint setup prompt (not CI-friendly).

### 4) UX polish and judge confidence
- ✅ Hero now has branded background artwork and visual identity coherence.
- ✅ No obvious placeholder/dead links found in app routes scanned.

## Priority actions (recommended before final submission)

### P0 — Must fix
1. **Pin evaluator-friendly runtime**: provide `.nvmrc` / engines note and ensure install path works on Node 20 or explicitly require Node 22.
2. **Make lint non-interactive**: commit ESLint config so `npm run lint` runs headlessly.
3. **Avoid SSH-only dependency path for judges**: replace git+ssh dependency or document fallback install path.

### P1 — Should fix
1. Add final **video pitch link** in README.
2. Add a **single command smoke test** script for judges (`npm run judge:smoke`).
3. Add a short **"2-minute judge script"** in README with exact clicks and expected result.

## Commands used in this audit
- `git status -sb && git log --oneline -n 5`
- `sed -n '1,40p' README.md`
- `rg -n "hero_top_bg|Explore Architecture|Documentation|Live Demo|View on Explorer|youtube|placeholder|href=\"#\"" src/app README.md`
- `for f in docs/EAP_CYCLE.md docs/HAAS_ARCHITECTURE.md docs/USE_CASES.md docs/MATHEMATICAL_FOUNDATION.md docs/JURIDICAL_SEAL.md scripts/sovereign-sync.sh; do [ -f "$f" ] && echo "OK $f" || echo "MISSING $f"; done`
- `npm run build`
- `npm install`
- `npm run lint`

