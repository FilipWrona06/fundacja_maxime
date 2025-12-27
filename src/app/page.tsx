import { Hero } from "@/components/home/Hero";

export default function Home() {
  return (
    <main className="bg-raisinBlack min-h-screen">
      <Hero />

      {/* Tutaj będą kolejne sekcje, np. O nas, Aktualności itp. */}
      <section className="py-20 text-center text-philippineSilver">
        <p>Tu zaczyna się dalsza część strony...</p>
      </section>
    </main>
  );
}
