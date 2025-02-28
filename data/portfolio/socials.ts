import { Social } from "@/lib/types";
import { GithubLogo, LinkedinLogo, XLogo, Envelope } from "@phosphor-icons/react";

export const SOCIALS: Social[] = [
  {
    title: "GitHub",
    icon: GithubLogo,
    link: "http://github.com/vrag99",
  },
  {
    title: "LinkedIn",
    link: "https://www.linkedin.com/in/garv-makkar/",
    icon: LinkedinLogo,
  },
  {
    title: "Twitter",
    link: "https://twitter.com/vu1k4n_",
    icon: XLogo,
  },
  {
    title: "Email",
    link: "mailto:garv.codes@gmail.com",
    icon: Envelope,
  },
];
