import Certification from "./Certification";
import { ResumeConfig } from "../resfig";
import { Header } from "./Header";
import { Job } from "./Job";
import { Link } from "./Link";
import Project from "./Project";
import { Section } from "./Section";
import { SkillRow } from "./SkillRow";

export type ResumeProps = {
  resumeConfig: ResumeConfig;
};

export default function Resume({ resumeConfig }: ResumeProps) {
  "use memo";
  const { Skills, Links, Experience } = resumeConfig;
  return (
    <div>
      <Header />
      <section className="flex flex-row pt-0">
        <Section className="paper:w-3/4 max-paper:w-full mr-7" name="Skills">
          {Object.entries(Skills).map(([category, skills], i) => {
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
        <Section
          className="paper:w-1/4 flex paper:flex-col max-sprint:hidden"
          name="Links"
        >
          {Object.entries(Links).map(([linkKey, linkConfig], i) => {
            return (
              <Link
                key={linkKey}
                className={i === 0 ? "pt-3" : undefined}
                {...linkConfig}
              />
            );
          })}
        </Section>
      </section>
      <Section name="Experience" className="w-responsive-md">
        <div className="pt-2">
          {Experience.map(
            ({ title, employer, achievements, endYear, startYear }) => {
              return (
                <Job
                  key={title + employer}
                  title={title}
                  employer={employer}
                  points={achievements}
                  end={endYear}
                  start={startYear}
                ></Job>
              );
            }
          )}
        </div>
      </Section>
      <Section name="Education & Certifications">
        <div className="pt-1">
          {resumeConfig["Education & Certifications"].map((eduConfig) => (
            <Certification key={eduConfig.name} {...eduConfig} />
          ))}
        </div>
      </Section>
      <Section name="Opensource & Public Projects">
        <div className="grid grid-cols-2 print:grid-cols-2 max-sprint:grid-cols-1 gap-4 pt-3">
          {resumeConfig.Projects.map((proj) => (
            <Project key={proj.name} {...proj} />
          ))}
        </div>
      </Section>
    </div>
  );
}
