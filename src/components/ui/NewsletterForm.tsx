// src/components/ui/NewsletterForm.tsx
"use client";

interface NewsletterFormProps {
  variant?: "dark" | "light";
  className?: string;
}

export default function NewsletterForm({
  variant = "dark",
  className = "",
}: NewsletterFormProps) {
  const isDark = variant === "dark";

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className={`group relative flex w-full items-end ${className}`}
    >
      <div
        className={`relative w-full transition-colors duration-500 ${
          isDark
            ? "border-b border-white/20 pb-3 hover:border-white/50 group-focus-within:border-arylideYellow"
            : "border-b-2 border-raisinBlack/20 pb-4 hover:border-raisinBlack/50 group-focus-within:border-raisinBlack"
        }`}
      >
        <input
          type="email"
          placeholder="Twój adres e-mail"
          required
          className={`font-montserrat w-full bg-transparent outline-none placeholder:font-light ${
            isDark
              ? "text-sm font-medium text-white placeholder:text-white/30"
              : "text-xl font-bold text-raisinBlack placeholder:text-raisinBlack/40 lg:text-2xl"
          }`}
        />
      </div>
      <button
        type="submit"
        aria-label="Zapisz się"
        className={`absolute right-0 flex items-center justify-center transition-all duration-500 ${
          isDark
            ? "bottom-2 text-white/50 hover:text-arylideYellow duration-300"
            : "bottom-3 h-12 w-12 rounded-full bg-raisinBlack text-arylideYellow shadow-xl hover:scale-110 hover:bg-oxfordBlue hover:text-white"
        }`}
      >
        <svg
          className={`${
            isDark
              ? "h-5 w-5"
              : "h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={isDark ? 2 : 2.5}
        >
          <title>{isDark ? "Wpisz swój email" : "Strzałka wyślij"}</title>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d={isDark ? "M14 5l7 7m0 0l-4 4m4-4H3" : "M14 5l7 7m0 0l-7 7m7-7H3"}
          />
        </svg>
      </button>
    </form>
  );
}
