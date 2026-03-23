import { TextLoop } from "@/components/ui/text-loop";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

const Hero = () => {
  const { setTheme, theme } = useTheme();
  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-5xl lg:text-6xl font-semibold">
          Hi, I am{" "}
          <span className="font-bold tracking-tight text-primary"> Garv </span>
          👋
        </h1>
        <button
          className="hover:bg-secondary/20 dark:hover:bg-secondary/60 text-primary rounded-xl p-2 h-9 w-9 grid place-items-center trasnition-colors duration-150"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
          <Sun className="size-5 dark:hidden" />
          <Moon className="hidden size-5 dark:block" />
          <span className="sr-only">Toggle theme</span>
        </button>
      </div>
      <h2 className="text-2xl lg:text-3xl text-muted-foreground inline-flex items-baseline whitespace-pre-wrap font-medium">
        & I love to{" "}
        <TextLoop
          className="font-serif text-secondary-foreground font-bold italic self-baseline"
          transition={{
            type: "spring",
            stiffness: 900,
            damping: 80,
            mass: 10,
          }}
          variants={{
            initial: {
              y: 20,
              rotateX: 90,
              opacity: 0,
            },
            animate: {
              y: 0,
              rotateX: 0,
              opacity: 1,
            },
            exit: {
              y: -20,
              rotateX: -90,
              opacity: 0,
            },
          }}
        >
          <span>make stuff</span>
          <span>break stuff</span>
        </TextLoop>
      </h2>
    </>
  );
};

export default Hero;
