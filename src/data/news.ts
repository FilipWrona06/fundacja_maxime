//src/data/news.ts



/**
 * Konwertuje datę w formacie ISO 8601 na polski format tekstowy.
 * Używaj tej funkcji tylko do WYŚWIETLANIA daty, nie do sortowania.
 * @param isoDateString - Data w formacie "RRRR-MM-DD", np. "2025-07-12".
 * @returns Data w formacie "DD miesiąc YYYY", np. "12 lipca 2025".
 */
export const formatToPolishDate = (isoDateString: string): string => {
  const date = new Date(isoDateString);
  if (isNaN(date.getTime())) {
    // Obsługa błędnych dat, jeśli takie się pojawią
    return isoDateString;
  }
  // Użyj Intl.DateTimeFormat dla solidnego i lokalizowanego formatowania
  return new Intl.DateTimeFormat('pl-PL', { day: 'numeric', month: 'long', year: 'numeric' }).format(date);
};