// src/components/Navbar.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from './ui/Button';
import { NavigationLinks } from './ui/NavigationLinks';
import { navLinks } from '@/data/navbar';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const leftLinks = navLinks.slice(0, 4);
  const rightLinks = navLinks.slice(4);

  return (
    <header className="bg-raisinBlack p-4 sticky top-0 z-50">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          
          {/* WIDOK DESKTOPOWY */}
          <div className="hidden lg:flex w-full items-center">
            <div className="flex-1 flex justify-start lg:space-x-1 xl:space-x-2">
              {leftLinks.map((link) => (
                <NavigationLinks key={link.href} href={link.href}>
                  {link.label}
                </NavigationLinks>
              ))}
            </div>

            <div className="lg:text-3xl xl:text-4xl">
              <Link href="/" className="font-youngest">
                Fundacja Maxime
              </Link>
            </div>

            <div className="flex-1 flex justify-end items-center lg:space-x-1 xl:space-x-2">
              {rightLinks.map((link) => (
                <NavigationLinks key={link.href} href={link.href}>
                  {link.label}
                </NavigationLinks>
              ))}
              <Button asLink href="https://patronite.pl/stowarzyszeniemaxime"
              target="_blank"
              rel="noopener noreferrer">
                Wesprzyj nas
              </Button>
            </div>
          </div>

          {/* NAGŁÓWEK MOBILNY */}
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

        {/* ROZWIJANE MENU MOBILNE */}
        {isOpen && (
          <div className="lg:hidden mt-4 space-y-2 flex flex-col items-center">
            <Button asLink href="https://patronite.pl/stowarzyszeniemaxime" target="_blank"
            rel="noopener noreferrer"
            onClick={closeMenu}
            className='w-full'>
              Wesprzyj nas
            </Button>

            {navLinks.map((link) => (
              <NavigationLinks 
                key={link.href} 
                href={link.href} 
                onClick={closeMenu}
                className="block w-full text-center" 
              >
                {link.label}
              </NavigationLinks>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;