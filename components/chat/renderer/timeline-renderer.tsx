import {
  Timeline,
  TimelineItem,
  TimelineTitle,
  TimelineDescription,
  TimelineTime,
  TimelineHeader,
  TimelineItemType,
} from "@/components/ui/timeline";
import { Achievement } from "@/lib/types";

const TimelineRenderer = ({ timeline }: { timeline: Achievement[] }) => {
  return (
    <Timeline>
      {timeline.map((item, i) => (
        <TimelineItem key={i}>
          <TimelineHeader>
            <TimelineTime variant={"outline"}>
              {item.timestamp.toLocaleString("en-US", {
                month: "short",
                year: "numeric",
              })}
            </TimelineTime>
            <TimelineTitle>{item.title}</TimelineTitle>
          </TimelineHeader>
          {item.description && (
            <TimelineDescription className="font-medium">
              {item.description}
            </TimelineDescription>
          )}
        </TimelineItem>
      ))}
    </Timeline>
  );
};

export default TimelineRenderer;
