"use client";

import { ReactLenis } from "lenis/react";

export function SmoothScrolling({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        // USTAWIENIA FIZYKI:
        lerp: 0.07, // "Ciężar" scrolla (im mniej, tym bardziej "pływa"). 0.1 to standard.
        duration: 1.5, // Czas trwania rozpędu
        smoothWheel: true, // Włącza gładkie przewijanie kółkiem
        wheelMultiplier: 1, // Prędkość reakcji na kółko (1 = standard)
        // touchMultiplier: 2, // Czułość na dotyk (mobile) - zazwyczaj zostawiamy domyślne, bo mobile ma natywny smooth scroll
      }}
    >
      {children}
    </ReactLenis>
  );
}
