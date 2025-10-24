// src/components/Navbar.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '../ui/Button';
import { NavigationLink } from '../ui/NavigationLinks';
import { navLinks, NavLink } from '@/data/navbar';
import SignOutButton from '../ui/SignOutButton';
import { User } from '@supabase/supabase-js';

interface NavbarProps {
  user: User | null;
}

const Navbar = ({ user }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const leftLinks = navLinks.slice(0, 4);
  const rightLinks = navLinks.slice(4);

  const loggedInUserLinks: NavLink[] = [
    { href: '/dashboard', label: 'Dashboard' },
  ];

  return (
    <header className="bg-raisinBlack p-4 sticky top-0 z-50 border-b border-b-philippineSilver/5">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          
          {/* WIDOK DESKTOPOWY - tylko dla ekranów ≥1280px */}
          <nav className="hidden xl:flex w-full items-center" aria-label="Nawigacja główna">
            <div className="flex-1 flex justify-start space-x-2">
              {leftLinks.map((link) => (
                <NavigationLink key={link.href} href={link.href}>
                  {link.label}
                </NavigationLink>
              ))}
            </div>

            <div className="text-4xl px-4">
              <Link 
                href="/" 
                className="font-youngest focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-philippineSilver rounded-lg"
              >
                Fundacja Maxime
              </Link>
            </div>

            <div className="flex-1 flex justify-end items-center space-x-2">
              {/* Standardowe linki prawej strony (Wydarzenia, Kontakt) */}
              {rightLinks.map((link) => (
                <NavigationLink key={link.href} href={link.href}>
                  {link.label}
                </NavigationLink>
              ))}
              
              {/* Link do Dashboardu - tylko dla zalogowanych */}
              {user && loggedInUserLinks.map((link) => (
                <NavigationLink key={link.href} href={link.href}>
                  {link.label}
                </NavigationLink>
              ))}

              {/* Przycisk "Wesprzyj nas" - tylko dla NIEzalogowanych użytkowników */}
              {!user && (
                <Button 
                  asLink 
                  href="https://patronite.pl/stowarzyszeniemaxime"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Wesprzyj nas
                </Button>
              )}

              {/* Przycisk wylogowania - tylko dla zalogowanych */}
              {user && <SignOutButton />}
            </div>
          </nav>

          {/* NAGŁÓWEK MOBILNY I TABLET - dla ekranów <1280px */}
          <div className="xl:hidden flex justify-between items-center w-full">
            <div className="text-4xl pl-1.5">
              <Link 
                href="/" 
                className="font-youngest focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-philippineSilver rounded-lg"
              >
                Fundacja Maxime
              </Link>
            </div>
            <button 
              onClick={toggleMenu} 
              className="focus:outline-none focus-visible:ring-2 focus-visible:ring-philippineSilver rounded p-2" 
              aria-label={isOpen ? "Zamknij menu" : "Otwórz menu"}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
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

        {/* ROZWIJANE MENU MOBILNE I TABLET */}
        {isOpen && (
          <nav 
            id="mobile-menu"
            className="xl:hidden mt-4 space-y-2 flex flex-col items-center"
            aria-label="Nawigacja mobilna"
          >
            {/* Przycisk "Wesprzyj nas" - tylko dla NIEzalogowanych użytkowników */}
            {!user && (
              <Button 
                asLink 
                href="https://patronite.pl/stowarzyszeniemaxime" 
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
                className='w-full'
              >
                Wesprzyj nas
              </Button>
            )}

            {/* Wszystkie standardowe linki nawigacyjne */}
            {navLinks.map((link) => (
              <NavigationLink 
                key={link.href} 
                href={link.href} 
                onClick={closeMenu}
                className="block w-full text-center" 
              >
                {link.label}
              </NavigationLink>
            ))}
            
            {/* Link do Dashboardu - tylko dla zalogowanych */}
            {user && loggedInUserLinks.map((link) => (
              <NavigationLink
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className="block w-full text-center"
              >
                {link.label}
              </NavigationLink>
            ))}

            {/* Przycisk wylogowania - tylko dla zalogowanych */}
            {user && <SignOutButton />}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navbar;