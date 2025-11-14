import { StrictMode } from "react";
import { getConfig } from "../resfig";
import { HTMLWrap } from "./html";
import { InlineStyle } from "./InlineStyle";
import Resume from "./Resume";
import "./globals";

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

export function App({ serverside = false }: { serverside?: boolean }) {
  const inlineStyle = <InlineStyle content={A5_PAPER}></InlineStyle>;
  const resume = <Resume resumeConfig={getConfig()} />;
  if (serverside) {
    return (
      <HTMLWrap>
        {inlineStyle}
        {resume}
      </HTMLWrap>
    );
  } else {
    return (
      <StrictMode>
        {inlineStyle}
        {resume}
      </StrictMode>
    );
  }
}
