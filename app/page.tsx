import { AskBox, Hero } from "@/components/home";
import BlurFade from "@/components/ui/blur-fade";
import { TextEffect } from "@/components/ui/text-effect";

export default function Home() {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <div className="space-y-8 font-medium">
        <BlurFade delay={0.4} className="space-y-4" inView>
          <Hero />
        </BlurFade>
        <BlurFade delay={0.8} direction="up" inView>
          <AskBox />
        </BlurFade>
      </div>
    </div>
  );
}
