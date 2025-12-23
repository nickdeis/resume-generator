import { readFileSync } from "fs";

import type { GrammarResponse } from "./grammar-type";

import { DEFAULT_RESUME_CONFIG } from "../resfig";
import OpenAI from "openai";
import * as TJS from "typescript-json-schema";

const program = TJS.getProgramFromFiles(
  [`${__dirname}/grammer-type.ts`],
  { include: [] },
  __dirname
);
const schema = TJS.generateSchema(program, "GrammarResponse", {
  required: true,
  ignoreErrors: true,
});
const model = "gpt-4.1-nano";
const experiences = DEFAULT_RESUME_CONFIG.Experience.map(
  (experience) => experience.achievements || []
).flat();
const projects = DEFAULT_RESUME_CONFIG.Projects.map(
  (project) => project.points
).flat();
const client = new OpenAI({
  apiKey: process.env["OPENAPI_KEY"], // This is the default and can be omitted
});
const json = JSON.stringify(experiences.concat(projects));
const response = await client.responses.create({
  model,
  instructions: "You are a grammer and spelling expert",
  input: [
    { role: "system", content: "You are a grammar and spelling expert." },
    {
      role: "user",
      content:
        "Grammar and spellcheck check the sentence is this JSON string array:",
    },
    { role: "user", content: json }, // Add the JSON string as context
    { role: "user", content: "Here are some rules to follow:" },
    {
      role: "user",
      content: `
    - Make as few changes as possible
    - make sure it's in past tense
    - If no grammar or spelling changes are needed, don't include it in the json response at all
    - Don't add punctuation
    - Only focus on sentences, not titles
    - Response with just a json that can be parsed with JSON.parse 
    `,
    }, // Add the main input
  ],
  store: true,
  tools: [
    {
      type: "function",
      name: "grammar_output_response",
      description: "Output the response in this format",
      //@ts-ignore
      parameters: schema,
    },
  ],
  tool_choice: { name: "grammar_output_response", type: "function" },
});
//@ts-ignore
const output: GrammarResponse = JSON.parse(response.output[0].arguments);

const changes = output.sentences.filter((sentence) => sentence.changeNeeded);

console.log(JSON.stringify(changes, null, 2));
