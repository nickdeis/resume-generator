import { StrictMode } from "react";
import { getConfig } from "../resfig";
import { InlineStyle } from "./InlineStyle";
import Resume from "./Resume";
import "./globals";

export function App() {
  return (
    <StrictMode>
      <Resume resumeConfig={getConfig()} />
    </StrictMode>
  );
}
