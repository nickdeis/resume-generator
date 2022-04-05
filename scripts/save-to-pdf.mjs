import puppeteer from "puppeteer";


const browser = await puppeteer.launch();
const page = await browser.newPage();
await page.goto("http://localhost:3000");
await page.pdf({path:"./example.pdf",height:"11in",width:"8.5in"});
await browser.close();