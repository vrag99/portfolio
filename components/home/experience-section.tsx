"use client";

import { EXPERIENCE } from "@/content/portfolio/experience";
import {
  Timeline,
  TimelineItem,
  TimelineTitle,
  TimelineDescription,
  TimelineTime,
  TimelineHeader,
} from "@/components/ui/timeline";
import BlurFade from "@/components/ui/blur-fade";
import Link from "next/link";

const ExperienceSection = () => {
  return (
    <div className="space-y-6">
      <h3 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
        Experience
      </h3>
      <Timeline>
        {EXPERIENCE.map((item, i) => (
          <BlurFade key={i} inView delay={i * 0.15}>
            <TimelineItem>
              <TimelineHeader>
                <TimelineTime
                  variant="outline"
                  className="border-b-2 inline-flex normal-case w-36 h-8"
                >
                  {new Date(item.startTime).toLocaleString("en-US", {
                    month: "short",
                    year: "numeric",
                  })}{" "}
                  -{" "}
                  {item.endTime
                    ? new Date(item.endTime).toLocaleString("en-US", {
                        month: "short",
                        year: "numeric",
                      })
                    : "Present"}
                </TimelineTime>
                <TimelineTitle className="font-serif italic">
                  <Link
                    target="_blank"
                    className="transition-all hover:underline hover:underline-offset-2 hover:decoration-dashed"
                    href={item.link}
                  >
                    {item.title}
                  </Link>
                </TimelineTitle>
              </TimelineHeader>
              {item.description && (
                <TimelineDescription className="font-medium">
                  {item.description}
                </TimelineDescription>
              )}
            </TimelineItem>
          </BlurFade>
        ))}
      </Timeline>
    </div>
  );
};

export default ExperienceSection;
