// src/components/layout/Footer.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSiteSettings } from "@/components/providers/SettingsProvider";
import FadeIn from "@/components/ui/FadeIn";
import NewsletterForm from "@/components/ui/NewsletterForm"; // <-- IMPORT NASZEGO NOWEGO KOMPONENTU
import {
  copyrightText,
  getSocialIcon,
  legalLinks,
  mainLinks,
} from "@/data/navigation";

export default function Footer() {
  const pathname = usePathname();

  // Pobieramy dane kontaktowe, social media oraz autora prosto z kontekstu zasilanego przez Sanity!
  const { contact, socials, author } = useSiteSettings();

  // Rozszerzamy główne linki o zakładkę "Opinie" tylko dla stopki
  const footerLinks = [...mainLinks, { name: "Opinie", path: "/opinie" }];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-raisinBlack relative z-50 w-full overflow-hidden pt-24 lg:pt-32">
      {/* --- GIGANTYCZNY ZNAK WODNY NA SAMYM DOLE --- */}
      <div className="pointer-events-none absolute -bottom-2 left-1/2 z-0 w-full -translate-x-1/2 text-center opacity-[0.03] select-none sm:-bottom-4 lg:-bottom-10">
        <span className="font-montserrat block w-full text-[20vw] leading-none font-black text-white md:text-[22vw] lg:text-[22vw]">
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
              <span className="font-youngest text-arylideYellow mb-12 block text-4xl">
                Z pasji do muzyki.
              </span>

              <div className="flex flex-col gap-6">
                <div className="group flex flex-col">
                  <span className="font-montserrat mb-1 text-[0.6rem] font-bold tracking-[0.3em] text-white/40 uppercase">
                    Adres
                  </span>
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noreferrer"
                    className="font-montserrat group-hover:text-arylideYellow text-sm leading-relaxed font-light whitespace-pre-line text-white/80 transition-colors"
                  >
                    {contact.address}
                  </a>
                </div>

                <div className="group flex flex-col">
                  <span className="font-montserrat mb-1 text-[0.6rem] font-bold tracking-[0.3em] text-white/40 uppercase">
                    Kontakt
                  </span>
                  <a
                    href={`mailto:${contact.email}`}
                    className="font-montserrat group-hover:text-arylideYellow text-sm font-light text-white/80 transition-colors"
                  >
                    {contact.email}
                  </a>
                  <a
                    href={`tel:${contact.phone.replace(/\s+/g, "")}`}
                    className="font-montserrat group-hover:text-arylideYellow mt-1 text-sm font-light text-white/80 transition-colors"
                  >
                    {contact.phone}
                  </a>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* KOLUMNA 2: NAWIGACJA */}
          <div className="flex flex-col lg:col-span-3 lg:col-start-6">
            <FadeIn delay="200ms">
              <span className="font-montserrat mb-8 block text-[0.65rem] font-bold tracking-[0.4em] text-white/30 uppercase">
                Eksploruj
              </span>
              <ul className="flex flex-col gap-4">
                {footerLinks.map((link) => {
                  const isActive = pathname === link.path;
                  return (
                    <li key={link.name}>
                      <Link
                        href={link.path}
                        className="group flex items-center gap-3"
                      >
                        <div
                          className={`bg-arylideYellow h-1.5 w-1.5 rounded-full transition-all duration-300 ${
                            isActive
                              ? "scale-100 opacity-100"
                              : "scale-0 opacity-0 group-hover:scale-50 group-hover:opacity-50"
                          }`}
                        />
                        <span
                          className={`font-montserrat text-sm tracking-widest uppercase transition-all duration-300 ${
                            isActive
                              ? "text-arylideYellow translate-x-1 font-bold"
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
              <span className="font-montserrat mb-8 block text-[0.65rem] font-bold tracking-[0.4em] text-white/30 uppercase">
                Newsletter
              </span>
              <p className="font-montserrat mb-6 text-sm leading-relaxed font-light text-white/60">
                Odbieraj zaproszenia na koncerty i ekskluzywne materiały
                zakulisowe.
              </p>

              {/* UŻYCIE USTANDARYZOWANEGO KOMPONENTU */}
              <NewsletterForm variant="dark" />

              {/* SOCIAL MEDIA (DYNAMICZNIE Z SANITY) */}
              <div className="mt-16">
                <span className="font-montserrat mb-6 block text-[0.65rem] font-bold tracking-[0.4em] text-white/30 uppercase">
                  Społeczność
                </span>
                <ul className="flex flex-wrap gap-4">
                  {socials.map((social) => (
                    <li key={social.platform}>
                      <a
                        href={social.url}
                        target="_blank"
                        rel="noreferrer"
                        className="group hover:border-arylideYellow hover:bg-arylideYellow hover:text-raisinBlack flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-all duration-300 hover:-translate-y-1"
                        aria-label={social.platform}
                      >
                        {getSocialIcon(social.platform)}
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
              {copyrightText}
            </span>
            <div className="flex gap-4">
              {legalLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.path}
                  className="font-montserrat text-[0.65rem] font-medium tracking-widest text-white/30 uppercase transition-colors hover:text-white"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay="800ms" className="flex items-center gap-8">
            <span className="font-montserrat text-xs font-light text-white/40">
              Wykonanie: {/* DANE AUTORA POBIERANE Z SANITY */}
              <a
                href={author.url}
                target="_blank"
                rel="noreferrer"
                className="hover:text-arylideYellow font-medium text-white transition-colors"
              >
                {author.name}
              </a>
            </span>

            <button
              type="button"
              onClick={scrollToTop}
              className="group hover:border-arylideYellow hover:bg-arylideYellow flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-all duration-500"
              aria-label="Wróć na górę"
            >
              <svg
                className="group-hover:text-raisinBlack h-5 w-5 text-white transition-transform duration-500 group-hover:-translate-y-1"
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
