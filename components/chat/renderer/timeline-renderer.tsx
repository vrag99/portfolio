import {
  Timeline,
  TimelineItem,
  TimelineTitle,
  TimelineDescription,
  TimelineTime,
  TimelineHeader,
} from "@/components/ui/timeline";
import { Achievement } from "@/lib/types";
import { motion } from "motion/react";
import Link from "next/link";


const TimelineRenderer = ({ timeline }: { timeline: Achievement[] }) => {
  return (
    <Timeline>
      {timeline.map((item, i) => (
        <TimelineItem key={i}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: i * 0.2, ease: "easeOut" }}
          >
            <TimelineHeader>
              <TimelineTime variant={"outline"} className="border-b-2">
                {new Date(item.timestamp).toLocaleString("en-US", {
                  month: "short",
                  year: "numeric",
                })}
              </TimelineTime>
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.4,
                  delay: i * 0.2,
                  ease: "easeOut",
                }}
              >
                <TimelineTitle className="font-serif italic">
                  <Link
                    target="_blank"
                    className="transition-all hover:underline hover:underline-offset-2 hover:decoration-dashed"
                    href={item.link}
                  >
                    {item.title}
                  </Link>
                </TimelineTitle>
              </motion.div>
            </TimelineHeader>
          </motion.div>
          {item.description && (
            <motion.div
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.4,
                delay: i * 0.2,
                ease: "easeOut",
                type: "spring",
              }}
            >
              <TimelineDescription className="font-medium">
                {item.description}
              </TimelineDescription>
            </motion.div>
          )}
        </TimelineItem>
      ))}
    </Timeline>
  );
};

export default TimelineRenderer;
