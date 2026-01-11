import clsx from "clsx";
import React from "react";

export type SectionTypes = {
  className?: string;
  name: string;
};

export function Section({
  name,
  children,
  className,
}: React.PropsWithChildren<SectionTypes>) {
  "use memo";
  return (
    <section className={clsx(className, "pb-2.5")}>
      <div className="flex items-center">
        <hr className="border-t-2 w-[1%] border-t-std-gray" />
        <span className="px-2 font-light text-xl grow-0">{name}</span>
        <hr className="border-t-2 grow border-t-std-gray" />
      </div>
      {children}
    </section>
  );
}
