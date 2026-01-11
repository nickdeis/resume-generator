import type { IconType } from "react-icons";
export type ResumeConfig = {
  skills: Record<string, string[]>;
  links: {
    header: LinkConfig[];
    subheader: LinkConfig[];
  };
  experience: JobConfig[];
  education: CertConfig[];
  projects: ProjectConfig[];
};

export type LinkConfig = {
  href: string;
  Icon?: IconType;
  text: string;
  className?: string;
  mobileText?: string;
};

export type JobConfig = {
  title: string;
  employer?: string;
  startYear?: number;
  endYear?: number | "Present";
  achievements?: string[];
};

export type CertConfig = {
  name: string;
  source?: string;
  startYear?: number;
  endYear?: number;
  note?: string;
};

export type ProjectConfig = {
  name: string;
  points: string[];
  link: string;
  tech: string[];
};
