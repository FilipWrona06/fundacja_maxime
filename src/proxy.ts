// src/middleware.ts
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function proxy(request: NextRequest) {
  // 1. Tworzymy odpowiedź, którą będziemy modyfikować w kliencie Supabase.
  const response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  // 2. Tworzymy klienta Supabase, który działa po stronie serwera i w middleware.
  // Używamy uproszczonego mechanizmu obsługi ciasteczek.
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          // Jeśli ciasteczko sesji jest ustawiane, aktualizujemy je w odpowiedzi.
          response.cookies.set({ name, value, ...options })
        },
        remove(name: string, options: CookieOptions) {
          // Jeśli ciasteczko sesji jest usuwane, usuwamy je z odpowiedzi.
          response.cookies.set({ name, value: '', ...options })
        },
      },
    }
  )

  // 3. Odświeżamy sesję. To kluczowy krok do utrzymania sesji użytkownika.
  // Pobieramy również dane użytkownika, aby użyć ich w logice ochrony ścieżek.
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // 4. Logika ochrony ścieżek (Protected Routes Logic)
  const { pathname } = request.nextUrl

  // Jeśli użytkownik nie jest zalogowany i próbuje uzyskać dostęp do chronionej ścieżki
  // (np. wszystko co zaczyna się od "/dashboard"), przekierowujemy go na stronę logowania.
  if (!user && pathname.startsWith('/dashboard')) {
    const url = request.nextUrl.clone()
    url.pathname = '/login' // Dostosuj tę ścieżkę do swojej strony logowania
    return NextResponse.redirect(url)
  }

  // Jeśli użytkownik JEST zalogowany i próbuje wejść na stronę logowania lub rejestracji,
  // przekierowujemy go do głównego panelu aplikacji.
  const authRoutes = ['/login', '/signup'] // Dodaj tu swoje ścieżki uwierzytelniania
  if (user && authRoutes.includes(pathname)) {
    const url = request.nextUrl.clone()
    url.pathname = '/dashboard' // Dostosuj tę ścieżkę do swojego panelu
    return NextResponse.redirect(url)
  }

  // 5. Zwracamy odpowiedź. Jeśli żadne z powyższych przekierowań nie zostało wykonane,
  // użytkownik kontynuuje do żądanej strony.
  return response
}

// Konfiguracja, aby middleware nie uruchamiał się dla ścieżek statycznych.
// Jest to kluczowe dla wydajności.
export const config = {
  matcher: [
    /*
     * Dopasuj wszystkie ścieżki żądań, z wyjątkiem tych, które zaczynają się od:
     * - _next/static (pliki statyczne)
     * - _next/image (optymalizacja obrazów)
     * - favicon.ico (plik ikony)
     *
     * To zapobiega niepotrzebnemu uruchamianiu middleware dla zasobów,
     * które nie wymagają autentykacji.
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}