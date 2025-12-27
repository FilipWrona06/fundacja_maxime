import { ArrowRight, Music2, TrendingUp, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const About = () => {
  return (
    <section className="relative py-24 md:py-32 bg-raisinBlack overflow-hidden">
      {/* Tło ozdobne (subtelna nuta/logo w tle - opcjonalnie) */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 opacity-[0.03] pointer-events-none">
        {/* Tu można wstawić duży SVG loga, jeśli chcesz */}
      </div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          {/* --- LEWA STRONA: ZDJĘCIE (Wabi-Sabi Style) --- */}
          <div className="w-full lg:w-1/2 relative group">
            {/* Ozdobna ramka (przesunięta względem zdjęcia) */}
            <div className="absolute inset-0 border-2 border-arylideYellow/30 translate-x-4 translate-y-4 rounded-sm transition-transform duration-500 group-hover:translate-x-2 group-hover:translate-y-2" />

            {/* Zdjęcie */}
            <div className="relative aspect-4/5 w-full overflow-hidden rounded-sm grayscale-20 group-hover:grayscale-0 transition-all duration-700">
              <Image
                src="/images/about.jpg" // Podmień na swoje zdjęcie
                alt="Orkiestra Maxime"
                fill
                className="object-cover"
              />
              {/* Overlay na zdjęciu dla klimatu */}
              <div className="absolute inset-0 bg-raisinBlack/10 mix-blend-multiply" />
            </div>
          </div>

          {/* --- PRAWA STRONA: TREŚĆ --- */}
          <div className="w-full lg:w-1/2">
            {/* Badge */}
            <span className="inline-block text-arylideYellow text-xs font-bold tracking-[0.2em] uppercase mb-4 pl-1">
              O fundacji
            </span>

            {/* Nagłówek */}
            <h2 className="font-youngest text-5xl md:text-6xl text-white mb-8 leading-tight">
              Tworzymy przestrzeń <br />
              <span className="text-philippineSilver/50">
                dla dźwięków i ludzi
              </span>
            </h2>

            {/* Opis */}
            <p className="text-philippineSilver text-lg leading-relaxed mb-12 font-light">
              Stowarzyszenie Maxime to więcej niż muzyka. To społeczność, która
              wierzy, że talent wymaga pielęgnacji, a pasja – sceny. Łączymy
              profesjonalizm z młodzieńczą energią, tworząc niezapomniane
              wydarzenia kulturalne.
            </p>

            {/* Wartości z Brandbooka (Talent, Ambicja, Profesjonalizm) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 border-t border-white/10 pt-10">
              {/* 1. Talent */}
              <div className="flex flex-col gap-3 group">
                <Music2
                  className="w-8 h-8 text-arylideYellow/80 transition-transform group-hover:-translate-y-1"
                  strokeWidth={1.5}
                />
                <h3 className="text-white font-medium tracking-wide">Talent</h3>
                <p className="text-sm text-philippineSilver/70">
                  Odkrywamy i szlifujemy diamenty.
                </p>
              </div>

              {/* 2. Ambicja */}
              <div className="flex flex-col gap-3 group">
                <TrendingUp
                  className="w-8 h-8 text-arylideYellow/80 transition-transform group-hover:-translate-y-1"
                  strokeWidth={1.5}
                />
                <h3 className="text-white font-medium tracking-wide">
                  Ambicja
                </h3>
                <p className="text-sm text-philippineSilver/70">
                  Stawiamy sobie wysokie cele artystyczne.
                </p>
              </div>

              {/* 3. Profesjonalizm */}
              <div className="flex flex-col gap-3 group">
                <Users
                  className="w-8 h-8 text-arylideYellow/80 transition-transform group-hover:-translate-y-1"
                  strokeWidth={1.5}
                />
                <h3 className="text-white font-medium tracking-wide">
                  Profesjonalizm
                </h3>
                <p className="text-sm text-philippineSilver/70">
                  Dbamy o każdy detal naszych realizacji.
                </p>
              </div>
            </div>

            {/* Link "Więcej o nas" */}
            <div className="mt-12">
              <Link
                href="/o-nas"
                className="group inline-flex items-center gap-2 text-white hover:text-arylideYellow transition-colors"
              >
                <span className="text-sm font-bold tracking-widest border-b border-white/20 pb-1 group-hover:border-arylideYellow">
                  POZNAJ NAS BLIŻEJ
                </span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
