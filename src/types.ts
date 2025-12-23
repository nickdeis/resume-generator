export type ResumeConfig = {
  Skills: Record<string, string[]>;
  Links: Record<string, LinkConfig>;
  Experience: JobConfig[];
  "Education & Certifications": CertConfig[];
  Projects: ProjectConfig[];
};

export type LinkConfig = {
  href: string;
  icon: string;
  text: string;
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
