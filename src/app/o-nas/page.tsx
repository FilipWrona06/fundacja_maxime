import Image from "next/image";
import Link from "next/link";
import FadeIn from "@/components/ui/FadeIn";

const timelineData = [
  {
    year: "2013",
    title: "Narodziny idei",
    desc: "Zaczęło się od kilku pasjonatów i jednego marzenia. Chcieliśmy stworzyć przestrzeń, w której muzyka nie jest tylko odtwarzana, ale przeżywana.",
    img: "/video-poster.webp",
  },
  {
    year: "2016",
    title: "Pierwsze wielkie sceny",
    desc: "Wyszliśmy z cienia. Stowarzyszenie zorganizowało swój pierwszy, w pełni autorski projekt operowy, który przyciągnął setki widzów.",
    img: "/video-poster.webp",
  },
  {
    year: "2020",
    title: "Sztuka w czasach ciszy",
    desc: "Gdy świat się zatrzymał, my szukaliśmy nowych dróg. Przenieśliśmy nasze projekty w sferę cyfrową, nagrywając wyjątkowe koncerty w pustych salach.",
    img: "/video-poster.webp",
  },
  {
    year: "2026",
    title: "Nowa era Maxime",
    desc: "Dzisiaj to dziesiątki zrealizowanych projektów, setki artystów i niezliczone emocje. Nie zatrzymujemy się. Budujemy nowe fundamenty.",
    img: "/video-poster.webp",
  },
];

