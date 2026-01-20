import { Mail, MapPin, Phone } from "lucide-react";

const CONTACT = {
  address: "ul. Muzyczna 14/3, 40-001 Katowice",
  googleMaps: "https://maps.google.com/?q=ul.Muzyczna+14/3+Katowice",
  email: "kontakt@fundacjamaxime.pl",
  phone: "+48 123 456 789",
  phoneLink: "tel:+48123456789",
};

const COMPANY_DATA = [
  { label: "KRS", value: "0000123456" },
  { label: "NIP", value: "123-456-78-90" },
  { label: "REGON", value: "123456789" },
];

export const FooterContact = () => {
  return (
    <div className="flex flex-col gap-10">
      {/* Sekcja: Kontakt */}
      <div>
        <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-6 border-l-2 border-arylideYellow pl-3">
          Kontakt
        </h4>
        <address className="not-italic space-y-4 text-sm text-philippineSilver">
          <div className="flex items-start gap-3 group">
            <MapPin className="w-5 h-5 text-arylideYellow shrink-0 mt-0.5 transition-transform group-hover:translate-y-[-2px]" />
            <a
              href={CONTACT.googleMaps}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              ul. Muzyczna 14/3
              <br />
              40-001 Katowice
            </a>
          </div>
          <div className="flex items-center gap-3 group">
            <Mail className="w-5 h-5 text-arylideYellow shrink-0 transition-transform group-hover:scale-110" />
            <a
              href={`mailto:${CONTACT.email}`}
              className="hover:text-white transition-colors"
            >
              {CONTACT.email}
            </a>
          </div>
          <div className="flex items-center gap-3 group">
            <Phone className="w-5 h-5 text-arylideYellow shrink-0 transition-transform group-hover:rotate-12" />
            <a
              href={CONTACT.phoneLink}
              className="hover:text-white transition-colors"
            >
              {CONTACT.phone}
            </a>
          </div>
        </address>
      </div>

      {/* Sekcja: Dane Fundacji */}
      <div>
        <h4 className="text-white/60 font-bold uppercase tracking-widest text-xs mb-4 border-l-2 border-white/20 pl-3">
          Dane rejestrowe
        </h4>
        <dl className="space-y-2 text-sm text-philippineSilver">
          {COMPANY_DATA.map((item) => (
            <div
              key={item.label}
              className="flex justify-between border-b border-white/5 pb-2"
            >
              <dt>{item.label}:</dt>
              <dd className="text-white font-mono select-all">{item.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
};
