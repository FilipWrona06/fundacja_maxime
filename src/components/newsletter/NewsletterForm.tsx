// src/components/ui/NewsletterForm.tsx
"use client";

import { useState } from "react";
import { subscribeToNewsletter } from "@/actions/subscribe";

interface NewsletterFormProps {
  variant?: "dark" | "light";
  className?: string;
}

export default function NewsletterForm({
  variant = "dark",
  className = "",
}: NewsletterFormProps) {
  const isDark = variant === "dark";

  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setMessage(null);

    const formData = new FormData(e.currentTarget);
    const response = await subscribeToNewsletter(formData);

    if (response.error) {
      setStatus("error");
      setMessage(response.error);
      // Reset po błędzie żeby móc spróbować ponownie
      setTimeout(() => setStatus("idle"), 3000);
    } else {
      setStatus("success");
      setMessage("Witamy na pokładzie! Jesteś zapisany.");
    }
  };

  return (
    <div className={`w-full ${className}`}>
      {status === "success" ? (
        // EKRAN SUKCESU
        <div
          className={`animate-fade-in-up flex flex-col items-center justify-center p-4 text-center transition-all ${isDark ? "text-white" : "text-raisinBlack"}`}
        >
          <div className="bg-arylideYellow text-raisinBlack mb-3 flex h-12 w-12 items-center justify-center rounded-full">
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={3}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
          </div>
          <p className="font-montserrat font-bold">{message}</p>
        </div>
      ) : (
        // FORMULARZ
        <form
          onSubmit={handleSubmit}
          className="group relative flex w-full flex-col"
        >
          <div className="relative flex w-full items-end">
            <div
              className={`relative w-full transition-colors duration-500 ${
                isDark
                  ? "focus-within:border-arylideYellow border-b border-white/20 pb-3 hover:border-white/50"
                  : "border-raisinBlack/20 hover:border-raisinBlack/50 focus-within:border-raisinBlack border-b-2 pb-4"
              } ${status === "error" ? "border-red-400!" : ""}`}
            >
              <input
                type="email"
                name="email" // <-- WAŻNE: To pozwala na pobranie wartości w Action
                placeholder="Twój adres e-mail"
                required
                disabled={status === "loading"}
                className={`font-montserrat w-full bg-transparent outline-none placeholder:font-light disabled:opacity-50 ${
                  isDark
                    ? "text-sm font-medium text-white placeholder:text-white/30"
                    : "text-raisinBlack placeholder:text-raisinBlack/40 text-xl font-bold lg:text-2xl"
                }`}
              />
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              aria-label="Zapisz się"
              className={`absolute right-0 flex items-center justify-center transition-all duration-500 disabled:opacity-50 disabled:hover:scale-100 ${
                isDark
                  ? "hover:text-arylideYellow bottom-2 text-white/50"
                  : "bg-raisinBlack text-arylideYellow hover:bg-oxfordBlue bottom-3 h-12 w-12 rounded-full shadow-xl hover:scale-110 hover:text-white"
              }`}
            >
              {status === "loading" ? (
                // IKONA ŁADOWANIA (SPINNER)
                <svg
                  className={`animate-spin ${isDark ? "h-5 w-5" : "h-5 w-5"}`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                // IKONA STRZAŁKI
                <svg
                  className={`${isDark ? "h-5 w-5 transition-transform duration-300 group-focus-within:translate-x-1" : "h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={isDark ? 2 : 2.5}
                >
                  <title>
                    {isDark ? "Wpisz swój email" : "Strzałka wyślij"}
                  </title>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d={
                      isDark
                        ? "M14 5l7 7m0 0l-4 4m4-4H3"
                        : "M14 5l7 7m0 0l-7 7m7-7H3"
                    }
                  />
                </svg>
              )}
            </button>
          </div>

          {/* KOMUNIKAT BŁĘDU (Pojawia się pod kreską) */}
          {status === "error" && message && (
            <span className="font-montserrat absolute -bottom-6 left-0 text-[0.65rem] font-bold text-red-400">
              {message}
            </span>
          )}
        </form>
      )}
    </div>
  );
}
