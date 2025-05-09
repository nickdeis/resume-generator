import puppeteer from "puppeteer";
import { parseArgs } from "util";

const {
  values: { dir, org },
} = parseArgs({
  args: Bun.argv,
  options: {
    dir: {
      type: "string",
      default: "~/Documents/resumes",
    },
    org: {
      type: "string",
    },
  },
  strict: true,
  allowPositionals: true,
});

async function main() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("http://localhost:5173");
  await page.pdf({
    path: `${dir}/nick-deis-resume-${org}.pdf`,
    height: "11in",
    width: "8.5in",
  });
  await browser.close();
}

main();
