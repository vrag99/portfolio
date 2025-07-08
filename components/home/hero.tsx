import { TextLoop } from "@/components/ui/text-loop";

const Hero = () => {
  return (
    <>
      <h1 className="text-5xl lg:text-6xl">Hi, I am <span className="font-semibold tracking-tight text-primary"> Garv </span>👋</h1>
      <h2 className="text-2xl lg:text-3xl text-muted-foreground inline-flex items-baseline whitespace-pre-wrap">
        & I love to{" "}
        <TextLoop
          className="font-serif text-secondary dark:text-primary font-bold italic self-baseline"
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
      
      <div className="max-w-xl mx-auto mt-12 mb-8">
        <div className="space-y-6 text-center">
          <p className="text-base lg:text-lg text-muted-foreground leading-relaxed font-light">
            I'm a passionate developer who enjoys building innovative solutions and exploring new technologies. 
            When I'm not coding, you'll find me tinkering with projects, learning about the latest tech trends, 
            or diving deep into problem-solving challenges.
          </p>
          <p className="text-base lg:text-lg text-muted-foreground leading-relaxed font-light">
            I believe in the power of technology to create meaningful impact and love sharing knowledge with 
            the developer community. Whether it's building web applications, experimenting with AI, or 
            contributing to open source projects, I'm always excited about the next creative challenge.
          </p>
        </div>
      </div>
    </>
  );
};

export default Hero;
