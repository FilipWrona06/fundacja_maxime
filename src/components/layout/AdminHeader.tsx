import React from 'react';
import { User } from '@supabase/supabase-js';
import SignOutButton from '@/components/ui/SignOutButton';

// KROK 1: Przywracamy prosty interfejs propsów
interface AdminHeaderProps {
  user: User;
  onMenuButtonClick: () => void; // Nadal potrzebujemy tego do otwierania menu
}

const MenuIcon = (props: React.SVGProps<SVGSVGElement>) => ( <svg {...props} stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg> );

export default function AdminHeader({ user, onMenuButtonClick }: AdminHeaderProps) {
  return (
    <header className="h-16 bg-white dark:bg-gray-800 border-b dark:border-gray-700 flex items-center justify-between px-6">
      
      {/* KROK 2: Lewa strona zawiera teraz TYLKO przycisk hamburgera */}
      {/* Jest widoczny tylko do 'xl', na większych ekranach znika */}
      <button 
        onClick={onMenuButtonClick}
        className="xl:hidden text-gray-700 dark:text-gray-200"
        aria-label="Otwórz menu"
      >
        <MenuIcon className="h-6 w-6" />
      </button>

      {/* Pusty div, który zajmuje miejsce na desktopie, aby wyrównać prawą stronę */}
      <div className="hidden xl:block"></div>
      
      {/* Prawa strona bez zmian */}
      <div className="flex items-center">
        <span className="text-sm text-gray-600 dark:text-gray-400 mr-4">{user.email}</span>
        <SignOutButton />
      </div>
    </header>
  );
}