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


    let result = await agent.streamText(messages);

    try {
      const response = result.toUIMessageStreamResponse({
        originalMessages: messages,
      });

      return response;
    } catch (streamError) {
      // If the stream fails due to no output, try adding a follow-up prompt
      if ((streamError as Error).message?.includes("No output generated")) {
        console.warn("⚠️  No output generated, retrying with emphasis...");
        
        // Add a system message to force text output
        const messagesWithPrompt = [
          ...messages,
          {
            role: "system" as const,
            content: "Remember: You MUST provide text in your response. Write at least one sentence explaining what you're doing."
          }
        ];
        
        result = await agent.streamText(messagesWithPrompt);
        
        return result.toUIMessageStreamResponse({
          originalMessages: messages,
        });
      }
      throw streamError;
    }
  } catch (error) {
    console.error("Error details:", {
      name: (error as Error).name,
      message: (error as Error).message,
      stack: (error as Error).stack,
    });
    
    return Response.json(
      { 
        error: "Internal server error",
        details: (error as Error).message 
      }, 
      { status: 500 }
    );
  }
}
