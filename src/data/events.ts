
/**
 * Konwertuje ciąg znaków ISO 8601 na obiekt Date.
 * @param dateTimeString - Data i czas w formacie ISO 8601, np. '2025-11-15T19:00'.
 * @returns Pełny obiekt Date z datą i godziną.
 */
const getEventDateTime = (dateTimeString: string): Date => {
  return new Date(dateTimeString);
};

/**
 * Formatuje datę i czas wydarzenia do czytelnego polskiego formatu.
 * @param dateTimeString - Data i czas w formacie ISO 8601.
 * @returns Sformatowany ciąg znaków, np. "15 listopada 2025, 19:00".
 */
export const formatEventDateTimeToPolish = (dateTimeString: string): string => {
  const date = getEventDateTime(dateTimeString);
  if (isNaN(date.getTime())) {
    return "Nieznana data";
  }

  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false // 24-godzinny format
  };
  return new Intl.DateTimeFormat('pl-PL', options).format(date);
};