import { PropsWithChildren, FunctionComponent } from "react";

type TransformCharCode = (charCode: number) => number | number[];
type TransformText = (text: string) => string;

type TransformMapping = [string, string];

const ASCII_UPPER_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const ASCII_LOWER_CHARS = ASCII_UPPER_CHARS.toLowerCase();
const ASCII_NUMBERS = "0123456789";
const ASCII_CHARS = ASCII_UPPER_CHARS + ASCII_LOWER_CHARS + ASCII_NUMBERS;

const DOUBLESTRUCK_MAP = [
  ASCII_CHARS,
  "𝔸𝔹ℂ𝔻𝔼𝔽𝔾ℍ𝕀𝕁𝕂𝕃𝕄ℕ𝕆ℙℚℝ𝕊𝕋𝕌𝕍𝕎𝕏𝕐ℤ𝕒𝕓𝕔𝕕𝕖𝕗𝕘𝕙𝕚𝕛𝕜𝕝𝕞𝕟𝕠𝕡𝕢𝕣𝕤𝕥𝕦𝕧𝕨𝕩𝕪𝕫𝟘𝟙𝟚𝟛𝟜𝟝𝟞𝟟𝟠𝟡",
] as [string, string];
const SMART_SPLIT = /[\s]{0}/gu;
function splitUnicodeSafely(chars: string) {
  return chars.split(SMART_SPLIT);
}

class MappingTextTransformer {
  charLookup = new Map<string, string>();
  constructor(mappings: TransformMapping) {
    const from = splitUnicodeSafely(mappings[0]);
    const to = splitUnicodeSafely(mappings[1]);
    if (from.length !== to.length) {
      throw new Error(
        "from and to char arrays are not the same codepoint length!"
      );
    }
    for (let i = 0; i < from.length; i++) {
      this.charLookup.set(from[i], to[i]);
    }
  }
  charTransformer = (char: string) => {
    return this.charLookup.get(char) || char;
  };
  textTransformer = (text: string) => {
    const fromChars = splitUnicodeSafely(text);
    return fromChars.map(this.charTransformer).join("");
  };
}
const doubleStruckTransformer = new MappingTextTransformer(DOUBLESTRUCK_MAP);

function createTextTransformer(charCodeTransformer: TransformCharCode) {
  const charToText = (char: string) => {
    const charCode = char.charCodeAt(0);
    const charCodes = charCodeTransformer(charCode);
    const codes = Array.isArray(charCodes) ? charCodes : [charCodes];
    console.log(codes);
    return String.fromCharCode(...codes);
  };
  return function textTransformer(text: string) {
    return text.split("").map(charToText).join("");
  };
}

function createBlockCharCodeTransformer(
  blockCode: number,
  startCode: number,
  gap = 6
) {
  const startUpper = startCode - 65;
  const startLower = startUpper - gap;
  return function blockCharCodeTransformer(charCode: number) {
    if (charCode > 64 && charCode < 91) {
      return [blockCode, charCode + startUpper];
    }
    if (charCode > 96 && charCode < 123) {
      return [blockCode, charCode + startLower];
    }
    return charCode;
  };
}

function fromCapitalA(capA: string) {
  const blockCode = capA.charCodeAt(0);
  const startCode = capA.charCodeAt(1);
  return createTextTransformer(
    createBlockCharCodeTransformer(blockCode, startCode)
  );
}

const firstChars = [
  ["bold-math", "𝐀"],
  ["italic-math", "𝐴"],
  ["monospace-math", "𝙰"],
  ["math-bold-italic-sans-serif", "𝘼"],
  ["sans-serif", "𝖠"],
] as const;
type FontName = (typeof firstChars)[number][0] | "double-struck";

const GLOBAL_FONTS = Object.fromEntries(
  firstChars.map(([name, firstChar]) => {
    const transform = fromCapitalA(firstChar);
    return [name, transform];
  })
) as Record<FontName, TransformText>;
GLOBAL_FONTS["double-struck"] = doubleStruckTransformer.textTransformer;
export const Font: FunctionComponent<PropsWithChildren<{ name: FontName }>> = ({
  children,
  name,
}) => {
  const transformer = GLOBAL_FONTS[name];
  if (typeof children === "string") {
    return transformer(children);
  }
  return children;
};
