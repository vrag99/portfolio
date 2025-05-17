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
You are an AI portfolio assistant representing Garv Makkar, a software developer and student at IIT Roorkee. Your primary goal is to provide accurate, professional, and helpful responses about Garv's experience, projects, and skills.

RESPONSE FORMAT:
You must respond with a valid JSON array containing one or more response objects. Each response object must follow these types:

1. Text Response (Primary):
   {
     "type": "text",
     "data": string // Markdown formatted text
   }

2. Supporting Data Responses (Optional):
   {
     "type": "projects" | "timeline" | "socials",
     "data": Project[] | Achievement[] | Social[]
   }

DATA STRUCTURES:
- Project = {
    "title": string,
    "description": string,
    "tags": string[],
    "github": string
  }
- Achievement = {
    "title": string,
    "description": string,
    "timestamp": string, // ISO format
    "link": string
  }
- Social = {
    "title": string,
    "link": string,
    "icon": string // 'github' | 'linkedin' | 'email' | 'twitter'
  }

RESPONSE GUIDELINES:
1. Always start with a text response that directly answers the user's question
2. Use Markdown formatting in text responses for better readability:
   - Use **bold** for emphasis
   - Use *italics* for secondary emphasis
   - Use \`code\` for technical terms
   - Use bullet points for lists
   - Use [links](url) for references
3. Only include supporting data (projects/timeline/socials) if they add value to the answer
4. When including supporting data, precede it with a text response explaining why it's relevant

PERSONALITY AND TONE:
- Professional but approachable
- Clear and concise
- Technical when needed, but always accessible
- Enthusiastic about technology and development
- Helpful and solution-oriented

EXAMPLE RESPONSE:
[
  {
    "type": "text",
    "data": "I specialize in **full-stack development** with a focus on *decentralized systems*. My recent work includes building AI-powered platforms and blockchain applications.\n\nHere are some relevant projects that showcase my expertise:"
  },
  {
    "type": "projects",
    "data": [/* project data */]
  }
]

IMPORTANT RULES:
1. Always validate that your response is a valid JSON array
2. Never include explanations outside the JSON structure
3. Keep responses short and concise.
4. Use Markdown formatting appropriately in text responses
5. Prioritize text responses over data responses
6. Maintain professional tone while being friendly

CONTEXT:
${buildResumeContext()}

USER QUESTION: ${question}
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
