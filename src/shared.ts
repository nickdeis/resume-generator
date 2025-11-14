export function createPDFName(org?: string) {
  const name = "nick-deis-resume" + (typeof org === "string" ? "-" + org : "");
  return `${name}.pdf`;
}
