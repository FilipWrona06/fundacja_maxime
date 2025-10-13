// src/components/SignOutButton.tsx
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Button } from "./ui/Button"; // <-- Importujemy nasz komponent

export default function SignOutButton() {
  const signOut = async () => {
    "use server";
    const supabase = await createClient();
    await supabase.auth.signOut();
    return redirect("/");
  };

  return (
    <form action={signOut}>
      {/* Używamy komponentu Button zamiast długiej listy klas */}
      <Button type="submit">Wyloguj</Button>
    </form>
  );
}