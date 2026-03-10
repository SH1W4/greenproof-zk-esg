/**
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║       GREENPROOF — CINEMATIC ORCHESTRATOR v3.0 (DIRECT)         ║
 * ║       Direct Browser Recording & Perfect Choreography            ║
 * ╚══════════════════════════════════════════════════════════════════╝
 */

import { chromium } from "playwright";
import { exec } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const CONFIG = {
  BASE_URL: "https://greenproof.vercel.app",
  ETHERSCAN_TX: "https://sepolia.etherscan.io/tx/0xe0d518536a83afe148ad1846502b2c9dcaaa3982587b8da480666ed00ef32e4c",
  VIDEO_DIR: path.join(__dirname, "recordings"),
  AUDIO_FILE: path.join(__dirname, "narration_eleven.mp3"),
  FALLBACK_AUDIO: path.join(__dirname, "narration.mp3"),
  VIEWPORT: { width: 1920, height: 1080 },
};

// Ensure recordings directory exists
if (!fs.existsSync(CONFIG.VIDEO_DIR)) fs.mkdirSync(CONFIG.VIDEO_DIR);

// ─── UTILS ──────────────────────────────────────────────────────────────────
function log(msg) {
  const time = new Date().toLocaleTimeString("pt-BR");
  console.log(`[${time}] 🎬 ${msg}`);
}

async function playAudio() {
  const audio = fs.existsSync(CONFIG.AUDIO_FILE) ? CONFIG.AUDIO_FILE : CONFIG.FALLBACK_AUDIO;
  if (!fs.existsSync(audio)) {
    log("⚠ No audio file found. Recording will be silent.");
    return;
  }
  log(`Playing: ${path.basename(audio)}`);
  
  const absolutePath = path.resolve(audio);
  // PowerShell command to play MP3 using Windows Media Player engine
  const psCommand = `Add-Type -AssemblyName PresentationCore; $player = New-Object System.Windows.Media.MediaPlayer; $player.Open('${absolutePath}'); $player.Play(); Start-Sleep -Seconds 1000`;
  
  exec(`ffplay -nodisp -autoexit -volume 100 "${absolutePath}"`, (err) => {
    if (err) {
      log("   → ffplay not found, using PowerShell fallback...");
      exec(`powershell -Command "${psCommand}"`);
    }
  });
}

