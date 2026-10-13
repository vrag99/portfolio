"use client";
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
import { Markdown } from "@/components/ui/markdown";

const ICON_MAP: { [key: string]: Icon } = {
  github: GithubLogo,
  linkedin: LinkedinLogo,
  twitter: XLogo,
  email: Envelope,
};

const Description = () => {
  return (
    <div className="space-y-6">
      <Markdown className="prose dark:prose-invert">
        {`Hey, I'm Garv, a full stack engineer, and have built things across the stack - from design systems and component libraries to container runtimes and deployment pipelines. I care a lot about how things feel, not just how they work.
        \\
        I'm currently a founding engineer at [Neander](https://neander.ai), the multiplayer IDE for business teams. Before that: founding engineer at a stealth AI startup in NYC, developer at SDSLabs, and won a lot of hacks. Type \`/achievements\` in the chat down there to know more.
        \\
        On the side I built [Dex](https://heydex.co), an AI knowledge base for teams that stays organized without the manual overhead. It's in beta with 100+ users.
        `}
      </Markdown>
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
