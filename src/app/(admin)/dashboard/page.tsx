// src/app/(admin)/dashboard/page.tsx
import { createClient } from '@/lib/supabase/server';

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Nie musimy już przekierowywać, ponieważ layout to robi.
  // Mamy pewność, że `user` nie jest `null`.

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Witaj, {user?.email}!</h1>
      <p className="mt-2 text-gray-600 dark:text-gray-400">Oto Twój panel administracyjny.</p>

      {/* Przykładowe kontenery/karty */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-white">Statystyki</h3>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Tutaj pojawią się Twoje statystyki.</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-white">Ostatnie Aktywności</h3>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Lista ostatnich aktywności.</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-white">Szybkie Linki</h3>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Dodaj tutaj przydatne linki.</p>
        </div>
      </div>
    </div>
  );
}