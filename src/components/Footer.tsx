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
  //LOGIKA FORMULARZA NEWSLETTERA
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (status === 'success' || status === 'error') {
      const timer = setTimeout(() => { setStatus('idle'); setMessage(''); }, 5000);
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
    const mailchimpUrl = 'https://interia.us22.list-manage.com/subscribe/post?u=571c8b619e1df84cb6ac15b70&id=dfa3ed976c&f_id=00f1c2e1f0';
    const url = mailchimpUrl.replace('/post?', '/post-json?');
    jsonp(`${url}&EMAIL=${encodeURIComponent(email)}`, { param: 'c' }, (err, data) => {
      if (err || data.result !== 'success') {
        setStatus('error');
        setMessage(data?.msg?.includes("is already subscribed") ? 'Ten adres jest już zapisany.' : 'Błąd. Sprawdź adres i spróbuj ponownie.');
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
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-8">

            {/* SEKCJA BRANDINGOWA */}
            <div className="md:col-span-2">
              <h3 className="text-4xl font-youngest mb-4">Fundacja Maxime</h3>
              <p className="font-montserrat text-sm max-w-md">
                Dzielimy się pasją do muzyki klasycznej, inspirując i edukując kolejne pokolenia artystów i słuchaczy.
              </p>
              <SocialLinks className="mt-5" />
            </div>

            {/* 
              ======================================================================
              ZMIANA TUTAJ: Tworzymy nowy kontener, który zajmie 2 kolumny w siatce
              i używa Flexboxa do podziału przestrzeni wewnątrz.
              ======================================================================
            */}
            <div className="lg:col-span-2 flex gap-8">

              {/* SEKCJA NAWIGACJI (teraz zajmuje 1/3 dostępnej przestrzeni) */}
              <div className="w-1/3">
                <h4 className="text-lg font-montserrat font-bold mb-4">Nawigacja</h4>
                <div className="columns-2 flex flex-col gap-2 font-montserrat text-sm">
                  <NavigationLinks href="/about" variant="subtle">O nas</NavigationLinks>
                  <NavigationLinks href="/events" variant="subtle">Wydarzenia</NavigationLinks>
                  <NavigationLinks href="/gallery" variant="subtle">Galeria</NavigationLinks>
                  <NavigationLinks href="/contact" variant="subtle">Kontakt</NavigationLinks>
                </div>
              </div>

              {/* SEKCJA KONTAKTOWA (teraz zajmuje 2/3 dostępnej przestrzeni) */}
              <div className="w-2/3">
                <h4 className="text-lg font-montserrat font-bold mb-4">Kontakt</h4>
                <ContactDetails 
                  className="font-montserrat text-sm space-y-2" 
                  showLabels={false} />
              </div>
            </div>

            {/* SEKCJA NEWSLETTERA (pozostaje bez zmian) */}
            <div className="md:col-span-4 lg:col-span-1">
              <h4 className="text-lg font-montserrat font-bold mb-4">Bądź na bieżąco</h4>
              <form onSubmit={handleSubmit} className="flex flex-col gap-2">
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
              <div className="h-6 mt-2 text-center">
                {status === 'success' && <p className="text-sm font-montserrat text-green-400">{message}</p>}
                {status === 'error' && <p className="text-sm font-montserrat text-red-400">{message}</p>}
              </div>
            </div>
          </div>

        {/* SEKCJA PRAW AUTORSKICH */}
        <div className="mt-5 text-center text-sm font-montserrat">
          <Divider className='mb-5' />
          <p>
            &copy; {new Date().getFullYear()} Fundacja Maxime. Wszkie prawa zastrzeżone | Wykonanie: 
            <a href="https://www.instagram.com/filip_wrona/" target="_blank" rel="noopener noreferrer" className="hover:text-philippineSilver transition-colors">
              Filip Wrona
            </a>
          </p>
        </div>
        </div>
      </footer>
  );
};

export default Footer;