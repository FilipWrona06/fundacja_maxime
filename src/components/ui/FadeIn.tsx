// src/components/ui/FadeIn.tsx
"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";

export default function FadeIn({
  children,
  delay = "0ms",
  className = "",
}: {
  children: ReactNode;
  delay?: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      // UWAGA: Zmieniłem duration-1200 na duration-[1200ms] (Tailwind standardowo nie ma 1200)
      className={`${className} transition-all duration-1200 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isVisible
          ? "opacity-100 translate-y-0 scale-100"
          : "opacity-0 translate-y-12 scale-[0.98]"
      }`}
      style={{ transitionDelay: delay }}
    >
      {children}
    </div>
  );
}
