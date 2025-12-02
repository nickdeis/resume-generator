import clsx from "clsx";

type SkillRowProps = {
  category: string;
  skills: string[];
  className?: string;
};

export function SkillRow({ category, skills, className }: SkillRowProps) {
  "use memo";
  return (
    <div
      className={clsx(
        className,
        "row flex flex-row max-sm:flex-col max-sm:items-baseline sm:items-center pb-2.5"
      )}
    >
      <span className="font-bold mr-5.5 text-sm" style={{ width: "12%" }}>
        {category}
      </span>
      <span style={{ width: "88%" }}>
        {skills.map((skill) => (
          <span
            key={skill}
            className="py-0.5 px-[5px] mx-[3px] text-sm max-sm:text-xs skill-chip font-medium"
          >
            <span className="relative whitespace-nowrap" style={{ top: -1 }}>
              {skill}
            </span>
          </span>
        ))}
      </span>
    </div>
  );
}
