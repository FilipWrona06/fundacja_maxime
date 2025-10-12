'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type NavLink = {
  href: string;
  label: string;
};

const navLinks: NavLink[] = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'O nas' },
  { href: '/gallery', label: 'Galeria' },
  { href: '/news', label: 'Aktualności' },
  { href: '/events', label: 'Wydarzenia' },
  { href: '/contact', label: 'Kontakt' },
];

const Navbar = () => {
  //Stan i Hooki
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  //Funkcje pomocnicze
  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  //Przygotowanie danych podział linków na strony dla desktopu
  const leftLinks = navLinks.slice(0, 4);
  const rightLinks = navLinks.slice(4);

  return (
    <header className="bg-raisinBlack p-4 sticky top-0 z-50">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          
          {/* ============================================= */}
          {/* WIDOK DESKTOPOWY*/}
          {/*===============================================*/}
          <div className="hidden lg:flex w-full items-center">
            {/*Sekcja lewych linków*/}
            <div className="flex-1 flex justify-start lg:space-x-1 xl:space-x-2">
              {leftLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`
                      px-3 py-2 rounded-3xl 
                      font-montserrat lg:text-base xl:text-lg font-bold 
                      duration-250 transition-colors hover:bg-philippineSilver 
                      ${isActive ? 'bg-philippineSilver/20' : ''} 
                    `}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>

            {/*Logo*/}
            <div className="lg:text-3xl xl:text-4xl">
              <Link href="/" className="font-youngest">
                Fundacja Maxime
              </Link>
            </div>

            {/*Sekcja prawych linków i przycisku*/}
            <div className="flex-1 flex justify-end items-center lg:space-x-1 xl:space-x-2">
              {rightLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`
                      px-3 py-2 rounded-3xl 
                      font-montserrat lg:text-base xl:text-lg font-bold 
                      duration-250 transition-colors hover:bg-philippineSilver 
                      ${isActive ? 'bg-philippineSilver/20' : ''} 
                    `}
                  >
                    {link.label}
                  </Link>
                );
              })}
              {/* Przycisk "Wesprzyj nas"*/}
              <Link
                href="https://patronite.pl/stowarzyszeniemaxime"
                target="_blank"
                rel="noopener noreferrer"
                className={`
                  bg-transparent border-2 border-philippineSilver font-bold 
                  rounded-3xl hover:bg-philippineSilver hover:text-raisinBlack 
                  transition-colors text-center
                  ml-4 px-5 py-2 text-sm
                `}
              >
                Wesprzyj nas
              </Link>
            </div>
          </div>

          {/* =========================================== */}
          {/* NAGŁÓWEK MOBILNY*/}
          {/* ========================================= */}
          <div className="lg:hidden flex justify-between items-center w-full">
            <div className="text-4xl pl-1.5">
              <Link href="/" className="font-youngest">
                Fundacja Maxime
              </Link>
            </div>
            <button onClick={toggleMenu} className="focus:outline-none" aria-label="Menu">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'}
                />
              </svg>
            </button>
          </div>
        </div>

        {/* ============================================== */}
        {/* ROZWIJANE MENU MOBILNE*/}
        {/*======================================== */}
        {isOpen && (
          <div className="lg:hidden mt-4 space-y-2 flex flex-col items-center">
            {/* Przycisk "Wesprzyj nas" */}
            <Link
              href="https://patronite.pl/stowarzyszeniemaxime"
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMenu}
              className={`
                bg-transparent border-2 border-philippineSilver font-bold 
                rounded-3xl hover:bg-philippineSilver hover:text-raisinBlack 
                transition-colors text-center
                w-full mt-2 px-5 py-3 text-base
              `}
            >
              Wesprzyj nas
            </Link>

            {/* Linki nawigacji*/}
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  className={`
                    block w-full text-center 
                    px-3 py-2 rounded-3xl 
                    font-montserrat font-bold 
                    duration-250 transition-colors hover:bg-philippineSilver 
                    ${isActive ? 'bg-philippineSilver/20' : ''} 
                  `}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;