"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import FadeIn from "@/components/ui/FadeIn";
import {
  legalLinks,
  mainLinks,
  siteConfig,
  socialLinks,
} from "@/data/navigation";

export default function Footer() {
  const pathname = usePathname();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative z-50 w-full overflow-hidden bg-raisinBlack pt-24 lg:pt-32">
      {/* --- GIGANTYCZNY ZNAK WODNY NA SAMYM DOLE --- */}
      {/* Zmiana: -bottom-2 i -bottom-4 dla lepszego dopasowania na telefonach */}
      <div className="pointer-events-none absolute -bottom-2 sm:-bottom-4 lg:-bottom-10 left-1/2 z-0 w-full -translate-x-1/2 select-none text-center opacity-[0.03]">
        {/* Zmiana: text-[20vw] na mobile, powrót do większych na desktopie */}
        <span className="block w-full font-montserrat text-[20vw] md:text-[22vw] lg:text-[22vw] font-black leading-none text-white">
          MAXIME
        </span>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-12">
        <div className="grid grid-cols-1 gap-16 border-b border-white/10 pb-16 lg:grid-cols-12 lg:gap-12 lg:pb-24">
          {/* KOLUMNA 1: LOGO, MOTTO I KONTAKT */}
          <div className="flex flex-col items-start lg:col-span-4">
            <FadeIn>
              <Link href="/" className="mb-8 block">
                <Image
                  src="/logo.svg"
                  alt="Maxime Logo"
                  width={160}
                  height={55}
                  className="h-10 w-auto brightness-0 invert lg:h-12"
                />
              </Link>
              <span className="mb-12 block font-youngest text-4xl text-arylideYellow">
                Z pasji do muzyki.
              </span>

              <div className="flex flex-col gap-6">
                <div className="group flex flex-col">
                  <span className="mb-1 font-montserrat text-[0.6rem] font-bold uppercase tracking-[0.3em] text-white/40">
                    Adres
                  </span>
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noreferrer"
                    className="whitespace-pre-line font-montserrat text-sm font-light leading-relaxed text-white/80 transition-colors group-hover:text-arylideYellow"
                  >
                    {siteConfig.contact.address}
                  </a>
                </div>

                <div className="group flex flex-col">
                  <span className="mb-1 font-montserrat text-[0.6rem] font-bold uppercase tracking-[0.3em] text-white/40">
                    Kontakt
                  </span>
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="font-montserrat text-sm font-light text-white/80 transition-colors group-hover:text-arylideYellow"
                  >
                    {siteConfig.contact.email}
                  </a>
                  <a
                    href={`tel:${siteConfig.contact.phone.replace(/\s+/g, "")}`}
                    className="mt-1 font-montserrat text-sm font-light text-white/80 transition-colors group-hover:text-arylideYellow"
                  >
                    {siteConfig.contact.phone}
                  </a>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* KOLUMNA 2: NAWIGACJA */}
          <div className="flex flex-col lg:col-span-3 lg:col-start-6">
            <FadeIn delay="200ms">
              <span className="mb-8 block font-montserrat text-[0.65rem] font-bold uppercase tracking-[0.4em] text-white/30">
                Eksploruj
              </span>
              <ul className="flex flex-col gap-4">
                {mainLinks.map((link) => {
                  const isActive = pathname === link.path;
                  return (
                    <li key={link.name}>
                      <Link
                        href={link.path}
                        className="group flex items-center gap-3"
                      >
                        <div
                          className={`h-1.5 w-1.5 rounded-full bg-arylideYellow transition-all duration-300 ${
                            isActive
                              ? "scale-100 opacity-100"
                              : "scale-0 opacity-0 group-hover:scale-50 group-hover:opacity-50"
                          }`}
                        />
                        <span
                          className={`font-montserrat text-sm uppercase tracking-widest transition-all duration-300 ${
                            isActive
                              ? "translate-x-1 font-bold text-arylideYellow"
                              : "font-medium text-white/70 group-hover:translate-x-2 group-hover:text-white"
                          }`}
                        >
                          {link.name}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </FadeIn>
          </div>

          {/* KOLUMNA 3: NEWSLETTER I SOCIAL MEDIA */}
          <div className="flex flex-col lg:col-span-4">
            <FadeIn delay="400ms">
              <span className="mb-8 block font-montserrat text-[0.65rem] font-bold uppercase tracking-[0.4em] text-white/30">
                Newsletter
              </span>
              <p className="mb-6 font-montserrat text-sm font-light leading-relaxed text-white/60">
                Odbieraj zaproszenia na koncerty i ekskluzywne materiały
                zakulisowe.
              </p>

              <form
                onSubmit={(e) => e.preventDefault()}
                className="group relative flex w-full items-end"
              >
                <div className="relative w-full border-b border-white/20 pb-3 transition-colors duration-500 hover:border-white/50 group-focus-within:border-arylideYellow">
                  <input
                    type="email"
                    placeholder="Twój adres e-mail"
                    required
                    className="w-full bg-transparent font-montserrat text-sm font-medium text-white outline-none placeholder:font-light placeholder:text-white/30"
                  />
                </div>
                <button
                  type="submit"
                  aria-label="Zapisz się"
                  className="absolute bottom-2 right-0 text-white/50 transition-colors duration-300 group-hover:text-arylideYellow"
                >
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <title>Wpisz swój email</title>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14 5l7 7m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </button>
              </form>

              {/* SOCIAL MEDIA */}
              <div className="mt-16">
                <span className="mb-6 block font-montserrat text-[0.65rem] font-bold uppercase tracking-[0.4em] text-white/30">
                  Społeczność
                </span>
                <ul className="flex flex-wrap gap-4">
                  {socialLinks.map((social) => (
                    <li key={social.name}>
                      <a
                        href={social.url}
                        target="_blank"
                        rel="noreferrer"
                        className="group flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-all duration-300 hover:-translate-y-1 hover:border-arylideYellow hover:bg-arylideYellow hover:text-raisinBlack"
                        aria-label={social.name}
                      >
                        {social.icon}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          </div>
        </div>

        {/* SUB-FOOTER */}
        <div className="flex flex-col items-center justify-between gap-8 py-8 lg:flex-row lg:gap-0">
          <FadeIn
            delay="600ms"
            className="flex flex-col items-center gap-4 lg:items-start lg:gap-2"
          >
            <span className="font-montserrat text-xs font-light text-white/40">
              {siteConfig.copyright}
            </span>
            <div className="flex gap-4">
              {legalLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.path}
                  className="font-montserrat text-[0.65rem] font-medium uppercase tracking-widest text-white/30 transition-colors hover:text-white"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay="800ms" className="flex items-center gap-8">
            <span className="font-montserrat text-xs font-light text-white/40">
              Wykonanie:{" "}
              <a
                href={siteConfig.author.url}
                target="_blank"
                rel="noreferrer"
                className="font-medium text-white transition-colors hover:text-arylideYellow"
              >
                {siteConfig.author.name}
              </a>
            </span>

            <button
              type="button"
              onClick={scrollToTop}
              className="group flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-all duration-500 hover:border-arylideYellow hover:bg-arylideYellow"
              aria-label="Wróć na górę"
            >
              <svg
                className="h-5 w-5 text-white transition-transform duration-500 group-hover:-translate-y-1 group-hover:text-raisinBlack"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <title>Strzałka powrotu w górę</title>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 15.75l7.5-7.5 7.5 7.5"
                />
              </svg>
            </button>
          </FadeIn>
        </div>
      </div>
    </footer>
  );
}
