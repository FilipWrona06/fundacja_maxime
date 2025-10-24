// src/components/SignOutButton.tsx
// NIE POTRZEBUJE 'use client' JESLI JEDYNYM CELEM JEST RENDEROWANIE FORMUARZA Z SERVER ACTION
// Ale jeśli ma inne interakcje klienckie, zostaw 'use client'.
// Dla samego formularza z action, może być komponentem serwerowym.
// Zakładając, że to po prostu guzik do formularza, możemy usunąć 'use client' i uczynić go Server Component.

// Jeśli potrzebujesz kliknięć, stanu, itp., zostaw 'use client' i zaimportuj Server Action
import { Button } from "./Button";
import { signOutAction } from "@/actions/auth"; // ZMIANA: Importujemy Server Action

export default function SignOutButton() {
  return (
    <form action={signOutAction}> {/* ZMIANA: Używamy zaimportowanej Server Action */}
      <Button type="submit">Wyloguj</Button>
    </form>
  );
}