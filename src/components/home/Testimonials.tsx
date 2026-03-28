import FadeIn from "@/components/ui/FadeIn";

export default function Testimonials() {
  return (
    <section className="bg-philippineSilver relative z-10 w-full overflow-hidden py-32 lg:py-48">
      {/* --- GŁĘBIA W TLE --- */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 z-0 w-full -translate-x-1/2 -translate-y-1/2 text-center select-none">
        <span className="font-youngest text-[30vw] leading-none whitespace-nowrap text-white/30">
          Recenzje
        </span>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-12">
        {/* --- NAGŁÓWEK SEKCJI --- */}
        <div className="mb-20 flex flex-col items-start lg:mb-32">
          <FadeIn>
            <div className="mb-6 flex items-center gap-4">
              <div className="bg-raisinBlack h-px w-16" />
              <span className="font-montserrat text-raisinBlack text-[0.65rem] font-bold tracking-[0.4em] uppercase">
                Głosy publiczności
              </span>
            </div>
          </FadeIn>

          <FadeIn delay="200ms">
            <h2 className="font-montserrat text-raisinBlack text-5xl leading-[1.1] font-bold lg:text-[5.5rem]">
              Oklaski, które <br />
              <span className="font-youngest relative top-4 inline-block -rotate-2 text-6xl font-normal text-white drop-shadow-sm lg:text-[7.5rem]">
                nie milkną.
              </span>
            </h2>
          </FadeIn>
        </div>

        {/* --- ASYMETRYCZNY KOLAŻ KART --- */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-0">
          {/* KARTA 1 */}
          <FadeIn
            delay="400ms"
            className="relative z-10 lg:col-span-6 lg:col-start-1"
          >
            <div className="group bg-raisinBlack relative overflow-hidden p-10 shadow-2xl transition-all duration-700 hover:-translate-y-4 lg:p-14">
              <div className="absolute -top-8 -right-4 opacity-10 transition-transform duration-700 group-hover:scale-110 group-hover:-rotate-12 group-hover:opacity-20">
                <span className="font-youngest text-arylideYellow text-[12rem]">
                  "
                </span>
              </div>
              <p className="font-montserrat relative z-10 mb-10 text-lg leading-relaxed font-light text-white lg:text-xl">
                Stowarzyszenie Maxime to zjawisko. Dawno nie widziałem na scenie
                tak potężnej mieszanki młodzieńczej energii i absolutnego,
                rygorystycznego profesjonalizmu.
              </p>
              <div className="relative z-10 flex items-center gap-4">
                <div className="bg-arylideYellow h-px w-8" />
                <div>
                  <h4 className="font-montserrat text-sm font-bold text-white">
                    Michał K.
                  </h4>
                  <span className="font-montserrat text-[0.65rem] tracking-widest text-white/50 uppercase">
                    Krytyk Muzyczny
                  </span>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* KARTA 2 */}
          <FadeIn
            delay="600ms"
            className="relative z-20 lg:col-span-7 lg:col-start-6 lg:-mt-24 lg:-ml-12"
          >
            <div className="group relative overflow-hidden border border-white/60 bg-white/40 p-10 shadow-[0_30px_60px_rgba(0,0,0,0.1)] backdrop-blur-xl transition-all duration-700 hover:-translate-y-4 hover:bg-white/50 lg:p-14">
              <div className="absolute -top-8 -right-4 opacity-[0.05] transition-transform duration-700 group-hover:scale-110 group-hover:-rotate-12 group-hover:opacity-10">
                <span className="font-youngest text-oxfordBlue text-[12rem]">
                  "
                </span>
              </div>
              <p className="font-montserrat text-raisinBlack relative z-10 mb-10 text-lg leading-relaxed font-light lg:text-xl">
                Każdy detal, od doboru repertuaru po reżyserię światła, trzymał
                w napięciu. Oni nie po prostu grają muzykę klasyczną – oni ją na
                nowo wymyślają.
              </p>
              <div className="relative z-10 flex items-center gap-4">
                <div className="bg-oxfordBlue h-px w-8" />
                <div>
                  <h4 className="font-montserrat text-raisinBlack text-sm font-bold">
                    Anna S.
                  </h4>
                  <span className="font-montserrat text-raisinBlack/60 text-[0.65rem] tracking-widest uppercase">
                    Dyrektor Festiwalu
                  </span>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* KARTA 3 */}
          <FadeIn
            delay="800ms"
            className="relative z-30 lg:col-span-6 lg:col-start-3 lg:-mt-16"
          >
            <div className="group bg-oxfordBlue relative overflow-hidden p-10 shadow-2xl transition-all duration-700 hover:-translate-y-4 lg:p-14">
              <div className="absolute -top-8 -right-4 opacity-10 transition-transform duration-700 group-hover:scale-110 group-hover:-rotate-12 group-hover:opacity-20">
                <span className="font-youngest text-[12rem] text-white">"</span>
              </div>
              <p className="font-montserrat relative z-10 mb-10 text-lg leading-relaxed font-light text-white lg:text-xl">
                Sztuka, która autentycznie łączy pokolenia. Wzruszenie, zachwyt
                i owacje na stojąco, które wydawały się nie mieć końca.
                Absolutnie światowy poziom.
              </p>
              <div className="relative z-10 flex items-center gap-4">
                <div className="bg-philippineSilver h-px w-8" />
                <div>
                  <h4 className="font-montserrat text-sm font-bold text-white">
                    Piotr W.
                  </h4>
                  <span className="font-montserrat text-[0.65rem] tracking-widest text-white/50 uppercase">
                    Uczestnik koncertu
                  </span>
                </div>
              </div>
              <div className="bg-arylideYellow absolute bottom-0 left-0 h-1 w-0 transition-all duration-700 group-hover:w-full" />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
