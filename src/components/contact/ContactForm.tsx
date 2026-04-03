"use client";

import Image from "next/image";
import { useState } from "react";
import FadeIn from "@/components/ui/FadeIn";

// Tematy wiadomości do interaktywnego wyboru przeniesione z page.tsx
const subjects = [
  "Współpraca",
  "Bilety i Wydarzenia",
  "Dla Prasy",
  "Dołączenie do zespołu",
  "Inne",
];

export default function ContactForm() {
  const [activeSubject, setActiveSubject] = useState(subjects[0]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Symulacja wysyłania formularza
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // TODO: Tutaj w przyszłości podepniesz prawdziwe API
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 5000); // Wróć do formularza po 5s
    }, 1500);
  };

  return (
    <section className="bg-oxfordBlue relative z-10 w-full overflow-hidden px-6 py-24 lg:px-12 lg:py-40">
      <div className="pointer-events-none absolute top-1/2 left-[-10%] z-0 h-150 w-150 -translate-y-1/2 opacity-2">
        <Image
          src="/Asset-1.svg"
          alt=""
          fill
          className="object-contain brightness-0 invert"
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-5xl">
        <FadeIn>
          <div className="mb-16 text-center lg:mb-24">
            <span className="font-montserrat text-arylideYellow mb-4 block text-[0.65rem] font-bold tracking-[0.4em] uppercase">
              Bezpośrednia wiadomość
            </span>
            <h2 className="font-montserrat text-4xl leading-tight font-bold text-white md:text-5xl lg:text-6xl">
              Napisz do nas.
            </h2>
          </div>
        </FadeIn>

        <div className="relative rounded-3xl border border-white/10 bg-white/3 p-8 shadow-2xl backdrop-blur-md md:p-12 lg:p-16">
          {isSubmitted ? (
            <div className="animate-fade-in-up flex flex-col items-center justify-center py-20 text-center">
              <div className="bg-arylideYellow text-oxfordBlue mb-8 flex h-24 w-24 items-center justify-center rounded-full">
                <svg
                  className="h-10 w-10"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={3}
                >
                  <title>Ikona sukcesu</title>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
              </div>
              <h3 className="font-youngest mb-4 text-4xl text-white md:text-5xl">
                Dziękujemy za wiadomość!
              </h3>
              <p className="font-montserrat max-w-md font-light text-white/70">
                Twoja wiadomość trafiła w odpowiednie ręce. Odpowiemy
                najszybciej, jak to możliwe (zazwyczaj w ciągu 24 godzin).
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-12">
              <FadeIn delay="100ms">
                <span className="font-montserrat mb-4 block text-xs font-bold tracking-[0.2em] text-white/50 uppercase">
                  01. W jakiej sprawie piszesz?
                </span>

                <div className="flex flex-wrap gap-3">
                  {subjects.map((subject) => (
                    <button
                      key={subject}
                      type="button"
                      onClick={() => setActiveSubject(subject)}
                      className={`font-montserrat rounded-full border px-6 py-3 text-xs font-bold tracking-widest uppercase transition-all duration-300 ${
                        activeSubject === subject
                          ? "border-arylideYellow bg-arylideYellow text-raisinBlack"
                          : "border-white/20 bg-transparent text-white/60 hover:border-white/50 hover:text-white"
                      }`}
                    >
                      {subject}
                    </button>
                  ))}
                </div>

                <div
                  className={`grid transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    activeSubject === "Inne"
                      ? "mt-6 grid-rows-[1fr] opacity-100"
                      : "mt-0 grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="group relative">
                      <input
                        type="text"
                        placeholder="Wpisz krótko swój temat..."
                        className="font-montserrat focus:border-arylideYellow w-full border-b border-white/20 bg-transparent py-3 text-lg font-light text-white transition-colors outline-none placeholder:text-white/20 md:text-xl"
                        required={activeSubject === "Inne"}
                      />
                      <div className="bg-arylideYellow absolute bottom-0 left-0 h-0.5 w-0 transition-all duration-500 ease-out group-focus-within:w-full" />
                    </div>
                  </div>
                </div>
              </FadeIn>

              <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-8">
                <FadeIn delay="200ms" className="group relative">
                  <span className="font-montserrat group-focus-within:text-arylideYellow mb-2 block text-xs font-bold tracking-[0.2em] text-white/50 uppercase transition-colors">
                    02. Twoje Imię i Nazwisko
                  </span>
                  <input
                    type="text"
                    required
                    placeholder="Jan Kowalski"
                    className="font-montserrat focus:border-arylideYellow w-full border-b border-white/20 bg-transparent py-4 text-xl font-light text-white transition-colors outline-none placeholder:text-white/20 md:text-2xl"
                  />
                  <div className="bg-arylideYellow absolute bottom-0 left-0 h-0.5 w-0 transition-all duration-500 ease-out group-focus-within:w-full" />
                </FadeIn>

                <FadeIn delay="300ms" className="group relative">
                  <span className="font-montserrat group-focus-within:text-arylideYellow mb-2 block text-xs font-bold tracking-[0.2em] text-white/50 uppercase transition-colors">
                    03. Twój e-mail
                  </span>
                  <input
                    type="email"
                    required
                    placeholder="jan@domena.pl"
                    className="font-montserrat focus:border-arylideYellow w-full border-b border-white/20 bg-transparent py-4 text-xl font-light text-white transition-colors outline-none placeholder:text-white/20 md:text-2xl"
                  />
                  <div className="bg-arylideYellow absolute bottom-0 left-0 h-0.5 w-0 transition-all duration-500 ease-out group-focus-within:w-full" />
                </FadeIn>
              </div>

              <FadeIn delay="400ms" className="group relative">
                <span className="font-montserrat group-focus-within:text-arylideYellow mb-4 block text-xs font-bold tracking-[0.2em] text-white/50 uppercase transition-colors">
                  04. Treść wiadomości
                </span>
                <textarea
                  required
                  rows={4}
                  placeholder="Opisz nam szczegóły..."
                  className="font-montserrat focus:border-arylideYellow w-full resize-none border-b border-white/20 bg-transparent py-4 text-xl leading-relaxed font-light text-white transition-colors outline-none placeholder:text-white/20 md:text-2xl"
                />
                <div className="bg-arylideYellow absolute bottom-0 left-0 h-0.5 w-0 transition-all duration-500 ease-out group-focus-within:w-full" />
              </FadeIn>

              <FadeIn
                delay="500ms"
                className="mt-4 flex flex-col items-center justify-between gap-6 sm:flex-row sm:items-end"
              >
                <span className="font-montserrat max-w-xs text-center text-[0.6rem] font-medium tracking-widest text-white/40 uppercase sm:text-left">
                  * Zgodnie z naszą polityką prywatności, Twoje dane są
                  bezpieczne i służą wyłącznie do kontaktu.
                </span>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group bg-arylideYellow font-montserrat text-oxfordBlue relative flex w-full items-center justify-center gap-4 overflow-hidden rounded-full px-10 py-5 text-xs font-bold tracking-[0.2em] uppercase transition-all duration-700 hover:scale-[1.03] hover:shadow-[0_0_40px_-10px_rgba(239,203,111,0.5)] disabled:opacity-70 disabled:hover:scale-100 sm:w-auto"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    {isSubmitting ? "Wysyłanie..." : "Wyślij wiadomość"}
                    {!isSubmitting && (
                      <svg
                        className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <title>Ikona wyślij</title>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14 5l7 7m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    )}
                  </span>
                  <div className="absolute inset-0 z-0 h-full w-full -translate-x-full rounded-full bg-white/40 transition-transform duration-700 ease-out group-hover:translate-x-0" />
                </button>
              </FadeIn>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
