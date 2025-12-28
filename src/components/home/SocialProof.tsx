// --- START OF FILE SocialProof.tsx ---

"use client";

import { motion, type Variants } from "framer-motion";
import { Quote } from "lucide-react";

// Przykładowe dane - zróżnicowane perspektywy (Autorytet, Beneficjent, Prasa)
const testimonials = [
  {
    id: 1,
    content:
      "To niesamowite obserwować, jak pod skrzydłami fundacji rodzą się nowe talenty. Poziom artystyczny orkiestry Maxime dorównuje czołowym europejskim zespołom młodzieżowym.",
    author: "Krzysztof Penderecki Jr.",
    role: "Dyrygent Gościnny",
    image: "/images/testimonials/conductor.jpg",
    type: "Autorytet",
  },
  {
    id: 2,
    content:
      "Stypendium fundacji pozwoliło mi na zakup profesjonalnego instrumentu. Bez tego wsparcia moja droga na akademię muzyczną w Wiedniu byłaby niemożliwa.",
    author: "Julia S.",
    role: "Stypendystka, Skrzypce",
    image: "/images/testimonials/student.jpg",
    type: "Wpływ Społeczny",
  },
  {
    id: 3,
    content:
      "Fundacja Maxime udowadnia, że Śląsk to nie tylko przemysł, ale i kultura wysoka. Ich koncerty to wydarzenia, na które czeka się miesiącami.",
    author: "Kultura i Sztuka",
    role: "Magazyn Kulturalny",
    image: "/images/testimonials/press.jpg",
    type: "Media",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Karty będą wjeżdżać jedna po drugiej
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export const SocialProof = () => {
  return (
    <section className="relative py-24 bg-raisinBlack overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        {/* Nagłówek sekcji */}
        <div className="text-center mb-16">
          <span className="text-arylideYellow text-xs font-bold tracking-[0.2em] uppercase block mb-3">
            Recenzje i Opinie
          </span>
          <h2 className="font-youngest text-4xl md:text-5xl text-white">
            Echa naszej <span className="text-philippineSilver/50">pracy</span>
          </h2>
        </div>

        {/* Grid Kart */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {testimonials.map((item) => (
            <motion.div
              key={item.id}
              variants={cardVariants}
              className="group relative flex flex-col h-full bg-white/5 border border-white/10 rounded-sm p-8 transition-colors duration-500 hover:border-arylideYellow/30 hover:bg-white/[0.07]"
            >
              {/* Duży cudzysłów w tle */}
              <Quote className="absolute top-6 right-6 w-16 h-16 text-white/5 rotate-12 group-hover:text-arylideYellow/10 transition-colors duration-500" />

              {/* Treść Opinii */}
              <div className="flex-1 mb-8 relative z-10">
                {/* Opcjonalny Badge typu opinii */}
                <span className="inline-block px-2 py-1 mb-4 text-[10px] font-bold uppercase tracking-widest text-philippineSilver border border-white/10 rounded-sm">
                  {item.type}
                </span>

                <p className="text-philippineSilver/90 text-lg italic font-light leading-relaxed">
                  "{item.content}"
                </p>
              </div>

              {/* Autor */}
              <div className="flex items-center gap-4 border-t border-white/10 pt-6 mt-auto">
                {/* Avatar (fallback z inicjałami) */}
                <div className="relative w-12 h-12 rounded-full overflow-hidden bg-white/10 shrink-0 border border-white/10 group-hover:border-arylideYellow/50 transition-colors">
                  <div className="absolute inset-0 flex items-center justify-center text-white/40 font-bold text-sm">
                    {item.author.charAt(0)}
                  </div>
                </div>

                <div>
                  <h4 className="text-white font-montserrat font-bold text-sm tracking-wide group-hover:text-arylideYellow transition-colors">
                    {item.author}
                  </h4>
                  <span className="text-philippineSilver/50 text-xs uppercase tracking-wider block mt-1">
                    {item.role}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