export default function AboutUsPage() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-raisinBlack selection:bg-arylideYellow selection:text-raisinBlack">
      {/* Pływające Assety SVG w tle */}
      <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.03]">
        <div className="absolute left-10 top-20 h-200 w-200 opacity-50">
          <Image
            src="/Asset-1.svg"
            alt=""
            fill
            className="object-contain brightness-0 invert"
          />
        </div>
        <div className="absolute -bottom-40 right-[-10%] h-240 w-240 opacity-50">
          <Image
            src="/Asset-2.svg"
            alt=""
            fill
            className="object-contain brightness-0 invert"
          />
        </div>
      </div>

      {/* --- HERO SECTION --- */}
      <section className="relative z-10 flex min-h-[90vh] w-full flex-col justify-center px-6 pb-24 pt-24 lg:px-12 lg:pb-0 lg:pt-32">
        <div className="mx-auto w-full max-w-7xl">
          <FadeIn delay="100ms">
            <span className="mb-6 block font-montserrat text-[0.65rem] font-bold uppercase tracking-[0.4em] text-arylideYellow">
              Nasza tożsamość
            </span>
          </FadeIn>
          <FadeIn delay="300ms">
            <h1 className="font-montserrat text-5xl font-bold leading-[1.05] tracking-tight text-white md:text-7xl lg:text-[7rem]">
              Nie gramy dźwięków.
              <br />
              <span className="font-light italic text-philippineSilver">
                Tworzymy
              </span>{" "}
              <span className="relative top-4 inline-block -rotate-2 font-youngest text-6xl font-normal text-arylideYellow md:text-8xl lg:top-8 lg:text-[10rem]">
                emocje.
              </span>
            </h1>
          </FadeIn>
          <FadeIn delay="500ms" className="mt-12 max-w-2xl lg:mt-24">
            <p className="font-montserrat text-lg font-light leading-relaxed tracking-wide text-white/70">
              Stowarzyszenie Maxime powstało z buntu przeciwko przeciętności.
              Jesteśmy kolektywem artystów, wizjonerów i rzemieślników sceny,
              których łączy jeden cel: dostarczyć publiczności przeżyć, które
              zostają w pamięci na zawsze.
            </p>
          </FadeIn>
        </div>
        <div className="absolute bottom-0 left-1/2 h-16 w-px -translate-x-1/2 overflow-hidden bg-white/10">
          <div className="absolute left-0 top-0 h-full w-full animate-scroll-line bg-arylideYellow" />
        </div>
      </section>

      {/* --- WSTĘP / MANIFEST --- */}
      <section className="relative z-10 w-full py-24 lg:py-40">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <FadeIn>
                <div className="relative aspect-4/5 w-full overflow-hidden bg-[#1a1a1a]">
                  <Image
                    src="/video-poster.webp"
                    alt="Próba orkiestry"
                    fill
                    className="object-cover transition-transform duration-2000 hover:scale-105"
                  />
                  <div className="absolute left-6 top-6 border border-white/20 px-4 py-2 backdrop-blur-md">
                    <span className="font-montserrat text-[0.55rem] uppercase tracking-[0.3em] text-white">
                      Est. 2013
                    </span>
                  </div>
                </div>
              </FadeIn>
            </div>
            <div className="flex flex-col justify-center lg:col-span-6 lg:col-start-7">
              <FadeIn delay="200ms">
                <h2 className="mb-8 font-montserrat text-3xl font-light leading-tight text-white lg:text-5xl">
                  Fundamentem jest <span className="font-bold">odwaga</span>,
                  <br />
                  narzędziem jest{" "}
                  <span className="relative top-2 inline-block font-youngest text-5xl text-arylideYellow lg:text-7xl">
                    talent.
                  </span>
                </h2>
              </FadeIn>
              <FadeIn delay="400ms">
                <p className="mb-6 font-montserrat text-base font-light leading-[1.8] text-white/60">
                  Wierzymy, że muzyka to najpotężniejszy nośnik emocji. Nie
                  idziemy na kompromisy. Od doboru repertuaru, przez
                  wielogodzinne próby, aż po reżyserię światła na scenie – każdy
                  detal jest projektowany tak, by wywołać dreszcz emocji.
                </p>
                <p className="font-montserrat text-base font-light leading-[1.8] text-white/60">
                  Przekraczamy granice klasycznego postrzegania sztuki, łącząc
                  tradycję z nowoczesną, dynamiczną formą sceniczną.
                </p>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* --- MEGA TIMELINE (OŚ CZASU) --- */}
      <section className="relative z-10 w-full border-y border-white/5 bg-[#1c1c1c] py-32 lg:py-48">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
          <FadeIn>
            <div className="mb-24 flex items-center gap-6 md:mb-40">
              <div className="h-px w-24 bg-arylideYellow" />
              <h2 className="font-youngest text-5xl text-arylideYellow lg:text-7xl">
                Nasza droga
              </h2>
            </div>
          </FadeIn>

          <div className="flex flex-col gap-32 lg:gap-48">
            {timelineData.map((item, index) => (
              <div
                key={item.year}
                className="group relative grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8"
              >
                <div className="relative lg:col-span-3">
                  <div className="lg:sticky lg:top-40">
                    <FadeIn>
                      <span className="block font-youngest text-6xl leading-none text-white/10 transition-colors duration-700 group-hover:text-arylideYellow lg:text-[7rem]">
                        {item.year}
                      </span>
                      <span className="mt-4 block font-montserrat text-[0.65rem] font-bold uppercase tracking-[0.3em] text-white/40">
                        Rozdział 0{index + 1}
                      </span>
                    </FadeIn>
                  </div>
                </div>
                <div className="border-l border-white/5 pl-8 lg:col-span-8 lg:col-start-5 lg:pl-16">
                  <FadeIn delay="200ms">
                    <h3 className="mb-6 font-montserrat text-3xl font-bold tracking-tight text-white lg:text-4xl">
                      {item.title}
                    </h3>
                    <p className="mb-12 max-w-2xl font-montserrat text-base font-light leading-relaxed text-white/60">
                      {item.desc}
                    </p>
                  </FadeIn>
                  <FadeIn delay="400ms">
                    <div className="relative w-full overflow-hidden bg-raisinBlack aspect-video">
                      <Image
                        src={item.img}
                        alt={item.title}
                        fill
                        className="object-cover opacity-80 transition-all duration-1500 group-hover:scale-105 group-hover:opacity-100"
                      />
                    </div>
                  </FadeIn>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- ZAKOŃCZENIE / CTA --- */}
      <section className="relative z-10 flex min-h-[60vh] w-full flex-col items-center justify-center px-6 py-32 text-center">
        <FadeIn>
          <span className="font-youngest text-4xl text-arylideYellow md:text-5xl">
            To dopiero początek.
          </span>
        </FadeIn>
        <FadeIn delay="200ms" className="mt-8">
          <h2 className="font-montserrat text-4xl font-bold text-white md:text-6xl">
            Bądź częścią naszej <br className="hidden md:block" />
            kolejnej{" "}
            <span className="font-light italic text-philippineSilver">
              historii.
            </span>
          </h2>
        </FadeIn>
        <FadeIn delay="400ms" className="mt-16">
          <Link
            href="/wydarzenia"
            className="group relative inline-flex items-center justify-center gap-4 rounded-full border border-white/20 bg-transparent px-12 py-5 font-montserrat text-[0.7rem] font-bold uppercase tracking-[0.2em] text-white transition-all duration-500 hover:border-arylideYellow hover:bg-arylideYellow hover:text-raisinBlack"
          >
            Zobacz nadchodzące wydarzenia
          </Link>
        </FadeIn>
      </section>
    </main>
  );
}
