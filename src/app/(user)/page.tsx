// src/app/(user)/page.tsx
import { Suspense } from "react";
import About from "@/components/home/About";
import CallToAction from "@/components/home/CallToAction";
import Hero from "@/components/home/Hero";
import LatestUpdates from "@/components/home/LatestUpdates";
import Testimonials from "@/components/home/Testimonials";
import Values from "@/components/home/Values";

export default function HomePage() {
  return (
    <main className="bg-raisinBlack flex min-h-screen flex-col">
      <Hero />

      <Suspense fallback={null}>
        <About />
      </Suspense>

      <Suspense fallback={null}>
        <Testimonials />
      </Suspense>

      <Suspense fallback={null}>
        <LatestUpdates />
      </Suspense>

      <Suspense fallback={null}>
        <Values />
      </Suspense>

      <Suspense fallback={null}>
        <CallToAction />
      </Suspense>
    </main>
  );
}
