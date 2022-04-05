import React from "react";

export function Section({
  name,
  children,
}: React.PropsWithChildren<{ name: string }>) {
  return (
    <section className="container-fluid" style={{ paddingBottom: 15 }}>
      <span className="gray-800" style={{ fontWeight: 700, fontSize: 24 }}>
        {name}
      </span>
      <hr
        style={{ marginTop: 0, borderTopWidth: 2, borderTopColor: "#6c757d" }}
      />
      {children}
    </section>
  );
}
