"use client";

import { Badge } from "@/components/ui/badge";
import { Project } from "@/lib/types";
import { motion } from "motion/react";
import {
  ExternalLinkIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

const ProjectRenderer = ({ projects }: { projects: Project[] }) => {
  return (
    <motion.div className="space-y-3 w-full mb-3">
      {projects.map((project, i) => (
        <motion.a
          key={i}
          className="flex flex-col gap-2 border-l-2 border-primary px-2 py-3 bg-muted/30 rounded-r group w-full"
          target="_blank"
          href={project.github}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: i * 0.2,
            ease: "easeOut",
          }}
        >
          <motion.div className="inline-flex items-center gap-2 text-primary">
            <h1 className="text-2xl font-highlight font-semibold italic">
              {project.title}
            </h1>
            <ExternalLinkIcon
              className={cn(
                "w-4 h-4 mb-1",
                "md:-translate-x-2 md:translate-y-2 md:opacity-0 transition-all duration-300",
                "md:group-hover:opacity-100 md:group-hover:translate-y-0 md:group-hover:translate-x-0"
              )}
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: i * 0.2 + 0.2 }}
          >
            {project.description}
          </motion.p>
          <div className="flex flex-row flex-wrap">
            {project.tags.map((tag, j) => {
              return (
                <motion.div
                  key={j}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: i * 0.2 + 0.4 + j * 0.05,
                  }}
                >
                  <Badge className="mr-2 mb-2 bg-accent text-accent-foreground border-b-2 border-accent-foreground/20">
                    {tag}
                  </Badge>
                </motion.div>
              );
            })}
          </div>
        </motion.a>
      ))}
    </motion.div>
  );
};

export default ProjectRenderer;
