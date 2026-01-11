import clsx from "clsx";
import type { LinkConfig } from "./types";
import type { JSX } from "react";

export type LinkProps = JSX.IntrinsicElements["a"] &
  LinkConfig & { iconClassName?: string };

export function Link({
  Icon,
  text,
  iconClassName = "text-2xl",
  className,
  ...restOf
}: LinkProps) {
  "use memo";
  return (
    <a {...restOf} className={clsx(className, "flex flex-row items-center")}>
      <Icon className={iconClassName} />
      <span
        style={{ fontSize: 12 }}
        className="pl-1 text-blue-500 relative  max-links:hidden"
      >
        {text}
      </span>
    </a>
  );
}
