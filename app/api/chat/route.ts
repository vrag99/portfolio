import { VoltAgent } from "@voltagent/core";
import { honoServer } from "@voltagent/server-hono";
import { agent } from "@/lib/agent";

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

    // Stream response from agent with tools
    const result = await agent.streamText([lastMessage]);

    // Return UI message stream response with original messages preserved
    return result.toUIMessageStreamResponse({
      originalMessages: messages,
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
