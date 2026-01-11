import { ResumeConfig } from "../src/types";

export function createPDFName(org?: string) {
  const name = "nick-deis-resume" + (typeof org === "string" ? "-" + org : "");
  return `${name}.pdf`;
}
const bulletChar = "•";
export function createTextFormat(resfig: ResumeConfig) {
  return resfig.experience
    .map((experience) => {
      return `
${boldifyText(experience.title)}\n\n${(experience.achievements || [])
        .map((point) => `${bulletChar} ${point}`)
        .join("\n")}
    `.trim();
    })
    .join("\n\n");
}
const blockCode = 55349;
function boldifyChar(char: string) {
  const charCode = char.charCodeAt(0);
  if (charCode > 64 && charCode < 91) {
    return String.fromCharCode(blockCode, charCode + 56723).trim();
  }
  if (charCode > 96 && charCode < 123) {
    return String.fromCharCode(blockCode, charCode + 56717).trim();
  }
  //56249
}

function boldifyText(text: string) {
  return text
    .split("")
    .map((char) => {
      const bolded = boldifyChar(char);
      return bolded ? bolded : char;
    })
    .join("");
}
