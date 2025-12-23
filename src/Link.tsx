import clsx from "clsx";
import type { LinkConfig } from "./types";
import type { JSX } from "react";

export type LinkProps = JSX.IntrinsicElements["a"] & LinkConfig;

export function Link({ icon, text, ...restOf }: LinkProps) {
  "use memo";
  return (
    <a {...restOf}>
      <i style={{ fontSize: 24 }} className={clsx(icon)}></i>
      <span
        style={{ fontSize: 12 }}
        className="pl-1 text-blue-500 relative bottom-1"
      >
        {text}
      </span>
    </a>
  );
}
