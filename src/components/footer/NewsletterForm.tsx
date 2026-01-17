"use client";

import { ArrowRight, Check, Loader2, Mail } from "lucide-react";
import { useState } from "react";

export const NewsletterForm = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    // Symulacja
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setStatus("success");
    setEmail("");
    setTimeout(() => setStatus("idle"), 3000);
  };

  return (
    <div className="relative group">
      {/* --- EFEKT WOW: Złota poświata w tle (Ambient Light) --- */}
      <div className="absolute -inset-1 bg-linear-to-r from-arylideYellow/20 to-transparent blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
      <div className="absolute top-0 right-0 w-24 h-24 bg-arylideYellow/10 blur-2xl rounded-full pointer-events-none" />

      {/* --- KARTA (Glassmorphism) --- */}
      <div className="relative bg-white/3 border border-white/10 rounded-sm p-6 backdrop-blur-sm overflow-hidden">
        {/* Ikonka dekoracyjna */}
        <div className="absolute top-4 right-4 text-white/5 transform rotate-12 group-hover:text-arylideYellow/10 group-hover:scale-110 transition-all duration-500">
          <Mail className="w-16 h-16" strokeWidth={1} />
        </div>

        {/* Nagłówek */}
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
        <form onSubmit={handleSubmit} className="relative z-10">
          <div className="relative flex items-center">
            <input
              type="email"
              placeholder="Wpisz swój e-mail..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status !== "idle"}
              className="w-full bg-[#111] border border-white/10 rounded-sm py-3.5 pl-4 pr-12 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-arylideYellow/60 focus:bg-black transition-all disabled:opacity-50 font-light"
              required
            />

            <button
              type="submit"
              disabled={status !== "idle"}
              className={`
                absolute right-1.5 top-1.5 bottom-1.5 w-10 flex items-center justify-center rounded-sm transition-all duration-300
                ${
                  status === "success"
                    ? "bg-green-500 text-white"
                    : "bg-arylideYellow text-raisinBlack hover:bg-white"
                }
                disabled:opacity-70 disabled:cursor-not-allowed
              `}
              aria-label="Zapisz się"
            >
              {status === "loading" ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : status === "success" ? (
                <Check className="w-4 h-4" />
              ) : (
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              )}
            </button>
          </div>

          {/* Wiadomość o sukcesie */}
          <div
            className={`absolute -bottom-8 left-0 text-[10px] font-bold tracking-widest uppercase transition-all duration-500 ${status === "success" ? "opacity-100 translate-y-0 text-green-400" : "opacity-0 -translate-y-2 text-arylideYellow"}`}
          >
            Dziękujemy za dołączenie!
          </div>
        </form>
      </div>
    </div>
  );
};
