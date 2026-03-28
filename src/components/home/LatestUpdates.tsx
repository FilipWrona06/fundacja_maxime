import Image from "next/image";
import Link from "next/link";
import FadeIn from "@/components/ui/FadeIn";

const dynamicData = {
  event: {
    date: "24",
    month: "MAJ",
    year: "2026",
    title: "Symfonia Światła: Wiosenne Przebudzenie",
    location: "Filharmonia Narodowa, Warszawa",
    image: "/video-poster.webp",
    link: "/wydarzenia/symfonia-swiatla",
  },
  news: {
    date: "15 Marca 2026",
    title: "Za kulisami: Przygotowania do sezonu",
    excerpt:
      "Spędziliśmy ostatnie tygodnie na intensywnych próbach. Zobacz, jak nasz zespół przygotowuje się do najważniejszych koncertów tego roku i co szykujemy.",
    image: "/video-poster.webp",
    link: "/aktualnosci/za-kulisami",
  },
  gallery: {
    title: "Gala Jubileuszowa Maxime",
    count: "42 zdjęcia",
    image: "/video-poster.webp",
    link: "/galeria/gala-jubileuszowa",
  },
};

export default function LatestUpdates() {
  return (
    <section className="relative z-30 w-full overflow-hidden bg-[#F4F4F5] py-24 lg:py-32 xl:py-48">
      {/* --- TŁO: DOSŁOWNA PIĘCIOLINIA --- */}
      <div className="pointer-events-none absolute top-1/3 left-[-10%] z-0 flex w-[120%] -rotate-12 flex-col gap-3 opacity-15 lg:gap-5">
        <div className="bg-raisinBlack h-0.5 w-full" />
        <div className="bg-raisinBlack h-0.5 w-full" />
        <div className="bg-raisinBlack h-0.5 w-full" />
        <div className="bg-raisinBlack h-0.5 w-full" />
        <div className="bg-raisinBlack h-0.5 w-full" />
      </div>

      <div className="pointer-events-none absolute top-7/10 left-[-10%] z-0 flex w-[120%] rotate-6 flex-col gap-3 opacity-15 lg:gap-5">
        <div className="bg-raisinBlack h-0.5 w-full" />
        <div className="bg-raisinBlack h-0.5 w-full" />
        <div className="bg-raisinBlack h-0.5 w-full" />
        <div className="bg-raisinBlack h-0.5 w-full" />
        <div className="bg-raisinBlack h-0.5 w-full" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-12">
        {/* --- NAGŁÓWEK GŁÓWNY --- */}
        <div className="mb-20 xl:mb-40">
          <FadeIn>
            <h2 className="font-montserrat text-raisinBlack text-5xl leading-[1.1] font-black tracking-tighter md:text-6xl xl:text-[7rem]">
              Tu i teraz.
            </h2>
            <div className="mt-4 flex items-center gap-4 xl:mt-6">
              <div className="bg-arylideYellow h-1 w-16 xl:w-24" />
              <span className="font-youngest text-oxfordBlue text-3xl xl:text-4xl">
                Aktualności
              </span>
            </div>
          </FadeIn>
        </div>

        {/* --- ROZKŁADÓWKA --- */}
        {/* Zmiana breakpointu z lg na xl dla układu 2-kolumnowego */}
        <div className="grid grid-cols-1 items-start gap-24 md:gap-32 xl:grid-cols-12 xl:gap-16">
          {/* ----- KOLUMNA 1 (Lewa) ----- */}
          {/* Wyśrodkowanie na tabletach (md/lg) */}
          <div className="relative w-full md:mx-auto md:max-w-150 xl:col-span-6 xl:mx-0 xl:max-w-none">
            <FadeIn delay="200ms">
              {/* Mniejsze napisy na mobile (text-[4.5rem] i text-[2.4rem]) */}
              <div className="mb-6 flex items-end gap-2 sm:mb-8">
                <span className="text-transparent[-webkit-text-stroke:2px_rgba(38,38,38,0.2)] font-montserrat text-[4.5rem] leading-none font-black sm:text-[6rem] xl:text-[7rem]">
                  01
                </span>
                <h3 className="font-youngest text-arylideYellow relative bottom-2 text-[2.4rem] sm:bottom-4 sm:text-5xl xl:text-6xl">
                  Wydarzenia
                </h3>
              </div>

              <Link
                href={dynamicData.event.link}
                className="group relative block w-full"
              >
                <div className="bg-raisinBlack relative aspect-4/5 w-full overflow-hidden xl:w-[85%]">
                  <Image
                    src={dynamicData.event.image}
                    alt={dynamicData.event.title}
                    fill
                    className="object-cover opacity-90 transition-transform duration-1500 group-hover:scale-105 group-hover:opacity-100"
                  />
                </div>

                {/* Zmniejszone nakładanie się elementów na telefonach (-left-2 zamiast -left-4) */}
                <div className="bg-raisinBlack absolute top-16 -left-2 z-20 flex flex-col items-center justify-center px-6 py-8 shadow-2xl transition-transform duration-700 group-hover:-translate-y-4 sm:top-24 sm:-left-4 sm:px-8 sm:py-10 xl:-left-12 xl:px-12 xl:py-14">
                  <span className="font-montserrat text-5xl leading-none font-black tracking-tighter text-white sm:text-6xl xl:text-8xl">
                    {dynamicData.event.date}
                  </span>
                  <span className="font-montserrat text-arylideYellow mt-2 text-sm font-bold tracking-widest uppercase xl:text-lg">
                    {dynamicData.event.month}
                  </span>
                </div>

                <div className="absolute -right-2 -bottom-12 z-20 w-[95%] bg-white p-6 shadow-[0_30px_60px_rgba(0,0,0,0.1)] transition-transform duration-700 group-hover:-translate-y-2 sm:-right-4 sm:-bottom-16 sm:w-[90%] sm:p-8 xl:-right-8 xl:p-10">
                  <div className="bg-arylideYellow mb-4 h-1 w-12 xl:w-16" />
                  <h4 className="font-montserrat text-raisinBlack group-hover:text-oxfordBlue mb-3 text-xl leading-tight font-bold transition-colors sm:text-2xl xl:mb-4 xl:text-3xl">
                    {dynamicData.event.title}
                  </h4>
                  <span className="font-montserrat text-[0.6rem] font-bold tracking-widest text-gray-500 uppercase xl:text-[0.65rem]">
                    {dynamicData.event.location}
                  </span>
                </div>
              </Link>
            </FadeIn>
          </div>

          {/* ----- KOLUMNA 2 (Prawa) ----- */}
          <div className="flex flex-col gap-24 md:gap-32 xl:col-span-6 xl:mt-40">
            {/* ELEMENT: AKTUALNOŚCI */}
            <div className="w-full md:mx-auto md:max-w-150 xl:mx-0 xl:max-w-none">
              <FadeIn delay="400ms">
                <div className="mb-6 flex items-end gap-2 sm:mb-8">
                  <span className="text-transparent[-webkit-text-stroke:2px_rgba(38,38,38,0.2)] font-montserrat text-[4.5rem] leading-none font-black sm:text-[6rem] xl:text-[7rem]">
                    02
                  </span>
                  <h3 className="font-youngest text-arylideYellow relative bottom-2 text-[2.4rem] sm:bottom-4 sm:text-5xl xl:text-6xl">
                    Aktualności
                  </h3>
                </div>

                <div className="relative w-full">
                  <div className="bg-raisinBlack relative ml-auto aspect-4/3 w-[90%] overflow-hidden sm:w-[85%]">
                    <Image
                      src={dynamicData.news.image}
                      alt={dynamicData.news.title}
                      fill
                      className="object-cover transition-transform duration-1500 hover:scale-105"
                    />
                  </div>
                  <div className="border-oxfordBlue relative z-10 -mt-16 w-[95%] border-t-4 bg-white p-6 shadow-[0_20px_50px_rgba(0,0,0,0.08)] sm:-mt-24 sm:w-[90%] sm:p-8 xl:-mt-32 xl:p-10">
                    <span className="font-montserrat mb-3 block text-[0.6rem] font-bold tracking-widest text-gray-400 uppercase xl:mb-4 xl:text-[0.65rem]">
                      {dynamicData.news.date}
                    </span>
                    <h4 className="font-montserrat text-raisinBlack mb-4 text-xl leading-tight font-bold sm:text-2xl xl:mb-6 xl:text-3xl">
                      {dynamicData.news.title}
                    </h4>
                    <p className="font-montserrat mb-6 line-clamp-3 text-xs leading-relaxed font-light text-gray-600 sm:text-sm xl:mb-8">
                      {dynamicData.news.excerpt}
                    </p>
                    <Link
                      href={dynamicData.news.link}
                      className="group font-montserrat text-oxfordBlue hover:text-arylideYellow inline-flex items-center gap-4 text-[0.65rem] font-bold tracking-widest uppercase transition-colors xl:text-[0.7rem]"
                    >
                      Czytaj wpis
                      <svg
                        className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <title>Strzałka czytaj dalej</title>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </FadeIn>
            </div>

            {/* ELEMENT: GALERIA */}
            {/* PRZESUNIĘCIE: xl:-ml-75 przesuwa Galerię do środka kompozycji! */}
            <div className="w-full md:mx-auto md:max-w-150 xl:mx-0 xl:-ml-75 xl:max-w-none">
              <FadeIn delay="600ms">
                <div className="mb-6 flex items-end gap-2 sm:mb-8">
                  <span className="text-transparent[-webkit-text-stroke:2px_rgba(38,38,38,0.2)] font-montserrat text-[4.5rem] leading-none font-black sm:text-[6rem] xl:text-[7rem]">
                    03
                  </span>
                  <h3 className="font-youngest text-arylideYellow relative bottom-2 text-[2.4rem] sm:bottom-4 sm:text-5xl xl:text-6xl">
                    Galeria
                  </h3>
                </div>

                <Link
                  href={dynamicData.gallery.link}
                  className="group relative block w-full"
                >
                  <div className="bg-raisinBlack relative aspect-video w-full overflow-hidden">
                    <Image
                      src={dynamicData.gallery.image}
                      alt={dynamicData.gallery.title}
                      fill
                      className="object-cover opacity-60 transition-transform duration-2000 group-hover:scale-105 group-hover:opacity-40"
                    />
                    <div className="bg-oxfordBlue/40 group-hover:bg-oxfordBlue/70 absolute inset-0 transition-colors duration-500" />
                  </div>
                  <div className="bg-oxfordBlue absolute -bottom-6 -left-2 z-10 w-[95%] p-6 shadow-2xl transition-transform duration-700 group-hover:-translate-y-2 sm:-bottom-8 sm:-left-4 sm:w-[85%] sm:p-8 xl:-left-12 xl:p-10">
                    <span className="font-youngest text-arylideYellow mb-2 block text-2xl xl:text-3xl">
                      Galeria zdjęć
                    </span>
                    <h4 className="font-montserrat mb-2 text-lg leading-tight font-bold text-white sm:text-xl xl:text-2xl">
                      {dynamicData.gallery.title}
                    </h4>
                    <span className="font-montserrat text-[0.6rem] font-semibold tracking-widest text-white/50 uppercase xl:text-[0.65rem]">
                      {dynamicData.gallery.count}
                    </span>
                  </div>
                </Link>
              </FadeIn>
            </div>
          </div>
        </div>

        {/* --- PRZYCISK DOLNY --- */}
        <div className="mt-24 flex justify-center border-t border-gray-300 pt-16 xl:mt-40">
          <FadeIn delay="800ms">
            <Link
              href="/wydarzenia"
              className="group border-raisinBlack font-montserrat text-raisinBlack hover:bg-raisinBlack relative inline-flex items-center justify-center gap-4 rounded-full border bg-transparent px-10 py-5 text-[0.65rem] font-bold tracking-[0.2em] uppercase transition-all duration-500 hover:text-white sm:px-14 sm:py-6 sm:text-xs"
            >
              Zobacz pełne kalendarium
            </Link>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
