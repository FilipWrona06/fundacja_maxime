'use client';

import { useState, useEffect, FormEvent, ReactNode } from 'react';
import Link from 'next/link';
import jsonp from 'jsonp';
import { FaFacebook, FaInstagram, FaYoutube, FaHeart } from 'react-icons/fa';

// ======================================================
//GŁÓWNY I JEDYNY KOMPONENT STOPKI
// ====================================================
const Footer = () => {
  //LOGIKA FORMULARZA NEWSLETTERA
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (status === 'success' || status === 'error') {
      const timer = setTimeout(() => {
        setStatus('idle');
        setMessage('');
      }, 5000);
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
        setMessage(data?.msg?.includes("is already subscribed") 
          ? 'Ten adres jest już zapisany.' 
          : 'Błąd. Sprawdź adres i spróbuj ponownie.'
        );
      } else {
        setStatus('success');
        setMessage('Dziękujemy! Sprawdź skrzynkę, by potwierdzić zapis.');
        setEmail('');
      }
    });
  };

  return (
      <footer className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-8">

          {/* ========================================= */}
          {/* SEKCJA BRANDINGOWA*/}
          {/* ========================================== */}
          <div className="md:col-span-2">
            <h3 className="text-4xl font-youngest mb-4">Fundacja Maxime</h3>
            <p className="font-montserrat text-sm max-w-md">
              Dzielimy się pasją do muzyki klasycznej, inspirując i edukując kolejne pokolenia artystów i słuchaczy.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="https://www.facebook.com/stowarzyszeniemaxime" target="_blank" rel="noopener noreferrer" title="Nasz Facebook" className="text-2xl hover:text-philippineSilver transition-colors">
                <FaFacebook />
              </a>
              <a href="https://www.instagram.com/maxime.orchestra/" target="_blank" rel="noopener noreferrer" title="Nasz Instagram" className="text-2xl hover:text-philippineSilver transition-colors">
                <FaInstagram />
              </a>
              <a href="https://www.youtube.com/@stowarzyszeniemaxime" target="_blank" rel="noopener noreferrer" title="Nasz kanał YouTube" className="text-2xl hover:text-philippineSilver transition-colors">
                <FaYoutube />
              </a>
              <a href="https://patronite.pl/stowarzyszeniemaxime" target="_blank" rel="noopener noreferrer" title="Wesprzyj nas na Patronite" className="text-2xl hover:text-philippineSilver transition-colors">
                <FaHeart />
              </a>
            </div>
          </div>

          {/* ========================================= */}
          {/* SEKCJA NAWIGACJI*/}
          {/* ========================================== */}
          <div>
            <h4 className="text-lg font-montserrat font-bold mb-4">Nawigacja</h4>
            <div className="flex flex-col gap-2 font-montserrat text-sm">
              <Link href="/about" className="hover:text-philippineSilver transition-colors">O nas</Link>
              <Link href="/events" className="hover:text-philippineSilver transition-colors">Wydarzenia</Link>
              <Link href="/gallery" className="hover:text-philippineSilver transition-colors">Galeria</Link>
              <Link href="/contact" className="hover:text-philippineSilver transition-colors">Kontakt</Link>
            </div>
          </div>

          {/* =================================== */}
          {/* SEKCJA KONTAKTOWA*/}
          {/* ========================================= */}
          <div>
            <h4 className="text-lg font-montserrat font-bold mb-4">Kontakt</h4>
            <div className="text-sm font-montserrat space-y-2">
              <p>ul. Kossaka 12, Dąbrowa Górnicza</p>
              <p>kontakt@maxime.pl</p>
              <p>(+48) 123 456 789</p>
            </div>
          </div>

          {/* ====================================== */}
          {/* SEKCJA NEWSLETTERA*/}
          {/* ========================================== */}
          <div className="md:col-span-4 lg:col-span-1">
            <h4 className="text-lg font-montserrat font-bold mb-4">Bądź na bieżąco</h4>
            <>
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
                <button 
                  type="submit" 
                  disabled={status === 'loading'}
                  className="w-full bg-transparent border-2 border-philippineSilver font-montserrat font-bold px-4 py-2 rounded-3xl hover:bg-philippineSilver hover:text-raisinBlack transition-colors duration-250 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === 'loading' ? 'Zapisywanie...' : 'Zapisz się'}
                </button>
              </form>
              <div className="h-6 mt-2 text-center">
                {status === 'success' && <p className="text-sm font-montserrat text-green-400">{message}</p>}
                {status === 'error' && <p className="text-sm font-montserrat text-red-400">{message}</p>}
              </div>
            </>
          </div>

        </div>

        {/* ========================================== */}
        {/* SEKCJA PRAW AUTORSKICH*/}
        {/* ========================================== */}
        <div className="border-t border-philippineSilver mt-12 pt-8 text-center text-sm font-montserrat">
          <p>
            &copy; {new Date().getFullYear()} Fundacja Maxime. Wszelkie prawa zastrzeżone | Wykonanie: 
            <a href="https://www.instagram.com/filip_wrona/" target="_blank" rel="noopener noreferrer" className="hover:text-philippineSilver transition-colors">
              Filip Wrona
            </a>
          </p>
        </div>
      </footer>
  );
};

export default Footer;