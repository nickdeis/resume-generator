import express from "express";
import { getConfig } from "../resfig";
import ViteExpress from "vite-express";
import { createPDFName, createTextFormat } from "./shared";

import path from "path";

import compression from "compression";
import os from "node:os";
import QRCode from "qrcode";

import { renderTerminalToString } from "./terminal-ui";
import {
  buildPostAssets,
  buildPreAssets,
  createPDFOfResume,
  vite,
} from "./build";
const assets = await buildPreAssets();
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
app.get("/api/text", async (_, res) => {
  res.set("Content-Type", "text/plain");
  res.status(200);
  res.end(assets.text);
});
app.get("/api/term", async (_, res) => {
  res.set("Content-Type", "text/plain");
  res.status(200);
  res.end(assets.terminal);
});
app.get("/api/pdf", async (req, res) => {
  const { org, downloadable } = req.query;
  const buffer = await createPDFOfResume();
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
  res.json(assets.json);
});
app.use("/build", express.static("../build"));

app.use("/ssr", vite.middlewares);

app.get("/api/html", async (req, res, next) => {
  res.status(200).set({ "Content-Type": "text/html" }).end(assets.html);
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
await ViteExpress.bind(app, server);
await buildPostAssets();
if (process.argv[2] === "build") {
  process.exit(0);
}
