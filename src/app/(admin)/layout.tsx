// src/app/(admin)/layout.tsx
import React from 'react';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

// Importujemy nowe komponenty
import AdminSidebar from '@/components/layout/AdminSidebar';
import AdminHeader from '@/components/layout/AdminHeader';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Logika zabezpieczająca pozostaje bez zmian
  if (!user) {
    redirect('/');
  }

  // Renderujemy strukturę, używając zaimportowanych komponentów
  return (
    <div className="flex h-screen">
      {/* Komponent paska bocznego */}
      <AdminSidebar />

      {/* Główna sekcja z nagłówkiem i treścią */}
      <div className="flex flex-col flex-1 overflow-y-auto">
        {/* Komponent nagłówka, przekazujemy do niego dane użytkownika */}
        <AdminHeader user={user} />

        {/* Treść podstrony (np. dashboard) */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}