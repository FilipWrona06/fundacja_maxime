"use client";

import {
  Heart,
  Lightbulb,
  Music2,
  Star,
  TrendingUp,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";

const iconMap: Record<string, React.ElementType> = {
  music: Music2,
  trending: TrendingUp,
  users: Users,
  heart: Heart,
  star: Star,
  lightbulb: Lightbulb,
};

interface ValueItem {
  _key: string;
  title: string;
  description: string;
  icon: string;
}

export const AboutSlider = ({ values }: { values: ValueItem[] }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animKey, setAnimKey] = useState(0);

  useEffect(() => {
    if (values.length === 0) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % values.length);
      setAnimKey((prev) => prev + 1);
    }, 5000);

    return () => clearInterval(timer);
  }, [values.length]);

  const handleManualChange = (index: number) => {
    setActiveIndex(index);
    setAnimKey((prev) => prev + 1);
  };

  const activeItem = values[activeIndex];
  if (!activeItem) return null;

  return (
    <>
      {/* TREŚĆ (Zmienna) */}
      <div
        key={activeItem._key}
        className="flex flex-col gap-4 animate-fade-in"
      >
        <div className="flex items-center gap-4">
          {(() => {
            const iconName = activeItem.icon || "music";
            const IconComponent = iconMap[iconName] || Music2;
            return (
              <div className="p-3 rounded-full bg-white/5 border border-white/10 text-arylideYellow shrink-0">
                <IconComponent
                  className="w-6 h-6"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
              </div>
            );
          })()}
          <h3 className="text-2xl text-white font-montserrat font-bold tracking-wide">
            {activeItem.title}
          </h3>
        </div>

        <p className="text-philippineSilver/80 text-base leading-relaxed max-w-xl pl-18">
          {activeItem.description}
        </p>
      </div>

      {/* KONTROLKI (Interaktywne) */}
      <div
        className="flex gap-3 mt-8 pl-18"
        role="tablist"
        aria-label="Wybierz wartość"
      >
        {values.map((item, idx) => (
          <button
            type="button"
            key={item._key}
            onClick={() => handleManualChange(idx)}
            className="relative h-1 w-12 bg-white/10 rounded-full overflow-hidden group hover:h-1.5 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-arylideYellow"
            role="tab"
            aria-selected={activeIndex === idx}
            aria-label={`Pokaż wartość: ${item.title}`}
          >
            <div className="absolute inset-0 bg-white/10 group-hover:bg-white/20 transition-colors" />
            {activeIndex === idx && (
              <div
                key={animKey}
                className="absolute inset-0 bg-arylideYellow h-full origin-left animate-progress-fill"
              />
            )}
          </button>
        ))}
      </div>
    </>
  );
};
