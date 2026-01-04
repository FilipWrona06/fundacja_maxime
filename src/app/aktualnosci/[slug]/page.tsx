"use client";

import { clsx } from "clsx";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Facebook,
  Linkedin,
  Share2,
  Twitter,
  User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

// --- MOCK DANE ---
const articleData = {
  title: "Muzyka, która łączy pokolenia – wywiad z Dyrektorem Artystycznym",
  subtitle:
    "O tym, jak klasyka odnajduje się w nowoczesnym świecie, dlaczego warto inwestować w młode talenty i jakie plany ma Fundacja Maxime na najbliższą dekadę.",
  category: "Wywiady",
  date: "28.10.2025",
  readTime: "5 min czytania",
  author: "Anna Kowalska",
  image: "/images/hero-poster.jpg",
  content: [
    {
      type: "paragraph",
      text: "Muzyka klasyczna często bywa postrzegana jako dziedzina hermetyczna, dostępna tylko dla wybranych. Fundacja Maxime od lat udowadnia, że jest inaczej. To język emocji, który nie zna granic wieku ani pochodzenia. Spotykamy się w siedzibie fundacji, tuż po próbie generalnej młodzieżowej orkiestry, aby porozmawiać o tym fenomenie.",
    },
    {
      type: "heading",
      text: "Nowoczesność w służbie tradycji",
    },
    {
      type: "paragraph",
      text: "W dobie cyfryzacji i szybkich mediów społecznościowych, mogłoby się wydawać, że Bach czy Chopin nie mają szans w starciu z algorytmami. Jednak nasze doświadczenie pokazuje coś zupełnie odwrotnego. Młodzi ludzie szukają głębi. Szukają autentyczności, którą daje żywy instrument i wibracja struny.",
    },
    {
      type: "quote",
      text: "Nie chodzi o to, by grać Mozarta w trampkach, choć i to się zdarza. Chodzi o to, by grać go z pasją, która jest zrozumiała dla dzisiejszego nastolatka.",
    },
    {
      type: "paragraph",
      text: "Naszym celem nie jest tworzenie muzeum muzyki, ale żywego laboratorium. Stypendyści, których wspieramy, to nie tylko wirtuozi techniki. To osobowości, które mają coś do powiedzenia światu. Podczas ostatnich warsztatów w Zakopanem widzieliśmy, jak ci młodzi artyści potrafią interpretować klasykę w sposób świeży, czasem wręcz rewolucyjny, nie gubiąc przy tym szacunku do partytury.",
    },
    {
      type: "image",
      src: "/images/about.jpg",
      caption: "Próba sekcji smyczkowej podczas Warsztatów Letnich 2025.",
    },
    {
      type: "heading",
      text: "Plany na przyszłość",
    },
    {
      type: "paragraph",
      text: "Nadchodzący sezon będzie przełomowy. Otwieramy nowy program mentoringowy, który połączy naszych podopiecznych z solistami światowego formatu. Planujemy również serię koncertów w przestrzeniach nietypowych – starych fabrykach, plenerach miejskich, a nawet w wirtualnej rzeczywistości. Chcemy wyjść do ludzi, tam gdzie oni są.",
    },
  ],
};

const relatedArticles = [
  {
    id: "2",
    title: "Złoty Smyczek dla Julii Kamińskiej",
    category: "Sukcesy",
    date: "20.10.2025",
    image: "/images/about.jpg",
  },
  {
    id: "3",
    title: "Warsztaty Letnie: Podsumowanie",
    category: "Wydarzenia",
    date: "15.09.2025",
    image: "/images/timeline/2024.jpg",
  },
];

