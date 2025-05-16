import {
  ABOUT,
  PROJECTS,
  SKILL_SET,
  SOCIALS,
  TIMELINE,
} from "@/data/portfolio";
import { getCommandResponse } from "./utils";
import { useChatStore } from "./store/chat-store";
import { chat } from "./groq";
import { AiResponse } from "./types";

const buildResumeContext = (): string => {
  const projectsStr = PROJECTS.map(
    (p) =>
      `- ${p.title}: ${p.description} (Tech: ${p.tags.join(", ")}) (Link: ${
        p.github
      })`
  ).join("\n");

  const timelineStr = TIMELINE.map(
    (a) =>
      `- ${a.title} (${a.timestamp}): ${a.description} ${
        a.link ? ` [Link](${a.link})` : ""
      }`
  ).join("\n");

  const socialsStr = SOCIALS.map((s) => `- ${s.title}: ${s.link}`).join("\n");

  const languagesStr = SKILL_SET.languages.map((l) => `- ${l}`).join("\n");

  const technologiesStr = SKILL_SET.technologies
    .map((t) => `- ${t}`)
    .join("\n");

  return `
  About:
  ${ABOUT}
  
  Projects:
  ${projectsStr}
  
  Achievements Timeline:
  ${timelineStr}

  Skill Set:
  - Languages:
    ${languagesStr}
  - Technologies:
    ${technologiesStr}
  
  Socials:
  ${socialsStr}
    `.trim();
};

export const buildPrompt = (question: string) => `
  You are a helpful AI portfolio agent for a developer named Garv Makkar.
  
  Based on the resume context below, answer the user's question in the format of an array of responses, each being a valid JSON object from the following types:
  
  ---
  
  1. { "type": "text", "data": string }
  2. { "type": "projects", "data": Project[] }
  3. { "type": "timeline", "data": Achievement[] }
  4. { "type": "socials", "data": Social[] }
  
  ---
  
  Here are the definitions of each type:
  
  - Project = { "title": string, "description": string, "tags": string[], "github": string }
  - Achievement = { "title": string, "description": string, "timestamp": string (ISO format), "link": string }
  - Social = { "title": string, "link": string, "icon": string (e.g. 'github', 'linkedin', 'email', 'twitter') }
  
  Respond only with a **valid JSON array**, following this format strictly:
  
  Example:
  [
    { "type": "text", "data": "Here are my projects." },
    { "type": "projects", "data": [ { "title": "...", ... } ] }
  ]

  IMPORTANT:
  - Make sure each projects, timeline and socials response is preceded by a descriptive text response that introduces it.
  - For example, before returning project data, include a text response like "Here are some relevant projects:" first.
  - You are an extroverted, joyful and friendly person, who loves to code and help others. Reply in a friendly and helpful manner.
  - Your responses should be concise and relevant to the user's question.
  - Avoid unnecessary details and focus on providing the information that the user is looking for.
  
  DO NOT explain anything outside of the JSON.
  
  ---
  
  Resume Context:
  ${buildResumeContext()}
  
  User Question: ${question}
  `;

export const useAnswerUser = () => {
  const { showAiResponse, addAiLoadingBubble, addBubble } = useChatStore();

  return (userInput: string) => {
    addBubble({
      sender: "user",
      data: userInput,
    });
    addAiLoadingBubble();
    if (userInput.startsWith("/")) {
      const res = getCommandResponse(userInput);
      showAiResponse([res]);
    }
    else {
      chat([{ role: "user", content: buildPrompt(userInput) }])
        .then((res) => {
          const parsedResponse = JSON.parse(res ?? "[]") as AiResponse[];
          showAiResponse(parsedResponse);
        })
        .catch((error) => {
          console.error("Error parsing response:", error);
          showAiResponse([
            {
              type: "text",
              data: "Maybe something's off on my end right now. Sorry :(",
            },
          ]);
        });
    }
  };
};
