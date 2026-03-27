// src/app/regulamin/page.tsx
"use client";

import Link from "next/link";
import FadeIn from "@/components/ui/FadeIn";
import { siteConfig } from "@/data/navigation";

const sections = [
  {
    id: "01",
    title: "Postanowienia Ogólne",
    content: (
      <>
        <p className="mb-6">
          Niniejszy Regulamin określa zasady korzystania z serwisu internetowego
          oraz zasady uczestnictwa w wydarzeniach organizowanych przez{" "}
          <strong>Stowarzyszenie Maxime</strong>.
        </p>
        <p className="mb-6">
          Dane Stowarzyszenia: <br />
          Siedziba:{" "}
          <span className="text-white font-medium">
            {siteConfig.contact.address.replace("\n", ", ")}
          </span>
          <br />
          Kontakt e-mail:{" "}
          <a
            href={`mailto:${siteConfig.contact.email}`}
            className="text-arylideYellow hover:underline"
          >
            {siteConfig.contact.email}
          </a>
        </p>
        <p>
          Korzystanie z witryny internetowej, zapis do Newslettera oraz zakup i
          rezerwacja biletów oznaczają pełną akceptację niniejszego Regulaminu.
        </p>
      </>
    ),
  },
  {
    id: "02",
    title: "Rezerwacja i Bilety",
    content: (
      <>
        <p className="mb-6">
          Uczestnictwo w naszych wydarzeniach może wymagać posiadania ważnego
          biletu lub darmowej wejściówki.
        </p>
        <ul className="flex flex-col gap-4 border-l border-white/10 pl-6 mb-6">
          <li className="relative">
            <span className="absolute -left-[1.9rem] top-2 h-1.5 w-1.5 rounded-full bg-arylideYellow" />
            <strong>Zewnętrzni operatorzy:</strong> Sprzedaż biletów na
            wydarzenia płatne (tzw. Gale i Koncerty Główne) może być realizowana
            za pośrednictwem zewnętrznych operatorów systemów biletowych. W
            takim przypadku obowiązuje również regulamin operatora.
          </li>
          <li className="relative">
            <span className="absolute -left-[1.9rem] top-2 h-1.5 w-1.5 rounded-full bg-arylideYellow" />
            <strong>Darmowe wejściówki:</strong> Rezerwacja wejściówek darmowych
            realizowana przez formularz kontaktowy wymaga podania poprawnych
            danych osobowych. Pula miejsc jest ograniczona, a Stowarzyszenie
            zastrzega sobie prawo do weryfikacji tożsamości uczestnika przed
            wejściem na salę.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "03",
    title: "Zasady Uczestnictwa w Koncertach",
    content: (
      <>
        <p className="mb-6">
          Szacunek do sztuki i artystów to nasz priorytet. W trosce o komfort
          wszystkich słuchaczy oraz muzyków Stowarzyszenia Maxime, prosimy o
          przestrzeganie poniższych zasad:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          <div className="bg-white/5 p-6 border border-white/10">
            <h4 className="font-bold text-arylideYellow text-sm mb-2 uppercase tracking-widest">
              Punktualność
            </h4>
            <p className="text-sm font-light text-white/70">
              Osoby spóźnione będą wpuszczane na widownię wyłącznie podczas
              przerw między utworami.
            </p>
          </div>
          <div className="bg-white/5 p-6 border border-white/10">
            <h4 className="font-bold text-arylideYellow text-sm mb-2 uppercase tracking-widest">
              Elektronika
            </h4>
            <p className="text-sm font-light text-white/70">
              Prosimy o bezwzględne wyciszenie telefonów komórkowych oraz
              powiadomień dźwiękowych na czas trwania spektaklu.
            </p>
          </div>
          <div className="bg-white/5 p-6 border border-white/10">
            <h4 className="font-bold text-arylideYellow text-sm mb-2 uppercase tracking-widest">
              Fotografowanie
            </h4>
            <p className="text-sm font-light text-white/70">
              Robienie zdjęć z użyciem lampy błyskowej (flesza) oraz nagrywanie
              profesjonalnym sprzętem audio-video bez akredytacji jest zakazane.
            </p>
          </div>
          <div className="bg-white/5 p-6 border border-white/10">
            <h4 className="font-bold text-arylideYellow text-sm mb-2 uppercase tracking-widest">
              Prawa autorskie
            </h4>
            <p className="text-sm font-light text-white/70">
              Wykonywane utwory oraz aranżacje stanowią własność intelektualną
              twórców i podlegają ochronie prawnej.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: "04",
    title: "Własność Intelektualna i Galeria",
    content: (
      <>
        <p className="mb-6">
          Wszelkie materiały udostępniane na tej stronie, w tym fotografie w
          dziale <strong>Galeria</strong>, teksty, logotypy, nazwa
          "Stowarzyszenie Maxime" oraz aranżacje graficzne podlegają ochronie
          praw autorskich.
        </p>
        <p className="mb-6">
          Ich kopiowanie, powielanie, modyfikacja lub wykorzystywanie w celach
          komercyjnych bez pisemnej zgody (tzw. <em>Press Pack</em> dostępny po
          kontakcie) jest zabronione. W celu nawiązania współpracy medialnej
          zachęcamy do wizyty w zakładce Kontakt.
        </p>
      </>
    ),
  },
  {
    id: "05",
    title: "Postanowienia Końcowe",
    content: (
      <>
        <p className="mb-6">
          Stowarzyszenie zastrzega sobie prawo do wprowadzania zmian w
          Regulaminie z ważnych przyczyn prawnych lub organizacyjnych. O
          wszelkich zmianach w procesach biletowych czy działaniu Newslettera
          poinformujemy drogą mailową.
        </p>
        <p>
          W sprawach nieuregulowanych niniejszym Regulaminem zastosowanie mają
          odpowiednie przepisy prawa polskiego.
        </p>
      </>
    ),
  },
];

export default function TermsPage() {
  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-raisinBlack selection:bg-arylideYellow selection:text-raisinBlack">
      {/* ============================================================================ */}
      {/* HERO SECTION */}
      {/* ============================================================================ */}
      <section className="relative flex min-h-[50vh] w-full flex-col justify-end overflow-hidden pb-16 pt-40 px-6 lg:px-12">
        <div className="pointer-events-none absolute left-0 top-1/2 z-0 -translate-y-1/2 select-none opacity-[0.02] mix-blend-overlay">
          <span className="whitespace-nowrap font-montserrat text-[20vw] font-black leading-none text-white">
            TERMS
          </span>
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl">
          <FadeIn>
            <div className="mb-6 flex items-center gap-4">
              <div className="h-px w-12 bg-arylideYellow" />
              <span className="font-montserrat text-[0.65rem] font-bold uppercase tracking-[0.4em] text-arylideYellow">
                Dokument prawny
              </span>
            </div>
          </FadeIn>
          <FadeIn delay="200ms">
            <h1 className="font-montserrat text-5xl sm:text-6xl md:text-7xl font-black leading-[1.05] tracking-tight text-white mb-6">
              Regulamin <br />
              <span className="font-youngest text-6xl sm:text-7xl md:text-8xl text-arylideYellow font-normal -rotate-2 inline-block relative top-2">
                Stowarzyszenia.
              </span>
            </h1>
          </FadeIn>
          <FadeIn delay="400ms">
            <p className="max-w-2xl font-montserrat text-base font-light leading-relaxed text-white/70 mt-8">
              Nasza przestrzeń to miejsce, w którym bezkompromisowa sztuka
              spotyka się ze wzajemnym szacunkiem. Zapoznaj się z zasadami
              obowiązującymi na naszych wydarzeniach oraz w sferze cyfrowej.
            </p>
            <p className="mt-4 font-montserrat text-xs font-bold uppercase tracking-widest text-white/40">
              Ostatnia aktualizacja: Styczeń 2026
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ============================================================================ */}
      {/* TREŚĆ - EDITORIAL ZIG-ZAG LAYOUT */}
      {/* ============================================================================ */}
      <section className="relative z-20 w-full px-6 py-16 lg:py-32 lg:px-12 bg-[#1c1c1c] border-t border-white/5">
        <div className="mx-auto w-full max-w-7xl">
          <div className="flex flex-col gap-24 lg:gap-32">
            {sections.map((section, index) => (
              <FadeIn key={section.id} delay={`${(index % 3) * 100}ms`}>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 relative">
                  {/* OGROMNY NUMER W TLE (Tylko na Desktopie) */}
                  <div className="hidden lg:block absolute -left-12 top-0 text-[12rem] font-black font-montserrat text-white/2 leading-none pointer-events-none select-none">
                    {section.id}
                  </div>

                  {/* LEWA KOLUMNA: Sticky Nagłówek */}
                  <div className="lg:col-span-4 relative z-10">
                    <div className="lg:sticky lg:top-40">
                      <div className="flex items-end gap-4 mb-4">
                        <span className="font-youngest text-4xl text-arylideYellow">
                          {section.id}.
                        </span>
                        <h2 className="font-montserrat text-2xl md:text-3xl font-bold text-white leading-tight">
                          {section.title}
                        </h2>
                      </div>
                      <div className="h-px w-full bg-white/10 mt-6 hidden lg:block" />
                    </div>
                  </div>

                  {/* PRAWA KOLUMNA: Treść (Prose) */}
                  <div className="lg:col-span-8 relative z-10 lg:pt-2">
                    <div className="font-montserrat text-base font-light leading-loose text-white/80">
                      {section.content}
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================================ */}
      {/* CTA NA DOLE */}
      {/* ============================================================================ */}
      <section className="relative z-10 w-full bg-arylideYellow py-24 text-center lg:py-32">
        <FadeIn>
          <span className="font-youngest text-4xl text-oxfordBlue md:text-5xl">
            Sztuka czeka
          </span>
        </FadeIn>
        <FadeIn delay="200ms" className="mt-6">
          <h2 className="font-montserrat text-3xl font-black leading-tight text-raisinBlack md:text-4xl">
            Znasz już zasady gry.
          </h2>
        </FadeIn>
        <FadeIn delay="400ms" className="mt-12 flex justify-center">
          <Link
            href="/wydarzenia"
            className="group relative inline-flex items-center justify-center gap-4 rounded-full border border-raisinBlack bg-raisinBlack px-10 py-5 font-montserrat text-[0.7rem] font-bold uppercase tracking-[0.2em] text-arylideYellow transition-all duration-500 hover:scale-105 hover:shadow-[0_0_30px_-10px_rgba(38,38,38,0.6)]"
          >
            Sprawdź nadchodzące wydarzenia
          </Link>
        </FadeIn>
      </section>
    </main>
  );
}
