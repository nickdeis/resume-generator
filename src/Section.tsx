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
  return (
    <section className={className} style={{ paddingBottom: 10 }}>
      <span className="font-bold" style={{ fontWeight: 700, fontSize: 18 }}>
        {name}
      </span>
      <hr className="mt-0 border-t-2" style={{ borderTopColor: "#6c757d" }} />
      {children}
    </section>
  );
}
