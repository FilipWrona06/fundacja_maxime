"use client";

import { AlertCircle, ArrowRight, Check, Loader2, Mail } from "lucide-react";
import { useActionState, useEffect, useId, useRef } from "react";
import { subscribe } from "@/actions/newsletter";

const initialState = {
  status: "idle" as const,
  message: "",
};

export const NewsletterForm = () => {
  // useId generuje unikalne ID dla inputów i opisów błędów (wymóg WCAG)
  const id = useId();
  const [state, formAction, isPending] = useActionState(
    subscribe,
    initialState,
  );
  const formRef = useRef<HTMLFormElement>(null);

  // Reset formularza po sukcesie
  useEffect(() => {
    if (state.status === "success" && formRef.current) {
      formRef.current.reset();
    }
  }, [state.status]);

  const isLoading = state.status === "loading" || isPending;
  const isSuccess = state.status === "success";
  const isError = state.status === "error";

  return (
    <div className="relative group max-w-md mx-auto">
      {/* --- EFEKT WOW: Ambient Light --- */}
      <div
        className="absolute -inset-1 bg-linear-to-r from-arylideYellow/20 to-transparent blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute top-0 right-0 w-24 h-24 bg-arylideYellow/10 blur-2xl rounded-full pointer-events-none"
        aria-hidden="true"
      />

      {/* --- KARTA --- */}
      <div className="relative bg-white/3 border border-white/10 rounded-sm p-6 backdrop-blur-sm overflow-hidden">
        {/* Dekoracja (ukryta dla czytników) */}
        <div
          className="absolute top-4 right-4 text-white/5 transform rotate-12 group-hover:text-arylideYellow/10 group-hover:scale-110 transition-all duration-500 pointer-events-none"
          aria-hidden="true"
        >
          <Mail className="w-16 h-16" strokeWidth={1} />
        </div>

        {/* Treść */}
        <div className="relative z-10 mb-6">
          <h4 className="font-youngest text-3xl text-white mb-2 leading-none">
            Bądź bliżej <span className="text-arylideYellow">muzyki.</span>
          </h4>
          <p className="text-philippineSilver text-xs leading-relaxed max-w-50">
            Koncerty, premiery i życie fundacji. <br />
            Zero spamu, sama sztuka.
          </p>
        </div>

        {/* Formularz */}
        <form
          ref={formRef}
          action={formAction}
          className="relative z-10 flex flex-col gap-3"
          aria-busy={isLoading}
        >
          {/* Input Wrapper */}
          <div className="relative flex items-center group/input">
            {/* Label dla czytników ekranowych (wymagane SEO/A11y) */}
            <label htmlFor={`${id}-email`} className="sr-only">
              Podaj swój adres e-mail
            </label>

            <input
              id={`${id}-email`}
              name="email"
              type="email"
              autoComplete="email"
              placeholder="Wpisz swój e-mail..."
              disabled={isLoading || isSuccess}
              aria-disabled={isLoading || isSuccess}
              aria-invalid={isError}
              aria-describedby={isError ? `${id}-output` : undefined}
              className="w-full bg-[#111] border border-white/10 rounded-sm py-3.5 pl-4 pr-12 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-arylideYellow/60 focus:bg-black transition-all disabled:opacity-50 font-light"
              required
            />

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || isSuccess}
              className={`
                absolute right-1.5 top-1.5 bottom-1.5 w-10 flex items-center justify-center rounded-sm transition-all duration-300
                focus:outline-none focus:ring-2 focus:ring-arylideYellow/50
                ${
                  isSuccess
                    ? "bg-green-500 text-white"
                    : isError
                      ? "bg-red-500 text-white hover:bg-red-600"
                      : "bg-arylideYellow text-raisinBlack hover:bg-white"
                }
                disabled:opacity-90 disabled:cursor-not-allowed
              `}
              aria-label={
                isLoading ? "Wysyłanie..." : "Zapisz się do newslettera"
              }
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : isSuccess ? (
                <Check className="w-4 h-4" />
              ) : isError ? (
                <AlertCircle className="w-4 h-4" />
              ) : (
                <ArrowRight className="w-4 h-4 group-hover/input:translate-x-1 transition-transform" />
              )}
            </button>
          </div>

          {/* CHECKBOX RODO */}
          <div className="flex items-start gap-3 mt-1 px-1">
            <div className="relative flex items-center h-5">
              <input
                id={`${id}-consent`}
                name="consent"
                type="checkbox"
                required
                disabled={isLoading || isSuccess}
                className="peer h-4 w-4 cursor-pointer appearance-none rounded-sm border border-white/20 bg-white/5 checked:border-arylideYellow checked:bg-arylideYellow transition-all focus:ring-1 focus:ring-arylideYellow/50 focus:ring-offset-1 focus:ring-offset-black focus:outline-none disabled:opacity-50"
              />
              <Check
                className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 text-raisinBlack opacity-0 peer-checked:opacity-100 transition-opacity"
                strokeWidth={3}
              />
            </div>
            <label
              htmlFor={`${id}-consent`}
              className={`text-[10px] text-white/40 leading-tight cursor-pointer select-none hover:text-white/60 transition-colors ${isLoading || isSuccess ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              Zgadzam się na otrzymywanie informacji o wydarzeniach.
              <span className="block mt-0.5">
                Wiem, że mogę wypisać się w każdej chwili.
              </span>
            </label>
          </div>

          {/* Komunikaty statusu (Semantic Output) */}
          <output
            id={`${id}-output`}
            htmlFor={`${id}-email ${id}-consent`} // Wskazuje, że wynik zależy od tych pól
            className="block h-4 mt-1 text-[10px] font-bold tracking-widest uppercase animate-in fade-in slide-in-from-bottom-1"
          >
            {isSuccess && (
              <span className="text-green-400">{state.message}</span>
            )}
            {isError && <span className="text-red-400">{state.message}</span>}
          </output>
        </form>
      </div>
    </div>
  );
};
