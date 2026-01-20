"use client";

import { ArrowUp } from "lucide-react";

export default function FooterScrollTop() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      type="button"
      className="group flex items-center gap-2 text-white/20 text-xs uppercase tracking-widest hover:text-arylideYellow transition-colors ml-0 md:ml-8 cursor-pointer"
      aria-label="Przewiń stronę na samą górę"
    >
      W górę
      <span className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-arylideYellow group-hover:bg-arylideYellow group-hover:text-raisinBlack transition-all duration-300">
        <ArrowUp className="w-3 h-3 transition-transform group-hover:-translate-y-1" />
      </span>
    </button>
  );
}
