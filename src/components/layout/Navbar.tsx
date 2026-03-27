"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { mainLinks } from "@/data/navigation";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* GŁÓWNY WRAPPER NAWIGACJI */}
      {/* Zmiana: z-50 na z-[100] aby navbar był absolutnie ZAWSZE na samej górze */}
      <header className="animate-slide-down fixed left-0 right-0 top-0 z-100 flex justify-center px-4 pt-4 lg:px-6 lg:pt-6">
        <nav
          className={`flex w-full items-center justify-between transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isScrolled
              ? "max-w-7xl rounded-full border border-white/10 bg-raisinBlack/85 px-8 py-4 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] backdrop-blur-xl"
              : "max-w-7xl rounded-none border-transparent bg-transparent px-0 py-2"
          }`}
        >
          {/* LOGO */}
          <Link href="/" className="flex shrink-0 items-center lg:mr-4 xl:mr-8">
            <Image
              src="/logo.svg"
              alt="Maxime Logo"
              width={160}
              height={55}
              priority
              className="h-10 w-auto brightness-0 invert lg:h-10 xl:h-14"
            />
          </Link>

          {/* LINKI DESKTOP */}
          <ul className="hidden grow justify-center lg:gap-4 lg:flex xl:gap-10">
            {mainLinks.map((link) => {
              const isActive = pathname === link.path;
              return (
                <li key={link.name}>
                  <Link
                    href={link.path}
                    className={`group relative block py-2 whitespace-nowrap font-montserrat text-[0.75rem] font-medium uppercase transition-colors lg:text-[0.65rem] lg:tracking-widest xl:text-[0.8rem] xl:tracking-[0.15em] ${
                      isActive
                        ? "text-arylideYellow"
                        : "text-white hover:text-arylideYellow"
                    }`}
                  >
                    {link.name}
                    <span
                      className={`absolute -bottom-1 left-1/2 h-0.5 -translate-x-1/2 bg-arylideYellow transition-all duration-300 ${
                        isActive ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* PRZYCISK WESPRZYJ */}
          <div className="hidden shrink-0 lg:block lg:ml-4 xl:ml-8">
            <Link
              href="https://patronite.pl/stowarzyszeniemaxime"
              target="_blank"
              className="group relative flex items-center justify-center rounded-full border border-arylideYellow bg-transparent px-8 py-3 font-montserrat text-[0.7rem] font-bold uppercase text-arylideYellow transition-all duration-500 hover:bg-arylideYellow hover:text-raisinBlack lg:px-5 lg:py-2 lg:text-[0.65rem] lg:tracking-[0.15em] xl:px-8 xl:py-3 xl:text-[0.7rem] xl:tracking-[0.2em]"
            >
              Wesprzyj nas
            </Link>
          </div>

          {/* HAMBURGER MOBILNY */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(true)}
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-full border border-white/10 bg-white/5 lg:hidden"
            aria-label="Otwórz menu"
          >
            <span className="h-0.5 w-6 bg-white" />
            <span className="h-0.5 w-4 bg-white" />
          </button>
        </nav>
      </header>

      {/* MENU MOBILNE */}
      {/* Zmiana: z-[60] na z-[110] aby menu po otwarciu przykryło navbar (który ma teraz 100) */}
      <div
        className={`fixed inset-0 z-110 flex justify-end transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isMobileMenuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        <button
          type="button"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-label="Zamknij menu"
          className={`absolute inset-0 bg-raisinBlack/60 backdrop-blur-sm transition-opacity duration-700 ${
            isMobileMenuOpen ? "opacity-100" : "opacity-0"
          }`}
        />

        <div
          className={`relative flex h-full w-full max-w-sm flex-col justify-between border-l border-white/10 bg-raisinBlack p-8 shadow-2xl transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] sm:w-[80%] ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between">
            <Image
              src="/logo.svg"
              alt="Maxime Logo"
              width={180}
              height={60}
              className="h-12 w-auto brightness-0 invert"
            />
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-3xl text-white"
              aria-label="Zamknij menu"
            >
              ✕
            </button>
          </div>

          <ul className="flex flex-col gap-6 pt-12">
            {mainLinks.map((link, i) => (
              <li
                key={link.name}
                className={`transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isMobileMenuOpen
                    ? "translate-x-0 opacity-100"
                    : "translate-x-12 opacity-0"
                }`}
                style={{ transitionDelay: `${150 + i * 75}ms` }}
              >
                <Link
                  href={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-3xl font-light leading-tight tracking-wide ${
                    pathname === link.path ? "text-arylideYellow" : "text-white"
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-auto pb-8">
            <Link
              href="https://patronite.pl"
              target="_blank"
              className="flex w-full items-center justify-center rounded-full bg-arylideYellow py-5 font-montserrat text-xs font-bold uppercase tracking-[0.2em] text-raisinBlack"
            >
              Wesprzyj nas
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
