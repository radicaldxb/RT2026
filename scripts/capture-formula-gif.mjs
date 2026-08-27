#!/usr/bin/env node
/**
 * Renders BI = C + Ex × T² gradient loop to an animated GIF.
 * Transparent background (email signature). Use BG=white in script for opaque.
 *
 * Usage: node scripts/capture-formula-gif.mjs
 */

import { spawn } from "child_process";
import { mkdir, rm } from "fs/promises";
import http from "http";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const PUBLIC = path.join(ROOT, "public");
const TMP_DIR = path.join(ROOT, ".formula-capture-tmp");
const GIF_OUT = path.join(PUBLIC, "logos", "RT-BI-C-Ex-T.gif");

const WIDTH = 1920;
const HEIGHT = 540;
const OUTPUT_WIDTH = 640;
const FPS = 15;
const DURATION_MS = 3000;
const FRAMES = Math.round((DURATION_MS / 1000) * FPS);
const BG = "transparent";

function serveStatic(port) {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      const rel = req.url === "/" ? "/formula-capture.html" : req.url.split("?")[0];
      const filePath = path.join(PUBLIC, rel.replace(/^\//, ""));
      import("fs").then((fs) => {
        fs.readFile(filePath, (err, data) => {
          if (err) {
            res.writeHead(404);
            res.end("Not found");
            return;
          }
          const ext = path.extname(filePath);
          const types = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript" };
          res.writeHead(200, { "Content-Type": types[ext] || "application/octet-stream" });
          res.end(data);
        });
      });
    });
    server.listen(port, "127.0.0.1", () => resolve(server));
  });
}

function run(cmd, args) {
  return new Promise((resolve, reject) => {
    const proc = spawn(cmd, args, { stdio: "inherit" });
    proc.on("close", (code) => (code === 0 ? resolve() : reject(new Error(`${cmd} exited ${code}`))));
  });
}

async function main() {
  const { chromium } = await import("playwright");
  const ffmpegInstaller = await import("@ffmpeg-installer/ffmpeg");
  const ffmpeg = ffmpegInstaller.default.path;

  await rm(TMP_DIR, { recursive: true, force: true });
  await mkdir(TMP_DIR, { recursive: true });
  await mkdir(path.dirname(GIF_OUT), { recursive: true });

  const port = 4175;
  const server = await serveStatic(port);
  const url = `http://127.0.0.1:${port}/formula-capture.html?bg=${BG}`;

  console.log(`Capturing ${FRAMES} frames (${FPS} fps, ${BG} bg)...`);

  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: WIDTH, height: HEIGHT } });
  await page.goto(url, { waitUntil: "networkidle" });
  await page.waitForFunction(() => window.__captureReady === true);
  await page.waitForTimeout(100);

  const formula = page.locator(".formula");
  const box = await formula.boundingBox();
  if (!box) throw new Error("Formula element not found");

  const pad = 24;
  const clip = {
    x: Math.max(0, box.x - pad),
    y: Math.max(0, box.y - pad),
    width: Math.min(WIDTH - Math.max(0, box.x - pad), box.width + pad * 2),
    height: Math.min(HEIGHT - Math.max(0, box.y - pad), box.height + pad * 2),
  };

  for (let i = 0; i < FRAMES; i += 1) {
    const framePath = path.join(TMP_DIR, `frame_${String(i).padStart(3, "0")}.png`);
    await page.screenshot({ path: framePath, clip, omitBackground: BG === "transparent" });
    await page.waitForTimeout(1000 / FPS);
  }

  await browser.close();
  server.close();

  const palettePath = path.join(TMP_DIR, "palette.png");
  const pattern = path.join(TMP_DIR, "frame_%03d.png");
  const scale = `scale=${OUTPUT_WIDTH}:-1:flags=lanczos`;

  console.log("Building GIF palette...");
  await run(ffmpeg, [
    "-y",
    "-framerate", String(FPS),
    "-i", pattern,
    "-vf", `${scale},palettegen=reserve_transparent=1:stats_mode=diff`,
    palettePath,
  ]);

  console.log("Encoding GIF...");
  await run(ffmpeg, [
    "-y",
    "-framerate", String(FPS),
    "-i", pattern,
    "-i", palettePath,
    "-lavfi", `${scale}[x];[x][1:v]paletteuse=alpha_threshold=128:dither=bayer:bayer_scale=3`,
    "-loop", "0",
    GIF_OUT,
  ]);

  await rm(TMP_DIR, { recursive: true, force: true });

  console.log(`\nDone: ${path.relative(ROOT, GIF_OUT)}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
