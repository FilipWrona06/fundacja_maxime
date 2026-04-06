"use client";

import Cookies from "js-cookie";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

export interface CookieConsentState {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  personalization: boolean;
}

const COOKIE_NAME = "maxime_cookie_consent";

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);

  const [preferences, setPreferences] = useState<CookieConsentState>({
    necessary: true,
    analytics: false,
    marketing: false,
    personalization: false,
  });

  // 1. Funkcja przeniesiona wyżej i owinięta w useCallback
  const updateConsentMode = useCallback(
    (consentSettings: CookieConsentState) => {
      if (
        typeof window !== "undefined" &&
        typeof (window as any).gtag === "function"
      ) {
        (window as any).gtag("consent", "update", {
          analytics_storage: consentSettings.analytics ? "granted" : "denied",
          ad_storage: consentSettings.marketing ? "granted" : "denied",
          ad_user_data: consentSettings.marketing ? "granted" : "denied",
          ad_personalization: consentSettings.marketing ? "granted" : "denied",
          personalization_storage: consentSettings.personalization
            ? "granted"
            : "denied",
        });
      }
      // Emitowanie eventu dla innych skryptów w Next.js
      window.dispatchEvent(
        new CustomEvent("cookieConsentUpdated", { detail: consentSettings }),
      );
    },
    [],
  );

  // 2. useEffect teraz bez błędu wywołuje i zależy od updateConsentMode
  useEffect(() => {
    const consentCookie = Cookies.get(COOKIE_NAME);

    if (!consentCookie) {
      setShowBanner(true);
    } else {
      try {
        const savedPreferences = JSON.parse(consentCookie);
        setPreferences(savedPreferences);
        updateConsentMode(savedPreferences);
      } catch (_e) {
        setShowBanner(true);
      }
    }
  }, [updateConsentMode]);

  const saveConsent = (consentSettings: CookieConsentState) => {
    Cookies.set(COOKIE_NAME, JSON.stringify(consentSettings), {
      expires: 365,
      sameSite: "Lax",
    });

    setPreferences(consentSettings);
    setShowBanner(false);
    setShowPreferences(false);
    updateConsentMode(consentSettings);
  };

  const acceptAll = () => {
    saveConsent({
      necessary: true,
      analytics: true,
      marketing: true,
      personalization: true,
    });
  };

  const rejectAll = () => {
    saveConsent({
      necessary: true,
      analytics: false,
      marketing: false,
      personalization: false,
    });
  };

  const saveCustom = () => {
    saveConsent(preferences);
  };

  if (!showBanner && !showPreferences) return null;

  return (
    <>
      {/* Ciemne tło maskujące (overlay) */}
      <div className="fixed inset-0 z-9998 bg-black/60 backdrop-blur-sm transition-opacity" />

      {/* Kontener główny banera */}
      <div className="fixed bottom-0 left-0 right-0 z-9999 flex justify-center p-4 sm:bottom-6 sm:p-0">
        <div className="font-montserrat bg-raisinBlack w-full max-w-5xl overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-black/50 sm:mx-6 text-white animate-fade-in-up">
          {!showPreferences ? (
            // WIDOK 1: SZYBKI WYBÓR
            <div className="flex flex-col gap-6 p-6 md:flex-row md:items-center md:justify-between lg:p-8">
              <div className="flex-1">
                <h2 className="text-arylideYellow mb-3 text-xl font-bold tracking-wide">
                  Twoja prywatność, Twoje zasady
                </h2>
                <p className="text-sm leading-relaxed text-white/70">
                  Używamy plików cookie, aby optymalizować naszą stronę,
                  analizować ruch i dostarczać Ci jak najlepsze doświadczenia
                  związane ze Stowarzyszeniem Maxime. Możesz zaakceptować
                  wszystkie zgody, odrzucić opcjonalne lub zarządzać nimi.
                  Szczegóły znajdziesz w{" "}
                  <Link
                    href="/polityka-prywatnosci"
                    className="text-arylideYellow font-bold underline transition-colors hover:text-white"
                  >
                    Polityce Prywatności
                  </Link>
                  .
                </p>
              </div>

              <div className="flex shrink-0 flex-col gap-3 sm:flex-row md:flex-col lg:flex-row">
                <button
                  onClick={() => setShowPreferences(true)}
                  className="rounded-full px-6 py-3 text-sm font-semibold text-white/80 transition-colors hover:bg-white/5 hover:text-white"
                >
                  Dostosuj
                </button>
                <button
                  onClick={rejectAll}
                  className="rounded-full border border-white/20 px-6 py-3 text-sm font-bold transition-colors hover:bg-white/10 hover:border-white/40"
                >
                  Odrzuć
                </button>
                <button
                  onClick={acceptAll}
                  className="bg-arylideYellow text-raisinBlack rounded-full px-6 py-3 text-sm font-bold shadow-lg shadow-yellow-500/20 transition-transform hover:scale-105 hover:bg-yellow-400"
                >
                  Akceptuj wszystkie
                </button>
              </div>
            </div>
          ) : (
            // WIDOK 2: ZAAWANSOWANE ZARZĄDZANIE
            <div className="flex max-h-[85vh] flex-col overflow-y-auto p-6 lg:p-8">
              <div className="mb-6">
                <h2 className="text-arylideYellow mb-2 text-2xl font-bold">
                  Zarządzaj plikami cookie
                </h2>
                <p className="text-sm text-white/70">
                  Wybierz, w jaki sposób możemy wykorzystywać pliki cookie.
                  Zgoda na niektóre technologie jest dobrowolna.
                </p>
              </div>

              <div className="flex flex-col gap-4">
                {/* NIEZBĘDNE */}
                <label className="flex items-start gap-4 rounded-xl border border-white/10 bg-white/5 p-5 opacity-60">
                  <input
                    type="checkbox"
                    checked
                    disabled
                    className="mt-1 h-5 w-5 accent-gray-500"
                  />
                  <div>
                    <span className="block text-base font-bold text-white">
                      Niezbędne (Wymagane)
                    </span>
                    <span className="mt-1 block text-xs leading-relaxed text-white/60">
                      Są konieczne do prawidłowego funkcjonowania strony (np.
                      zapisywanie Twoich ustawień prywatności). Nie można ich
                      wyłączyć.
                    </span>
                  </div>
                </label>

                {/* ANALITYKA */}
                <label className="group flex cursor-pointer items-start gap-4 rounded-xl border border-white/10 p-5 transition-colors hover:bg-white/5">
                  <input
                    type="checkbox"
                    checked={preferences.analytics}
                    onChange={(e) =>
                      setPreferences({
                        ...preferences,
                        analytics: e.target.checked,
                      })
                    }
                    className="accent-arylideYellow mt-1 h-5 w-5 cursor-pointer rounded bg-white/10 border-white/20"
                  />
                  <div>
                    <span className="block text-base font-bold text-white group-hover:text-arylideYellow transition-colors">
                      Analityczne
                    </span>
                    <span className="mt-1 block text-xs leading-relaxed text-white/60">
                      Pozwalają nam analizować, jak odwiedzający korzystają ze
                      strony (np. Google Analytics), co pomaga nam ulepszać nasz
                      serwis i ofertę.
                    </span>
                  </div>
                </label>

                {/* MARKETING */}
                <label className="group flex cursor-pointer items-start gap-4 rounded-xl border border-white/10 p-5 transition-colors hover:bg-white/5">
                  <input
                    type="checkbox"
                    checked={preferences.marketing}
                    onChange={(e) =>
                      setPreferences({
                        ...preferences,
                        marketing: e.target.checked,
                      })
                    }
                    className="accent-arylideYellow mt-1 h-5 w-5 cursor-pointer rounded"
                  />
                  <div>
                    <span className="block text-base font-bold text-white group-hover:text-arylideYellow transition-colors">
                      Marketingowe
                    </span>
                    <span className="mt-1 block text-xs leading-relaxed text-white/60">
                      Służą do śledzenia użytkowników na stronach internetowych.
                      Ich celem jest wyświetlanie reklam (np. Facebook Ads),
                      które są odpowiednie dla użytkownika.
                    </span>
                  </div>
                </label>
              </div>

              <div className="mt-8 flex flex-wrap-reverse justify-end gap-3 border-t border-white/10 pt-6">
                <button
                  onClick={() => setShowPreferences(false)}
                  className="rounded-full px-6 py-3 text-sm font-bold text-white/70 transition-colors hover:bg-white/5 hover:text-white"
                >
                  Wróć
                </button>
                <button
                  onClick={rejectAll}
                  className="rounded-full border border-white/20 px-6 py-3 text-sm font-bold transition-colors hover:bg-white/10"
                >
                  Tylko niezbędne
                </button>
                <button
                  onClick={saveCustom}
                  className="bg-arylideYellow text-raisinBlack rounded-full px-8 py-3 text-sm font-bold shadow-lg shadow-yellow-500/20 transition-transform hover:scale-105 hover:bg-yellow-400"
                >
                  Zapisz ustawienia
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
