/**
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║       GREENPROOF — CINEMATIC DEMO RECORDER v2.0                 ║
 * ║       Hackathon Submission: Chainlink Convergence 2026          ║
 * ╚══════════════════════════════════════════════════════════════════╝
 *
 * PRE-REQUIREMENTS:
 *   1. OBS open → Tools → WebSocket Server → Enable (port 4455)
 *   2. Python + edge-tts: pip install edge-tts
 *   3. ffmpeg installed: choco install ffmpeg
 *   4. npm install (in this directory)
 *   5. npx playwright install chromium
 *
 * RUN:
 *   node cinematic-demo.js
 */

import OBSWebSocket from "obs-websocket-js";
import { chromium } from "playwright";
import { exec, execSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// ─── CONFIG ─────────────────────────────────────────────────────────────────
const CONFIG = {
  BASE_URL: "https://greenproof.vercel.app",
  ETHERSCAN_TX:
    "https://sepolia.etherscan.io/tx/0xe0d518536a83afe148ad1846502b2c9dcaaa3982587b8da480666ed00ef32e4c",
  OBS_WS: "ws://127.0.0.1:4455",
  // ⚠️  IMPORTANT: If OBS has "Habilitar autenticação" enabled,
  //     add your password below. To find it: OBS → Tools → WebSocket →
  //     "Mostrar informações da conexão" → copy the password shown.
  //     OR: disable authentication in OBS WebSocket settings.
  OBS_PASSWORD: "", // authentication disabled — no password needed
  NARRATION_FILE: path.join(__dirname, "narration.txt"),
  AUDIO_FILE: path.join(__dirname, "narration.mp3"),
  TTS_VOICE: "en-US-GuyNeural",
  VIEWPORT: { width: 1920, height: 1080 },
};

// ─── STEP LOGGER ────────────────────────────────────────────────────────────
let step = 0;
function log(msg) {
  step++;
  const time = new Date().toLocaleTimeString("pt-BR");
  console.log(`\n[${time}] ▶ STEP ${step}: ${msg}`);
}

// ─── GENERATE NARRATION (requires Python + edge-tts) ────────────────────────
async function generateNarration() {
  log("Generating TTS narration via edge-tts");

  if (fs.existsSync(CONFIG.AUDIO_FILE)) {
    console.log("   ✓ narration.mp3 already exists — skipping generation");
    return;
  }

  const narration = fs.readFileSync(CONFIG.NARRATION_FILE, "utf-8");
  // Write to temp file to avoid shell escaping issues
  const tempText = path.join(__dirname, "_tmp_narration.txt");
  fs.writeFileSync(tempText, narration);

  return new Promise((resolve, reject) => {
    // Point to the local virtual environment's edge-tts
    const edgeTtsPath = path.join(__dirname, "tts-env", "Scripts", "edge-tts.exe");
    const cmd = `"${edgeTtsPath}" --voice "${CONFIG.TTS_VOICE}" --file "${tempText}" --write-media "${CONFIG.AUDIO_FILE}"`;
    exec(cmd, (err, stdout, stderr) => {
      if (err) {
        console.error("   ✗ edge-tts failed. Trying Python module fallback...");
        // Fallback: python -m edge_tts
        const fallback = `python -m edge_tts --voice "${CONFIG.TTS_VOICE}" --file "${tempText}" --write-media "${CONFIG.AUDIO_FILE}"`;
        exec(fallback, (err2) => {
          if (err2) {
            console.warn("   ⚠ TTS generation failed. Continuing without audio.");
            resolve();
          } else {
            console.log("   ✓ narration.mp3 generated via Python module");
            resolve();
          }
        });
      } else {
        console.log("   ✓ narration.mp3 generated");
        resolve();
      }
    });
  });
}

// ─── PLAY NARRATION (non-blocking) ──────────────────────────────────────────
function playNarration() {
  if (!fs.existsSync(CONFIG.AUDIO_FILE)) {
    console.log("   ⚠ No audio file — narration skipped");
    return;
  }
  log("Playing narration audio");
  // Windows: use ffplay or Windows Media Player
  const cmd = process.platform === "win32"
    ? `ffplay -nodisp -autoexit -volume 80 "${CONFIG.AUDIO_FILE}"`
    : `ffplay -nodisp -autoexit "${CONFIG.AUDIO_FILE}"`;
  exec(cmd, (err) => {
    if (err) {
      // Fallback to Windows built-in
      try {
        exec(`powershell -Command "(New-Object Media.SoundPlayer '${CONFIG.AUDIO_FILE}').PlaySync()"`)
      } catch {}
    }
  });
}

// ─── VISUAL EFFECTS ─────────────────────────────────────────────────────────

/**
 * Adds a glowing green highlight to any element on the page
 */
async function highlight(page, selector, color = "rgba(0, 255, 120, 0.8)") {
  try {
    await page.evaluate(
      ({ sel, col }) => {
        const el = document.querySelector(sel);
        if (!el) return;
        el.style.transition = "all 0.4s ease";
        el.style.boxShadow = `0 0 0 4px ${col}, 0 0 30px ${col}`;
        el.style.borderRadius = el.style.borderRadius || "8px";
        setTimeout(() => {
          if (el) el.style.boxShadow = "";
        }, 3000);
      },
      { sel: selector, col: color }
    );
  } catch (_) {}
}

/**
 * Zoom into element briefly then reset
 */
async function zoomIn(page, selector) {
  try {
    await page.locator(selector).first().scrollIntoViewIfNeeded({ timeout: 3000 });
    await page.evaluate((sel) => {
      const el = document.querySelector(sel);
      if (!el) return;
      el.style.transition = "transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)";
      el.style.transform = "scale(1.06)";
      setTimeout(() => {
        if (el) el.style.transform = "";
      }, 2000);
    }, selector);
  } catch (_) {}
}

/**
 * Injects a live status bar at the top of the browser to show progress
 * and a heartbeat to prove it's not a static image.
 */
async function injectStatusBar(page) {
  await page.evaluate(() => {
    if (document.getElementById("demo-status")) return;
    const el = document.createElement("div");
    el.id = "demo-status";
    el.style.cssText = `
      position: fixed; top: 0; left: 0; right: 0; height: 32px;
      background: rgba(0,0,0,0.8); border-bottom: 1px solid #22c55e;
      z-index: 1000000; display: flex; align-items: center; padding: 0 15px;
      color: #22c55e; font-family: monospace; font-size: 12px; gap: 10px;
      pointer-events: none; backdrop-filter: blur(4px);
    `;
    el.innerHTML = `
      <div id="heartbeat" style="width: 8px; height: 8px; border-radius: 50%; background: #22c55e; animation: pulse 1s infinite"></div>
      <div>GREENPROOF · LIVE SYSTEM RECORDING</div>
      <div style="flex: 1"></div>
      <div id="step-name">INITIALIZING...</div>
      <style>
        @keyframes pulse { 0% { opacity: 0.3; transform: scale(0.8); } 50% { opacity: 1; transform: scale(1.2); } 100% { opacity: 0.3; transform: scale(0.8); } }
      </style>
    `;
    document.body.appendChild(el);
    document.title = "🔴 RECORDING: GREENPROOF (DO NOT CLOSE)";
  });
}

async function updateStatus(page, text) {
  try {
    await page.evaluate((t) => {
      const el = document.getElementById("step-name");
      if (el) el.innerText = t.toUpperCase();
    }, text);
  } catch (_) {}
}

/**
 * Smooth scroll by pixel amount
 */
async function smoothScroll(page, pixels, steps = 8) {
  const chunk = Math.floor(pixels / steps);
  for (let i = 0; i < steps; i++) {
    await page.mouse.wheel(0, chunk);
    await sleep(120);
  }
}

/**
 * Add a cinematic overlay label to the current scene
 */
async function addSceneLabel(page, label) {
  try {
    await page.evaluate((text) => {
      const existing = document.getElementById("_gp_scene_label");
      if (existing) existing.remove();
      const el = document.createElement("div");
      el.id = "_gp_scene_label";
      el.style.cssText = `
        position: fixed; bottom: 48px; left: 48px; z-index: 999999;
        background: rgba(0,0,0,0.85);
        color: #22c55e;
        font-family: 'JetBrains Mono', 'Courier New', monospace;
        font-size: 12px;
        font-weight: 700;
        letter-spacing: 0.25em;
        padding: 10px 18px;
        border: 1px solid rgba(34, 197, 94, 0.3);
        border-radius: 6px;
        text-transform: uppercase;
        backdrop-filter: blur(12px);
        opacity: 0;
        transform: translateY(10px);
        transition: all 0.4s ease;
      `;
      el.textContent = text;
      document.body.appendChild(el);
      setTimeout(() => {
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      }, 50);
      setTimeout(() => {
        el.style.opacity = "0";
      }, 3500);
    }, label);
  } catch (_) {}
}

/**
 * Visual countdown on screen
 */
async function runCountdown(page, seconds) {
  try {
    await page.evaluate(async (total) => {
      const el = document.createElement("div");
      el.style.cssText = `
        position: fixed; inset: 0; z-index: 9999999;
        background: rgba(0,0,0,0.7); display: flex; flex-direction: column;
        align-items: center; justify-content: center; color: white;
        font-family: sans-serif; backdrop-filter: blur(5px);
      `;
      document.body.appendChild(el);
      
      for(let i = total; i > 0; i--) {
        el.innerHTML = `
          <div style="font-size: 120px; font-weight: 800; color: #22c55e">${i}</div>
          <div style="font-size: 24px; margin-top: 20px; text-transform: uppercase; letter-spacing: 2px">
            Preparing Cinematic Recording...
          </div>
          <div style="font-size: 16px; margin-top: 10px; opacity: 0.7">
            Make sure this window is VISIBLE in OBS
          </div>
        `;
        await new Promise(r => setTimeout(r, 1000));
      }
      el.remove();
    }, seconds);
  } catch (err) {
    console.warn("   ⚠ Countdown interrupted or window closed.");
  }
}

// ─── MAIN DEMO FLOW ──────────────────────────────────────────────────────────
async function runDemo(obs) {
  log("Launching Chromium browser (1920×1080)");
  const browser = await chromium.launch({
    headless: false,
    slowMo: 400,
    args: [
      "--start-maximized",
      "--disable-blink-features=AutomationControlled",
      "--disable-gpu",
      "--disable-software-rasterizer",
      "--no-sandbox",
      "--disable-dev-shm-usage",
    ],
  });

  const context = await browser.newContext({
    viewport: CONFIG.VIEWPORT,
  });
  const page = await context.newPage();
  await page.bringToFront();

  // ── SCENE 1: LANDING PAGE ────────────────────────────────────────────────
  log("SCENE 1 — Landing Page");
  await page.goto(CONFIG.BASE_URL, { waitUntil: "networkidle", timeout: 30000 });
  await page.bringToFront();
  await injectStatusBar(page);
  await updateStatus(page, "SCENE 1: LANDING PAGE");
  
  // Visual Countdown
  await runCountdown(page, 10);
  
  await addSceneLabel(page, "→ GREENPROOF · Proof-of-Reality Protocol");
  await sleep(3000);

  // Scroll through hero
  await smoothScroll(page, 600);
  await sleep(2000);

  // Highlight and Click Login
  log("Performing Login Flow");
  await updateStatus(page, "FLOW: NAVIGATING TO LOGIN");
  await addSceneLabel(page, "→ ACCESSING PROTOCOL · Sovereign Gateway");
  await highlight(page, "a[href='/login'], .btn-primary");
  await sleep(2000);
  
  const loginBtn = page.locator("a[href='/login'], button:has-text('Launch'), button:has-text('Protocol')").first();
  await loginBtn.click();
  await page.waitForTimeout(3000);

  // ── SCENE 2: DASHBOARD ───────────────────────────────────────────────────
  log("SCENE 2 — Dashboard & Consensus Monitor");
  await injectStatusBar(page);
  await updateStatus(page, "SCENE 2: DASHBOARD MONITOR");
  await addSceneLabel(page, "→ CONSENSUS MONITOR · Live Trinity Architecture");
  await sleep(4000);

  await smoothScroll(page, 500);
  await sleep(2000);

  // Try to highlight and click demo button inside dashboard
  try {
    const demoBtn = page.getByRole("button", { name: /sovereign demo|demo|execute/i }).first();
    if (await demoBtn.isVisible({ timeout: 5000 })) {
      await demoBtn.scrollIntoViewIfNeeded();
      await highlight(page, "button");
      await sleep(1500);
      await demoBtn.click();
      await addSceneLabel(page, "→ EXECUTING · GP-Architect Validator Swarm");
      await sleep(8000);
    }
  } catch (_) {
    console.log("   ⚠ Demo button not found or already running — continuing");
  }

  // ── SCENE 3: ARCHITECTURE PAGE ──────────────────────────────────────────
  log("SCENE 3 — Protocol Architecture");
  await page.goto(`${CONFIG.BASE_URL}/architecture`, { waitUntil: "networkidle", timeout: 30000 });
  await injectStatusBar(page);
  await updateStatus(page, "SCENE 3: HAAS ARCHITECTURE");
  await addSceneLabel(page, "→ HAAS ARCHITECTURE · Hierarchical Agent Swarm");
  await sleep(4000);

  await smoothScroll(page, 700);
  await sleep(2000);

  // Highlight ZK section
  await highlight(page, "section, [class*='Card']", "rgba(139, 92, 246, 0.8)");
  await addSceneLabel(page, "→ ZK-SNARK · Groth16 Circuit · On-Chain Privacy");
  await sleep(4000);

  // ── SCENE 4: VERIFICATION PAGE ───────────────────────────────────────────
  log("SCENE 4 — Verification Terminal");
  await page.goto(`${CONFIG.BASE_URL}/verify`, { waitUntil: "networkidle", timeout: 30000 });
  await injectStatusBar(page);
  await updateStatus(page, "SCENE 4: VERIFICATION TERMINAL");
  await addSceneLabel(page, "→ COMPLIANCE TERMINAL · Mathematical Proofs");
  await sleep(4000);

  await smoothScroll(page, 600);
  await sleep(3000);

  // ── SCENE 5: ROADMAP ─────────────────────────────────────────────────────
  log("SCENE 5 — Roadmap & Vision");
  await page.goto(`${CONFIG.BASE_URL}/roadmap`, { waitUntil: "networkidle", timeout: 30000 });
  await injectStatusBar(page);
  await updateStatus(page, "SCENE 5: SYSTEM ROADMAP");
  await addSceneLabel(page, "→ ROADMAP · Phase 3 — Global RWA Scale");
  await sleep(4000);
  await smoothScroll(page, 600);
  await sleep(2000);

  // ── SCENE 6: ETHERSCAN ON-CHAIN PROOF ────────────────────────────────────
  log("SCENE 6 — On-Chain Transaction Proof (Etherscan)");
  await page.goto(CONFIG.ETHERSCAN_TX, { waitUntil: "domcontentloaded", timeout: 30000 });
  await injectStatusBar(page);
  await updateStatus(page, "SCENE 6: ON-CHAIN PROOF (ETHERSCAN)");
  await addSceneLabel(page, "→ ON-CHAIN TRUTH · Ethereum Sepolia · Verified NFT");
  await sleep(4000);
  await smoothScroll(page, 500);
  await sleep(4000);

  // Final scene label
  await page.evaluate(() => {
    const el = document.createElement("div");
    el.style.cssText = `
      position: fixed; inset: 0; z-index: 999999;
      display: flex; flex-direction: column;
      align-items: center; justify-content: center;
      background: rgba(2, 12, 6, 0.92);
      backdrop-filter: blur(24px);
      font-family: 'JetBrains Mono', monospace;
      opacity: 0;
      transition: opacity 1s ease;
      pointer-events: none;
    `;
    el.innerHTML = `
      <div style="color:#22c55e;font-size:14px;letter-spacing:0.4em;text-transform:uppercase;margin-bottom:24px;opacity:0.6">
        Chainlink Convergence 2026
      </div>
      <div style="color:#f0fdf4;font-size:36px;font-weight:900;letter-spacing:-0.04em;line-height:1">
        GREENPROOF
      </div>
      <div style="color:#22c55e;font-size:13px;margin-top:12px;opacity:0.7;letter-spacing:0.2em">
        Greenwashing is now cryptographically impossible.
      </div>
    `;
    document.body.appendChild(el);
    setTimeout(() => (el.style.opacity = "1"), 100);
  });

  await sleep(5000);

  await browser.close();
}

// ─── MAIN ────────────────────────────────────────────────────────────────────
async function main() {
  console.log(`
╔══════════════════════════════════════════════════════════════╗
║     GREENPROOF · CINEMATIC DEMO RECORDER                    ║
║     Chainlink Convergence 2026 — Hackathon Submission       ║
╠══════════════════════════════════════════════════════════════╣
║  URL: ${CONFIG.BASE_URL.padEnd(46)}  ║
║  OBS: ${CONFIG.OBS_WS.padEnd(46)}  ║
╚══════════════════════════════════════════════════════════════╝
  `);

  // Generate narration
  await generateNarration();

  // Connect to OBS
  const obs = new OBSWebSocket();
  let obsConnected = false;

  try {
    log("Connecting to OBS WebSocket");
    await obs.connect(CONFIG.OBS_WS, CONFIG.OBS_PASSWORD || undefined);
    obsConnected = true;
    console.log("   ✓ OBS connected");
  } catch (err) {
    console.warn(`   ⚠ OBS not connected: ${err.message}`);
    console.warn("   ⚠ Continuing WITHOUT OBS recording — browser demo will still run\n");
  }

  try {
    if (obsConnected) {
      log("Starting OBS recording");
      await obs.call("StartRecord");
      console.log("\n   🚨 ACTION REQUIRED:");
      console.log("   👉 The script opened a NEW Chrome window.");
      console.log("   👉 Ensure OBS 'Display Capture' (Captura de Tela) is recording this monitor.");
      console.log("   👉 The browser will show a VISUAL COUNTDOWN before starting.\n");
    }

    // Play narration (async, in background)
    playNarration();

    // Run the demo
    await runDemo(obs);

  } finally {
    if (obsConnected) {
      log("Stopping OBS recording");
      try {
        await obs.call("StopRecord");
        console.log("   ✓ Recording stopped and saved");
      } catch (err) {
        console.error("   ✗ Could not stop OBS recording:", err.message);
      }
      await obs.disconnect();
    }
  }

  console.log(`
╔══════════════════════════════════════════════════════════════╗
║  ✅ DEMO RECORDING COMPLETE                                 ║
║                                                              ║
║  Next steps:                                                 ║
║  1. Find your recording in OBS output folder                 ║
║  2. Import captions.srt into CapCut / Premiere              ║
║  3. Add fade in/out (2s each end)                           ║
║  4. Export as MP4 1080p · max 5 min                         ║
║  5. Upload to YouTube or Vimeo (unlisted)                   ║
╚══════════════════════════════════════════════════════════════╝
  `);
}

main().catch((err) => {
  console.error("\n❌ Fatal error:", err);
  process.exit(1);
});
