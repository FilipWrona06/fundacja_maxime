// src/lib/supabase/server.ts
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'

// ZMIANA 1: Funkcja JEST asynchroniczna.
// ZMIANA 2: Nazwa funkcji to `createClient`, aby uniknąć konfliktu z importem.
export async function createClient() {
  // ZMIANA 3: Dodajemy 'await' z powrotem, co naprawia błąd.
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options })
          } catch (error) {
            // Obsługa błędów, jak poprzednio
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: '', ...options })
          } catch (error) {
            // Obsługa błędów, jak poprzednio
          }
        },
      },
    }
  )
}