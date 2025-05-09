import clsx from "clsx";

type SkillRowProps = {
  category: string;
  skills: string[];
  className?: string;
};

export function SkillRow({ category, skills, className }: SkillRowProps) {
  return (
    <div
      className={clsx(className, "row flex flex-row items-center")}
      style={{
        paddingBottom: 10,
      }}
    >
      <span
        className="font-bold"
        style={{ fontSize: 14, width: "12%", marginRight: 22 }}
      >
        {category}
      </span>
      <span style={{ width: "88%" }}>
        {skills.map((skill) => (
          <span key={skill} className="skill-chip">
            <span style={{ position: "relative", top: -1 }}>{skill}</span>
          </span>
        ))}
      </span>
    </div>
  );
}
