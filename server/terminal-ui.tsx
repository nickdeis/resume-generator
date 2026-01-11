import { Text, Box } from "ink";
import { CertConfig, JobConfig, ResumeConfig } from "../src/types";
import { PropsWithChildren } from "react";
import { getConfig } from "../resfig";
import Link from "ink-link";
import { render } from "ink-testing-library";
import { FormatTime } from "../src/FormatTime";
const Markdown = (await import("ink-markdown")).default;

const borderBottomOnly = {
  borderTop: false,
  borderLeft: false,
  borderRight: false,
  borderBottom: true,
};
type TerminalResumeProps = {
  resume: ResumeConfig;
};

type SkillChipProps = {
  skill: string;
};

function getMaxStrLength(items: string[]) {
  let max = 0;
  for (const item of items) {
    max = Math.max(item.length, max);
  }
  return max;
}

function SkillSection({ skills }: { skills: ResumeConfig["skills"] }) {
  const maxCategoryLength = getMaxStrLength(Object.keys(skills));
  return (
    <Box flexDirection="column">
      {Object.entries(skills).map(([skillCategory, skillList], i) => {
        return (
          <Box flexDirection="row" key={i}>
            <Box
              marginTop={1}
              key={skillCategory}
              flexDirection="row"
              alignItems="flex-start"
              marginRight={maxCategoryLength - skillCategory.length}
              marginBottom={1}
            >
              <Text color="green">{skillCategory}: </Text>
            </Box>
            <Box flexDirection="row" justifyContent="space-around">
              {skillList.map((skill) => (
                <SkillChip key={skill}>{skill}</SkillChip>
              ))}
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}

function SkillChip({ children }: PropsWithChildren) {
  return (
    <Box borderColor="white" justifyContent="center" borderStyle="round">
      <Text>{children}</Text>
    </Box>
  );
}

export function TerminalResume({
  resume: { skills, experience, education, links, projects },
}: TerminalResumeProps) {
  return (
    <Box flexDirection="column" width={110} paddingX={4} paddingY={1}>
      <Box
        flexDirection="row"
        marginTop={1}
        {...borderBottomOnly}
        borderBottomColor="whiteBright"
        borderStyle={"doubleSingle"}
        justifyContent="space-between"
      >
        <Box>
          <Text color="white" bold>
            Nick Deis
          </Text>
        </Box>

        <Box>
          <Link url="mailto:nickjdeis@gmail.com">
            <Text color="cyan">nickjdeis@gmail.com</Text>
          </Link>

          <Text bold color="whiteBright">
            {" | "}
          </Text>
          <Text color="cyan">614.315.3681</Text>
        </Box>
      </Box>
      <Box flexDirection="row" justifyContent="space-between">
        <Link url="https://github.com/nickdeis">
          <Text underline color="magenta">
            https://github.com/nickdeis
          </Text>
        </Link>
        <Link url="https://github.com/nickdeis" fallback={false}>
          <Text underline color="magenta">
            https://www.linkedin.com/in/nick-deis
          </Text>
        </Link>
      </Box>
      <SectionHeader>Skills</SectionHeader>
      <SkillSection skills={skills} />
      <SectionHeader>Experience</SectionHeader>
      {experience.map((job, i) => (
        <Job key={i} {...job} />
      ))}
      <SectionHeader>Education & Certifications</SectionHeader>
      {education.map((config, key) => (
        <Certification key={key} {...config} />
      ))}
      <SectionHeader>Opensource & Public Projects</SectionHeader>
    </Box>
  );
}

const bulletChar = "•";
function Points({ achievements }: Pick<JobConfig, "achievements">) {
  if (!achievements) return null;
  const points = achievements.map((point, i) => (
    <Text key={i} color="white">
      {bulletChar} {point}
    </Text>
  ));
  return <Box flexDirection="column">{points}</Box>;
}

type EventProps = {
  title: string;
  subtitle?: string;
  endYear?: number | "Present";
  startYear?: number;
  paddingY?: number;
};

function EventDisplay({
  title,
  subtitle,
  endYear,
  startYear,
  children,
  paddingY = 1,
}: PropsWithChildren<EventProps>) {
  return (
    <Box flexDirection="column" paddingY={paddingY}>
      <Box flexDirection="row" justifyContent="space-between">
        <Box flexDirection="row">
          <Text bold color="blue">
            {title}
          </Text>
          {subtitle && (
            <Box paddingLeft={2}>
              <Text italic color="white">
                {subtitle}
              </Text>
            </Box>
          )}
        </Box>
        <Text color="yellow">
          <FormatTime start={startYear} end={endYear} />
        </Text>
      </Box>
      {children}
    </Box>
  );
}

function Certification({ name, endYear, note, source, startYear }: CertConfig) {
  return (
    <EventDisplay
      title={name}
      subtitle={source}
      startYear={startYear}
      endYear={endYear}
    >
      {note && <Markdown>{note}</Markdown>}
    </EventDisplay>
  );
}

function Job({ title, achievements, employer, endYear, startYear }: JobConfig) {
  return (
    <EventDisplay
      title={title}
      subtitle={employer}
      startYear={startYear}
      endYear={endYear}
    >
      <Points achievements={achievements} />
    </EventDisplay>
  );
}

function SectionHeader({ children }: PropsWithChildren) {
  return (
    <Box marginTop={1} {...borderBottomOnly} borderStyle={"single"}>
      <Text bold color="magentaBright">
        {children}
      </Text>
    </Box>
  );
}

export function renderTerminalToString() {
  return render(<TerminalResume resume={getConfig()} />).lastFrame()!;
}
