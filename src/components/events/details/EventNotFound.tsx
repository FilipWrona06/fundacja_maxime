// --- FILE: components/events/details/EventNotFound.tsx ---
import { AlertCircle } from "lucide-react";
import Link from "next/link";

export const EventNotFound = ({ slug }: { slug: string }) => {
  return (
    <main className="min-h-screen bg-raisinBlack flex items-center justify-center p-4">
      <div className="text-center">
        <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 text-white/20">
          <AlertCircle size={40} />
        </div>
        <h1 className="text-3xl font-youngest text-white mb-2">
          Nie znaleziono wydarzenia
        </h1>
        <p className="text-philippineSilver mb-8">
          Wydarzenie o adresie{" "}
          <code className="text-arylideYellow">{slug}</code> nie istnieje.
        </p>
        <Link
          href="/wydarzenia"
          className="px-6 py-3 bg-arylideYellow text-raisinBlack font-bold uppercase tracking-widest rounded-sm hover:bg-white transition-colors"
        >
          Wróć do kalendarza
        </Link>
      </div>
    </main>
  );
};
