import { CertConfig } from "../resfig";
import { Job } from "./Job";

export default function Certification({
  name,
  source,
  startYear,
  endYear,
  note,
}: CertConfig) {
  "use memo";
  return (
    <Job
      title={name}
      employer={source}
      start={startYear}
      end={endYear}
      points={note ? [note] : undefined}
      listStyle={{ listStyleType: "none", paddingLeft: 0 }}
    />
  );
}
