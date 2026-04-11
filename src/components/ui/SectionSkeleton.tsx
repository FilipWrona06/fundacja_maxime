// src/components/ui/SectionSkeleton.tsx

export default function SectionSkeleton({
  className = "",
}: {
  className?: string;
}) {
  return (
    <section
      className={`relative z-10 flex w-full items-center justify-center overflow-hidden ${className}`}
    >
      <div className="flex flex-col items-center gap-6 opacity-30">
        {/* Subtelny, pulsujący okrąg */}
        <div className="relative flex h-12 w-12 items-center justify-center">
          <div className="border-arylideYellow/50 absolute inset-0 animate-ping rounded-full border" />
          <div className="bg-arylideYellow h-2 w-2 rounded-full" />
        </div>

        {/* Delikatny tekst */}
        <div className="flex items-center gap-3">
          <div className="h-px w-8 bg-white/20" />
          <span className="font-montserrat animate-pulse text-[0.55rem] font-medium tracking-[0.4em] text-white uppercase">
            Ładowanie
          </span>
          <div className="h-px w-8 bg-white/20" />
        </div>
      </div>
    </section>
  );
}
