// src/app/(user)/opinie/ReviewForm.tsx
"use client";

import { useState } from "react";
import FadeIn from "@/components/ui/FadeIn";

export default function ReviewForm() {
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    text: "",
    rating: 5,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Błąd wysyłania opinii");

      setIsSubmitted(true);
      setFormData({ name: "", role: "", text: "", rating: 5 });
    } catch (_err) {
      setError("Nie udało się wysłać opinii. Spróbuj ponownie później.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FadeIn delay="200ms">
      <div className="bg-oxfordBlue rounded-3xl border border-white/10 p-8 shadow-2xl lg:p-10">
        <h3 className="font-youngest mb-2 text-3xl text-white">
          Zostaw swój ślad
        </h3>
        <p className="font-montserrat mb-8 text-sm font-light text-white/60">
          Podziel się wrażeniami z naszych koncertów.
        </p>

        {isSubmitted ? (
          <div className="animate-fade-in-up py-10 text-center">
            <div className="bg-arylideYellow text-oxfordBlue mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full">
              <svg
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h4 className="font-montserrat mb-2 text-xl font-bold text-white">
              Dziękujemy!
            </h4>
            <p className="font-montserrat text-sm font-light text-white/70">
              Twoja opinia została przesłana i czeka na weryfikację.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-8">
            {/* GWIAZDKI SELECTOR */}
            <div className="flex flex-col gap-2">
              <span className="font-montserrat text-[0.65rem] font-bold tracking-widest text-white/50 uppercase">
                Ocena
              </span>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    key={star}
                    onClick={() => setFormData({ ...formData, rating: star })}
                    className="transition-transform hover:scale-110"
                  >
                    <svg
                      className={`h-8 w-8 ${star <= formData.rating ? "text-arylideYellow" : "text-white/20"}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </button>
                ))}
              </div>
            </div>

            <div className="group relative">
              <input
                type="text"
                required
                placeholder="Imię i nazwisko (lub inicjały)"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="font-montserrat focus:border-arylideYellow w-full border-b border-white/20 bg-transparent py-3 text-base font-light text-white transition-colors outline-none placeholder:text-white/30"
              />
            </div>

            <div className="group relative">
              <input
                type="text"
                placeholder="Rola (np. Widz, Uczestnik)"
                value={formData.role}
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value })
                }
                className="font-montserrat focus:border-arylideYellow w-full border-b border-white/20 bg-transparent py-3 text-base font-light text-white transition-colors outline-none placeholder:text-white/30"
              />
            </div>

            <div className="group relative">
              <textarea
                required
                rows={3}
                placeholder="Twoja opinia..."
                value={formData.text}
                onChange={(e) =>
                  setFormData({ ...formData, text: e.target.value })
                }
                className="font-montserrat focus:border-arylideYellow w-full resize-none border-b border-white/20 bg-transparent py-3 text-base font-light text-white transition-colors outline-none placeholder:text-white/30"
              />
            </div>

            {error && <p className="text-xs text-red-400">{error}</p>}

            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-arylideYellow font-montserrat text-oxfordBlue mt-4 flex w-full items-center justify-center rounded-full py-4 text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
            >
              {isSubmitting ? "Wysyłanie..." : "Wyślij opinię"}
            </button>
          </form>
        )}
      </div>
    </FadeIn>
  );
}
