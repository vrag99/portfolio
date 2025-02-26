import { AiResponse } from "@/lib/types";
import MarkdownRenderer from "./markdown-renderer";
import ProjectRenderer from "./project-renderer";
import TimelineRenderer from "./timeline-renderer";
import SocialsRenderer from "./socials-renderer";

const Renderer = ({ response }: { response: AiResponse }) => {
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
    default:
      return null;
  }
};

export default Renderer;
