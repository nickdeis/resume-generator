import express from "express";
import puppeteer from "puppeteer";
import { getConfig } from "./resfig";
import ViteExpress from "vite-express";
import { join } from "path";
import { createPDFName } from "./src/shared";
const app = express();

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
app.use("/build", express.static("build"));

ViteExpress.listen(app, 5173, () => console.log("Server is listening..."));
