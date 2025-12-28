import { About } from "@/components/home/About";
import { CallToAction } from "@/components/home/CallToAction";
import { Events } from "@/components/home/Events";
import { Hero } from "@/components/home/Hero";
import { Newsletter } from "@/components/home/Newsletter";
import { Partners } from "@/components/home/Partners";
import { SocialProof } from "@/components/home/SocialProof";
import { Support } from "@/components/home/Support";
import { Timeline } from "@/components/home/Timeline";

export default function Home() {
  return (
    <main className="bg-raisinBlack min-h-screen">
      {/* 1. HERO - Wideo na pełny ekran */}
      <Hero />
      <Partners />
      <About />
      <Timeline />
      <Events />
      <Support />
      <SocialProof />
      <Newsletter />
      <CallToAction />
    </main>
  );
}
