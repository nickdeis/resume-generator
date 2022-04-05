import React, { ReactElement } from "react";

type TitleAndDateProps = {
  title: string;
  subtext?: string;
  start: number;
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
    <div>
      <span style={{ fontSize: 20, fontWeight: 900 }}>{title}</span>
      {subtext && (
        <span
          style={{
            paddingLeft: 5,
            fontSize: 18,
            fontWeight: 500,
            fontStyle: "italic",
          }}
        >
          {subtext}
        </span>
      )}
      <span className="float-right" style={{ fontSize: 20, fontWeight: 500 }}>
        <span>{start}</span>
        {end && <span style={{ paddingLeft: 2, paddingRight: 2 }}>–</span>}
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
  start: number;
  /**
   * Don't use if only one year
   */
  end?: number | "Present";
  listStyle?: React.CSSProperties;
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
        <ul style={{ paddingLeft: 20, fontSize: 18, ...listStyle }}>
          {points.map((point) => (
            <li>{point}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
