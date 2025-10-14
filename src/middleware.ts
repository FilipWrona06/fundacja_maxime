// src/middleware.ts
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  // Tworzymy *jedną* odpowiedź, którą będziemy modyfikować przez cały cykl middleware.
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          // --- WAŻNA ZMIANA TUTAJ ---
          // Modyfikujemy bezpośrednio obiekt `response` utworzony na początku.
          // Nie tworzymy nowej instancji `NextResponse`.
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: CookieOptions) {
          // --- WAŻNA ZMIANA TUTAJ ---
          // Modyfikujemy bezpośrednio obiekt `response` utworzony na początku.
          // Nie tworzymy nowej instancji `NextResponse`.
          response.cookies.set({
            name,
            value: '', // Ustawienie pustej wartości to standardowy sposób na usunięcie ciasteczka
            ...options,
          })
        },
      },
    }
  )

  // Odświeża sesję użytkownika i sprawia, że jest dostępna dla Komponentów Serwerowych.
  await supabase.auth.getUser()

  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}