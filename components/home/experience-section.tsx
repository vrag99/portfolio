"use client";

import { useState } from "react";
import { EXPERIENCE } from "@/content/portfolio/experience";
import { Experience } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";

const formatDate = (date: string) =>
  new Date(date).toLocaleString("en-US", { month: "short", year: "numeric" });

export const ExperienceCard = ({
  item,
  isExpanded,
  onToggle,
}: {
  item: Experience;
  isExpanded: boolean;
  onToggle: () => void;
}) => (
  <div>
    <button
      onClick={onToggle}
      className="w-full text-left flex items-start gap-4 py-4 cursor-pointer"
    >
      <Avatar className="size-12 rounded-lg shrink-0">
        {item.logo && <AvatarImage src={item.logo} alt={item.company} />}
        <AvatarFallback className="rounded-lg text-sm font-semibold">
          {item.company[0]}
        </AvatarFallback>
      </Avatar>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <Link
            href={item.link}
            target="_blank"
            onClick={(e) => e.stopPropagation()}
            className="text-lg font-semibold hover:underline hover:underline-offset-2 hover:decoration-dashed"
          >
            {item.company}
          </Link>
          <Badge variant="secondary">
            {item.type}
          </Badge>
        </div>
        <p className="text-muted-foreground font-medium">{item.role}</p>
      </div>

      <div className="text-right shrink-0 flex items-start gap-2 font-medium">
        <div className="space-y-2">
          <p className="text-sm whitespace-nowrap">
            {formatDate(item.startTime)} -{" "}
            {item.endTime ? formatDate(item.endTime) : "Present"}
          </p>
          <p className="text-sm text-muted-foreground">{item.location}</p>
        </div>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="h-4 w-4 text-muted-foreground mt-0.5" />
        </motion.div>
      </div>
    </button>

    <AnimatePresence initial={false}>
      {isExpanded && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          <div className="pb-4 pl-16 space-y-4">
            <ul className="list-disc list-outside pl-4 space-y-1.5">
              {item.bullets.map((bullet, i) => (
                <li
                  key={i}
                  className="text-muted-foreground leading-relaxed font-medium"
                >
                  {bullet}
                </li>
              ))}
            </ul>
            {item.techStack.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {item.techStack.map((tech) => (
                  <Badge key={tech} variant={'accent'} >
                    {tech}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

const ExperienceSection = () => {
  const [expanded, setExpanded] = useState<number | null>(0);

  return (
    <div className="space-y-4">
      <h3 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
        Experience
      </h3>
      <div className="divide-y divide-dashed divide-muted-foreground/30">
        {EXPERIENCE.map((item, i) => (
          <ExperienceCard
            key={i}
            item={item}
            isExpanded={expanded === i}
            onToggle={() => setExpanded(expanded === i ? null : i)}
          />
        ))}
      </div>
    </div>
  );
};

export default ExperienceSection;
