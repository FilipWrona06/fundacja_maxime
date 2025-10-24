import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'

// === ISTNIEJĄCY KLIENT (do użytku w trakcie żądania) ===
// Ten kod jest poprawny i pozostaje bez zmian.
export async function createClient() {
  const cookieStore = cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        async get(name: string) {
          return (await cookieStore).get(name)?.value
        },
        async set(name: string, value: string, options: CookieOptions) {
          try {
            (await cookieStore).set({ name, value, ...options })
          } catch (error) {
            // The `set` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
        async remove(name: string, options: CookieOptions) {
          try {
            (await cookieStore).set({ name, value: '', ...options })
          } catch (error) {
            // The `delete` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  )
}


// === NOWY KLIENT (tylko do celów budowania) ===
// POPRAWKA: Zapewniamy puste implementacje metod cookies,
// aby zadowolić TypeScript i bibliotekę Supabase.
export function createBuildTimeClient() {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return undefined; // Zawsze zwracamy undefined, bo nie ma ciasteczek
        },
        set(name: string, value: string, options: CookieOptions) {
          // Nic nie robimy, bo nie możemy ustawić ciasteczek
        },
        remove(name: string, options: CookieOptions) {
          // Nic nie robimy, bo nie możemy usunąć ciasteczek
        },
      },
    }
  );
}