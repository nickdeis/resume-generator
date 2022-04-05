import React from "react";
type SkillRowProps = {
  category: string;
  skills: string[];
};

export function SkillRow({ category, skills }: SkillRowProps) {
  return (
    <div
      className="row"
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        paddingBottom: 10,
      }}
    >
      <span style={{ fontWeight: 700, fontSize: 18, width: "12%" }}>
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
