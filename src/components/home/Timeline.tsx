import Image from "next/image";

// --- TYPY ---
interface SanityImage {
  asset: {
    url: string;
    metadata: {
      lqip: string;
    };
  };
  alt?: string;
}

interface TimelineItem {
  _key: string;
  year: string;
  title: string;
  description: string;
  image: SanityImage;
}

interface TimelineProps {
  data?: {
    eyebrow?: string;
    heading?: string;
    items?: TimelineItem[];
  };
}

export const Timeline = ({ data }: TimelineProps) => {
  const {
    items = [],
    eyebrow = "Ewolucja",
    heading = "Nasza historia",
  } = data || {};

  if (items.length === 0) return null;

  return (
    <section
      className="relative bg-raisinBlack py-32 overflow-hidden"
      aria-label="Historia fundacji"
    >
      <div className="container mx-auto px-6 max-w-300 relative z-10">
        {/* Nagłówek */}
        <div className="text-center mb-32">
          <span className="text-arylideYellow text-xs font-bold tracking-[0.4em] uppercase block mb-6 animate-fade-in-up">
            {eyebrow}
          </span>
          <h2 className="font-youngest text-6xl md:text-8xl text-white animate-fade-in-up delay-100">
            {heading}
          </h2>
        </div>

        <div className="flex flex-col gap-24 lg:gap-40">
          {items.map((item, index) => {
            const imageUrl = item.image?.asset?.url;
            const blurUrl = item.image?.asset?.metadata?.lqip;
            const altText = item.image?.alt || item.title;
            const isEven = index % 2 === 0;

            return (
              <article
                key={item._key}
                className={`flex flex-col lg:flex-row items-center group ${isEven ? "" : "lg:flex-row-reverse"}`}
              >
                {/* --- ZDJĘCIE --- */}
                <div className="w-full lg:w-7/12 relative">
                  <div className="relative aspect-4/3 overflow-hidden rounded-sm bg-[#111]">
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt={altText}
                        fill
                        // ZMIANY W KLASACH PONIŻEJ:
                        // 1. transition-all: żeby animował się też kolor, a nie tylko skala
                        // 2. grayscale-0: domyślnie kolor (mobile/tablet)
                        // 3. lg:grayscale: czarno-białe dopiero od breakpointu LG (desktop)
                        // 4. lg:group-hover:grayscale-0: kolor po najechaniu tylko na desktopie
                        className="object-cover transition-all duration-1000 ease-out group-hover:scale-105 filter grayscale-0 lg:grayscale lg:group-hover:grayscale-0"
                        placeholder={blurUrl ? "blur" : "empty"}
                        blurDataURL={blurUrl}
                        sizes="(max-width: 768px) 100vw, 60vw"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white/10">
                        Brak zdjęcia
                      </div>
                    )}
                    {/* Overlay winieta */}
                    <div className="absolute inset-0 bg-raisinBlack/10 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-0" />
                  </div>

                  {/* Dekoracyjny rok */}
                  <span
                    className={`absolute -top-12 ${isEven ? "-right-12" : "-left-12"} font-youngest text-[8rem] md:text-[10rem] text-white/5 select-none z-0 pointer-events-none transition-transform duration-700 group-hover:translate-x-4`}
                    aria-hidden="true"
                  >
                    {item.year}
                  </span>
                </div>

                {/* --- TREŚĆ --- */}
                <div
                  className={`w-full lg:w-5/12 relative z-10 -mt-16 lg:mt-0 ${isEven ? "lg:-ml-24" : "lg:-mr-24"}`}
                >
                  <div className="bg-raisinBlack/95 border border-white/10 backdrop-blur-md p-8 md:p-12 shadow-2xl rounded-sm group-hover:border-arylideYellow/30 transition-colors duration-500">
                    <div className="flex items-center gap-4 mb-6">
                      <span className="w-8 h-px bg-arylideYellow" />
                      <span className="text-arylideYellow font-mono text-sm tracking-widest">
                        {item.year}
                      </span>
                    </div>

                    <h3 className="text-3xl md:text-4xl font-montserrat font-bold text-white mb-6 leading-tight">
                      {item.title}
                    </h3>

                    <p className="text-philippineSilver text-base leading-relaxed font-light">
                      {item.description}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
