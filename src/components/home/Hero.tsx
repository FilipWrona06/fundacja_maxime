import { ChevronDown, ExternalLink } from "lucide-react";
import Link from "next/link";
import { HeroVideo } from "./HeroVideo";

// --- TYPY DANYCH ---

interface SanityImage {
  asset: {
    url: string;
    metadata: {
      lqip: string;
    };
  };
}

interface HeroButton {
  _key: string;
  title: string;
  style: "primary" | "secondary";
  linkType?: "internal" | "external";
  internalLink?: string;
  externalLink?: string;
  openInNewTab?: boolean;
  ariaLabel?: string;
}

interface HeroProps {
  data?: {
    badge?: string;
    headingLine1?: string;
    headingLine2?: string;
    // USUNIĘTO: description z interfejsu
    posterImage?: SanityImage;
    buttons?: HeroButton[];
  };
}

const STYLES = {
  btnBase:
    "relative flex items-center justify-center gap-2 rounded-full px-8 py-4 text-sm font-bold tracking-wide transition-all duration-300 w-auto min-w-55 text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-raisinBlack",
  btnPrimary:
    "group bg-arylideYellow text-raisinBlack hover:scale-105 hover:shadow-[0_0_20px_rgba(239,203,111,0.4)] focus-visible:ring-white overflow-hidden",
  btnSecondary:
    "group border border-white/20 bg-white/5 text-white backdrop-blur-md hover:bg-white hover:text-raisinBlack hover:border-white focus-visible:ring-arylideYellow",
};

const getHref = (btn: HeroButton) => {
  if (btn.linkType === "internal" && btn.internalLink) {
    return `/${btn.internalLink}`;
  }
  if (btn.linkType === "external" && btn.externalLink) {
    return btn.externalLink;
  }
  return "#";
};

const DEFAULT_BUTTONS: HeroButton[] = [
  {
    _key: "default-1",
    title: "Zobacz wydarzenia",
    style: "primary",
    linkType: "internal",
    internalLink: "wydarzenia",
  },
  {
    _key: "default-2",
    title: "Skontaktuj się",
    style: "secondary",
    linkType: "internal",
    internalLink: "kontakt",
  },
];

export const Hero = ({ data }: HeroProps) => {
  const {
    badge = "Fundacja Maxime",
    headingLine1 = "Z pasji",
    headingLine2 = "do muzyki",
    buttons = [],
    posterImage,
  } = data || {};

  const buttonsToDisplay = buttons.length > 0 ? buttons : DEFAULT_BUTTONS;

  return (
    <section
      aria-label="Sekcja powitalna"
      className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-raisinBlack"
    >
      {/* --- VIDEO TŁO --- */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        {/* Overlay dla lepszej czytelności napisów */}
        <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,rgba(38,38,38,0.3)_0%,rgba(38,38,38,0.8)_100%)]" />
        <HeroVideo poster={posterImage} />
      </div>

      {/* --- TREŚĆ --- */}
      <div className="relative z-20 container mx-auto px-4 text-center flex flex-col items-center">
        {/* Badge */}
        <div className="animate-fade-in-up">
          <span className="inline-block py-1.5 px-3 rounded-full border border-philippineSilver/30 bg-white/5 backdrop-blur-sm text-philippineSilver text-xs sm:text-[0.8rem] md:text-[0.9rem] font-montserrat tracking-[0.2em] uppercase">
            {badge}
          </span>
        </div>

        {/* Nagłówek H1 - Wielki i Czytelny */}
        <h1 className="animate-fade-in-up delay-200 font-youngest text-[4.78rem] sm:text-[8rem] md:text-[10rem] text-arylideYellow mb-2 drop-shadow-2xl leading-tight select-none">
          <span className="block">{headingLine1}</span>
          <span className="block -mt-2 md:-mt-6">{headingLine2}</span>
        </h1>

        {/* USUNIĘTO: <p> z opisem */}

        {/* Przyciski - Zwiększono margines górny (mt-12) dla oddechu */}
        <div className="animate-fade-in-up delay-300 mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
          {buttonsToDisplay.map((btn) => {
            const isPrimary = btn.style?.startsWith("primary");
            const href = getHref(btn);
            const isExternal = btn.linkType === "external";

            return (
              <Link
                key={btn._key}
                href={href}
                target={btn.openInNewTab ? "_blank" : undefined}
                rel={btn.openInNewTab ? "noopener noreferrer" : undefined}
                aria-label={btn.ariaLabel || undefined}
                className={`${STYLES.btnBase} ${isPrimary ? STYLES.btnPrimary : STYLES.btnSecondary}`}
              >
                {isPrimary ? (
                  <>
                    <span className="relative z-10 flex items-center gap-2">
                      {btn.title}
                      {isExternal && <ExternalLink className="w-4 h-4" />}
                    </span>
                    <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                  </>
                ) : (
                  <span className="flex items-center gap-2">
                    {btn.title}
                    {isExternal && <ExternalLink className="w-4 h-4" />}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce pointer-events-none animate-fade-in-up delay-500"
        aria-hidden="true"
      >
        <ChevronDown className="w-10 h-10 text-white/75" strokeWidth={1} />
      </div>

      {/* Gradient dolny dla płynnego przejścia w kolejną sekcję */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-linear-to-t from-raisinBlack to-transparent z-10 pointer-events-none" />
    </section>
  );
};
