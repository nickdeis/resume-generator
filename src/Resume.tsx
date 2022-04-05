import React from "react";
import { Job } from "./Job";
import { Section } from "./Section";
import { SkillRow } from "./SkillRow";

function App() {
  return (
    <div>
      <div
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <span
          className="gray-900"
          style={{ fontWeight: 300, fontSize: 56, paddingRight: 20 }}
        >
          <span>Nick Deis</span>
        </span>

        <span className="hyperlinks">
          <a className="top-hyperlink" href="tel:6143153681">
            614.315.3681
          </a>
          <span style={{ paddingLeft: 5, paddingRight: 5 }}>|</span>
          <a className="top-hyperlink" href="mailto:nickjdeis@gmail.com">
            nickjdeis@gmail.com
          </a>
        </span>
        <div
          className="flex-pull-right"
          style={{ display: "flex", alignSelf: "center", alignItems: "center" }}
        >
          <a className="badge" href="https://github.com/nickdeis">
            <i className="fa-brands fa-github-square"></i>
          </a>
          <a className="badge" href="https://www.linkedin.com/in/nick-deis/">
            <i className="fa-brands fa-linkedin"></i>
          </a>

          <div className="address" style={{ paddingLeft: 10 }}>
            <div>2121 N Westmoreland Apt 227</div>
            <div>Arlington, VA 22213</div>
          </div>
        </div>
      </div>
      <hr
        style={{ marginTop: 0, borderTopWidth: 3, borderTopColor: "#6c757d" }}
      />
      <Section name="Skills">
        <section style={{ paddingLeft: 20 }}>
          <SkillRow
            category="Frontend"
            skills={[
              "Typescript",
              "React",
              "Tailwind",
              "Webpack",
              "d3",
              "three.js",
              "GraphQL",
            ]}
          />
          <SkillRow
            category="Backend"
            skills={[
              "Java",
              "Spring",
              "Elastic Search",
              "node.js",
              "Python",
              "Scala",
              "Next.js",
              "Vert.x",
            ]}
          />
          <SkillRow
            category="Data"
            skills={[
              "Snowflake",
              "Gremlin",
              "R",
              "SQL",
              "SAS",
              "Oracle",
              "Postgres",
              "Neptune",
              "Storm",
            ]}
          />
          <SkillRow
            category="Analytics"
            skills={[
              "Bayesian Networks",
              "Social Network Analysis",
              "Machine Learning",
              "Time Series",
            ]}
          />
          <SkillRow
            category="DevOps"
            skills={[
              "AWS",
              "Step Functions",
              "Lambdas",
              "Maven",
              "Jenkins",
              "LaunchDarkly",
              "Pendo",
            ]}
          />
        </section>
      </Section>
      <Section name="Experience">
        <Job
          title="Data Visualization Engineer Specialist"
          employer="Interos"
          start={2021}
          end="Present"
          points={[
            "Led a team that developed innovative and patentable visualizations (Patent Provisional)",
            "Designed and implemented API, caching and storage strategies for high performance data visualizations",
          ]}
        />
        <Job
          title="Senior Software Engineer"
          employer="Capital One"
          start={2019}
          end={2021}
          points={[
            "Unified several products under a federated API using GraphQL, Serverless, and Step Functions",
            "Built a serverless graph visualization tool using AWS Neptune, React, and d3",
            "Worked with several teams across lines of business to visualize graph data",
          ]}
        />
        <Job
          title="Engineering Consultant"
          employer="Deis Software Designs"
          start={2017}
          end="Present"
          points={[
            "Researched user personas to model preferences using Bayesian Networks",
          ]}
        />
        <Job
          title="Senior Software Engineer"
          employer="BAE Systems AI"
          start={2014}
          end={2019}
          points={[
            "Designed the UI/UX for a data scientist enablement platform using React, Webpack, and Vert.x",
            "Built realtime user experiences using Websockets",
            "Programmed high performance manifold learning visualizations using WebGL",
            "Led the engineering effort for a national level project using Apache Storm and Spring",
            "Extended Elastic Search to have both document and field security for banking applications",
          ]}
        />
        <Job
          title="Data Analytics Consultant"
          employer="BAE Systems AI"
          start={2013}
          end={2014}
          points={[
            "Configured and deployed Spring web applications",
            "Extracted and analyzed data using SAS for Tier One banks and insurers",
          ]}
        />
        <Job
          title="Research Assistant"
          employer="The Ohio State University"
          start={2013}
          points={["Parsed Census Data booklets using Python and OCR"]}
        />
        <Job
          title="Data Analyst"
          employer="Yay Bikes!"
          start={2011}
          end={2012}
          points={[
            "Consulted on all data collection and analysis for the largest cycling safety campaign in the history of Ohio",
            "Wrote statistical reports, illustrated infographs, and presented results to the Ohio Department of Transportation",
          ]}
        />
      </Section>
      <Section name="Education & Certfications">
        <Job
          title="AWS Certified Solutions Architect - Associate"
          start={2019}
        />
        <Job
          title="BS, Economics"
          employer="The Ohio State University"
          start={2009}
          end={2013}
          points={["Minors in Mathematics and Statistics"]}
          listStyle={{ listStyleType: "none", paddingLeft: 0 }}
        />
        <Job
          title="Summer Undergraduate Research Fellowship"
          employer="The Ohio State University"
          start={2012}
          points={[
            <a href="https://kb.osu.edu/bitstream/handle/1811/54959/Focus_Group_Composition_in_Heterogenous_Populations_6613.2.pdf?sequence=1">
              Focus Group Composition in Heterogeneous Populations
            </a>,
          ]}
          listStyle={{ listStyleType: "none", paddingLeft: 0 }}
        />
      </Section>
    </div>
  );
}

export default App;
