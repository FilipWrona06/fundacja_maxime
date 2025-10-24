// src/components/newsletter/NewsletterForm.tsx
'use client';

import { useState, useEffect, FormEvent } from 'react';
import jsonp from 'jsonp';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useNewsletterStore } from '@/hooks/useNewsletterStore';
import Link from 'next/link'; // KROK 1: Import komponentu Link

export const NewsletterForm = () => {
  const { setStatus: setGlobalStatus } = useNewsletterStore();

  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const mailchimpUrl = process.env.NEXT_PUBLIC_MAILCHIMP_SUBSCRIBE_URL;

  useEffect(() => {
    if (status === 'error' && email !== '') {
      setStatus('idle');
      setMessage('');
    }
  }, [email, status]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!mailchimpUrl) {
      setStatus('error');
      setMessage('Konfiguracja newslettera jest nieprawidłowa.');
      return;
    }

    if (!email || email.indexOf('@') === -1) {
      setStatus('error');
      setMessage('Proszę podać prawidłowy adres e-mail.');
      return;
    }

    if (!consent) {
      setStatus('error');
      setMessage('Musisz wyrazić zgodę na przetwarzanie danych.');
      return;
    }

    setStatus('loading');
    setMessage('');
    
    const url = mailchimpUrl.replace('/post?', '/post-json?');
    jsonp(`${url}&EMAIL=${encodeURIComponent(email)}`, { param: 'c' }, (err, data) => {
      if (err) {
        setStatus('error');
        setMessage('Wystąpił błąd połączenia. Spróbuj ponownie.');
        return;
      }

      if (data.result !== 'success') {
        setStatus('error');
        const isAlreadySubscribed = data?.msg?.toLowerCase().includes("is already subscribed");
        setMessage(
          isAlreadySubscribed 
            ? 'Ten adres jest już zapisany.' 
            : (data?.msg || 'Wystąpił błąd. Spróbuj ponownie.')
        );
      } else {
        setStatus('success');
        setMessage('Dziękujemy! Sprawdź skrzynkę, by potwierdzić zapis.');
        setEmail('');
        setConsent(false);
        setGlobalStatus('subscribed');
      }
    });
  };

  return (
    <div className="w-full">
      <form 
        onSubmit={handleSubmit} 
        className="flex flex-col gap-3 w-full"
        aria-label="Formularz zapisu do newslettera"
      >
        <Input
          id="newsletter-email-input"
          type="email" 
          placeholder="Twój adres e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={status === 'loading'}
          aria-label="Adres e-mail do newslettera"
          aria-describedby={message ? "newsletter-message" : undefined}
          className={`bg-black/50 rounded-3xl py-2 transition-all ${
            status === 'error' ? 'ring-2 ring-red-500' : 'focus:ring-philippineSilver'
          }`}
        />
        
        <div className="flex items-start gap-2 text-left">
          <input
            type="checkbox"
            id="newsletter-consent"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            disabled={status === 'loading'}
            className="mt-1 w-4 h-4 rounded border-philippineSilver/20 bg-white/5 text-philippineSilver focus:ring-2 focus:ring-philippineSilver focus:ring-offset-2 focus:ring-offset-raisinBlack cursor-pointer disabled:opacity-50"
            aria-describedby="consent-description"
          />
          {/* === POCZĄTEK ZMIAN === */}
          <label 
            htmlFor="newsletter-consent" 
            id="consent-description"
            className="text-xs font-montserrat text-philippineSilver/80 leading-relaxed cursor-pointer"
          >
            Zapisując się, akceptujesz naszą{' '}
            <Link 
              href="/privacy" 
              className="underline hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-philippineSilver rounded"
              // Zapobiega przełączaniu checkboxa podczas kliknięcia w link
              onClick={(e) => e.stopPropagation()} 
            >
              politykę prywatności
            </Link>
            .
          </label>
          {/* === KONIEC ZMIAN === */}
        </div>

        <Button 
          type="submit" 
          disabled={status === 'loading'}
          aria-busy={status === 'loading'}
        >
          {status === 'loading' ? 'Zapisywanie...' : 'Zapisz się'}
        </Button>
      </form>
      <div
        id="newsletter-message"
        className="min-h-[1.5rem] mt-2 w-full"
        aria-live="polite"
        role="status"
      >
        {status === 'success' && <p className="text-sm font-montserrat text-green-400">{message}</p>}
        {status === 'error' && <p className="text-sm font-montserrat text-red-400">{message}</p>}
      </div>
    </div>
  );
};