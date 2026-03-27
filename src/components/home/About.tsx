import Image from "next/image";
import Link from "next/link";
import FadeIn from "@/components/ui/FadeIn";

export default function About() {
  return (
    <section className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-raisinBlack py-24 xl:py-32">
      {/* 1. ULTRA DELIKATNE TŁO */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 z-0 w-full -translate-x-1/2 -translate-y-1/2 select-none text-center">
        <FadeIn delay="0ms">
          <span className="whitespace-nowrap font-youngest text-[20vw] text-white/2">
            Maxime
          </span>
        </FadeIn>
      </div>

      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden opacity-[0.03]">
        <FadeIn delay="100ms" className="absolute -left-20 -top-10 h-160 w-160">
          <Image
            src="/Asset-1.svg"
            alt=""
            fill
            className="object-contain brightness-0 invert"
          />
        </FadeIn>
      </div>

      {/* 2. GŁÓWNY KONTENER */}
      <div className="relative z-10 w-full max-w-7xl px-6 lg:px-8">
        {/* ZMIANA: Układ w 12 kolumnach (obok siebie) odpala się dopiero od monitorów (xl) */}
        <div className="grid grid-cols-1 items-center gap-16 md:gap-20 xl:grid-cols-12 xl:gap-20">
          {/* LEWA STRONA: Zdjęcie + Statystyki */}
          {/* Dla tabletów (w tym iPad Pro) nakładamy max-w-[550px] i wyśrodkowujemy */}
          <div className="relative w-full md:mx-auto md:max-w-137.5 xl:col-span-5 xl:mx-0 xl:max-w-none">
            <FadeIn delay="200ms">
              <div className="group relative aspect-3/4 w-full overflow-hidden bg-raisinBlack">
                <div className="absolute inset-0 h-full w-full">
                  <Image
                    src="/video-poster.webp"
                    alt="Muzycy Stowarzyszenia Maxime"
                    fill
                    className="object-cover transition-transform duration-1500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-raisinBlack/20 transition-colors duration-700 group-hover:bg-transparent" />
              </div>
            </FadeIn>

            {/* Skoro na lg mamy teraz dużo miejsca (bo jedno pod drugim), wracamy do dużych statystyk */}
            <FadeIn
              delay="400ms"
              className="absolute -bottom-6 -right-4 z-20 flex border border-white/5 bg-raisinBlack p-6 shadow-xl sm:-right-8 lg:-bottom-8 lg:-right-10 lg:p-8 xl:-bottom-8 xl:-right-12"
            >
              <div className="flex flex-col items-start border-r border-white/5 pr-6 lg:pr-8 xl:pr-10">
                <span className="font-montserrat text-3xl font-light tracking-tight text-white lg:text-4xl">
                  10
                  <span className="relative -top-2 ml-0.5 text-2xl font-light text-arylideYellow lg:text-3xl">
                    +
                  </span>
                </span>
                <span className="mt-2 font-montserrat text-[0.55rem] font-medium uppercase tracking-[0.3em] text-white/40">
                  Lat na scenie
                </span>
              </div>
              <div className="flex flex-col items-start pl-6 lg:pl-8 xl:pl-10">
                <span className="font-montserrat text-3xl font-light tracking-tight text-white lg:text-4xl">
                  40
                  <span className="relative -top-2 ml-0.5 text-2xl font-light text-arylideYellow lg:text-3xl">
                    +
                  </span>
                </span>
                <span className="mt-2 font-montserrat text-[0.55rem] font-medium uppercase tracking-[0.3em] text-white/40">
                  Projektów
                </span>
              </div>
            </FadeIn>
          </div>

          {/* PRAWA STRONA: Treść */}
          {/* Również wyśrodkowana na tabletach dla idealnej symetrii ze zdjęciem */}
          <div className="flex flex-col pt-12 md:mx-auto md:max-w-137.5 xl:col-span-6 xl:col-start-7 xl:mx-0 xl:max-w-none xl:pt-0">
            <FadeIn delay="300ms">
              <div className="mb-10 flex items-center gap-6">
                <div className="relative h-px w-12 overflow-hidden bg-white/5">
                  <div className="absolute inset-0 w-full origin-left bg-arylideYellow transition-transform duration-1000" />
                </div>
                <span className="font-youngest text-3xl text-arylideYellow lg:text-4xl">
                  Z pasji do muzyki
                </span>
              </div>
            </FadeIn>

            <FadeIn delay="500ms">
              <h2 className="mb-12 font-montserrat text-[2.75rem] font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
                Sztuka, która{" "}
                <span className="font-light italic text-philippineSilver">
                  łączy
                </span>
                <br />
                {/* Przywróciłem piękny, ogromny napis dla ekranów lg, bo teraz ma na to miejsce */}
                <span className="relative -top-2 block font-youngest text-[5rem] font-normal leading-none text-arylideYellow lg:text-[6.5rem] xl:text-[7rem]">
                  pokolenia.
                </span>
              </h2>
            </FadeIn>

            <FadeIn delay="700ms">
              <p className="mb-14 max-w-xl font-montserrat text-base font-light leading-[1.8] tracking-wide text-white/60">
                Stowarzyszenie Maxime to coś więcej niż dźwięki. Tworzymy
                przestrzeń, w której bezkompromisowa ambicja spotyka się z
                czystym talentem. Budujemy fundamenty dla artystów poszukujących
                doskonałości.
              </p>
            </FadeIn>

            <FadeIn delay="900ms">
              <div className="flex">
                <Link
                  href="/o-nas"
                  className="group relative inline-flex items-center justify-center gap-4 rounded-full border border-white/10 bg-transparent px-10 py-4 font-montserrat text-[0.78rem] sm:text-[1rem] font-bold uppercase tracking-[0.2em] text-white transition-all duration-500 hover:border-arylideYellow hover:text-arylideYellow"
                >
                  <span>Poznaj naszą historię</span>
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
