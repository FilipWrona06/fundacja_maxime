// src/app/(admin)/dashboard/page.tsx
import { redirect } from 'next/navigation';
// ZMIANA: Dodajemy import createClient z powrotem
import { createClient } from '@/lib/supabase/server';
import SignOutButton from '@/components/SignOutButton';

export default async function DashboardPage() {
  // Utwórz klienta serwerowego, aby uzyskać dostęp do danych użytkownika
  const supabase = await createClient();

  // Pobierz dane użytkownika
  const { data: { user } } = await supabase.auth.getUser();

  // Chociaż layout już przekieruje, to sprawdzanie tutaj jest nadal dobre dla typowania
  // i jako fallback/upewnienie się, że 'user' nie jest null dla TypeScripta.
  if (!user) {
      // Ta linia nigdy nie powinna zostać osiągnięta, jeśli layout działa poprawnie i przekierowuje.
      // Ale jeśli layout jest obejściem, jest to zabezpieczenie.
      // Możesz też po prostu rzucić błąd lub przekierować, jeśli nie chcesz wyświetlać UI.
      redirect('/'); // Nadal możemy użyć redirect tutaj jako zabezpieczenie
  }

  // Jeśli jest, wyświetl powitanie i przycisk wylogowania
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-4">Witaj, {user.email}!</h1>
      <p className="text-lg mb-8">Jesteś zalogowany w panelu administracyjnym.</p>
      <SignOutButton />
    </div>
  );
}