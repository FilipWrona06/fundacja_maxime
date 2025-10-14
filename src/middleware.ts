// src/middleware.ts
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  // Tworzymy pustą odpowiedź, którą będziemy modyfikować
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  // Tworzymy klienta Supabase, który potrafi zarządzać ciasteczkami w middleware
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          // Ważne: musimy zaktualizować ciasteczka zarówno w żądaniu, jak i w odpowiedzi
          request.cookies.set({
            name,
            value,
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: '',
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value: '',
            ...options,
          })
        },
      },
    }
  )

  // Kluczowa linia: odświeża sesję użytkownika.
  // To również sprawia, że sesja jest dostępna dla Komponentów Serwerowych.
  await supabase.auth.getUser()

  return response
}

// Konfiguracja, aby middleware nie działał na ścieżkach statycznych
export const config = {
  matcher: [
    /*
     * Dopasuj wszystkie ścieżki żądań, z wyjątkiem tych, które zaczynają się od:
     * - _next/static (pliki statyczne)
     * - _next/image (optymalizacja obrazów)
     * - favicon.ico (plik ikony)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}