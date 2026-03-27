// src/app/kontakt/page.tsx
"use client";

import Image from "next/image";
import { useState } from "react";
import FadeIn from "@/components/ui/FadeIn";
import { siteConfig, socialLinks } from "@/data/navigation";

// Tematy wiadomości do interaktywnego wyboru
const subjects = [
  "Współpraca",
  "Bilety i Wydarzenia",
  "Dla Prasy",
  "Dołączenie do zespołu",
  "Inne",
];

export default function ContactPage() {
  const [activeSubject, setActiveSubject] = useState(subjects[0]);
  const [copiedItem, setCopiedItem] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Funkcja kopiowania do schowka z mikro-animacją
  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedItem(type);
    setTimeout(() => setCopiedItem(null), 2500);
  };

  // Symulacja wysyłania formularza
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 5000); // Wróć do formularza po 5s
    }, 1500);
  };

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-raisinBlack selection:bg-arylideYellow selection:text-raisinBlack">
      {/* ============================================================================ */}
      {/* TŁO: WOLNO OBRACAJĄCY SIĘ ZNAK WODNY (BRAND ASSET) */}
      {/* ============================================================================ */}
      <div className="pointer-events-none fixed -right-64 -top-64 z-0 h-200 w-200 opacity-3 lg:-right-40 lg:-top-40 lg:h-300 lg:w-300">
        <Image
          src="/Asset-2.svg"
          alt=""
          fill
          className="animate-[spin_120s_linear_infinite] object-contain brightness-0 invert"
        />
      </div>

      {/* ============================================================================ */}
      {/* HERO SECTION - KINOWA TYPOGRAFIA */}
      {/* ============================================================================ */}
      <section className="relative z-10 flex min-h-[70vh] w-full flex-col justify-end px-6 pb-24 pt-40 lg:min-h-[85vh] lg:px-12 lg:pb-32">
        {/* Przeźroczysty gigantyczny napis z tyłu */}
        <div className="pointer-events-none absolute left-0 top-1/2 z-0 -translate-y-1/2 select-none opacity-2 mix-blend-overlay">
          <span className="whitespace-nowrap font-montserrat text-[25vw] font-black leading-none text-white">
            CONTACT
          </span>
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl">
          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
            {/* ZMIANA: Zmiana siatki, aby napis spływał naturalnie pod spód */}
            <div className="lg:col-span-9">
              <FadeIn>
                <div className="mb-6 flex items-center gap-4">
                  <div className="h-px w-12 bg-arylideYellow" />
                  <span className="font-montserrat text-[0.65rem] font-bold uppercase tracking-[0.4em] text-arylideYellow">
                    Rozmowa
                  </span>
                </div>
              </FadeIn>
              <FadeIn delay="200ms">
                <h1 className="font-montserrat text-5xl font-black leading-[1.05] tracking-tight text-white md:text-7xl lg:text-[7.5rem]">
                  Zacznijmy od <br />
                  <span className="relative top-2 inline-block -rotate-2 font-youngest text-6xl font-normal text-philippineSilver md:text-8xl lg:text-[10rem]">
                    pierwszego
                  </span>{" "}
                  akordu.
                </h1>
              </FadeIn>

              {/* ZMIANA: Przeniesiony, wyśrodkowany tekst podrzędny */}
              <FadeIn delay="400ms">
                <p className="mt-12 max-w-2xl font-montserrat text-base font-light leading-relaxed text-white/70 md:text-lg lg:mt-20">
                  Niezależnie od tego, czy chcesz zorganizować wspólne
                  wydarzenie, dołączyć do zespołu, czy po prostu porozmawiać o
                  sztuce – jesteśmy tutaj.
                </p>
              </FadeIn>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-1/2 h-24 w-px -translate-x-1/2 overflow-hidden bg-white/10 hidden md:block">
          <div className="absolute left-0 top-0 h-full w-full animate-scroll-line bg-arylideYellow" />
        </div>
      </section>

      {/* ============================================================================ */}
      {/* SEKCJA KONTAKTOWA (DIRECT) - REDAKCYJNY GRID & CLICK TO COPY */}
      {/* ============================================================================ */}
      <section className="relative z-20 w-full border-t border-white/10 bg-[#1c1c1c] px-6 py-24 lg:px-12 lg:py-32">
        <div className="mx-auto w-full max-w-7xl">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-24">
            {/* LEWA KOLUMNA: Tytuł */}
            <div className="lg:col-span-4">
              <FadeIn>
                <h2 className="font-youngest text-4xl text-arylideYellow md:text-5xl lg:text-6xl">
                  Nasze Namiary
                </h2>
                <p className="mt-8 font-montserrat text-sm font-light leading-relaxed text-white/50 max-w-xs">
                  Kliknij w adres e-mail lub numer telefonu, aby natychmiast
                  skopiować je do schowka.
                </p>
              </FadeIn>
            </div>

            {/* PRAWA KOLUMNA: Interaktywne Dane Kontaktowe */}
            <div className="flex flex-col gap-16 lg:col-span-8">
              {/* EMAIL */}
              <FadeIn
                delay="200ms"
                className="group relative border-b border-white/10 pb-8"
              >
                <span className="mb-4 block font-montserrat text-[0.6rem] font-bold uppercase tracking-[0.4em] text-white/30">
                  Dział Ogólny / E-mail
                </span>
                <button
                  type="button"
                  onClick={() => handleCopy(siteConfig.contact.email, "email")}
                  // ZMIANA: items-center, gap-4
                  className="relative flex w-full items-center justify-between gap-4 text-left transition-colors duration-500 hover:text-arylideYellow"
                >
                  {/* ZMIANA: break-all dla bardzo małych ekranów i dynamiczne fonty */}
                  <span className="break-all font-montserrat text-[5vw] min-[450px]:text-2xl font-light tracking-wide text-white transition-colors duration-500 group-hover:text-arylideYellow sm:text-3xl md:text-4xl">
                    {siteConfig.contact.email}
                  </span>

                  {/* ZMIANA: shrink-0 ratuje ikonę przed wyrzuceniem poza ekran */}
                  <div className="shrink-0 overflow-hidden h-8">
                    <div
                      className={`flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${copiedItem === "email" ? "-translate-y-8" : "translate-y-0"}`}
                    >
                      <div className="flex h-8 items-center justify-end gap-3 text-white transition-colors duration-500 group-hover:text-arylideYellow">
                        <span className="hidden md:block font-montserrat text-xs font-bold uppercase tracking-widest opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                          Kopiuj
                        </span>
                        <svg
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={1.5}
                        >
                          <title>Ikona kopiowania</title>
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"
                          />
                        </svg>
                      </div>
                      <div className="flex h-8 items-center justify-end gap-2 text-arylideYellow">
                        <span className="hidden sm:block font-montserrat text-xs font-bold uppercase tracking-widest">
                          Skopiowano!
                        </span>
                        <svg
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <title>Ikona sukcesu</title>
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4.5 12.75l6 6 9-13.5"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </button>
                <div className="absolute bottom-0 left-0 h-px w-0 bg-arylideYellow transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full" />
              </FadeIn>

              {/* TELEFON */}
              <FadeIn
                delay="300ms"
                className="group relative border-b border-white/10 pb-8"
              >
                <span className="mb-4 block font-montserrat text-[0.6rem] font-bold uppercase tracking-[0.4em] text-white/30">
                  Biuro / Rezerwacje
                </span>
                <button
                  type="button"
                  onClick={() => handleCopy(siteConfig.contact.phone, "phone")}
                  className="relative flex w-full items-center justify-between gap-4 text-left transition-colors duration-500 hover:text-arylideYellow"
                >
                  <span className="whitespace-nowrap font-montserrat text-[6vw] min-[450px]:text-3xl font-light tracking-wide text-white transition-colors duration-500 group-hover:text-arylideYellow sm:text-4xl">
                    {siteConfig.contact.phone}
                  </span>

                  {/* ZMIANA: shrink-0 */}
                  <div className="shrink-0 overflow-hidden h-8">
                    <div
                      className={`flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${copiedItem === "phone" ? "-translate-y-8" : "translate-y-0"}`}
                    >
                      <div className="flex h-8 items-center justify-end gap-3 text-white transition-colors duration-500 group-hover:text-arylideYellow">
                        <span className="hidden md:block font-montserrat text-xs font-bold uppercase tracking-widest opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                          Kopiuj
                        </span>
                        <svg
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={1.5}
                        >
                          <title>Ikona kopiowania</title>
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"
                          />
                        </svg>
                      </div>
                      <div className="flex h-8 items-center justify-end gap-2 text-arylideYellow">
                        <span className="hidden sm:block font-montserrat text-xs font-bold uppercase tracking-widest">
                          Skopiowano!
                        </span>
                        <svg
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <title>Ikona sukcesu</title>
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4.5 12.75l6 6 9-13.5"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </button>
                <div className="absolute bottom-0 left-0 h-px w-0 bg-arylideYellow transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full" />
              </FadeIn>

              {/* ADRES KORESPONDENCYJNY */}
              <FadeIn
                delay="400ms"
                className="group relative border-b border-white/10 pb-8"
              >
                <span className="mb-4 block font-montserrat text-[0.6rem] font-bold uppercase tracking-[0.4em] text-white/30">
                  Adres Korespondencyjny / Studio
                </span>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noreferrer"
                  className="relative flex w-full items-center justify-between gap-4 transition-colors duration-500 hover:text-arylideYellow"
                >
                  {/* ZMIANA: dynamiczny tekst */}
                  <span className="whitespace-pre-line font-montserrat text-[5vw] min-[450px]:text-xl font-light tracking-wide text-white transition-colors duration-500 group-hover:text-arylideYellow sm:text-2xl md:text-3xl lg:text-4xl">
                    {siteConfig.contact.address}
                  </span>

                  {/* ZMIANA: shrink-0 */}
                  <div className="shrink-0 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 transition-all duration-500 group-hover:border-arylideYellow group-hover:bg-arylideYellow group-hover:text-raisinBlack md:h-12 md:w-12">
                    <svg
                      className="h-4 w-4 md:h-5 md:w-5 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <title>Link do mapy</title>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                      />
                    </svg>
                  </div>
                </a>
                <div className="absolute bottom-0 left-0 h-px w-0 bg-arylideYellow transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full" />
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================================ */}
      {/* HIGH-END FORMULARZ KONTAKTOWY */}
      {/* ============================================================================ */}
      <section className="relative z-10 w-full bg-oxfordBlue px-6 py-24 lg:px-12 lg:py-40 overflow-hidden">
        {/* Dekoracyjne nuty w Oxford Blue section */}
        <div className="pointer-events-none absolute left-[-10%] top-1/2 z-0 h-150 w-150 -translate-y-1/2 opacity-2">
          <Image
            src="/Asset-1.svg"
            alt=""
            fill
            className="object-contain brightness-0 invert"
          />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-5xl">
          <FadeIn>
            <div className="text-center mb-16 lg:mb-24">
              <span className="mb-4 block font-montserrat text-[0.65rem] font-bold uppercase tracking-[0.4em] text-arylideYellow">
                Bezpośrednia wiadomość
              </span>
              <h2 className="font-montserrat text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
                Napisz do nas.
              </h2>
            </div>
          </FadeIn>

          <div className="relative bg-white/3 backdrop-blur-md border border-white/10 p-8 md:p-12 lg:p-16 shadow-2xl rounded-3xl">
            {isSubmitted ? (
              // EKRAN SUKCESU (Po wysłaniu)
              <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in-up">
                <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-arylideYellow text-oxfordBlue">
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
                <h3 className="mb-4 font-youngest text-4xl text-white md:text-5xl">
                  Dziękujemy za wiadomość!
                </h3>
                <p className="font-montserrat text-white/70 font-light max-w-md">
                  Twoja wiadomość trafiła w odpowiednie ręce. Odpowiemy
                  najszybciej, jak to możliwe (zazwyczaj w ciągu 24 godzin).
                </p>
              </div>
            ) : (
              // WŁAŚCIWY FORMULARZ
              <form onSubmit={handleSubmit} className="flex flex-col gap-12">
                {/* 1. INTERAKTYWNY WYBÓR TEMATU + POLE DLA "INNE" */}
                <FadeIn delay="100ms">
                  <span className="mb-4 block font-montserrat text-xs font-bold uppercase tracking-[0.2em] text-white/50">
                    01. W jakiej sprawie piszesz?
                  </span>

                  <div className="flex flex-wrap gap-3">
                    {subjects.map((subject) => (
                      <button
                        key={subject}
                        type="button"
                        onClick={() => setActiveSubject(subject)}
                        className={`rounded-full border px-6 py-3 font-montserrat text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
                          activeSubject === subject
                            ? "border-arylideYellow bg-arylideYellow text-raisinBlack"
                            : "border-white/20 bg-transparent text-white/60 hover:border-white/50 hover:text-white"
                        }`}
                      >
                        {subject}
                      </button>
                    ))}
                  </div>

                  {/* Dynamicznie pojawiające się pole tekstowe dla tematu "Inne" */}
                  <div
                    className={`grid transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      activeSubject === "Inne"
                        ? "grid-rows-[1fr] opacity-100 mt-6"
                        : "grid-rows-[0fr] opacity-0 mt-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="group relative">
                        <input
                          type="text"
                          placeholder="Wpisz krótko swój temat..."
                          className="w-full border-b border-white/20 bg-transparent py-3 font-montserrat text-lg font-light text-white outline-none placeholder:text-white/20 transition-colors focus:border-arylideYellow md:text-xl"
                          required={activeSubject === "Inne"}
                        />
                        <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-arylideYellow transition-all duration-500 ease-out group-focus-within:w-full" />
                      </div>
                    </div>
                  </div>
                </FadeIn>

                <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-8">
                  {/* 2. IMIĘ I NAZWISKO */}
                  <FadeIn delay="200ms" className="group relative">
                    <span className="mb-2 block font-montserrat text-xs font-bold uppercase tracking-[0.2em] text-white/50 transition-colors group-focus-within:text-arylideYellow">
                      02. Twoje Imię i Nazwisko
                    </span>
                    <input
                      type="text"
                      required
                      placeholder="Jan Kowalski"
                      className="w-full border-b border-white/20 bg-transparent py-4 font-montserrat text-xl font-light text-white outline-none placeholder:text-white/20 transition-colors focus:border-arylideYellow md:text-2xl"
                    />
                    {/* Złota linia wjeżdżająca na focus */}
                    <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-arylideYellow transition-all duration-500 ease-out group-focus-within:w-full" />
                  </FadeIn>

                  {/* 3. ADRES E-MAIL */}
                  <FadeIn delay="300ms" className="group relative">
                    <span className="mb-2 block font-montserrat text-xs font-bold uppercase tracking-[0.2em] text-white/50 transition-colors group-focus-within:text-arylideYellow">
                      03. Twój e-mail
                    </span>
                    <input
                      type="email"
                      required
                      placeholder="jan@domena.pl"
                      className="w-full border-b border-white/20 bg-transparent py-4 font-montserrat text-xl font-light text-white outline-none placeholder:text-white/20 transition-colors focus:border-arylideYellow md:text-2xl"
                    />
                    <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-arylideYellow transition-all duration-500 ease-out group-focus-within:w-full" />
                  </FadeIn>
                </div>

                {/* 4. TREŚĆ WIADOMOŚCI */}
                <FadeIn delay="400ms" className="group relative">
                  <span className="mb-4 block font-montserrat text-xs font-bold uppercase tracking-[0.2em] text-white/50 transition-colors group-focus-within:text-arylideYellow">
                    04. Treść wiadomości
                  </span>
                  <textarea
                    required
                    rows={4}
                    placeholder="Opisz nam szczegóły..."
                    className="w-full resize-none border-b border-white/20 bg-transparent py-4 font-montserrat text-xl font-light leading-relaxed text-white outline-none placeholder:text-white/20 transition-colors focus:border-arylideYellow md:text-2xl"
                  />
                  <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-arylideYellow transition-all duration-500 ease-out group-focus-within:w-full" />
                </FadeIn>

                {/* 5. SUBMIT */}
                <FadeIn
                  delay="500ms"
                  className="mt-4 flex flex-col items-center justify-between gap-6 sm:flex-row sm:items-end"
                >
                  <span className="font-montserrat text-[0.6rem] font-medium uppercase tracking-widest text-white/40 max-w-xs text-center sm:text-left">
                    * Zgodnie z naszą polityką prywatności, Twoje dane są
                    bezpieczne i służą wyłącznie do kontaktu.
                  </span>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group relative flex w-full sm:w-auto items-center justify-center gap-4 overflow-hidden rounded-full bg-arylideYellow px-10 py-5 font-montserrat text-xs font-bold uppercase tracking-[0.2em] text-oxfordBlue transition-all duration-700 hover:scale-[1.03] hover:shadow-[0_0_40px_-10px_rgba(239,203,111,0.5)] disabled:opacity-70 disabled:hover:scale-100"
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

      {/* ============================================================================ */}
      {/* SOCIAL MEDIA - GIGANTYCZNE LINKI */}
      {/* ============================================================================ */}
      <section className="relative z-10 w-full bg-[#141414] py-24 text-center lg:py-32">
        <FadeIn>
          <span className="font-youngest text-3xl text-white/40 md:text-4xl">
            Śledź naszą podróż na żywo
          </span>
        </FadeIn>

        <div className="mx-auto mt-12 flex max-w-4xl flex-wrap justify-center gap-4 px-6 md:gap-8">
          {socialLinks.map((social, index) => (
            <FadeIn key={social.name} delay={`${index * 150}ms`}>
              <a
                href={social.url}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-3 rounded-full border border-white/10 bg-transparent px-8 py-4 font-montserrat text-sm font-bold uppercase tracking-widest text-white transition-all duration-500 hover:-translate-y-1 hover:border-arylideYellow hover:bg-arylideYellow hover:text-raisinBlack md:px-10 md:py-5 md:text-base"
              >
                <div className="scale-125 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12">
                  {social.icon}
                </div>
                <span className="hidden sm:block">{social.name}</span>
              </a>
            </FadeIn>
          ))}
        </div>
      </section>
    </main>
  );
}
