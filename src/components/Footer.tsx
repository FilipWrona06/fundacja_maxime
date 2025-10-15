// src/components/Footer.tsx
'use client';

import { useState, useEffect, FormEvent } from 'react';
import jsonp from 'jsonp';
import { Button } from './ui/Button';
import { NavigationLinks } from './ui/NavigationLinks';
import { SocialLinks } from './ui/SocialLinks';
import { ContactDetails } from './ui/ContactDetails';
import { Divider } from './ui/Divider';

const Footer = () => {
  // LOGIKA FORMULARZA NEWSLETTERA
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  // ZMIANA: Użycie zmiennej środowiskowej dla URL-a Mailchimp
  const mailchimpUrl = process.env.NEXT_PUBLIC_MAILCHIMP_SUBSCRIBE_URL!;

  useEffect(() => {
    if (status === 'success' || status === 'error') {
      const timer = setTimeout(() => { setStatus('idle'); setMessage(''); }, 15000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || email.indexOf('@') === -1) {
      setStatus('error');
      setMessage('Proszę podać prawidłowy adres e-mail.');
      return;
    }
    setStatus('loading');
    setMessage('');
    
    const url = mailchimpUrl.replace('/post?', '/post-json?');
    jsonp(`${url}&EMAIL=${encodeURIComponent(email)}`, { param: 'c' }, (err, data) => {
      if (err || data.result !== 'success') {
        setStatus('error');
        // Zmieniona obsługa błędu, by być bardziej odpornym na brak data.msg
        setMessage(data?.msg?.includes("is already subscribed") 
                   ? 'Ten adres jest już zapisany.' 
                   : (data?.msg || 'Błąd. Sprawdź adres i spróbuj ponownie.'));
      } else {
        setStatus('success');
        setMessage('Dziękujemy! Sprawdź skrzynkę, by potwierdzić zapis.');
        setEmail('');
      }
    });
  };

  return (
    <footer className="px-6 py-12 border-t border-t-philippineSilver/5">
      <div className='container mx-auto'>
        {/* Grid: Mobile (1 col) → iPad (2 cols) → Desktop (5 cols) */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-8">

          {/* SEKCJA BRANDINGOWA - full width na iPadzie */}
          <div className="md:col-span-2 xl:col-span-2">
            <div className="md:text-center xl:text-left md:flex md:flex-col md:items-center xl:block">
              <h3 className="text-4xl font-youngest mb-4">Fundacja Maxime</h3>
              <p className="font-montserrat text-sm max-w-md">
                Dzielimy się pasją do muzyki klasycznej, inspirując i edukując kolejne pokolenia artystów i słuchaczy.
              </p>
              <SocialLinks className="mt-5 md:justify-center xl:justify-start" />
            </div>
          </div>

          {/* SEKCJA NAWIGACJI - ZMIANA: Użycie semantycznych UL/LI */}
          <div className="md:col-span-1 xl:col-span-1">
            <div className="md:text-center xl:text-left">
              <h4 className="text-lg font-montserrat font-bold mb-4">Nawigacja</h4>
              <nav aria-label="Nawigacja stopki">
                <ul className="flex flex-col gap-2 font-montserrat text-sm md:items-center xl:items-start">
                  <li><NavigationLinks href="/about" variant="subtle">O nas</NavigationLinks></li>
                  <li><NavigationLinks href="/events" variant="subtle">Wydarzenia</NavigationLinks></li>
                  <li><NavigationLinks href="/gallery" variant="subtle">Galeria</NavigationLinks></li>
                  <li><NavigationLinks href="/contact" variant="subtle">Kontakt</NavigationLinks></li>
                </ul>
              </nav>
            </div>
          </div>

          {/* SEKCJA KONTAKTOWA - ZMIANA: Użycie semantycznych UL/LI (zakładając, że ContactDetails renderuje LI) */}
          <div className="md:col-span-1 xl:col-span-1">
            <div className="md:text-center xl:text-left md:flex md:flex-col md:items-center xl:block">
              <h4 className="text-lg font-montserrat font-bold mb-4">Kontakt</h4>
              <ul className="font-montserrat text-sm space-y-2 md:inline-flex md:flex-col md:items-start xl:block">
                <ContactDetails 
                  // Jeśli ContactDetails renderuje już <li>, to po prostu umieść go tutaj
                  // W przeciwnym razie, może trzeba będzie opakować każdy element w <li> wewnątrz ContactDetails
                  showLabels={false} 
                />
              </ul>
            </div>
          </div>

          {/* SEKCJA NEWSLETTERA - full width na iPadzie */}
          <div className="md:col-span-2 xl:col-span-1">
            <div className="md:text-center xl:text-left md:flex md:flex-col md:items-center xl:block">
              <h4 className="text-lg font-montserrat font-bold mb-4">Bądź na bieżąco</h4>
              <form 
                onSubmit={handleSubmit} 
                className="flex flex-col gap-2 w-full md:max-w-md xl:max-w-none"
                aria-label="Formularz zapisu do newslettera"
              >
                <input 
                  type="email" 
                  placeholder="Twój adres e-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  aria-label="Adres e-mail do newslettera"
                  className="w-full px-4 py-2 bg-black/50 placeholder-philippineSilver rounded-3xl focus:outline-none focus:ring-2 focus:ring-philippineSilver font-montserrat" 
                />
                <Button 
                  type="submit" 
                  disabled={status === 'loading'}
                >
                  {status === 'loading' ? 'Zapisywanie...' : 'Zapisz się'}
                </Button>
              </form>
              <div className="h-6 mt-2 w-full md:max-w-md xl:max-w-none">
                {status === 'success' && <p className="text-sm font-montserrat text-green-400">{message}</p>}
                {status === 'error' && <p className="text-sm font-montserrat text-red-400">{message}</p>}
              </div>
            </div>
          </div>
        </div>

        {/* SEKCJA PRAW AUTORSKICH */}
        <div className="mt-8 text-center text-sm font-montserrat">
          <Divider className='mb-5' />
          <p>
            &copy; {new Date().getFullYear()} Fundacja Maxime. Wszystkie prawa zastrzeżone | Wykonanie: 
            <a 
              href="https://www.instagram.com/filip_wrona/" 
              target="_blank" 
              rel="noopener noreferrer" 
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