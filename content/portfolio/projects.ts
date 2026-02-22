import { type Project } from "@/lib/types";

export const PROJECTS: Project[] = [
  {
    title: "Dex",
    description:
      "Your complete & extendable memory management, currently in waitlist access.",
    tags: [],
    link: "https://dex.sdslabs.co",
  },
  {
    title: "ValidAI",
    description:
      "Decentralized AI platform, built on EigenLayer AVS and Othentic. AI agents for automating smart contract auditing + an AI marketplace with subscription-based royalties, incentivizing ML researchers community.",
    tags: ["Vite", "Rust", "Solidity", "Llama", "EigenLayer"],
    github: "https://github.com/h4shk4t/validAI", 
  },
  {
    title: "Mosaic Protocol",
    description:
      "Dynamic loan lending platform with staking rewards, along with governance DAO based on Arch Ecosystem. Stood 2nd in Archway Hunt-A-Thon.",
    tags: ["Rust", "TypeScript"],
    github: "https://github.com/0xnullifier/Mosaic-Protocol",
  },
  {
    title: "Zeus",
    description:
      "It is an in-house container runtime implementation in SDSLabs. It's a learning project - to make up an OCI-compatible runtime from scratch and patching up shortcomings of existing runtimes.",
    tags: ["Go", "Linux"],
    github: "https://github.com/sdslabs/zeus",
  },
  {
    title: "AssembleFibo",
    description:
      "Fibonacci series generator, but in assembly. A fun project to deep dive into x86_64 instruction set.",
    tags: ["Assembly", "x86_64"],
    github: "https://github.com/vrag99/assemble-fibo",
  },
];
