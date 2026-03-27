import FadeIn from "@/components/ui/FadeIn";

export default function Testimonials() {
  return (
    <section className="relative z-10 w-full overflow-hidden bg-philippineSilver py-32 lg:py-48">
      {/* --- GŁĘBIA W TLE --- */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 z-0 w-full -translate-x-1/2 -translate-y-1/2 select-none text-center">
        <span className="whitespace-nowrap font-youngest text-[30vw] leading-none text-white/30">
          Recenzje
        </span>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-12">
        {/* --- NAGŁÓWEK SEKCJI --- */}
        <div className="mb-20 flex flex-col items-start lg:mb-32">
          <FadeIn>
            <div className="mb-6 flex items-center gap-4">
              <div className="h-px w-16 bg-raisinBlack" />
              <span className="font-montserrat text-[0.65rem] font-bold uppercase tracking-[0.4em] text-raisinBlack">
                Głosy publiczności
              </span>
            </div>
          </FadeIn>

          <FadeIn delay="200ms">
            <h2 className="font-montserrat text-5xl font-bold leading-[1.1] text-raisinBlack lg:text-[5.5rem]">
              Oklaski, które <br />
              <span className="relative top-4 inline-block -rotate-2 font-youngest text-6xl font-normal text-white drop-shadow-sm lg:text-[7.5rem]">
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
            <div className="group relative overflow-hidden bg-raisinBlack p-10 shadow-2xl transition-all duration-700 hover:-translate-y-4 lg:p-14">
              <div className="absolute -right-4 -top-8 opacity-10 transition-transform duration-700 group-hover:-rotate-12 group-hover:scale-110 group-hover:opacity-20">
                <span className="font-youngest text-[12rem] text-arylideYellow">
                  "
                </span>
              </div>
              <p className="relative z-10 mb-10 font-montserrat text-lg font-light leading-relaxed text-white lg:text-xl">
                Stowarzyszenie Maxime to zjawisko. Dawno nie widziałem na scenie
                tak potężnej mieszanki młodzieńczej energii i absolutnego,
                rygorystycznego profesjonalizmu.
              </p>
              <div className="relative z-10 flex items-center gap-4">
                <div className="h-px w-8 bg-arylideYellow" />
                <div>
                  <h4 className="font-montserrat text-sm font-bold text-white">
                    Michał K.
                  </h4>
                  <span className="font-montserrat text-[0.65rem] uppercase tracking-widest text-white/50">
                    Krytyk Muzyczny
                  </span>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* KARTA 2 */}
          <FadeIn
            delay="600ms"
            className="relative z-20 lg:-ml-12 lg:-mt-24 lg:col-span-7 lg:col-start-6"
          >
            <div className="group relative overflow-hidden border border-white/60 bg-white/40 p-10 shadow-[0_30px_60px_rgba(0,0,0,0.1)] backdrop-blur-xl transition-all duration-700 hover:-translate-y-4 hover:bg-white/50 lg:p-14">
              <div className="absolute -right-4 -top-8 opacity-[0.05] transition-transform duration-700 group-hover:-rotate-12 group-hover:scale-110 group-hover:opacity-10">
                <span className="font-youngest text-[12rem] text-oxfordBlue">
                  "
                </span>
              </div>
              <p className="relative z-10 mb-10 font-montserrat text-lg font-light leading-relaxed text-raisinBlack lg:text-xl">
                Każdy detal, od doboru repertuaru po reżyserię światła, trzymał
                w napięciu. Oni nie po prostu grają muzykę klasyczną – oni ją na
                nowo wymyślają.
              </p>
              <div className="relative z-10 flex items-center gap-4">
                <div className="h-px w-8 bg-oxfordBlue" />
                <div>
                  <h4 className="font-montserrat text-sm font-bold text-raisinBlack">
                    Anna S.
                  </h4>
                  <span className="font-montserrat text-[0.65rem] uppercase tracking-widest text-raisinBlack/60">
                    Dyrektor Festiwalu
                  </span>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* KARTA 3 */}
          <FadeIn
            delay="800ms"
            className="relative z-30 lg:-mt-16 lg:col-span-6 lg:col-start-3"
          >
            <div className="group relative overflow-hidden bg-oxfordBlue p-10 shadow-2xl transition-all duration-700 hover:-translate-y-4 lg:p-14">
              <div className="absolute -right-4 -top-8 opacity-10 transition-transform duration-700 group-hover:-rotate-12 group-hover:scale-110 group-hover:opacity-20">
                <span className="font-youngest text-[12rem] text-white">"</span>
              </div>
              <p className="relative z-10 mb-10 font-montserrat text-lg font-light leading-relaxed text-white lg:text-xl">
                Sztuka, która autentycznie łączy pokolenia. Wzruszenie, zachwyt
                i owacje na stojąco, które wydawały się nie mieć końca.
                Absolutnie światowy poziom.
              </p>
              <div className="relative z-10 flex items-center gap-4">
                <div className="h-px w-8 bg-philippineSilver" />
                <div>
                  <h4 className="font-montserrat text-sm font-bold text-white">
                    Piotr W.
                  </h4>
                  <span className="font-montserrat text-[0.65rem] uppercase tracking-widest text-white/50">
                    Uczestnik koncertu
                  </span>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 h-1 w-0 bg-arylideYellow transition-all duration-700 group-hover:w-full" />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
