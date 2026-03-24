"use client";

import { ABOUT } from "@/content/portfolio/about";
import { SOCIALS } from "@/content/portfolio/socials";
import { Social } from "@/lib/types";
import { Button } from "@/components/ui/button";
import {
  Envelope,
  GithubLogo,
  Icon,
  LinkedinLogo,
  XLogo,
  CalendarDots,
} from "@phosphor-icons/react";
import React from "react";
import { ArrowRight } from "lucide-react";

const ICON_MAP: { [key: string]: Icon } = {
  github: GithubLogo,
  linkedin: LinkedinLogo,
  twitter: XLogo,
  email: Envelope,
};

function renderAbout(text: string) {
  const parts = text.trim().split(/(\*[^*]+\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("*") && part.endsWith("*")) {
      return <em key={i}>{part.slice(1, -1)}</em>;
    }
    return part;
  });
}

const Description = () => {
  return (
    <div className="space-y-6">
      <p className="text-muted-foreground leading-relaxed font-medium prose dark:prose-invert">
        {renderAbout(ABOUT)}
      </p>
      <div className="flex flex-row gap-3">
        <Button asChild>
          <a
            href="https://cal.com/garv-makkar"
            target="_blank"
            rel="noopener noreferrer"
          >
            <CalendarDots weight="bold" />
            Book a call
          </a>
        </Button>
        <Button variant="outline" asChild>
          <a href="mailto:garv.codes@gmail.com">
            <Envelope weight="bold" />
            Send an email
          </a>
        </Button>
      </div>
      <div className="text-muted-foreground leading-relaxed font-medium">
        Here are my <span className="font-bold">socials</span>{" "}
        <ArrowRight className="inline" size={12} />{" "}
        <div className="flex flex-row gap-2 mt-2 flex-wrap">
          {SOCIALS.filter((social) => social.icon !== "email").map(
            (social: Social, i: number) => {
              const IconComp = ICON_MAP[social.icon];
              return (
                <Button key={i} size={"sm"} variant={"secondary"} asChild>
                  <a
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.title}
                  >
                    {React.createElement(IconComp, {
                      weight: "regular",
                      className: "w-5 h-5",
                    })}
                    <span>{social.title}</span>
                  </a>
                </Button>
              );
            },
          )}
        </div>
      </div>
    </div>
  );
};

export default Description;
