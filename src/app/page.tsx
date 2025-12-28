import { About } from "@/components/home/About";
import { Events } from "@/components/home/Events";
import { Hero } from "@/components/home/Hero";
import { Partners } from "@/components/home/Partners";
import { Support } from "@/components/home/Support";
import { Timeline } from "@/components/home/Timeline";

export default function Home() {
  return (
    <main className="bg-raisinBlack min-h-screen">
      <Hero />
      <Partners />
      <About />
      <Timeline />
      <Events />
      <Support />
    </main>
  );
}
