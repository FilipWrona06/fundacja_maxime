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
        <ul className="mb-6 flex flex-col gap-4 border-l border-white/10 pl-6">
          <li className="relative">
            <span className="bg-arylideYellow absolute top-2 -left-[1.9rem] h-1.5 w-1.5 rounded-full" />
            <strong>Newsletter:</strong> Przetwarzamy Twój adres e-mail w celu
            dostarczania ekskluzywnych informacji o tajnych próbach, zniżkach i
            nadchodzących premierach.
          </li>
          <li className="relative">
            <span className="bg-arylideYellow absolute top-2 -left-[1.9rem] h-1.5 w-1.5 rounded-full" />
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
        <div className="mb-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="border border-white/10 bg-white/5 p-6">
            <h4 className="text-arylideYellow mb-2 text-sm font-bold tracking-widest uppercase">
              Dostęp i Edycja
            </h4>
            <p className="text-sm font-light text-white/70">
              Wglądu do swoich danych, ich sprostowania oraz aktualizacji.
            </p>
          </div>
          <div className="border border-white/10 bg-white/5 p-6">
            <h4 className="text-arylideYellow mb-2 text-sm font-bold tracking-widest uppercase">
              Usunięcie
            </h4>
            <p className="text-sm font-light text-white/70">
              Prawo do bycia zapomnianym. Usuniemy Twoje dane na Twoje żądanie.
            </p>
          </div>
          <div className="border border-white/10 bg-white/5 p-6">
            <h4 className="text-arylideYellow mb-2 text-sm font-bold tracking-widest uppercase">
              Cofnięcie zgody
            </h4>
            <p className="text-sm font-light text-white/70">
              W dowolnym momencie możesz wypisać się z Newslettera.
            </p>
          </div>
          <div className="border border-white/10 bg-white/5 p-6">
            <h4 className="text-arylideYellow mb-2 text-sm font-bold tracking-widest uppercase">
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
    <main className="bg-raisinBlack selection:bg-arylideYellow selection:text-raisinBlack relative min-h-screen w-full overflow-x-hidden">
      {/* ============================================================================ */}
      {/* HERO SECTION */}
      {/* ============================================================================ */}
      <section className="relative flex min-h-[50vh] w-full flex-col justify-end overflow-hidden px-6 pt-40 pb-16 lg:px-12">
        <div className="pointer-events-none absolute top-1/2 left-0 z-0 -translate-y-1/2 opacity-[0.02] mix-blend-overlay select-none">
          <span className="font-montserrat text-[20vw] leading-none font-black whitespace-nowrap text-white">
            PRIVACY
          </span>
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl">
          <FadeIn>
            <div className="mb-6 flex items-center gap-4">
              <div className="bg-arylideYellow h-px w-12" />
              <span className="font-montserrat text-arylideYellow text-[0.65rem] font-bold tracking-[0.4em] uppercase">
                Dokument prawny
              </span>
            </div>
          </FadeIn>
          <FadeIn delay="200ms">
            <h1 className="font-montserrat mb-6 text-5xl leading-[1.05] font-black tracking-tight text-white sm:text-6xl md:text-7xl">
              Polityka <br />
              <span className="font-youngest text-arylideYellow relative top-2 inline-block -rotate-2 text-6xl font-normal sm:text-7xl md:text-8xl">
                Prywatności.
              </span>
            </h1>
          </FadeIn>
          <FadeIn delay="400ms">
            <p className="font-montserrat mt-8 max-w-2xl text-base leading-relaxed font-light text-white/70">
              Sztuka wymaga zaufania. Szanujemy Twoje dane tak samo, jak
              szanujemy naszą publiczność na widowni. Poniżej znajdziesz jasne i
              przejrzyste informacje o tym, jak dbamy o Twoją prywatność.
            </p>
            <p className="font-montserrat mt-4 text-xs font-bold tracking-widest text-white/40 uppercase">
              Ostatnia aktualizacja: Styczeń 2026
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ============================================================================ */}
      {/* TREŚĆ - EDITORIAL ZIG-ZAG LAYOUT */}
      {/* ============================================================================ */}
      <section className="relative z-20 w-full border-t border-white/5 bg-[#1c1c1c] px-6 py-16 lg:px-12 lg:py-32">
        <div className="mx-auto w-full max-w-7xl">
          <div className="flex flex-col gap-24 lg:gap-32">
            {sections.map((section, index) => (
              <FadeIn key={section.id} delay={`${(index % 3) * 100}ms`}>
                <div className="relative grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-16">
                  {/* OGROMNY NUMER W TLE (Tylko na Desktopie) */}
                  <div className="font-montserrat pointer-events-none absolute top-0 -left-12 hidden text-[12rem] leading-none font-black text-white/2 select-none lg:block">
                    {section.id}
                  </div>

                  {/* LEWA KOLUMNA: Sticky Nagłówek */}
                  <div className="relative z-10 lg:col-span-4">
                    <div className="lg:sticky lg:top-40">
                      <div className="mb-4 flex items-end gap-4">
                        <span className="font-youngest text-arylideYellow text-4xl">
                          {section.id}.
                        </span>
                        <h2 className="font-montserrat text-2xl leading-tight font-bold text-white md:text-3xl">
                          {section.title}
                        </h2>
                      </div>
                      <div className="mt-6 hidden h-px w-full bg-white/10 lg:block" />
                    </div>
                  </div>

                  {/* PRAWA KOLUMNA: Treść (Prose) */}
                  <div className="relative z-10 lg:col-span-8 lg:pt-2">
                    <div className="font-montserrat text-base leading-loose font-light text-white/80">
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
      <section className="bg-oxfordBlue relative z-10 w-full py-24 text-center lg:py-32">
        <FadeIn>
          <span className="font-youngest text-arylideYellow text-4xl md:text-5xl">
            Masz pytania?
          </span>
        </FadeIn>
        <FadeIn delay="200ms" className="mt-6">
          <h2 className="font-montserrat text-3xl leading-tight font-bold text-white md:text-4xl">
            Jesteśmy do Twojej dyspozycji.
          </h2>
        </FadeIn>
        <FadeIn delay="400ms" className="mt-12 flex justify-center">
          <Link
            href="/kontakt"
            className="group font-montserrat hover:border-arylideYellow hover:bg-arylideYellow hover:text-raisinBlack relative inline-flex items-center justify-center gap-4 rounded-full border border-white/20 bg-transparent px-10 py-5 text-[0.7rem] font-bold tracking-[0.2em] text-white uppercase transition-all duration-500"
          >
            Przejdź do formularza
          </Link>
        </FadeIn>
      </section>
    </main>
  );
}
