import puppeteer from "puppeteer";
import { createServer as createViteServer, build } from "vite";
import path from "path";
import { OutputAsset, RollupOutput } from "rollup";
import { load as loadHTML } from "cheerio";
import { readFile } from "fs/promises";
import { writeFile } from "node:fs/promises";
import { renderTerminalToString } from "./terminal-ui";
import { createTextFormat } from "./shared";
import { getConfig } from "../resfig";
import { fileURLToPath } from "node:url";

const ROOT_DIR = path.join(__dirname, "..");
const BUILD_DIR = path.join(ROOT_DIR, "build");

async function buildTerminal() {
  const terminal = renderTerminalToString();
  await writeFile(path.join(BUILD_DIR, "resume"), terminal);
  return terminal;
}

async function buildTextFormat() {
  const textFormat = createTextFormat(getConfig());
  await writeFile(path.join(BUILD_DIR, "resume.txt"), textFormat);
  return textFormat;
}

async function buildAndFindCSS() {
  const result = (await build()) as RollupOutput;
  const cssChunk = result.output.find((chunk) =>
    chunk.fileName.endsWith(".css")
  ) as OutputAsset;
  return cssChunk.source;
}

export const vite = await createViteServer({
  server: { middlewareMode: true },
  appType: "custom",
});

async function buildHTML() {
  try {
    const builtCSS = await buildAndFindCSS();
    let template = await readFile(
      path.resolve(ROOT_DIR, "index.html"),
      "utf-8"
    );
    template = await vite.transformIndexHtml("", template);
    const { render } = await vite.ssrLoadModule(
      path.join(__dirname, "./server-entry.tsx")
    );
    const appHtml = await render("");
    const html = template.replace(`<!--ssr-outlet-->`, () => appHtml.html);

    const $ = loadHTML(html);
    $("script").remove();
    const style = $.parseHTML(`<style>${builtCSS}</style>`);
    $("head").append(style);
    const htmlBuild = $.html();
    await writeFile(path.join(BUILD_DIR, "resume.html"), htmlBuild);
    return htmlBuild;
  } catch (err) {
    if (err instanceof Error) {
      vite.ssrFixStacktrace(err);
    }
    throw err;
  }
}

export async function createPDFOfResume() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 816, height: 1056 });
  await page.emulateMediaType("print");
  await page.goto("http://localhost:5173/build/resume.html", {
    waitUntil: "networkidle0",
  });
  await page.evaluate(() => document.fonts?.ready);
  const buffer = await page.pdf({
    preferCSSPageSize: true,
    printBackground: true,
    scale: 1,
    margin: {
      top: "0in",
      right: "0in",
      bottom: "0in",
      left: "0in",
    },
  });
  await browser.close();
  return buffer;
}

async function persistPDF(buffer: Buffer<ArrayBufferLike>) {
  await writeFile(path.join(BUILD_DIR, "resume.pdf"), buffer);
}
async function writeJSON() {
  const json = getConfig();
  await writeFile(
    path.join(BUILD_DIR, "resume.json"),
    JSON.stringify(json, null, 2)
  );
  return json;
}

export async function buildPreAssets() {
  console.time("Build & Persist Preassets");

  const html = await buildHTML();
  const [json, terminal, text] = await Promise.all([
    writeJSON(),
    buildTerminal(),
    buildTextFormat(),
  ]);

  console.timeEnd("Build & Persist Preassets");
  return { terminal, text, html, json };
}

export async function buildPostAssets() {
  const pdf = await createPDFOfResume();
  await persistPDF(pdf);
  return pdf;
}
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const res = await buildPreAssets();
  process.exit(0);
}
