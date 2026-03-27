import Image from "next/image";
import FadeIn from "@/components/ui/FadeIn";

const valuesData = [
  {
    id: "01",
    title: "Talent",
    desc: "Odkrywamy i pielęgnujemy unikalne brzmienia. Tworzymy przestrzeń, w której naturalne predyspozycje zamieniają się w rzemiosło na najwyższym poziomie.",
    icon: "/Talent-Asset.svg",
    marginTop: "lg:mt-0",
  },
  {
    id: "02",
    title: "Ambicja",
    desc: "Przesuwamy granice własnych możliwości. Nie zadowalamy się przeciętnością, zawsze sięgamy po najtrudniejsze wyzwania sceniczne i projektowe.",
    icon: "/Ambition-Asset.svg",
    marginTop: "lg:mt-16",
  },
  {
    id: "03",
    title: "Profesjonalizm",
    desc: "Każdy detal ma znaczenie. Od pierwszej próby aż po wybrzmienie ostatniego akordu na scenie – pracujemy z bezkompromisowym rygorem.",
    icon: "/Professionalism-Asset.svg",
    marginTop: "lg:mt-32",
  },
];

export default function Values() {
  return (
    <section className="relative z-20 w-full overflow-hidden bg-oxfordBlue py-32 lg:py-48">
      {/* --- GŁĘBIA W TLE --- */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute left-1/2 top-1/2 h-200 w-200 -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(circle_at_center,rgba(239,203,111,0.04)_0%,transparent_70%)]" />
        <div className="absolute left-0 top-10 w-full text-center mix-blend-overlay opacity-[0.02]">
          <span className="whitespace-nowrap font-youngest text-[25vw] leading-none text-white">
            Wartości
          </span>
        </div>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-12">
        <div className="mb-24 flex flex-col items-center text-center lg:mb-32">
          <FadeIn>
            <div className="mb-8 flex flex-col items-center gap-4">
              <span className="font-montserrat text-[0.65rem] font-bold uppercase tracking-[0.4em] text-arylideYellow">
                Co nas definiuje
              </span>
              <div className="h-16 w-px bg-linear-to-b from-arylideYellow to-transparent" />
            </div>
          </FadeIn>
          <FadeIn delay="200ms">
            <h2 className="font-montserrat text-5xl font-bold leading-tight text-white lg:text-7xl">
              Fundament naszej <br />
              <span className="relative top-4 font-youngest text-6xl font-normal leading-none text-arylideYellow lg:text-[7.5rem]">
                twórczości.
              </span>
            </h2>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:gap-12">
          {valuesData.map((item, index) => (
            <FadeIn
              key={item.id}
              delay={`${400 + index * 200}ms`}
              className={item.marginTop}
            >
              <div className="group relative h-full w-full overflow-hidden rounded-3xl border border-white/5 bg-white/2 p-10 backdrop-blur-md transition-all duration-700 hover:-translate-y-4 hover:border-arylideYellow/30 hover:bg-white/4 hover:shadow-[0_20px_40px_-15px_rgba(239,203,111,0.15)]">
                <div className="absolute -right-6 -top-10 z-0 opacity-10 transition-transform duration-700 group-hover:-translate-x-4 group-hover:translate-y-4 group-hover:scale-110 group-hover:text-arylideYellow group-hover:opacity-20">
                  <span className="font-youngest text-[10rem] md:text-[11rem] text-white mr-17.5 md:mr-11">
                    {item.id}
                  </span>
                </div>
                <div className="relative z-10 flex h-full flex-col">
                  <div className="mb-10 flex h-20 w-20 items-center justify-center rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-transform duration-700 group-hover:scale-110 group-hover:border-arylideYellow/50 group-hover:bg-arylideYellow/10">
                    <div className="relative h-25 w-25">
                      <Image
                        src={item.icon}
                        alt={item.title}
                        fill
                        className="object-contain brightness-0 invert transition-all duration-500 group-hover:brightness-110"
                      />
                    </div>
                  </div>
                  <h3 className="mb-4 font-montserrat text-3xl font-bold tracking-tight text-white transition-colors duration-500 group-hover:text-arylideYellow">
                    {item.title}
                  </h3>
                  <p className="font-montserrat text-sm font-light leading-[1.8] text-white/60 transition-colors duration-500 group-hover:text-white/80">
                    {item.desc}
                  </p>
                  <div className="mt-12 h-px w-12 bg-white/10 transition-all duration-700 group-hover:w-full group-hover:bg-linear-to-r group-hover:from-arylideYellow group-hover:to-transparent" />
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
