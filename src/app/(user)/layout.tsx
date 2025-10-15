// src/app/(user)/layout.tsx
// Importujemy klienta Supabase do Server Components
import { createClient } from '@/lib/supabase/server';
// Importujemy komponenty Navbar i Footer
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default async function UserLayout({ // ZMIANA: Funkcja jest teraz async
  children,
}: {
  children: React.ReactNode;
}) {
  // ZMIANA: Pobieramy dane użytkownika z Supabase
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <>
      {/* ZMIANA: Renderujemy Navbar i przekazujemy mu obiekt user */}
      <Navbar user={user} />
      <main className="flex-grow"> {/* Dodano flex-grow dla sticky footer */}
        {children}
      </main>
      <Footer />
    </>
  );
}