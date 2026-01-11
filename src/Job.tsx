import { ReactElement, CSSProperties } from "react";
import MarkdownSpan from "./MarkdownSpan";
import clsx from "clsx";
import { FormatTime } from "./FormatTime";

type TitleAndDateProps = {
  title: string;
  subtext?: string;
  start?: number;
  /**
   * Don't use if only one year
   */
  end?: number | "Present";
  XSGrid?: boolean;
};

export function TitleAndDate({
  title,
  subtext,
  start,
  end,
  XSGrid = false,
}: TitleAndDateProps) {
  "use memo";
  const xsGrid = (cname: string) => (XSGrid ? cname : undefined);
  return (
    <div
      className={clsx(
        "text-base w-responsive-md",
        xsGrid("max-xs:grid max-xs:grid-cols-2")
      )}
    >
      <span
        title={title}
        className={clsx(
          "font-black max-sm:text-sm",
          xsGrid("max-xs:col-span-2")
        )}
      >
        {title}
      </span>
      {subtext && (
        <span
          title={subtext}
          className={clsx(
            "italic max-sm:text-sm font-medium pl-[5px]",
            xsGrid("max-xs:pl-0")
          )}
        >
          {subtext}
        </span>
      )}
      <span
        className={clsx(
          "float-right font-light text-base max-xs:text-sm",
          xsGrid("max-xs:text-right")
        )}
      >
        <FormatTime start={start} end={end} />
      </span>
    </div>
  );
}

type JobProps = {
  title: string;
  employer?: string;
  points?: string[];
  //Start year
  start?: number;
  /**
   * Don't use if only one year
   */
  end?: number | "Present";
  listStyle?: CSSProperties;
  XSGrid?: boolean;
};
export function Job({
  title,
  employer,
  start,
  end,
  points,
  listStyle = {},
  XSGrid = false,
}: JobProps) {
  "use memo";
  return (
    <div className="w-responsive-md">
      <TitleAndDate
        XSGrid={XSGrid}
        title={title}
        subtext={employer}
        start={start}
        end={end}
      />
      {points && (
        <ul
          className="list-disc pl-5 w-responsive-md text-sm flex flex-col"
          role="list"
          style={{
            ...listStyle,
          }}
        >
          {points.map((point) => (
            <li key={point} className="w-responsive-md max-xs:p-1">
              <MarkdownSpan>{point}</MarkdownSpan>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
