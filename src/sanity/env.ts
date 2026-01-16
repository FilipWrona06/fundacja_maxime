/**
 * Konfiguracja środowiska Sanity.
 *
 * Ten plik waliduje zmienne środowiskowe podczas budowania aplikacji.
 * Dzięki temu unikamy trudnych do wykrycia błędów w runtime.
 */

// 1. API VERSION
// Używamy daty jako wersji, aby API było stabilne.
// Warto ją podbijać co jakiś czas, aby mieć dostęp do nowych funkcji Sanity.
export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-03-20";

// 2. DATASET
export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  "Błąd krytyczny: Brak zmiennej NEXT_PUBLIC_SANITY_DATASET w pliku .env",
);

// 3. PROJECT ID
export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  "Błąd krytyczny: Brak zmiennej NEXT_PUBLIC_SANITY_PROJECT_ID w pliku .env",
);

// 4. CDN CONFIGURATION (Wydajność vs Świeżość)
// useCdn: true -> Szybkie odpowiedzi z cache (Edge), taniej, ale dane mogą mieć opóźnienie.
// useCdn: false -> Zawsze świeże dane z bazy.
//
// W Next.js App Router zazwyczaj chcemy 'false', ponieważ Next.js ma własny mechanizm cache'owania (Data Cache),
// a podwójne cache'owanie (Sanity CDN + Next.js Cache) prowadzi do problemów z aktualizacją treści.
// Dodatkowo w trybie 'revalidate: 0' (dynamicznym) musimy mieć pewność, że dostajemy najnowsze dane.
export const useCdn = false;

/**
 * Funkcja pomocnicza do walidacji zmiennych środowiskowych.
 * Rzuca błąd w konsoli builda/serwera, jeśli zmienna nie istnieje.
 */
function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    // W środowisku deweloperskim rzucamy Error, żeby zatrzymać aplikację.
    // W produkcji też, bo bez tych danych aplikacja i tak nie zadziała.
    throw new Error(errorMessage);
  }

  return v;
}
