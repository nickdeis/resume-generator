import express from "express";
import puppeteer from "puppeteer";
import { getConfig } from "../resfig";
import ViteExpress from "vite-express";
import { createPDFName } from "./shared";
import { createServer as createViteServer, build } from "vite";
import { readFile } from "fs/promises";
import path from "path";
import { load as loadHTML } from "cheerio";
import compression from "compression";
import os from "node:os";
import QRCode from "qrcode";
import { OutputAsset, RollupOutput } from "rollup";
import { writeFile } from "node:fs/promises";
const ROOT_DIR = path.join(__dirname, "..");

async function buildAndFindCSS() {
  const result = (await build()) as RollupOutput;
  const cssChunk = result.output.find((chunk) =>
    chunk.fileName.endsWith(".css")
  ) as OutputAsset;
  return cssChunk.source;
}

const builtCSS = await buildAndFindCSS();

const vite = await createViteServer({
  server: { middlewareMode: true },
  appType: "custom",
});

async function buildHTML() {
  try {
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
    writeFile(path.join(ROOT_DIR, "build", "static.html"), htmlBuild);
    return htmlBuild;
  } catch (err) {
    if (err instanceof Error) {
      vite.ssrFixStacktrace(err);
    }
    throw err;
  }
}

function getLocalNet() {
  const nets = os.networkInterfaces();

  const wifi = nets["en0"];
  if (!wifi) return;
  //console.log(wifi);
  const ipv4 = wifi.find(
    (inf) => typeof inf === "object" && inf.family === "IPv4"
  );
  if (!ipv4) return;
  return ipv4.address;
}

const app = express();
app.use(compression());

app.get("/api/pdf", async (req, res) => {
  const { org, downloadable } = req.query;
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("http://localhost:5173");
  const buffer = await page.pdf({
    preferCSSPageSize: true,
  });
  const filename = createPDFName(org as string | undefined);
  if (downloadable) {
    res.set("Content-Disposition", `attachment; filename="${filename}"`);
  } else {
    res.setHeader("Content-disposition", `inline; filename="${filename}"`);
  }

  res.set("Content-Type", "application/pdf");
  res.status(200);
  res.end(buffer);
});

app.get("/api/json", (req, res) => {
  res.json(getConfig());
});
app.use("/build", express.static("../build"));

app.use("/ssr", vite.middlewares);

const builtHTML = await buildHTML();
app.get("/ssr", async (req, res, next) => {
  res.status(200).set({ "Content-Type": "text/html" }).end(builtHTML);
});

const HOST = process.env.HOST || "localhost";
const PORT = process.env.PORT ? Number(process.env.PORT) : 5173;
const server = app.listen(PORT, HOST, async () => {
  console.log("\n");
  console.log(`Local =>`, `http://localhost:${PORT}`);
  if (HOST === "0.0.0.0") {
    const localUrl = `http://${getLocalNet()}:${PORT}`;
    console.log(`Wifi =>`, localUrl);
    const qrCode = await QRCode.toString(localUrl, {
      type: "terminal",
      small: true,
    });
    console.log("\n");
    console.log(qrCode);
    console.log("\n");
  }
});
ViteExpress.bind(app, server);
