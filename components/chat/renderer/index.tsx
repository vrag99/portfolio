import { AiResponse } from "@/lib/types";
import type { UIMessage } from "@ai-sdk/react";
import type { Project, Achievement, Social, Background } from "@/lib/types";
import ProjectRenderer from "./project-renderer";
import TimelineRenderer from "./timeline-renderer";
import SocialsRenderer from "./socials-renderer";
import MarkdownRenderer from "./markdown-renderer";
import BackgroundRenderer from "./background-renderer";

type RendererProps = 
  | { response: AiResponse }
  | { part: UIMessage['parts'][number] };

const Renderer = (props: RendererProps) => {
  // Handle legacy AiResponse format
  if ('response' in props) {
    const { response } = props;
    const type = response.type;

    switch (type) {
      case "text":
        return <MarkdownRenderer markdown={response.data} />;
      case "projects":
        return <ProjectRenderer projects={response.data} />;
      case "timeline":
        return <TimelineRenderer timeline={response.data} />;
      case "socials":
        return <SocialsRenderer socials={response.data} />;
      case "background":
        return <BackgroundRenderer background={response.data} />;
      default:
        return null;
    }
  }

  // Handle UIMessage part format (tool calls)
  const { part } = props;

  console.log("Rendering part:", part);

  // Handle text parts
  if (part.type === "text") {
    return <MarkdownRenderer markdown={part.text} />;
  }

  // Handle tool-getProjects
  if (part.type === "tool-get_projects") {    
    console.log("Rendering tool-getProjects part:", part);
    switch (part.state) {
      case "input-available":
        return <div className="text-sm text-muted-foreground">Loading projects...</div>;
      case "output-available":
        return <ProjectRenderer projects={(part.output as Record<string, unknown>).projects as Project[]} />;
      case "output-error":
        return <div className="text-sm text-destructive">Error loading projects: {part.errorText}</div>;
      default:
        return null;
    }
  }

  // Handle tool-getAchievements
  if (part.type === "tool-get_achievements") {
    switch (part.state) {
      case "input-available":
        return <div className="text-sm text-muted-foreground">Loading timeline...</div>;
      case "output-available":
        return <TimelineRenderer timeline={(part.output as Record<string, unknown>).achievements as Achievement[]} />;
      case "output-error":
        return <div className="text-sm text-destructive">Error loading timeline: {part.errorText}</div>;
      default:
        return null;
    }
  }

  // Handle tool-getSocials
  if (part.type === "tool-get_socials") {
    switch (part.state) {
      case "input-available":
        return <div className="text-sm text-muted-foreground">Loading socials...</div>;
      case "output-available":
        return <SocialsRenderer socials={(part.output as Record<string, unknown>).socials as Social[]} />;
      case "output-error":
        return <div className="text-sm text-destructive">Error loading socials: {part.errorText}</div>;
      default:
        return null;
    }
  }

  // Handle tool-getExperience
  if (part.type === "tool-get_experience") {
    switch (part.state) {
      case "input-available":
        return <div className="text-sm text-muted-foreground">Loading experience...</div>;
      case "output-available":
        return <BackgroundRenderer background={part.output as Background[]} />;
      case "output-error":
        return <div className="text-sm text-destructive">Error loading experience: {part.errorText}</div>;
      default:
        return null;
    }
  }

  // Handle tool-getEducation
  if (part.type === "tool-get_education") {
    switch (part.state) {
      case "input-available":
        return <div className="text-sm text-muted-foreground">Loading education...</div>;
      case "output-available":
        return <BackgroundRenderer background={part.output as Background[]} />;
      case "output-error":
        return <div className="text-sm text-destructive">Error loading education: {part.errorText}</div>;
      default:
        return null;
    }
  }

  // Handle tool-getSkills
  if (part.type === "tool-get_skills") {
    switch (part.state) {
      case "input-available":
        return <div className="text-sm text-muted-foreground">Loading skills...</div>;
      case "output-available":
        return (
          <div className="space-y-2">
            <MarkdownRenderer markdown={`\`\`\`json\n${JSON.stringify(part.output, null, 2)}\n\`\`\``} />
          </div>
        );
      case "output-error":
        return <div className="text-sm text-destructive">Error loading skills: {part.errorText}</div>;
      default:
        return null;
    }
  }

  // Handle tool-getAbout
  if (part.type === "tool-get_about") {
    switch (part.state) {
      case "input-available":
        return <div className="text-sm text-muted-foreground">Loading about info...</div>;
      case "output-available":
        return <MarkdownRenderer markdown={part.output as string} />;
      case "output-error":
        return <div className="text-sm text-destructive">Error loading about: {part.errorText}</div>;
      default:
        return null;
    }
  }

  // Fallback for unknown part types
  return null;
};

export default Renderer;