export default function ArticlePage() {
  const ref = useRef(null);

  // Parallax efekt dla głównego zdjęcia
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <article className="min-h-screen bg-raisinBlack text-white selection:bg-arylideYellow selection:text-raisinBlack pb-24">
      {/* --- 1. HERO HEADER (TYPOGRAFIA) --- */}
      <div className="container mx-auto px-4 pt-32 pb-12 max-w-5xl text-center relative z-10">
        {/* Nawigacja powrotna */}
        <Link
          href="/aktualnosci"
          className="inline-flex items-center gap-2 text-philippineSilver text-xs font-bold uppercase tracking-widest hover:text-arylideYellow transition-colors mb-12"
        >
          <ArrowLeft size={14} /> Powrót do listy
        </Link>

        {/* Meta Data */}
        <div className="flex items-center justify-center gap-4 text-xs font-bold uppercase tracking-widest mb-6 animate-fade-up">
          <span className="text-arylideYellow">{articleData.category}</span>
          <span className="w-1 h-1 rounded-full bg-white/20" />
          <span className="text-philippineSilver flex items-center gap-2">
            <Calendar size={12} /> {articleData.date}
          </span>
          <span className="hidden md:flex w-1 h-1 rounded-full bg-white/20" />
          <span className="hidden md:flex text-philippineSilver items-center gap-2">
            <Clock size={12} /> {articleData.readTime}
          </span>
        </div>

        {/* Tytuł */}
        <h1 className="font-youngest text-5xl md:text-7xl lg:text-8xl leading-[0.85] text-white mb-8 animate-fade-up opacity-0 [animation-delay:100ms] [animation-fill-mode:forwards]">
          {articleData.title}
        </h1>

        {/* Lead / Subtitle */}
        <p className="text-lg md:text-xl text-philippineSilver font-light leading-relaxed max-w-3xl mx-auto animate-fade-up opacity-0 [animation-delay:200ms] [animation-fill-mode:forwards]">
          {articleData.subtitle}
        </p>
      </div>

      {/* --- 2. HERO IMAGE (PARALLAX) --- */}
      {/* POPRAWKA: Dodano ref={ref} do tego kontenera */}
      <div
        ref={ref}
        className="w-full h-[50vh] md:h-[70vh] relative overflow-hidden mb-16 md:mb-24"
      >
        <motion.div
          style={{ y, opacity }}
          className="absolute inset-0 w-full h-full"
        >
          <Image
            src={articleData.image}
            alt={articleData.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-t from-raisinBlack via-transparent to-raisinBlack/30" />
        </motion.div>
      </div>

      {/* --- 3. TREŚĆ ARTYKUŁU --- */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 max-w-6xl mx-auto">
          {/* LEWA KOLUMNA: Social Share & Author (Sticky) */}
          <div className="hidden lg:block w-48 shrink-0">
            <div className="sticky top-32 flex flex-col gap-8">
              {/* Autor */}
              <div>
                <span className="text-[10px] text-white/40 uppercase tracking-widest block mb-2">
                  Autor
                </span>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                    <User size={18} className="text-arylideYellow" />
                  </div>
                  <span className="text-sm font-bold">
                    {articleData.author}
                  </span>
                </div>
              </div>

              <div className="w-full h-px bg-white/10" />

              {/* Share */}
              <div>
                <span className="text-[10px] text-white/40 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Share2 size={12} /> Udostępnij
                </span>
                <div className="flex flex-col gap-4">
                  <button
                    type="button"
                    className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-arylideYellow hover:text-raisinBlack hover:border-arylideYellow transition-all"
                  >
                    <Facebook size={18} />
                  </button>
                  <button
                    type="button"
                    className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-arylideYellow hover:text-raisinBlack hover:border-arylideYellow transition-all"
                  >
                    <Twitter size={18} />
                  </button>
                  <button
                    type="button"
                    className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-arylideYellow hover:text-raisinBlack hover:border-arylideYellow transition-all"
                  >
                    <Linkedin size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* GŁÓWNA TREŚĆ */}
          <div className="flex-1 max-w-3xl">
            {articleData.content.map((block, index) => {
              const key = index; // index jako klucz dla statycznego contentu jest bezpieczny

              if (block.type === "paragraph") {
                return (
                  <p
                    key={key}
                    className={clsx(
                      "text-philippineSilver text-lg leading-loose mb-8 font-light",
                      index === 0 &&
                        "first-letter:text-5xl first-letter:font-youngest first-letter:text-arylideYellow first-letter:mr-2 first-letter:float-left",
                    )}
                  >
                    {block.text}
                  </p>
                );
              }
              if (block.type === "heading") {
                return (
                  <h2
                    key={key}
                    className="text-3xl font-montserrat font-bold text-white mt-12 mb-6"
                  >
                    {block.text}
                  </h2>
                );
              }
              if (block.type === "quote") {
                return (
                  <blockquote
                    key={key}
                    className="my-12 relative pl-8 border-l-2 border-arylideYellow"
                  >
                    <p className="font-youngest text-3xl md:text-4xl text-white leading-tight">
                      „{block.text}”
                    </p>
                  </blockquote>
                );
              }
              if (block.type === "image") {
                return (
                  <figure key={key} className="my-12">
                    <div className="relative aspect-video w-full rounded-sm overflow-hidden mb-3">
                      <Image
                        src={block.src || ""}
                        alt="Article Image"
                        fill
                        className="object-cover"
                      />
                    </div>
                    {block.caption && (
                      <figcaption className="text-center text-xs text-white/40 italic font-mono">
                        {block.caption}
                      </figcaption>
                    )}
                  </figure>
                );
              }
              return null;
            })}

            {/* Tagline na koniec */}
            <div className="mt-16 pt-8 border-t border-white/10 flex items-center justify-between">
              <span className="font-youngest text-2xl text-white/20">
                Fundacja Maxime
              </span>
              <Link
                href="/aktualnosci"
                className="text-xs font-bold uppercase tracking-widest hover:text-arylideYellow transition-colors"
              >
                Wróć do aktualności
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* --- 4. ZOBACZ RÓWNIEŻ (FOOTER) --- */}
      <div className="border-t border-white/10 mt-24 pt-16">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl font-youngest text-white mb-8 text-center md:text-left">
            Zobacz również
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedArticles.map((item) => (
              <Link
                key={item.id}
                href={`/aktualnosci/${item.id}`}
                className="group block"
              >
                <div className="relative aspect-4/3 overflow-hidden rounded-sm mb-4 bg-white/5">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest mb-2">
                  <span className="text-arylideYellow">{item.category}</span>
                  <span className="text-philippineSilver">• {item.date}</span>
                </div>
                <h4 className="text-xl font-bold text-white group-hover:text-arylideYellow transition-colors">
                  {item.title}
                </h4>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
