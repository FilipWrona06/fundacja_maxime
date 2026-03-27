// src/app/polityka-prywatnosci/page.tsx
"use client";

import Link from "next/link";
import FadeIn from "@/components/ui/FadeIn";
import { siteConfig } from "@/data/navigation";

const sections = [
  {
    id: "01",
    title: "Administrator Danych",
    content: (
      <>
        <p className="mb-6">
          Administratorem Twoich danych osobowych jest{" "}
          <strong>Stowarzyszenie Maxime</strong> z siedzibą pod adresem: <br />
          <span className="text-arylideYellow">
            {siteConfig.contact.address.replace("\n", ", ")}
          </span>
          .
        </p>
        <p>
          W sprawach związanych z przetwarzaniem danych osobowych możesz
          skontaktować się z nami drogą elektroniczną pod adresem:{" "}
          <a
            href={`mailto:${siteConfig.contact.email}`}
            className="text-arylideYellow hover:underline"
          >
            {siteConfig.contact.email}
          </a>{" "}
          lub telefonicznie: {siteConfig.contact.phone}.
        </p>
      </>
    ),
  },
  {
    id: "02",
    title: "Gromadzenie i Cel",
    content: (
      <>
        <p className="mb-6">
          W Stowarzyszeniu Maxime wierzymy, że zaufanie to fundament każdej
          relacji – zarówno na scenie, jak i poza nią. Zbieramy tylko te dane,
          które są absolutnie niezbędne do świadczenia naszych usług na
          najwyższym poziomie.
        </p>
        <ul className="flex flex-col gap-4 border-l border-white/10 pl-6 mb-6">
          <li className="relative">
            <span className="absolute -left-[1.9rem] top-2 h-1.5 w-1.5 rounded-full bg-arylideYellow" />
            <strong>Newsletter:</strong> Przetwarzamy Twój adres e-mail w celu
            dostarczania ekskluzywnych informacji o tajnych próbach, zniżkach i
            nadchodzących premierach.
          </li>
          <li className="relative">
            <span className="absolute -left-[1.9rem] top-2 h-1.5 w-1.5 rounded-full bg-arylideYellow" />
            <strong>Kontakt i Rezerwacje:</strong> Przetwarzamy Twoje imię,
            nazwisko, adres e-mail oraz (opcjonalnie) numer telefonu w celu
            obsługi zapytań z formularza kontaktowego oraz w procesie rezerwacji
            darmowych lub płatnych wejściówek na nasze wydarzenia.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "03",
    title: "Odbiorcy Danych",
    content: (
      <>
        <p className="mb-6">
          Sztuka nie lubi kompromisów, podobnie jak bezpieczeństwo. Twoje dane
          nie są sprzedawane żadnym podmiotom trzecim.
        </p>
        <p>
          Odbiorcami danych mogą być wyłącznie zaufani podwykonawcy (tzw.
          procesorzy), tacy jak: dostawcy infrastruktury IT, systemy mailingowe
          wspierające nasz Newsletter oraz operatorzy systemów biletowych, w
          zakresie w jakim jest to konieczne do realizacji Twojego zamówienia na
          koncert.
        </p>
      </>
    ),
  },
  {
    id: "04",
    title: "Twoje Prawa",
    content: (
      <>
        <p className="mb-6">
          Szanujemy Twoją prywatność. W każdej chwili przysługuje Ci prawo do:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          <div className="bg-white/5 p-6 border border-white/10">
            <h4 className="font-bold text-arylideYellow text-sm mb-2 uppercase tracking-widest">
              Dostęp i Edycja
            </h4>
            <p className="text-sm font-light text-white/70">
              Wglądu do swoich danych, ich sprostowania oraz aktualizacji.
            </p>
          </div>
          <div className="bg-white/5 p-6 border border-white/10">
            <h4 className="font-bold text-arylideYellow text-sm mb-2 uppercase tracking-widest">
              Usunięcie
            </h4>
            <p className="text-sm font-light text-white/70">
              Prawo do bycia zapomnianym. Usuniemy Twoje dane na Twoje żądanie.
            </p>
          </div>
          <div className="bg-white/5 p-6 border border-white/10">
            <h4 className="font-bold text-arylideYellow text-sm mb-2 uppercase tracking-widest">
              Cofnięcie zgody
            </h4>
            <p className="text-sm font-light text-white/70">
              W dowolnym momencie możesz wypisać się z Newslettera.
            </p>
          </div>
          <div className="bg-white/5 p-6 border border-white/10">
            <h4 className="font-bold text-arylideYellow text-sm mb-2 uppercase tracking-widest">
              Skarga
            </h4>
            <p className="text-sm font-light text-white/70">
              Wniesienia skargi do Prezesa Urzędu Ochrony Danych Osobowych.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: "05",
    title: "Pliki Cookies",
    content: (
      <>
        <p className="mb-6">
          Nasza strona internetowa używa minimalnej ilości plików cookies.
          Korzystamy z nich wyłącznie w celu zapewnienia prawidłowego działania
          serwisu (cookies techniczne) oraz do anonimowej analityki, aby
          zrozumieć, jak nasi odbiorcy poruszają się po witrynie i jakie
          wydarzenia cieszą się największym zainteresowaniem.
        </p>
      </>
    ),
  },
];

export default function PrivacyPolicyPage() {
  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-raisinBlack selection:bg-arylideYellow selection:text-raisinBlack">
      {/* ============================================================================ */}
      {/* HERO SECTION */}
      {/* ============================================================================ */}
      <section className="relative flex min-h-[50vh] w-full flex-col justify-end overflow-hidden pb-16 pt-40 px-6 lg:px-12">
        <div className="pointer-events-none absolute left-0 top-1/2 z-0 -translate-y-1/2 select-none opacity-[0.02] mix-blend-overlay">
          <span className="whitespace-nowrap font-montserrat text-[20vw] font-black leading-none text-white">
            PRIVACY
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
              Polityka <br />
              <span className="font-youngest text-6xl sm:text-7xl md:text-8xl text-arylideYellow font-normal -rotate-2 inline-block relative top-2">
                Prywatności.
              </span>
            </h1>
          </FadeIn>
          <FadeIn delay="400ms">
            <p className="max-w-2xl font-montserrat text-base font-light leading-relaxed text-white/70 mt-8">
              Sztuka wymaga zaufania. Szanujemy Twoje dane tak samo, jak
              szanujemy naszą publiczność na widowni. Poniżej znajdziesz jasne i
              przejrzyste informacje o tym, jak dbamy o Twoją prywatność.
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
      <section className="relative z-10 w-full bg-oxfordBlue py-24 text-center lg:py-32">
        <FadeIn>
          <span className="font-youngest text-4xl text-arylideYellow md:text-5xl">
            Masz pytania?
          </span>
        </FadeIn>
        <FadeIn delay="200ms" className="mt-6">
          <h2 className="font-montserrat text-3xl font-bold leading-tight text-white md:text-4xl">
            Jesteśmy do Twojej dyspozycji.
          </h2>
        </FadeIn>
        <FadeIn delay="400ms" className="mt-12 flex justify-center">
          <Link
            href="/kontakt"
            className="group relative inline-flex items-center justify-center gap-4 rounded-full border border-white/20 bg-transparent px-10 py-5 font-montserrat text-[0.7rem] font-bold uppercase tracking-[0.2em] text-white transition-all duration-500 hover:border-arylideYellow hover:bg-arylideYellow hover:text-raisinBlack"
          >
            Przejdź do formularza
          </Link>
        </FadeIn>
      </section>
    </main>
  );
}
