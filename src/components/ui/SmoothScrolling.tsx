"use client";

import { ReactLenis } from "lenis/react";

export function SmoothScrolling({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        // --- DESKTOP (MYSZKA/GŁADZIK) ---
        // lerp: 0.09 to "złoty środek".
        // 0.1 to standard, 0.07 (Twoje poprzednie) było trochę za wolne ("pływanie").
        lerp: 0.09,

        // duration: Czas trwania rozpędu w sekundach (alternatywa dla lerp).
        duration: 1.2,

        // Włączamy wygładzanie dla kółka myszy
        smoothWheel: true,

        // Prędkość reakcji na kółko (1 = standard)
        wheelMultiplier: 1,

        // --- MOBILE (DOTYK) - KLUCZOWA POPRAWKA ---
        // smoothTouch: false wyłącza ingerencję Lenis w przesuwanie palcem.
        // Dzięki temu na telefonach masz:
        // 1. Natychmiastową reakcję (brak laga przy ładowaniu).
        // 2. Natywne 120Hz przewijanie.
        // 3. Prawidłowe chowanie paska adresu w przeglądarce.
        // @ts-expect-error - opcja dostępna w core, czasem brakuje w typach
        smoothTouch: false,

        // Czułość dotyku (zostawiamy standard, bo używamy natywnego scrolla)
        touchMultiplier: 2,
      }}
    >
      {children}
    </ReactLenis>
  );
}
