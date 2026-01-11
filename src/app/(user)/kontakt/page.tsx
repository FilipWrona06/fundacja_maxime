"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  ChevronDown,
  Clock,
  Copy,
  Facebook,
  HelpCircle,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Send,
  Youtube,
} from "lucide-react";
import { useState } from "react";

// --- DANE KONTAKTOWE ---
const contactInfo = [
  {
    id: "phone",
    icon: Phone,
    label: "Zadzwoń do nas",
    value: "+48 123 456 789",
    href: "tel:+48123456789",
    action: "Zadzwoń",
  },
  {
    id: "email",
    icon: Mail,
    label: "Napisz wiadomość",
    value: "kontakt@fundacjamaxime.pl",
    href: "mailto:kontakt@fundacjamaxime.pl",
    action: "Napisz",
  },
  {
    id: "office",
    icon: MapPin,
    label: "Odwiedź biuro",
    value: "ul. Muzyczna 14/3, 40-001 Katowice",
    href: "https://maps.google.com/?q=ul.+Muzyczna+14/3,+Katowice",
    action: "Nawiguj",
  },
];

// --- FAQ DANE ---
const faqData = [
  {
    question: "Jak mogę zapisać dziecko na przesłuchanie?",
    answer:
      "Przesłuchania odbywają się dwa razy do roku – we wrześniu i w lutym. Informacje o naborze publikujemy w zakładce 'Aktualności' oraz na naszym Facebooku. Możesz też napisać do nas maila z tytułem 'Przesłuchanie'.",
  },
  {
    question: "Czy fundacja przyjmuje darowizny rzeczowe?",
    answer:
      "Tak! Często potrzebujemy instrumentów, akcesoriów muzycznych lub wsparcia logistycznego przy organizacji koncertów. Skontaktuj się z nami, aby ustalić szczegóły przekazania darowizny.",
  },
  {
    question: "Gdzie mogę kupić bilety na koncerty?",
    answer:
      "Bilety są dostępne online poprzez naszą stronę w zakładce 'Wydarzenia' oraz stacjonarnie w kasach instytucji, w których gramy (np. Filharmonia Śląska, NOSPR).",
  },
  {
    question: "Czy można wynająć orkiestrę na wydarzenie prywatne?",
    answer:
      "Realizujemy koncerty na zamówienie, o ile są zgodne z misją i wizerunkiem fundacji. Każde zapytanie rozpatrujemy indywidualnie. Zapraszamy do kontaktu mailowego.",
  },
];

