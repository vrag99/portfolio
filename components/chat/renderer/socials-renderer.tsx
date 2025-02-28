import { Social } from "@/lib/types";
import React from "react";

const SocialsRenderer = ({ socials }: { socials: Social[] }) => {
  return (
    <div className="grid grid-cols-2 gap-2">
      {socials.map((social, i) => {
        const Icon = social.icon;
        console.log(social);
        return (
          <a
            key={i}
            className="flex flex-col gap-2 border px-6 shadow-inner py-4 bg-muted/30 rounded-lg group"
            target="_blank"
            rel="noopener noreferrer"
            href={social.link}
            aria-label={social.title}
          >
            <Icon className="w-8 h-8" />
          </a>
        );
      })}
    </div>
  );
};

export default SocialsRenderer;
