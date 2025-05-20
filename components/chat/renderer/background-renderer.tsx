import { Background } from "@/lib/types";
import {
  Timeline,
  TimelineItem,
  TimelineTitle,
  TimelineDescription,
  TimelineTime,
  TimelineHeader,
} from "@/components/ui/timeline";
import { motion } from "motion/react";

// TODO: make a custom renderer like linkedin for experience and education

const BackgroundRenderer = ({ background }: { background: Background[] }) => {
  return (
    <Timeline>
      {background.map((item, i) => (
        <TimelineItem key={i}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: i * 0.2, ease: "easeOut" }}
          >
            <TimelineHeader>
              <TimelineTime
                variant={"outline"}
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
                  {item.title}
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

export default BackgroundRenderer;
