// src/components/SignOutButton.tsx

import { createClient } from "@/lib/supabase/server"; // Upewnij się, że ścieżka jest poprawna
import { redirect } from "next/navigation";

export default function SignOutButton() {
  const signOut = async () => {
    "use server";

    // ZMIANA TUTAJ: Dodajemy 'await'
    const supabase = await createClient();

    await supabase.auth.signOut();
    return redirect("/"); // Przekierowanie do strony logowania
  };

  return (
    <form action={signOut}>
      <button type="submit">Wyloguj</button>
    </form>
  );
}