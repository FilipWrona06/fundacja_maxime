// src/app/(admin)/dashboard/page.tsx
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import SignOutButton from '@/components/SignOutButton' // Zaimportuj przycisk

export default async function DashboardPage() {
  // Utwórz klienta serwerowego, aby sprawdzić sesję
  const supabase = await createClient()

  // Pobierz dane użytkownika
  const { data: { user } } = await supabase.auth.getUser()

  // Jeśli nie ma użytkownika, przekieruj na stronę logowania
  if (!user) {
    return redirect('/login')
  }

  // Jeśli jest, wyświetl powitanie i przycisk wylogowania
  return (
    <div>
      <h1>Witaj, {user.email}!</h1>
      <p>Jesteś zalogowany.</p>
      <SignOutButton />
    </div>
  )
}