import { createRoot } from "react-dom/client";
import "./index.css";
import { App } from "./App";
if (import.meta.env.SSR) {
} else {
  const root = document.getElementById("root");
  if (root) {
    createRoot(root).render(<App />);
  }
}
