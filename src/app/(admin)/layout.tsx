// src/app/(admin)/layout.tsx

import React from 'react';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Logika zabezpieczająca - uruchamiana na serwerze
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Jeśli użytkownik nie jest zalogowany, przekieruj go
  if (!user) {
    redirect('/');
  }

  // Jeśli jest zalogowany, po prostu wyświetl zawartość strony (np. dashboard)
  // bez dodawania żadnych dodatkowych elementów interfejsu.
  return <>{children}</>;
}