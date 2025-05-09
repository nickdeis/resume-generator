import { ReactElement, CSSProperties } from "react";
import MarkdownSpan from "./MarkdownSpan";

type TitleAndDateProps = {
  title: string;
  subtext?: string;
  start?: number;
  /**
   * Don't use if only one year
   */
  end?: number | "Present";
};

export function TitleAndDate({
  title,
  subtext,
  start,
  end,
}: TitleAndDateProps) {
  return (
    <div className="text-base">
      <span className="font-black">{title}</span>
      {subtext && (
        <span
          className="italic"
          style={{
            paddingLeft: 5,
            fontWeight: 500,
          }}
        >
          {subtext}
        </span>
      )}
      <span className="float-right font-light text-base">
        {start && <span>{start}</span>}
        {end && start && (
          <span style={{ paddingLeft: 2, paddingRight: 2 }}>–</span>
        )}
        {end && <span>{end}</span>}
      </span>
    </div>
  );
}

type JobProps = {
  title: string;
  employer?: string;
  points?: (ReactElement | string)[];
  //Start year
  start?: number;
  /**
   * Don't use if only one year
   */
  end?: number | "Present";
  listStyle?: CSSProperties;
};
export function Job({
  title,
  employer,
  start,
  end,
  points,
  listStyle = {},
}: JobProps) {
  return (
    <div>
      <TitleAndDate title={title} subtext={employer} start={start} end={end} />
      {points && (
        <ul
          className="list-disc"
          style={{
            fontSize: 13,
            paddingLeft: 20,
            ...listStyle,
          }}
        >
          {points.map((point) => (
            <li>
              <MarkdownSpan>{point}</MarkdownSpan>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
