"use client";

import { useState } from "react";
import { Experience } from "@/lib/types";
import { ExperienceCard } from "@/components/home/experience-section";
import { motion } from "motion/react";

const ExperienceRenderer = ({
  experience,
}: {
  experience: Experience[];
}) => {
  const [expanded, setExpanded] = useState<number | null>(0);

  return (
    <div className="w-full divide-y divide-dashed divide-muted-foreground/30">
      {experience.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: i * 0.1 }}
        >
          <ExperienceCard
            item={item}
            isExpanded={expanded === i}
            onToggle={() => setExpanded(expanded === i ? null : i)}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default ExperienceRenderer;
