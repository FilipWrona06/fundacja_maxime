"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
// Upewnij się, że ścieżka poniżej odpowiada miejscu Twojego NewsletterForm
import NewsletterForm from "./NewsletterForm";

// Przeniesienie wykluczonych ścieżek poza komponent zapobiega niepotrzebnym re-renderom
const BLOCKED_PATHS = ["/kontakt", "/regulamin", "/polityka-prywatnosci"];

export default function NewsletterPopup() {
  const pathname = usePathname();

  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // 1. Sprawdzamy czy nie jesteśmy na podstronie wykluczonej
    if (BLOCKED_PATHS.includes(pathname)) return;

    // 2. Sprawdzamy, czy użytkownik nie zamknął popupu w ciągu ostatnich 30 dni
    const popupClosedAt = localStorage.getItem("maxime_newsletter_closed");
    if (popupClosedAt) {
      const closedDate = new Date(popupClosedAt).getTime();
      const now = Date.now();
      const thirtyDays = 30 * 24 * 60 * 60 * 1000;

      if (now - closedDate < thirtyDays) return;
    }

    let timer: NodeJS.Timeout;
    let hasTriggered = false; // <-- PANCERNA BLOKADA: Upewnia się, że popup uruchomi się tylko raz

    const triggerPopup = () => {
      if (hasTriggered) return; // Jeśli już kiedykolwiek się odpalił, blokujemy
      if (localStorage.getItem("maxime_newsletter_closed")) return;

      hasTriggered = true; // Zaznaczamy, że popup właśnie się uruchomił
      setIsVisible(true);

      // Delikatne opóźnienie dla przeglądarki przed nałożeniem opacity-100
      setTimeout(() => setIsAnimating(true), 50);

      // BARDZO WAŻNE: Natychmiast sprzątamy nasłuchiwania i zabijamy timer 45 sekund!
      window.removeEventListener("mouseout", handleMouseOut);
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };

    const handleMouseOut = (e: MouseEvent) => {
      if (e.clientY <= 0) triggerPopup();
    };

    const handleScroll = () => {
      const scrollDepth =
        window.scrollY / (document.body.scrollHeight - window.innerHeight);
      if (scrollDepth > 0.6) triggerPopup();
    };

    // Włączamy wyzwalacze (Exit Intent i Scroll)
    window.addEventListener("mouseout", handleMouseOut);
    window.addEventListener("scroll", handleScroll);

    // Włączamy timer awaryjny (jeśli ktoś siedzi bezczynnie przez 45 sekund)
    timer = setTimeout(() => {
      triggerPopup();
    }, 45000);

    return () => {
      // Sprzątanie po odmontowaniu komponentu (np. przy przejściu na inną stronę)
      window.removeEventListener("mouseout", handleMouseOut);
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, [pathname]);

  const closePopup = () => {
    setIsAnimating(false);
    // Zapisujemy w pamięci przeglądarki, że zamknął popup - mamy spokój na 30 dni
    localStorage.setItem("maxime_newsletter_closed", new Date().toISOString());

    setTimeout(() => {
      setIsVisible(false);
    }, 800);
  };

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-200 flex items-center justify-center px-4 transition-all duration-800 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isAnimating ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      {/* TŁO - CIEMNY BACKDROP Z MOCNYM BLUREM */}
      <div
        className="bg-raisinBlack/80 absolute inset-0 cursor-pointer backdrop-blur-md"
        onClick={closePopup}
        aria-label="Zamknij popup"
      />

      {/* GŁÓWNY KONTENER POPUPU */}
      <div
        className={`relative w-full max-w-xl overflow-hidden rounded-3xl border border-white/10 bg-[#161616] p-8 shadow-[0_40px_100px_rgba(0,0,0,0.8)] transition-all duration-800 ease-[cubic-bezier(0.16,1,0.3,1)] sm:p-14 ${
          isAnimating
            ? "translate-y-0 scale-100"
            : "translate-y-16 scale-[0.95]"
        }`}
      >
        {/* MIĘKKA GRANATOWA POŚWIATA */}
        <div className="bg-oxfordBlue/40 pointer-events-none absolute -top-40 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full blur-[80px]" />

        {/* ZNAK WODNY (ASSET BRANDOWY) */}
        <div className="pointer-events-none absolute -bottom-32 -left-32 h-80 w-80 opacity-[0.03]">
          <Image
            src="/Asset-1.svg"
            alt=""
            fill
            className="animate-[spin_120s_linear_infinite] object-contain brightness-0 invert"
          />
        </div>

        {/* PRZYCISK ZAMKNIJ (X) */}
        <button
          type="button"
          onClick={closePopup}
          className="group hover:bg-arylideYellow hover:text-raisinBlack absolute top-6 right-6 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-all duration-500"
          aria-label="Zamknij"
        >
          <svg
            className="h-4 w-4 transition-transform duration-500 group-hover:rotate-90"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* TREŚĆ POPUPU */}
        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="mb-8 flex items-center gap-4">
            <div className="bg-arylideYellow h-px w-8" />
            <span className="font-montserrat text-arylideYellow text-[0.6rem] font-bold tracking-[0.4em] uppercase">
              Klub Maxime
            </span>
            <div className="bg-arylideYellow h-px w-8" />
          </div>

          <h2 className="font-montserrat mb-6 text-4xl leading-[1.05] font-black text-white sm:text-5xl">
            Bądź o krok <br />
            <span className="font-youngest text-arylideYellow relative top-3 inline-block -rotate-2 text-[3.5rem] leading-none font-normal sm:text-[4.5rem]">
              przed innymi.
            </span>
          </h2>

          <p className="font-montserrat mb-12 max-w-sm text-sm leading-relaxed font-light text-white/60 sm:text-base">
            Odbieraj zaproszenia na zamknięte wydarzenia, ukryte przedsprzedaże
            biletów i historie zza kulis, o których nie piszemy nigdzie indziej.
          </p>

          <div className="mb-8 w-full max-w-sm">
            {/* Nasz zaktualizowany formularz z checkboxem prawnym */}
            <NewsletterForm variant="dark" />
          </div>

          <button
            type="button"
            onClick={closePopup}
            className="font-montserrat group relative inline-flex items-center gap-2 text-[0.6rem] font-bold tracking-[0.2em] text-white/30 uppercase transition-colors hover:text-white/80"
          >
            <span>Nie, dziękuję. Zamykam powiadomienie.</span>
            <span className="absolute -bottom-1 left-0 h-px w-0 bg-white/30 transition-all duration-300 group-hover:w-full" />
          </button>
        </div>
      </div>
    </div>
  );
}
