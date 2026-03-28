import About from "@/components/home/About";
import CallToAction from "@/components/home/CallToAction";
import Hero from "@/components/home/Hero";
import LatestUpdates from "@/components/home/LatestUpdates";
import Testimonials from "@/components/home/Testimonials";
import Values from "@/components/home/Values";

export default function HomePage() {
  return (
    <main className="bg-raisinBlack flex min-h-screen flex-col">
      {/* Tutaj potencjalnie Twój Navigation Bar. Warto mu dać absolute/fixed i z-index, by leżał na Hero */}

      <Hero />
      <About />
      <Testimonials />
      <LatestUpdates />
      <Values />
      <CallToAction />
    </main>
  );
}
