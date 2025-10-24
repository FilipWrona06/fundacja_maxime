import React from 'react';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import AdminDashboardLayout from '@/components/layout/AdminDashboardLayout'; // Importujemy nowy komponent kliencki

// Ten plik pozostaje Komponentem Serwerowym
export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/');
  }

  // Renderujemy komponent kliencki, przekazując mu dane z serwera (user) i zawartość (children)
  return (
    <AdminDashboardLayout user={user}>
      {children}
    </AdminDashboardLayout>
  );
}