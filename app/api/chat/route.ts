import { groq } from "@ai-sdk/groq";
import { Agent, VoltAgent, createTool } from "@voltagent/core";
import { honoServer } from "@voltagent/server-hono";
import { z } from "zod";

// Simple calculator tool
const calculatorTool = createTool({
  name: "calculate",
  description: "Perform basic mathematical calculations",
  parameters: z.object({
    expression: z
      .string()
      .describe(
        "Mathematical expression to evaluate (e.g., '2 + 2', '10 * 5')"
      ),
  }),
  execute: async (args) => {
    try {
      // Simple evaluation - in production, use a proper math parser
      const result = eval(args.expression);
      return { result, expression: args.expression };
    } catch {
      return {
        error: "Invalid mathematical expression",
        expression: args.expression,
      };
    }
  },
});

// Main agent
export const agent = new Agent({
  name: "ResumeAgent",
  instructions: "You are a helpful assistant.",
  model: groq("llama-3.3-70b-versatile"),
  tools: [calculatorTool],
});

// VoltAgent singleton (augments global scope during dev to avoid re-instantiation)
declare global {
  // eslint-disable-next-line no-var
  var voltAgentInstance: VoltAgent | undefined;
}

function getVoltAgentInstance() {
  if (!globalThis.voltAgentInstance) {
    globalThis.voltAgentInstance = new VoltAgent({
      agents: {
        agent,
      },
      server: honoServer(),
    });
  }
  return globalThis.voltAgentInstance;
}

export const voltAgent = getVoltAgentInstance();

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    
    // Get the last user message for the agent
    const lastMessage = messages[messages.length - 1];
    console.log("Received message:", lastMessage);
    
    // Stream response from agent
    const result = await agent.streamText([lastMessage]);
    console.log(result.text);
    
    // Return UI message stream response with original messages preserved
    return result.toUIMessageStreamResponse({
      originalMessages: messages,
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
