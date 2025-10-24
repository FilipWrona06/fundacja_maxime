// Importujemy klienta Supabase do Server Components
import { createClient } from '@/lib/supabase/server';
// Importujemy komponenty
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { NewsletterModal } from '@/components/newsletter/NewsletterModal';
import { SlideOutNewsletter } from '@/components/newsletter/SlideOutNewsletter';

export default async function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Pobieramy dane użytkownika z Supabase na serwerze
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <>
      {/* Przekazujemy dane z serwera do komponentu klienckiego Navbar */}
      <Navbar user={user} />

      <main className="flex-grow">
        {children}
      </main>

      <Footer />
      
      {/* Komponenty newslettera - nie pokazują się dla zalogowanych użytkowników */}
      <NewsletterModal isUserLoggedIn={!!user} />
      <SlideOutNewsletter isUserLoggedIn={!!user} />
    </>
  );
}