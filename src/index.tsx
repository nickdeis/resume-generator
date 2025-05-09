import { createRoot } from "react-dom/client";
import "./index.css";
import Resume from "./Resume";
import { StrictMode } from "react";
import { InlineStyle } from "./InlineStyle";
import { DEFAULT_RESUME_CONFIG } from "./config";
const root = document.getElementById("root");

const A5_PAPER = `
      body {
        margin: 0;
        padding: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: white;
      }

      #root {
        width: 8.5in;
        height: 11in;
        background: white;
      }
`;

if (root) {
  createRoot(root).render(
    <StrictMode>
      <InlineStyle content={A5_PAPER}></InlineStyle>
      <Resume resumeConfig={DEFAULT_RESUME_CONFIG} />
    </StrictMode>
  );
}
