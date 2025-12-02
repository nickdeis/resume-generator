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
  "use memo";
  return (
    <div className="text-base w-responsive-md">
      <span className="font-black max-sm:text-sm">{title}</span>
      {subtext && (
        <span
          className="italic max-sm:text-sm"
          style={{
            paddingLeft: 5,
            fontWeight: 500,
          }}
        >
          {subtext}
        </span>
      )}
      <span className="float-right font-light text-base max-sm:text-sm">
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
  "use memo";
  return (
    <div className="w-responsive-md print:py-0 max-md:py-1 max-sm:py-2">
      <TitleAndDate title={title} subtext={employer} start={start} end={end} />
      {points && (
        <ul
          className="list-disc pl-5 text-xs w-responsive-md"
          style={{
            ...listStyle,
          }}
        >
          {points.map((point) => (
            <li className="w-responsive-md">
              <MarkdownSpan>{point}</MarkdownSpan>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
