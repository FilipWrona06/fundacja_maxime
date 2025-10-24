'use server';

import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { z } from 'zod';

// ISTNIEJĄCA AKCJA - pozostaje bez zmian
export async function signOutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return redirect('/');
}

// NOWA AKCJA - dodaj ją poniżej
// ----------------------------------------------------------------

// Schemat walidacji hasła przy użyciu Zod
const PasswordSchema = z.object({
  password: z.string().min(6, { message: 'Hasło musi mieć co najmniej 6 znaków.' }),
});

export async function updateUserPassword(prevState: any, formData: FormData) {
  const supabase = await createClient();

  const password = formData.get('password') as string;
  const passwordConfirmation = formData.get('passwordConfirmation') as string;

  // 1. Sprawdź, czy hasła są takie same
  if (password !== passwordConfirmation) {
    return { success: false, message: 'Hasła nie są identyczne.' };
  }

  // 2. Zwaliduj hasło za pomocą schematu Zod
  const validation = PasswordSchema.safeParse({ password });
  if (!validation.success) {
    // Zwróć pierwszy błąd walidacji
    return { success: false, message: validation.error.issues[0].message };
  }

  // 3. Zaktualizuj hasło w Supabase
  const { error } = await supabase.auth.updateUser({ password });

  if (error) {
    // Zwróć błąd bezpośrednio z Supabase, jeśli wystąpił
    return { success: false, message: `Błąd Supabase: ${error.message}` };
  }

  // 4. Zwróć sukces
  return { success: true, message: 'Hasło zostało pomyślnie zaktualizowane.' };
}