import Link from "next/link";

export const FooterBottom = ({
  scrollTopSlot,
}: {
  scrollTopSlot?: React.ReactNode;
}) => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
      <p className="text-white/20 text-xs text-center md:text-left">
        &copy; {currentYear} Fundacja Maxime. Wszelkie prawa zastrzeżone.
      </p>

      <div className="flex items-center gap-6">
        <Link
          href="/polityka-prywatnosci"
          className="text-white/30 text-xs hover:text-white transition-colors"
        >
          Polityka Prywatności
        </Link>
        <Link
          href="/regulamin"
          className="text-white/30 text-xs hover:text-white transition-colors"
        >
          Regulamin
        </Link>
      </div>

      {/* Slot na Client Component (Scroll Top) */}
      {scrollTopSlot}
    </div>
  );
};
