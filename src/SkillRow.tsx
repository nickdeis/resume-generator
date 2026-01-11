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
      <span className="font-bold mr-5.5 text-sm w-[12%] max-sm:w-full max-sm:pb-1 max-sm:pl-1 max-sm:text-base max-xs:text-sm!">
        {category}
      </span>
      <span className="w-[88%] max-sm:w-full max-xs:grid max-xs:grid-cols-3 max-xs:gap-y-1.5 max-xs:text-center">
        {skills.map((skill) => (
          <span
            key={skill}
            className="py-0.5 px-[5px] mx-[3px] text-sm  skill-chip font-medium max-xs:text-xs!"
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
