import { TextLoop } from "@/components/ui/text-loop";

const Hero = () => {
  return (
    <>
      <h1 className="text-5xl lg:text-6xl">Hi, I am <span className="font-semibold tracking-tight text-primary"> Garv </span>👋</h1>
      <h2 className="text-2xl lg:text-3xl text-muted-foreground inline-flex items-baseline whitespace-pre-wrap">
        & I love to{" "}
        <TextLoop
          className="font-highlight text-secondary font-bold italic self-baseline"
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
