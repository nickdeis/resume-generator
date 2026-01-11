import MarkdownSpan from "./MarkdownSpan";
import { ProjectConfig } from "./types";

export default function Project({ name, points, link, tech }: ProjectConfig) {
  "use memo";
  return (
    <div className="py-2 px-2 border border-black flex flex-col">
      <a className="text-base text-blue-500" href={link}>
        {name}
      </a>
      <ul className="text-sm list-disc pl-4">
        {points.map((point) => (
          <li key={point}>
            <MarkdownSpan>{point}</MarkdownSpan>
          </li>
        ))}
      </ul>
      <span className="text-sm flex flex-row">
        <span className="font-bold pr-1">Tech:</span>
        <span className="italic">{tech.join(", ")}</span>
      </span>
    </div>
  );
}