export default function ContactPage() {
  // Stan formularza
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Stan kopiowania konta
  const [copied, setCopied] = useState(false);
  const bankAccount = "12 3456 0000 0000 1234 5678 9012";

  // Stan FAQ
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleCopyAccount = () => {
    navigator.clipboard.writeText(bankAccount.replace(/\s/g, ""));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Symulacja wysyłki
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSuccess(true);
    setFormState({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setIsSuccess(false), 5000);
  };

  return (
    <main className="min-h-screen bg-raisinBlack text-white selection:bg-arylideYellow selection:text-raisinBlack relative overflow-hidden">
      {/* Tło dekoracyjne (Brand Assets Pattern) */}
      <div className="absolute top-0 left-0 w-full h-200 opacity-[0.03] pointer-events-none bg-[url('/logo.svg')] bg-repeat space-x-12 mix-blend-overlay" />

      {/* Gradienty boczne */}
      <div className="absolute top-0 right-0 w-125 h-125 bg-oxfordBlue/30 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-100 h-100 bg-arylideYellow/5 rounded-full blur-[100px] pointer-events-none translate-y-1/2 -translate-x-1/3" />

      <div className="container mx-auto px-4 pt-36 pb-20 max-w-7xl relative z-10">
        {/* --- 1. NAGŁÓWEK --- */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-24 max-w-3xl mx-auto">
          <span className="text-arylideYellow text-xs font-bold tracking-[0.3em] uppercase mb-4 animate-fade-up">
            Jesteśmy dla Was
          </span>
          <h1 className="font-youngest text-6xl md:text-8xl text-white mb-6 animate-fade-up opacity-0 [animation-delay:100ms] [animation-fill-mode:forwards]">
            Skontaktuj się
          </h1>
          <div className="w-24 h-px bg-white/20 mb-6 animate-fade-up opacity-0 [animation-delay:200ms] [animation-fill-mode:forwards]" />
          <p className="text-philippineSilver text-lg leading-relaxed font-light animate-fade-up opacity-0 [animation-delay:300ms] [animation-fill-mode:forwards]">
            Masz pytania dotyczące koncertów, warsztatów lub wsparcia fundacji?
            Napisz do nas lub odwiedź naszą siedzibę w Katowicach.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* --- 2. LEWA KOLUMNA (DANE KONTAKTOWE) --- */}
          <div className="lg:col-span-5 flex flex-col gap-8 animate-fade-up opacity-0 [animation-delay:400ms] [animation-fill-mode:forwards]">
            {/* Karty kontaktowe */}
            <div className="grid grid-cols-1 gap-4">
              {contactInfo.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  target={item.id === "office" ? "_blank" : undefined}
                  rel={item.id === "office" ? "noopener noreferrer" : undefined}
                  className="group relative bg-white/5 border border-white/10 rounded-sm p-6 flex items-center gap-6 hover:bg-white/10 hover:border-arylideYellow/50 transition-all duration-300 overflow-hidden"
                >
                  <div className="w-12 h-12 rounded-full bg-raisinBlack border border-white/10 flex items-center justify-center text-arylideYellow group-hover:scale-110 group-hover:bg-arylideYellow group-hover:text-raisinBlack transition-all duration-300 shrink-0 relative z-10">
                    <item.icon strokeWidth={1.5} className="w-6 h-6" />
                  </div>
                  <div className="relative z-10">
                    <span className="text-xs text-philippineSilver uppercase tracking-widest block mb-1">
                      {item.label}
                    </span>
                    <span className="text-white font-bold text-lg leading-tight group-hover:text-arylideYellow transition-colors">
                      {item.value.split(",")[0]}
                    </span>
                  </div>
                  {/* Dekoracyjny efekt poświaty */}
                  <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-arylideYellow/10 rounded-full blur-2xl group-hover:bg-arylideYellow/20 transition-all duration-500" />
                </a>
              ))}
            </div>

            {/* Karta z Danymi Fundacji i Kontem */}
            <div className="bg-linear-to-br from-[#1a1a1a] to-raisinBlack border border-white/10 rounded-sm p-8 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-oxfordBlue/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

              <h3 className="font-montserrat font-bold text-white mb-6 flex items-center gap-3">
                <span className="w-1 h-6 bg-arylideYellow rounded-full" />
                Dane rejestrowe
              </h3>

              <div className="space-y-3 text-sm text-philippineSilver mb-8 font-mono">
                <p className="flex justify-between border-b border-white/5 pb-2">
                  <span>KRS:</span>{" "}
                  <span className="text-white">0000123456</span>
                </p>
                <p className="flex justify-between border-b border-white/5 pb-2">
                  <span>NIP:</span>{" "}
                  <span className="text-white">123-456-78-90</span>
                </p>
                <p className="flex justify-between border-b border-white/5 pb-2">
                  <span>REGON:</span>{" "}
                  <span className="text-white">123456789</span>
                </p>
              </div>

              {/* Numer konta */}
              <div className="relative">
                <span className="text-[10px] text-arylideYellow uppercase tracking-widest block mb-2 font-bold">
                  Konto do darowizn
                </span>
                <button
                  type="button"
                  onClick={handleCopyAccount}
                  className="w-full group/btn relative bg-black/40 border border-white/10 rounded px-4 py-3 text-left hover:border-arylideYellow/50 transition-all"
                >
                  <code className="text-white font-mono text-sm sm:text-base tracking-wide block truncate">
                    {bankAccount}
                  </code>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 group-hover/btn:text-arylideYellow transition-colors">
                    {copied ? <Check size={18} /> : <Copy size={18} />}
                  </div>
                  {/* Tooltip */}
                  {copied && (
                    <motion.span
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute -top-10 right-0 text-[10px] bg-arylideYellow text-raisinBlack font-bold px-3 py-1.5 rounded shadow-lg"
                    >
                      Skopiowano numer!
                    </motion.span>
                  )}
                </button>
              </div>
            </div>

            {/* Social Media */}
            <div className="flex gap-4 items-center mt-2">
              <span className="text-xs text-white/40 uppercase tracking-widest mr-2">
                Obserwuj nas:
              </span>
              {[
                { icon: Facebook, href: "https://facebook.com" },
                { icon: Instagram, href: "https://instagram.com" },
                { icon: Youtube, href: "https://youtube.com" },
              ].map((social) => (
                <a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-arylideYellow hover:text-raisinBlack hover:border-arylideYellow transition-all duration-300"
                >
                  <social.icon size={18} strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>

          {/* --- 3. PRAWA KOLUMNA (FORMULARZ) --- */}
          <div className="lg:col-span-7 animate-fade-up opacity-0 [animation-delay:500ms] [animation-fill-mode:forwards]">
            <div className="bg-white/5 border border-white/10 rounded-sm p-8 md:p-12 relative overflow-hidden backdrop-blur-sm">
              <div className="absolute top-0 right-0 w-24 h-24 bg-linear-to-bl from-white/5 to-transparent pointer-events-none" />

              <h2 className="text-3xl font-youngest text-white mb-2">
                Napisz do nas
              </h2>
              <p className="text-philippineSilver text-sm mb-8">
                Wypełnij formularz, a odpowiemy najszybciej jak to możliwe.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6 relative">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Imię */}
                  <div className="group relative">
                    <input
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) =>
                        setFormState({ ...formState, name: e.target.value })
                      }
                      className="w-full bg-raisinBlack/50 border border-white/10 rounded-sm px-4 py-3.5 text-white placeholder-transparent focus:border-arylideYellow focus:outline-none focus:ring-1 focus:ring-arylideYellow/50 transition-all peer"
                      placeholder="Imię i nazwisko"
                      id="name"
                    />
                    <label
                      htmlFor="name"
                      className="absolute left-4 top-3.5 text-white/40 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-white/40 peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-arylideYellow peer-focus:bg-raisinBlack peer-focus:px-1 peer-[:not(:placeholder-shown)]:-top-2.5 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-white/60 peer-[:not(:placeholder-shown)]:bg-raisinBlack peer-[:not(:placeholder-shown)]:px-1 cursor-text"
                    >
                      Imię i nazwisko
                    </label>
                  </div>

                  {/* Email */}
                  <div className="group relative">
                    <input
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) =>
                        setFormState({ ...formState, email: e.target.value })
                      }
                      className="w-full bg-raisinBlack/50 border border-white/10 rounded-sm px-4 py-3.5 text-white placeholder-transparent focus:border-arylideYellow focus:outline-none focus:ring-1 focus:ring-arylideYellow/50 transition-all peer"
                      placeholder="Adres e-mail"
                      id="email"
                    />
                    <label
                      htmlFor="email"
                      className="absolute left-4 top-3.5 text-white/40 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-white/40 peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-arylideYellow peer-focus:bg-raisinBlack peer-focus:px-1 peer-[:not(:placeholder-shown)]:-top-2.5 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-white/60 peer-[:not(:placeholder-shown)]:bg-raisinBlack peer-[:not(:placeholder-shown)]:px-1 cursor-text"
                    >
                      Adres e-mail
                    </label>
                  </div>
                </div>

                {/* Temat */}
                <div className="group relative">
                  <select
                    value={formState.subject}
                    onChange={(e) =>
                      setFormState({ ...formState, subject: e.target.value })
                    }
                    className="w-full bg-raisinBlack/50 border border-white/10 rounded-sm px-4 py-3.5 text-white focus:border-arylideYellow focus:outline-none focus:ring-1 focus:ring-arylideYellow/50 transition-all appearance-none cursor-pointer"
                  >
                    <option value="" disabled className="text-white/40">
                      Wybierz temat wiadomości...
                    </option>
                    <option value="wspolpraca">Współpraca / Sponsoring</option>
                    <option value="bilety">Bilety i Rezerwacje</option>
                    <option value="przesluchania">
                      Przesłuchania do orkiestry
                    </option>
                    <option value="inne">Inne zapytanie</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/30">
                    <ChevronDown size={16} />
                  </div>
                </div>

                {/* Wiadomość */}
                <div className="group relative">
                  <textarea
                    required
                    rows={5}
                    value={formState.message}
                    onChange={(e) =>
                      setFormState({ ...formState, message: e.target.value })
                    }
                    className="w-full bg-raisinBlack/50 border border-white/10 rounded-sm px-4 py-3.5 text-white placeholder-transparent focus:border-arylideYellow focus:outline-none focus:ring-1 focus:ring-arylideYellow/50 transition-all peer resize-none"
                    placeholder="Treść wiadomości"
                    id="message"
                  />
                  <label
                    htmlFor="message"
                    className="absolute left-4 top-3.5 text-white/40 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-white/40 peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-arylideYellow peer-focus:bg-raisinBlack peer-focus:px-1 peer-[:not(:placeholder-shown)]:-top-2.5 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-white/60 peer-[:not(:placeholder-shown)]:bg-raisinBlack peer-[:not(:placeholder-shown)]:px-1 cursor-text"
                  >
                    Treść wiadomości
                  </label>
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group w-full py-4 bg-arylideYellow text-raisinBlack font-bold uppercase tracking-widest text-sm rounded-sm hover:bg-white transition-all duration-300 relative overflow-hidden flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(239,203,111,0.2)] hover:shadow-[0_0_30px_rgba(239,203,111,0.4)]"
                  >
                    {isSubmitting ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          repeat: Infinity,
                          duration: 1,
                          ease: "linear",
                        }}
                        className="w-5 h-5 border-2 border-raisinBlack border-t-transparent rounded-full"
                      />
                    ) : isSuccess ? (
                      <>
                        <Check size={18} /> Wiadomość wysłana!
                      </>
                    ) : (
                      <>
                        Wyślij wiadomość{" "}
                        <Send
                          size={16}
                          className="group-hover:translate-x-1 transition-transform"
                        />
                      </>
                    )}
                  </button>
                </div>

                {/* Success Message Overlay */}
                <AnimatePresence>
                  {isSuccess && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-raisinBlack/95 flex flex-col items-center justify-center text-center p-8 z-20 backdrop-blur-sm"
                    >
                      <motion.div
                        initial={{ scale: 0.5 }}
                        animate={{ scale: 1 }}
                        className="w-16 h-16 bg-arylideYellow rounded-full flex items-center justify-center text-raisinBlack mb-4"
                      >
                        <Check size={32} />
                      </motion.div>
                      <h3 className="text-2xl font-youngest text-white mb-2">
                        Dziękujemy!
                      </h3>
                      <p className="text-philippineSilver">
                        Odezwiemy się do Ciebie wkrótce.
                      </p>
                      <button
                        type="button"
                        onClick={() => setIsSuccess(false)}
                        className="mt-6 text-xs font-bold uppercase tracking-widest text-arylideYellow hover:text-white transition-colors"
                      >
                        Wyślij kolejną wiadomość
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </div>

            {/* Godziny otwarcia (małe info pod formularzem) */}
            <div className="mt-8 flex items-center justify-center lg:justify-start gap-3 text-white/40 text-xs">
              <Clock size={14} />
              <span>Biuro czynne: Pn-Pt 9:00 - 17:00</span>
            </div>
          </div>
        </div>

        {/* --- 4. MAPA (STYLIZOWANA) --- */}
        <div className="mt-24 mb-24 animate-fade-up opacity-0 [animation-delay:600ms] [animation-fill-mode:forwards]">
          <div className="w-full h-100 bg-[#1a1a1a] border border-white/10 rounded-sm relative overflow-hidden group">
            {/* Dark Mode Map Filter */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2550.609279532889!2d19.019557376885375!3d50.26257327155702!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4716ce376b338787%3A0x6b808947f63628e!2sKatowice!5e0!3m2!1spl!2spl!4v1709900000000!5m2!1spl!2spl"
              width="100%"
              height="100%"
              style={{
                border: 0,
                filter:
                  "invert(90%) hue-rotate(180deg) contrast(90%) grayscale(20%)",
              }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Mapa lokalizacji Fundacji Maxime"
              className="opacity-60 group-hover:opacity-100 transition-opacity duration-700"
            />
            {/* Marker Overlay Style */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
              <div className="relative">
                <div className="w-4 h-4 bg-arylideYellow rounded-full shadow-[0_0_20px_#EFCB6F] animate-pulse z-10 relative" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-arylideYellow/20 rounded-full animate-ping" />
              </div>
            </div>
            {/* Label */}
            <div className="absolute bottom-6 left-6 bg-raisinBlack/90 backdrop-blur border border-white/10 px-4 py-2 rounded-sm pointer-events-none">
              <span className="text-xs font-bold text-white uppercase tracking-widest flex items-center gap-2">
                <MapPin size={12} className="text-arylideYellow" /> Fundacja
                Maxime
              </span>
            </div>
          </div>
        </div>

        {/* --- 5. FAQ --- */}
        <div className="max-w-4xl mx-auto animate-fade-up opacity-0 [animation-delay:700ms] [animation-fill-mode:forwards]">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-youngest text-white mb-4 flex items-center justify-center gap-3">
              <HelpCircle
                className="text-arylideYellow w-8 h-8"
                strokeWidth={1.5}
              />
              Częste pytania
            </h3>
          </div>

          <div className="space-y-4">
            {faqData.map((item, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={item.question}
                  className={`border border-white/10 rounded-sm bg-white/5 overflow-hidden transition-colors ${isOpen ? "border-arylideYellow/30 bg-white/[0.07]" : "hover:border-white/20"}`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                  >
                    <span
                      className={`text-lg font-montserrat font-bold transition-colors ${isOpen ? "text-arylideYellow" : "text-white"}`}
                    >
                      {item.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-white/50 transition-transform duration-300 ${isOpen ? "rotate-180 text-arylideYellow" : ""}`}
                    />
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-6 pb-6 text-philippineSilver leading-relaxed border-t border-white/5 pt-4">
                          {item.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <p className="text-white/40 text-sm">
              Nie znalazłeś odpowiedzi?{" "}
              <a href="#email" className="text-arylideYellow hover:underline">
                Napisz do nas
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
