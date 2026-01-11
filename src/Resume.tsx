import Certification from "./Certification";
import { ResumeConfig } from "./types";
import { Header } from "./Header";
import { Job } from "./Job";
import { Link } from "./Link";
import Project from "./Project";
import { Section } from "./Section";
import { SkillRow } from "./SkillRow";

export type ResumeProps = {
  resumeConfig: ResumeConfig;
};

export default function Resume({
  resumeConfig: { skills, links, experience, education, projects },
}: ResumeProps) {
  "use memo";
  return (
    <div>
      <Header links={links} />
      <Section name="Skills">
        {Object.entries(skills).map(([category, skills], i) => {
          return (
            <SkillRow
              key={category}
              className={i === 0 ? "pt-3" : undefined}
              category={category}
              skills={skills}
            />
          );
        })}
      </Section>

      <Section name="Experience" className="w-responsive-md">
        <div className="pt-1 flex flex-col gap-1">
          {experience.map(
            ({ title, employer, achievements, endYear, startYear }) => {
              return (
                <Job
                  key={title + employer}
                  title={title}
                  employer={employer}
                  points={achievements}
                  end={endYear}
                  start={startYear}
                  XSGrid
                ></Job>
              );
            }
          )}
        </div>
      </Section>
      <Section name="Education & Certifications">
        <div className="pt-1">
          {education.map((eduConfig) => (
            <Certification key={eduConfig.name} {...eduConfig} />
          ))}
        </div>
      </Section>
      <Section name="Opensource & Public Projects" className="print:pt-3">
        <div className="grid grid-cols-2 print:grid-cols-2 max-sprint:grid-cols-1 gap-4 pt-3">
          {projects.map((proj) => (
            <Project key={proj.name} {...proj} />
          ))}
        </div>
      </Section>
    </div>
  );
}
