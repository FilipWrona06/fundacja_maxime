import { create } from 'zustand';

type NewsletterStatus = 'idle' | 'subscribed' | 'closed';

interface NewsletterState {
  status: NewsletterStatus;
  isHydrated: boolean;
  setStatus: (status: NewsletterStatus) => void;
  hydrate: () => void;
}

export const useNewsletterStore = create<NewsletterState>((set, get) => ({
  status: 'idle', // Domyślny stan, gdy użytkownik jest nowy
  isHydrated: false, // Flaga śledząca, czy stan został wczytany z localStorage

  // Funkcja do zmiany statusu i zapisu w localStorage
  setStatus: (status) => {
    try {
      // Zapisujemy wybór użytkownika w pamięci przeglądarki
      localStorage.setItem('newsletter-status', status);
    } catch (error) {
      console.warn('Nie udało się zapisać statusu newslettera w localStorage', error);
    }
    set({ status });
  },

  // Funkcja do wczytania stanu z localStorage przy starcie aplikacji
  hydrate: () => {
    if (get().isHydrated) return; // Zapobiega wielokrotnemu wczytywaniu
    try {
      const storedStatus = localStorage.getItem('newsletter-status') as NewsletterStatus | null;
      if (storedStatus) {
        set({ status: storedStatus });
      }
    } catch (error) {
      console.warn('Nie udało się wczytać statusu newslettera z localStorage', error);
    }
    set({ isHydrated: true });
  },
}));