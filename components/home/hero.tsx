import { TextLoop } from "@/components/ui/text-loop";

const Hero = () => {
  return (
    <div className="space-y-4 font-medium">
      <h1 className="text-6xl">Hi, I am Garv 👋</h1>
      <h2 className="text-3xl text-muted-foreground inline-flex items-baseline whitespace-pre-wrap">
        & I love to{" "}
        <TextLoop
          className="font-highlight text-accent-foreground font-bold italic self-baseline"
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
              filter: "blur(2px)",
            },
            animate: {
              y: 0,
              rotateX: 0,
              opacity: 1,
              filter: "blur(0px)",
            },
            exit: {
              y: -20,
              rotateX: -90,
              opacity: 0,
              filter: "blur(2px)",
            },
          }}
        >
          <span>make stuff</span>
          <span>break stuff</span>
        </TextLoop>
      </h2>
    </div>
  );
};

export default Hero;
