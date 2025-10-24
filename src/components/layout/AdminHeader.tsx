import React from 'react';
import { User } from '@supabase/supabase-js';
import SignOutButton from '@/components/ui/SignOutButton';
import Link from 'next/link'; // KROK 1: Importujemy komponent Link

// KROK 2: Dodajemy ikonę, aby link był bardziej czytelny
const ExternalLinkIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

interface AdminHeaderProps {
  user: User;
}

export default function AdminHeader({ user }: AdminHeaderProps) {
  return (
    <header className="h-16 bg-white dark:bg-gray-800 border-b dark:border-gray-700 flex items-center justify-between px-6">
      
      {/* KROK 3: Dodajemy link do strony głównej w pustym divie po lewej */}
      <div className="flex items-center">
        <Link 
          href="/" 
          className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          rel="noopener noreferrer" // Dobre praktyki bezpieczeństwa dla `target="_blank"`
        >
          <ExternalLinkIcon className="h-4 w-4" />
          <span>Przejdź do strony</span>
        </Link>
      </div>

      {/* Prawa strona z danymi użytkownika pozostaje bez zmian */}
      <div className="flex items-center">
        <span className="text-sm text-gray-600 dark:text-gray-400 mr-4">{user.email}</span>
        <SignOutButton />
      </div>
    </header>
  );
}