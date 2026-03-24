import { Experience } from "@/lib/types";

export const EXPERIENCE: Experience[] = [
  {
    company: "Stealth AI Startup",
    role: "Founding Engineer",
    startTime: "2024-06",
    endTime: "2024-09",
    location: "New York, USA - Remote",
    logo: "/experiences/stealth.jpeg",
    link: "#",
    bullets: [
      "Worked as a founding engineer at a New York based stealth AI startup",
      "Built the product end-to-end from component libraries to deployment pipelines",
    ],
    techStack: ["TypeScript", "React", "Next.js", "Python", "Docker"],
  },
  {
    company: "Uniswap Hook Incubator",
    role: "Cohort Fellow",
    startTime: "2025-10",
    endTime: "2025-12",
    logo: "/experiences/uhi.png",
    location: "Remote",
    link: "https://explorer.zora.energy/token/0x11158a1751eA90124715F5bE2474BD05d284858b/instance/48",
    bullets: [
      "Selected as one of the top 100 fellows worldwide for the Uniswap Hook Incubator program",
      "Built innovative solutions in the DeFi space using Uniswap's Hook protocol",
    ],
    techStack: ["Solidity", "Uniswap V4", "Foundry", "TypeScript"],
  },
  {
    company: "SDSLabs",
    role: "Developer",
    logo: "/experiences/sdslabs.svg",
    startTime: "2023-04",
    location: "IIT Roorkee",
    link: "https://team.sdslabs.co/",
    bullets: [
      "Student-run tech organization at IIT Roorkee",
      "Contributed to various projects and participated in numerous hackathons",
    ],
    techStack: ["Go", "React", "TypeScript", "Docker", "PostgreSQL"],
  },
  {
    company: "WatchOut!",
    role: "Editor",
    startTime: "2023-03",
    endTime: "2024-02",
    logo: "/experiences/watchout.jpeg",
    location: "IIT Roorkee",
    link: "https://watchout.iitr.ac.in/",
    bullets: [
      "Student-run media organization at IIT Roorkee",
      "Covered events, wrote articles and was part of the design team for magazine",
    ],
    techStack: ["Figma", "JavaScript", "HTML/CSS"],
  },
];
