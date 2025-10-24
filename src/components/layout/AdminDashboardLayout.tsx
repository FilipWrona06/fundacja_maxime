'use client';

import React, { useState } from 'react';
import { User } from '@supabase/supabase-js';
import AdminSidebar from './AdminSidebar';
import SignOutButton from '@/components/ui/SignOutButton'; // Załóżmy, że masz ten komponent

// Ikony (bez zmian)
const MenuIcon = (props: React.SVGProps<SVGSVGElement>) => ( <svg {...props} stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg> );
const CloseIcon = (props: React.SVGProps<SVGSVGElement>) => ( <svg {...props} stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg> );


export default function AdminDashboardLayout({
  user,
  children,
}: {
  user: User;
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      
      {/* Sidebar dla Desktopu (nie potrzebuje funkcji zamykającej) */}
      <div className="hidden xl:flex xl:flex-shrink-0">
        <AdminSidebar />
      </div>
      
      {/* Sidebar dla Mobile (wysuwany) */}
      <div 
        className={`fixed inset-0 z-30 transform transition-transform duration-300 ease-in-out xl:hidden ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* KROK 3: Przekazujemy funkcję 'onClose' do mobilnego sidebara */}
        <AdminSidebar onClose={() => setIsSidebarOpen(false)} />
      </div>

      {/* Tło (overlay) do zamykania sidebara na mobile po kliknięciu w tło */}
      {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black opacity-50 z-20 xl:hidden"
            onClick={() => setIsSidebarOpen(false)}
          ></div>
      )}

      {/* Główna sekcja z nagłówkiem i treścią */}
      <div className="flex flex-col flex-1 overflow-y-auto">
        
        <header className="h-16 bg-white dark:bg-gray-800 border-b dark:border-gray-700 flex items-center justify-between px-6">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="xl:hidden text-gray-700 dark:text-gray-200"
            aria-label="Otwórz menu"
          >
            {/* Zmiana: przycisk hamburgera już nie pokazuje ikony "X" */}
            <MenuIcon className="h-6 w-6" />
          </button>
          
          <div className="hidden xl:block" />

          <div className="flex items-center">
            <span className="text-sm text-gray-600 dark:text-gray-400 mr-4">{user.email}</span>
            <SignOutButton />
          </div>
        </header>

        <main className="p-4 sm:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}