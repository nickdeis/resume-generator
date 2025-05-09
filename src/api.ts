import express from "express";
import puppeteer from "puppeteer";
import { DEFAULT_RESUME_CONFIG } from "./config";

const app = express();

app.get("/api/pdf", async (req, res) => {
  const { org } = req.query;
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("http://localhost:5173");
  const buffer = await page.pdf({
    height: "11in",
    width: "8.5in",
  });
  res.set(
    "Content-Disposition",
    `attachment; filename="nick-deis-resume${
      typeof org === "string" ? "-" + org : ""
    }.pdf"`
  );
  res.set("Content-Type", "application/pdf");
  res.status(200);
  res.end(buffer);
});

app.get("/api/json", (req, res) => {
  res.json(DEFAULT_RESUME_CONFIG);
});

export const handler = app;
