import { Badge } from "@/components/ui/badge";
import { Project } from "@/lib/types";
import { Github } from "lucide-react";
import React from "react";
import { motion } from "motion/react";

const ProjectRenderer = ({ projects }: { projects: Project[] }) => {
  return (
    <motion.div className="space-y-3">
      {projects.map((project, i) => (
        <motion.div
          key={i}
          className="flex flex-col gap-2 border-l-2 border-primary px-2 py-3 bg-muted/30 rounded-r"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.5, 
            delay: i * 0.2,
            ease: "easeOut" 
          }}
        >
          <div className="flex flex-row gap-2 items-center text-primary">
            <h1 className="text-2xl font-highlight font-semibold italic text-primary">
              {project.title}
            </h1>
            <motion.a 
              href={project.github}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Github size={16} />
            </motion.a>
          </div>
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
                    delay: i * 0.2 + 0.4 + (j * 0.05),
                  }}
                >
                  <Badge
                    className="mr-2 mb-2 bg-accent text-accent-foreground border-b-2 border-accent-foreground/20"
                  >
                    {tag}
                  </Badge>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ProjectRenderer;