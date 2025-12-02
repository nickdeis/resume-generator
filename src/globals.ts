import { createPDFName } from "../server/shared";

declare const globalThis: {
  downloadPDF: (org?: string) => Promise<void>;
};

export async function downloadPDF(org?: string) {
  let url = `/api/pdf?downloadable=1`;
  if (org) {
    url = url + `&org=${org}`;
  }
  const link = document.createElement("a");
  link.href = url;
  link.download = createPDFName(org);

  link.dispatchEvent(
    new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
      view: window,
    })
  );
}

globalThis.downloadPDF = downloadPDF;
