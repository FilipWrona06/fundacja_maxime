// src/components/layout/Footer.tsx
'use client';

import { SocialLinks } from '../ui/SocialLinks';
import { ContactDetails } from '../ui/ContactDetails';
import { Divider } from '../ui/Divider';
import { NewsletterForm } from '../newsletter/NewsletterForm';
import { NavigationList } from '../ui/NavigationLinks'; 
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="px-6 py-12 border-t border-t-philippineSilver/5">
      <div className='container mx-auto'>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-8">

          {/* SEKCJA BRANDINGOWA */}
          <div className="md:col-span-2 xl:col-span-2">
            <div className="md:text-center xl:text-left md:flex md:flex-col md:items-center xl:block">
              <h3 className="text-4xl font-youngest mb-4">Fundacja Maxime</h3>
              <p className="font-montserrat text-sm max-w-md">
                Dzielimy się pasją do muzyki klasycznej, inspirując i edukując kolejne pokolenia artystów i słuchaczy.
              </p>
              <SocialLinks className="mt-5 md:justify-center xl:justify-start" />
            </div>
          </div>

          {/* SEKCJA NAWIGACJI */}
          <div className=" md:col-span-1 xl:col-span-1">
            <div className="md:text-center xl:text-left">
              <h4 className="text-lg font-montserrat mb-5 font-bold">Nawigacja</h4>
              <nav aria-label="Nawigacja stopki">
                <NavigationList
                  listClassName="flex flex-col gap-2 font-montserrat text-sm md:items-center xl:items-start"
                  linkVariant="subtle"
                />
              </nav>
            </div>
          </div>

          {/* SEKCJA KONTAKTOWA */}
          <div className="md:col-span-1 xl:col-span-1">
            <div className="md:text-center xl:text-left md:flex md:flex-col md:items-center xl:block">
              <h4 className="text-lg font-montserrat font-bold mb-4">Kontakt</h4>
              <ul className="font-montserrat text-sm space-y-2 md:inline-flex md:flex-col md:items-start xl:block">
                <ContactDetails 
                  showLabels={false} 
                />
              </ul>
            </div>
          </div>

          {/* SEKCJA NEWSLETTERA */}
          <div className="md:col-span-2 xl:col-span-1">
            <div className="md:text-center xl:text-left md:flex md:flex-col md:items-center xl:block">
              <h4 className="text-lg font-montserrat font-bold mb-4">Bądź na bieżąco</h4>
              <div className="w-full md:max-w-md xl:max-w-none">
                <NewsletterForm />
              </div>
            </div>
          </div>
        </div>

        {/* SEKCJA PRAWNA I PRAW AUTORSKICH */}
        <div className="mt-8 text-center text-sm font-montserrat">
          <Divider className='mb-5' />

          <nav aria-label="Nawigacja prawna" className="flex justify-center items-center gap-x-4 gap-y-2 flex-wrap mb-5">
            <Link 
              href="/privacy"
              className="hover:text-philippineSilver transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-philippineSilver rounded"
            >
              Polityka Prywatności i Cookies
            </Link>
            
            <span className="text-philippineSilver/20" aria-hidden="true">|</span>

            <Link 
              href="/terms"
              className="hover:text-philippineSilver transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-philippineSilver rounded"
            >
              Regulamin
            </Link>
          </nav>
          
          <p>
  &copy; {new Date().getFullYear()} Fundacja Maxime. Wszystkie prawa zastrzeżone | Wykonanie: 
  <a 
    href="https://www.instagram.com/filip_wrona/" 
    target="_blank" 
    rel="noopener noreferrer"
    aria-label="Odwiedź profil Instagram projektanta - Filip Wrona (otwiera się w nowym oknie)"
    className="hover:text-philippineSilver transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-philippineSilver rounded ml-1"
  >
    Filip Wrona
  </a>
</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;