"use client";

import Image from "next/image";
import { useState } from "react";
import { useSiteSettings } from "@/components/providers/SettingsProvider";
import FadeIn from "@/components/ui/FadeIn";
import ContactForm from "@/components/contact/ContactForm"; // <-- Nasz nowy import!
import { getSocialIcon } from "@/data/navigation";

export default function ContactPage() {
  // Pobieramy dynamiczne dane kontaktowe i social media prosto z kontekstu Sanity
  const { contact, socials } = useSiteSettings();

  // Stan potrzebny wyłącznie dla logiki sekcji "Nasze Namiary"
  const [copiedItem, setCopiedItem] = useState<string | null>(null);

  // Funkcja kopiowania do schowka z mikro-animacją
  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedItem(type);
    setTimeout(() => setCopiedItem(null), 2500);
  };

  return (
    <main className="bg-raisinBlack selection:bg-arylideYellow selection:text-raisinBlack relative min-h-screen w-full overflow-hidden">
      {/* ============================================================================ */}
      {/* TŁO: WOLNO OBRACAJĄCY SIĘ ZNAK WODNY (BRAND ASSET) */}
      {/* ============================================================================ */}
      <div className="pointer-events-none fixed -top-64 -right-64 z-0 h-200 w-200 opacity-3 lg:-top-40 lg:-right-40 lg:h-300 lg:w-300">
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
      <section className="relative z-10 flex min-h-[70vh] w-full flex-col justify-end px-6 pt-40 pb-24 lg:min-h-[85vh] lg:px-12 lg:pb-32">
        <div className="pointer-events-none absolute top-1/2 left-0 z-0 -translate-y-1/2 opacity-2 mix-blend-overlay select-none">
          <span className="font-montserrat text-[25vw] leading-none font-black whitespace-nowrap text-white">
            KONTAKT
          </span>
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl">
          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
            <div className="lg:col-span-9">
              <FadeIn>
                <div className="mb-6 flex items-center gap-4">
                  <div className="bg-arylideYellow h-px w-12" />
                  <span className="font-montserrat text-arylideYellow text-[0.65rem] font-bold tracking-[0.4em] uppercase">
                    Rozmowa
                  </span>
                </div>
              </FadeIn>
              <FadeIn delay="200ms">
                <h1 className="font-montserrat text-5xl leading-[1.05] font-black tracking-tight text-white md:text-7xl lg:text-[7.5rem]">
                  Zacznijmy od <br />
                  <span className="font-youngest text-philippineSilver relative top-2 inline-block -rotate-2 text-6xl font-normal md:text-8xl lg:text-[10rem]">
                    pierwszego
                  </span>{" "}
                  akordu.
                </h1>
              </FadeIn>

              <FadeIn delay="400ms">
                <p className="font-montserrat mt-12 max-w-2xl text-base leading-relaxed font-light text-white/70 md:text-lg lg:mt-20">
                  Niezależnie od tego, czy chcesz zorganizować wspólne
                  wydarzenie, dołączyć do zespołu, czy po prostu porozmawiać o
                  sztuce – jesteśmy tutaj.
                </p>
              </FadeIn>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-1/2 hidden h-24 w-px -translate-x-1/2 overflow-hidden bg-white/10 md:block">
          <div className="animate-scroll-line bg-arylideYellow absolute top-0 left-0 h-full w-full" />
        </div>
      </section>

      {/* ============================================================================ */}
      {/* SEKCJA KONTAKTOWA (DIRECT) - REDAKCYJNY GRID & CLICK TO COPY */}
      {/* ============================================================================ */}
      <section className="relative z-20 w-full border-t border-white/10 bg-[#1c1c1c] px-6 py-24 lg:px-12 lg:py-32">
        <div className="mx-auto w-full max-w-7xl">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-24">
            <div className="lg:col-span-4">
              <FadeIn>
                <h2 className="font-youngest text-arylideYellow text-4xl md:text-5xl lg:text-6xl">
                  Nasze Namiary
                </h2>
                <p className="font-montserrat mt-8 max-w-xs text-sm leading-relaxed font-light text-white/50">
                  Kliknij w adres e-mail lub numer telefonu, aby natychmiast
                  skopiować je do schowka.
                </p>
              </FadeIn>
            </div>

            <div className="flex flex-col gap-16 lg:col-span-8">
              {/* EMAIL */}
              <FadeIn
                delay="200ms"
                className="group relative border-b border-white/10 pb-8"
              >
                <span className="font-montserrat mb-4 block text-[0.6rem] font-bold tracking-[0.4em] text-white/30 uppercase">
                  Dział Ogólny / E-mail
                </span>
                <button
                  type="button"
                  onClick={() => handleCopy(contact.email, "email")}
                  className="hover:text-arylideYellow relative flex w-full items-center justify-between gap-4 text-left transition-colors duration-500"
                >
                  <span className="font-montserrat group-hover:text-arylideYellow text-[5vw] font-light tracking-wide break-all text-white transition-colors duration-500 min-[450px]:text-2xl sm:text-3xl md:text-4xl">
                    {contact.email}
                  </span>

                  <div className="h-8 shrink-0 overflow-hidden">
                    <div
                      className={`flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${copiedItem === "email" ? "-translate-y-8" : "translate-y-0"}`}
                    >
                      <div className="group-hover:text-arylideYellow flex h-8 items-center justify-end gap-3 text-white transition-colors duration-500">
                        <span className="font-montserrat hidden text-xs font-bold tracking-widest uppercase opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:block">
                          Kopiuj
                        </span>
                        <svg
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={1.5}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"
                          />
                        </svg>
                      </div>
                      <div className="text-arylideYellow flex h-8 items-center justify-end gap-2">
                        <span className="font-montserrat hidden text-xs font-bold tracking-widest uppercase sm:block">
                          Skopiowano!
                        </span>
                        <svg
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
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
                <div className="bg-arylideYellow absolute bottom-0 left-0 h-px w-0 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full" />
              </FadeIn>

              {/* TELEFON */}
              <FadeIn
                delay="300ms"
                className="group relative border-b border-white/10 pb-8"
              >
                <span className="font-montserrat mb-4 block text-[0.6rem] font-bold tracking-[0.4em] text-white/30 uppercase">
                  Biuro / Rezerwacje
                </span>
                <button
                  type="button"
                  onClick={() => handleCopy(contact.phone, "phone")}
                  className="hover:text-arylideYellow relative flex w-full items-center justify-between gap-4 text-left transition-colors duration-500"
                >
                  <span className="font-montserrat group-hover:text-arylideYellow text-[6vw] font-light tracking-wide whitespace-nowrap text-white transition-colors duration-500 min-[450px]:text-3xl sm:text-4xl">
                    {contact.phone}
                  </span>

                  <div className="h-8 shrink-0 overflow-hidden">
                    <div
                      className={`flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${copiedItem === "phone" ? "-translate-y-8" : "translate-y-0"}`}
                    >
                      <div className="group-hover:text-arylideYellow flex h-8 items-center justify-end gap-3 text-white transition-colors duration-500">
                        <span className="font-montserrat hidden text-xs font-bold tracking-widest uppercase opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:block">
                          Kopiuj
                        </span>
                        <svg
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={1.5}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"
                          />
                        </svg>
                      </div>
                      <div className="text-arylideYellow flex h-8 items-center justify-end gap-2">
                        <span className="font-montserrat hidden text-xs font-bold tracking-widest uppercase sm:block">
                          Skopiowano!
                        </span>
                        <svg
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
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
                <div className="bg-arylideYellow absolute bottom-0 left-0 h-px w-0 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full" />
              </FadeIn>

              {/* ADRES KORESPONDENCYJNY */}
              <FadeIn
                delay="400ms"
                className="group relative border-b border-white/10 pb-8"
              >
                <span className="font-montserrat mb-4 block text-[0.6rem] font-bold tracking-[0.4em] text-white/30 uppercase">
                  Adres Korespondencyjny / Studio
                </span>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-arylideYellow relative flex w-full items-center justify-between gap-4 transition-colors duration-500"
                >
                  <span className="font-montserrat group-hover:text-arylideYellow text-[5vw] font-light tracking-wide whitespace-pre-line text-white transition-colors duration-500 min-[450px]:text-xl sm:text-2xl md:text-3xl lg:text-4xl">
                    {contact.address}
                  </span>

                  <div className="group-hover:border-arylideYellow group-hover:bg-arylideYellow group-hover:text-raisinBlack flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/20 transition-all duration-500 md:h-12 md:w-12">
                    <svg
                      className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1 md:h-5 md:w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                      />
                    </svg>
                  </div>
                </a>
                <div className="bg-arylideYellow absolute bottom-0 left-0 h-px w-0 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full" />
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================================ */}
      {/* HIGH-END FORMULARZ KONTAKTOWY Z WYDZIELONEGO KOMPONENTU */}
      {/* ============================================================================ */}
      <ContactForm />

      {/* ============================================================================ */}
      {/* SOCIAL MEDIA - GIGANTYCZNE LINKI (Dynamiczne z Sanity) */}
      {/* ============================================================================ */}
      <section className="relative z-10 w-full bg-[#141414] py-24 text-center lg:py-32">
        <FadeIn>
          <span className="font-youngest text-3xl text-white/40 md:text-4xl">
            Śledź naszą podróż na żywo
          </span>
        </FadeIn>

        <div className="mx-auto mt-12 flex max-w-4xl flex-wrap justify-center gap-4 px-6 md:gap-8">
          {socials.map((social, index) => (
            <FadeIn key={social.platform} delay={`${index * 150}ms`}>
              <a
                href={social.url}
                target="_blank"
                rel="noreferrer"
                className="group font-montserrat hover:border-arylideYellow hover:bg-arylideYellow hover:text-raisinBlack flex items-center gap-3 rounded-full border border-white/10 bg-transparent px-8 py-4 text-sm font-bold tracking-widest text-white uppercase transition-all duration-500 hover:-translate-y-1 md:px-10 md:py-5 md:text-base"
              >
                <div className="scale-125 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12">
                  {getSocialIcon(social.platform)}
                </div>
                <span className="hidden sm:block">{social.platform}</span>
              </a>
            </FadeIn>
          ))}
        </div>
      </section>
    </main>
  );
}
