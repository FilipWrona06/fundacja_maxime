'use client';

import React, { useState } from 'react';
import { User } from '@supabase/supabase-js';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader'; // Import bez zmian

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
      
      {/* ... logika sidebara i overlay bez zmian ... */}
      <div className="hidden xl:flex xl:flex-shrink-0">
        <AdminSidebar />
      </div>
      <div 
        className={`fixed inset-0 z-30 transform transition-transform duration-300 ease-in-out xl:hidden ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <AdminSidebar onClose={() => setIsSidebarOpen(false)} />
      </div>
      {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black opacity-50 z-20 xl:hidden"
            onClick={() => setIsSidebarOpen(false)}
          ></div>
      )}

      {/* Główna sekcja */}
      <div className="flex flex-col flex-1 overflow-y-auto">
        
        {/* KROK 3: Przekazujemy funkcję do komponentu AdminHeader */}
        <AdminHeader 
          user={user} 
          onMenuButtonClick={() => setIsSidebarOpen(true)} 
        />

        <main className="p-4 sm:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}