import { TextLoop } from "@/components/ui/text-loop";
import { useTheme } from "next-themes";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";

const Hero = () => {
  const { setTheme, theme } = useTheme();
  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold">
          Hi, I am{" "}
          <span className="font-bold tracking-tight text-primary"> Garv </span>
          👋
        </h1>
        <AnimatedThemeToggler />
      </div>
      <h2 className="text-xl md:text-2xl lg:text-3xl text-muted-foreground inline-flex items-baseline whitespace-pre-wrap font-medium">
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