// ─── CINEMATIC EFFECTS (Injected) ───────────────────────────────────────────
async function injectDirectorTools(page) {
  await page.evaluate(() => {
    // 1. Injetar Cursor Virtual
    const cursor = document.createElement('div');
    cursor.id = '_director_cursor';
    cursor.style.cssText = `
      position: fixed; top: 0; left: 0; width: 24px; height: 24px;
      background: radial-gradient(circle, rgba(34, 197, 94, 1) 0%, rgba(34, 197, 94, 0) 70%);
      border: 2px solid white; border-radius: 50%;
      z-index: 10000000; pointer-events: none;
      box-shadow: 0 0 20px rgba(34, 197, 94, 0.8);
      transition: transform 0.1s linear; transform: translate(-100px, -100px);
    `;
    document.body.appendChild(cursor);

    // 2. Injetar Efeito de Scan Técnico
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes techScan {
        0% { top: -10%; opacity: 0; }
        50% { opacity: 1; }
        100% { top: 110%; opacity: 0; }
      }
      ._tech_scan_line {
        position: absolute; left: 0; width: 100%; height: 2px;
        background: #22c55e; box-shadow: 0 0 15px #22c55e;
        z-index: 100; pointer-events: none; animation: techScan 1.5s ease-in-out;
      }
      .scene-transition {
        filter: blur(20px) brightness(0.5);
        transition: filter 0.8s ease;
      }
    `;
    document.head.appendChild(style);

    // 3. Status Bar
    const status = document.createElement('div');
    status.id = '_director_status';
    status.style.cssText = `
      position: fixed; top: 0; left: 0; right: 0; height: 3px;
      background: #22c55e; z-index: 10000001; width: 0%;
      transition: width 0.4s linear;
    `;
    document.body.appendChild(status);
  });
}

async function moveMouseTo(page, selector, offset = { x: 10, y: 10 }) {
  try {
    const loc = page.locator(selector).first();
    await loc.waitFor({ state: 'visible', timeout: 8000 });
    const box = await loc.boundingBox();
    if (!box) return;
    
    const targetX = box.x + offset.x;
    const targetY = box.y + offset.y;

    await page.evaluate(({ x, y }) => {
      const cursor = document.getElementById('_director_cursor');
      if (cursor) {
        cursor.style.transition = "transform 1.2s cubic-bezier(0.19, 1, 0.22, 1)";
        cursor.style.transform = `translate(${x}px, ${y}px)`;
      }
    }, { x: targetX, y: targetY });

    await sleep(1300);
  } catch (err) {
    log(`   ⚠ Mouse move to ${selector} skipped: ${err.message}`);
  }
}

async function applyTechScan(page, selector) {
  try {
    const handle = await page.locator(selector).first().elementHandle();
    if (handle) {
      await page.evaluate((el) => {
        if (!el) return;
        const scan = document.createElement('div');
        scan.className = '_tech_scan_line';
        el.style.position = 'relative';
        el.style.overflow = 'hidden';
        el.appendChild(scan);
        setTimeout(() => scan.remove(), 1600);
      }, handle);
    }
  } catch (_) {}
}

async function setProgress(page, percent) {
  await page.evaluate((p) => {
    const el = document.getElementById('_director_status');
    if (el) el.style.width = p + '%';
  }, percent);
}

async function updateStatus(page, text) {
  try {
    await page.evaluate((t) => {
      const el = document.getElementById('_director_status');
      if (el) {
        let label = document.getElementById('_director_label');
        if (!label) {
          label = document.createElement('div');
          label.id = '_director_label';
          label.style.cssText = 'position:fixed; top:8px; right:15px; color:#22c55e; font-family:monospace; font-size:10px; z-index:10000002; pointer-events:none;';
          document.body.appendChild(label);
        }
        label.innerText = t.toUpperCase();
      }
    }, text);
  } catch (_) {}
}

async function addSceneLabel(page, text) {
  try {
    await page.evaluate((t) => {
      const existing = document.getElementById('_gp_scene_label');
      if (existing) existing.remove();
      const el = document.createElement("div");
      el.id = "_gp_scene_label";
      el.style.cssText = `
        position: fixed; bottom: 48px; left: 48px; z-index: 999999;
        background: rgba(0,0,0,0.85); color: #22c55e;
        font-family: monospace; font-size: 12px; font-weight: 700;
        letter-spacing: 0.25em; padding: 10px 18px;
        border: 1px solid rgba(34, 197, 94, 0.3); border-radius: 6px;
        text-transform: uppercase; backdrop-filter: blur(12px);
        opacity: 0; transform: translateY(10px); transition: all 0.4s ease;
      `;
      el.textContent = t;
      document.body.appendChild(el);
      setTimeout(() => { el.style.opacity = "1"; el.style.transform = "translateY(0)"; }, 50);
      setTimeout(() => { el.style.opacity = "0"; }, 3500);
    }, text);
  } catch (_) {}
}

// ─── CHOREOGRAPHY FLOW ──────────────────────────────────────────────────────
async function runChoreography(page) {
  await injectDirectorTools(page);
  
  // SCENE 1: Landing
  log("Scene 1: Landing Presence");
  await setProgress(page, 10);
  await sleep(2000);
  await moveMouseTo(page, "h1");
  await applyTechScan(page, "h1");
  await sleep(3000);

  // Nav to Login
  log("Navigating to Protocol");
  await moveMouseTo(page, "a[href='/login'], .btn-primary");
  await page.evaluate(() => {
    const cursor = document.getElementById('_director_cursor');
    if (cursor) {
      cursor.style.transition = "transform 0.4s ease";
      cursor.style.transform += " scale(0.8)";
    }
  });
  await sleep(400);
  const loginBtnNav = page.locator("a[href='/login'], button:has-text('Launch')").first();
  await loginBtnNav.click();
  await page.waitForURL("**/login");
  await sleep(2000);
  await injectDirectorTools(page);

  // NEW: Judge Fast-Track Auto-Login
  log("Step: Judge Fast-Track (Auto-Login)");
  await updateStatus(page, "LOGIN: JUDGE FAST-TRACK");
  const judgeBtn = page.locator("button:has-text('JUDGE'), button:has-text('AUTO-LOGIN')").first();
  
  try {
    await judgeBtn.waitFor({ state: 'visible', timeout: 5000 });
    await moveMouseTo(page, "button:has-text('JUDGE')");
    await judgeBtn.click();
    log("   ✓ Fast-track clicked, waiting for redirect...");
    await sleep(2000); // Wait for the redirect triggered by the button
  } catch (err) {
    log("   ⚠ Fast-track button not found, trying manual click...");
    await moveMouseTo(page, "button:has-text('Access Protocol')");
    await page.locator("button:has-text('Access Protocol')").click();
  }

  await page.waitForURL("**/dashboard**", { timeout: 15000 });
  await sleep(2000);

  // SCENE 2: Dashboard V2
  log("Scene 2: Dashboard V2 - Sovereign Monitor");
  await page.goto(`${CONFIG.BASE_URL}/v2/dashboard`, { waitUntil: "networkidle", timeout: 30000 });
  
  await injectDirectorTools(page);
  await setProgress(page, 30);
  await updateStatus(page, "SCENE 2: DASHBOARD V2");
  await addSceneLabel(page, "→ SOVEREIGN MONITOR · V2 ARCHITECTURE");
  
  // Wait for the 1.5s simulation timer in the component
  await sleep(4000); 
  
  // Interactions in V2 Dashboard
  await moveMouseTo(page, "h2"); // Portfolio Overview
  await sleep(1000);
  await moveMouseTo(page, "h3"); // ESG Performance
  await applyTechScan(page, "h3");
  await sleep(5000);

  // SCENE 3: Architecture
  log("Scene 3: HaaS Model");
  await page.goto(`${CONFIG.BASE_URL}/architecture`, { waitUntil: "networkidle" });
  await injectDirectorTools(page);
  await setProgress(page, 50);
  await sleep(2000);
  await page.mouse.wheel(0, 600);
  await sleep(2000);
  await moveMouseTo(page, "section:has-text('ZK-SNARK')");
  await applyTechScan(page, "section:has-text('ZK-SNARK')");
  await sleep(5000);

  // SCENE 4: Verification
  log("Scene 4: On-Chain Terminal");
  await page.goto(`${CONFIG.BASE_URL}/verify`, { waitUntil: "networkidle" });
  await injectDirectorTools(page);
  await setProgress(page, 70);
  await sleep(2000);
  await moveMouseTo(page, "input, .terminal");
  await sleep(4000);

  // SCENE 5: Etherscan
  log("Scene 5: Immutable Proof");
  await page.goto(CONFIG.ETHERSCAN_TX, { waitUntil: "domcontentloaded" });
  await injectDirectorTools(page);
  await setProgress(page, 90);
  await sleep(2000);
  await page.mouse.wheel(0, 400);
  await sleep(5000);

  // SCENE 6: FINAL LOGO REVEAL
  log("Scene 6: Final Logo Reveal");
  await page.evaluate(() => {
    const el = document.createElement("div");
    el.style.cssText = `
      position: fixed; inset: 0; z-index: 10000002;
      display: flex; flex-direction: column;
      align-items: center; justify-content: center;
      background: rgba(2, 12, 6, 0.98);
      backdrop-filter: blur(24px);
      font-family: 'JetBrains Mono', monospace;
      opacity: 0; transition: opacity 2s ease;
    `;
    el.innerHTML = `
      <div style="color:#22c55e;font-size:14px;letter-spacing:0.4em;text-transform:uppercase;margin-bottom:24px;opacity:0.6">
        Chainlink Convergence 2026
      </div>
      <div style="color:#f0fdf4;font-size:54px;font-weight:900;letter-spacing:-0.04em;line-height:1">
        GREENPROOF
      </div>
      <div style="color:#22c55e;font-size:14px;margin-top:16px;opacity:0.7;letter-spacing:0.2em">
        Cryptographically Verified Reality.
      </div>
    `;
    document.body.appendChild(el);
    setTimeout(() => (el.style.opacity = "1"), 100);
  });
  await sleep(6000);

  await setProgress(page, 100);
  log("Choreography Complete.");
}

// ─── MAIN ───────────────────────────────────────────────────────────────────
async function main() {
  log("Direct Browser Recording - Director Mode v3.0");
  
  const browser = await chromium.launch({
    headless: false,
    args: ["--start-maximized", "--disable-gpu", "--no-sandbox"]
  });

  const context = await browser.newContext({
    viewport: CONFIG.VIEWPORT,
    recordVideo: {
      dir: CONFIG.VIDEO_DIR,
      size: CONFIG.VIEWPORT
    }
  });

  const page = await context.newPage();
  
  // Force Perfect Centering & Stabilize UI
  await page.addInitScript(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      body, html { 
        overflow-x: hidden !important; 
        width: 100% !important; 
        margin: 0 !important; 
        padding: 0 !important;
        display: flex !important;
        justify-content: center !important;
      }
      main, #__next, div[class*='layout'] { 
        width: 100% !important;
        max-width: 1920px !important;
        margin: 0 auto !important;
      }
    `;
    document.head.appendChild(style);
  });
  
  log("Waiting 10s for UI to stabilize and center...");
  await page.goto(CONFIG.BASE_URL, { waitUntil: "networkidle" });
  await sleep(5000);

  // START AUDIO & CHOREOGRAPHY
  playAudio();
  await runChoreography(page);

  await sleep(2000);
  const videoFile = await page.video().path();
  await context.close();
  await browser.close();

  // Rename the video
  const finalName = path.join(CONFIG.VIDEO_DIR, `greenproof_cinematic_${Date.now()}.webm`);
  fs.renameSync(videoFile, finalName);

  log(`✅ THE CINEMATIC EXPERIENCE IS READY!`);
  log(`Video saved to: ${finalName}`);
}

main().catch(console.error);
