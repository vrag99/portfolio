import { Social } from "@/lib/types";
import {
  Envelope,
  GithubLogo,
  Icon,
  LinkedinLogo,
  XLogo,
} from "@phosphor-icons/react";
import { motion } from "motion/react";
import React from "react";

const ICON_MAP: { [key: string]: Icon } = {
  github: GithubLogo,
  linkedin: LinkedinLogo,
  twitter: XLogo,
  email: Envelope,
};

const SocialsRenderer = ({ socials }: { socials: Social[] }) => {
  return (
    <motion.div
      className="flex flex-row gap-2"
      transition={{ staggerChildren: 0.2 }}
    >
      {socials.map((social, i) => (
        <motion.a
          key={i}
          className="flex flex-col gap-2 px-8 py-4 bg-muted/30 rounded-lg border-b-2 transition-all duration-200 hover:bg-muted/40"
          target="_blank"
          rel="noopener noreferrer"
          href={social.link}
          aria-label={social.title}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.2,
            delay: i * 0.1,
            ease: "anticipate",
          }}
        >
          {React.createElement(ICON_MAP[social.icon], {
            weight: "regular",
            className: "w-6 h-6 text-muted-foreground",
          })}
        </motion.a>
      ))}
    </motion.div>
  );
};

export default SocialsRenderer;
