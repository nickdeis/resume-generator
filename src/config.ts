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

export const DEFAULT_RESUME_CONFIG: ResumeConfig = {
  Skills: {
    Languages: ["Typescript", "Python", "Java", "Scala", "SQL"],
    Frontend: ["React", "Tailwind", "Webpack", "d3", "Mapbox", "Vite"],
    Data: ["Snowflake", "Postgres", "Neptune", "Spark", "Numpy", "OpenSearch"],
    Backend: ["Spring", "node.js", "Next.js", "Express", "FastAPI", "GraphQL"],
    Operations: ["AWS", "Lambdas", "Maven", "Jenkins", "Pendo", "Datadog"],
    Analytics: [
      "Bayesian Networks",
      "Machine Learning",
      "Time Series",
      "GIS",
      "LLM",
    ],
  },
  Links: {
    Github: {
      href: "https://github.com/nickdeis",
      icon: "fa-brands fa-github-square",
      text: "github.com/nickdeis",
    },
    LinkedIn: {
      href: "https://www.linkedin.com/in/nick-deis/",
      icon: "fa-brands fa-linkedin",
      text: "linkedin.com/in/nick-deis",
    },
  },
  Experience: [
    {
      title: "Lead Software Engineer, Data Visualization",
      employer: "Interos",
      startYear: 2021,
      endYear: "Present",
      achievements: [
        "Deployed a next-gen conversational AI that replies with maps, graphs, and tables",
        "Saved $600k+ and increased performance 2x by building an AI-powered search implementation",
        "Built a tracker of natural disasters and their impact on supply chains using Protomaps and PostGIS",
        "Led a team that developed industry leading and patented visualizations",
      ],
    },
    {
      title: "Senior Software Engineer",
      employer: "Capital One",
      startYear: 2019,
      endYear: 2021,
      achievements: [
        "Unified several products under a federated API using GraphQL, Serverless, and Step Functions",
        "Built a serverless graph visualization tool using AWS Neptune, React, and d3",
        "Worked with several teams across lines of business to visualize graph data",
      ],
    },
    {
      title: "Senior Software Engineer",
      employer: "BAE Systems AI",
      startYear: 2014,
      endYear: 2019,
      achievements: [
        "Designed the UI/UX for an AI enablement platform using React, Webpack, and Vert.x",
        "Built realtime user experiences using Websockets",
        "Programmed high performance manifold learning visualizations using WebGL",
        "Led the engineering effort for a national level project using Apache Storm and Spring",
        "Extended Elastic Search to have both document and field security for banking applications",
      ],
    },
    {
      title: "Data Analytics Consultant",
      employer: "BAE Systems AI",
      startYear: 2013,
      endYear: 2014,
      achievements: [
        "Configured and deployed Spring web applications",
        "Extracted and analyzed data using SAS for Tier One banks and insurers",
      ],
    },
    {
      title: "Research Assistant",
      employer: "The Ohio State University",
      startYear: 2013,
      achievements: ["Parsed Census Data booklets using Python and OCR"],
    },
    {
      title: "Data Analyst",
      employer: "Yay Bikes!",
      startYear: 2011,
      endYear: 2012,
      achievements: [
        "Consulted on all data collection and analysis for the largest cycling safety campaign in the history of Ohio",
        "Wrote statistical reports, illustrated infographs, and presented results to the Ohio Department of Transportation",
      ],
    },
  ],
  "Education & Certifications": [
    { name: "AWS Certified Solutions Architect - Associate", startYear: 2019 },
    {
      name: "BS, Economics",
      source: "The Ohio State University",
      endYear: 2013,
      note: "Minors in Mathematics and Statistics",
    },
    {
      name: "Undergraduate Research Fellowship",
      startYear: 2011,
      endYear: 2013,
      note: "[Focus Group Composition in Heterogeneous Populations](https://kb.osu.edu/bitstream/handle/1811/54959/Focus_Group_Composition_in_Heterogenous_Populations_6613.2.pdf?sequence=1)",
    },
  ],
  Projects: [
    {
      name: "eslint-plugin-no-secrets",
      link: "https://github.com/nickdeis/eslint-plugin-no-secrets",
      tech: ["ESLint", "Typescript"],
      points: [
        "An eslint plugin to find text that might be credentials",
        "Over **140 stars** on github",
        "Used by SpaceX, Spotify, and Microsoft",
      ],
    },
    {
      name: "resume-generator",
      link: "https://github.com/nickdeis/resume-generator",
      points: [
        "*Yes!* The resume you are currently reading!",
        "Focus on Flexbox and Grid",
        "APIs to convert to PDF",
      ],
      tech: ["Vite", "Tailwind", "Puppeteer"],
    },
  ],
};
