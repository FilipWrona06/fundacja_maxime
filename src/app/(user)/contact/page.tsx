// src/app/(user)/contact/page.tsx
'use client';

import { useState, FormEvent } from 'react'; // ZMIANA: Dodano useState
import { Button } from '@/components/ui/Button';
import { SocialLinks } from '@/components/ui/SocialLinks';
import { ContactDetails } from '@/components/ui/ContactDetails';
import React from 'react'; // React jest już importowany, ale zostawiam dla jasności
import { Divider } from '@/components/ui/Divider';
import { PageHeader } from '@/components/ui/PageHeader';
// ZMIANA: Importujemy nasze komponenty Input i Textarea
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';


export default function ContactPage() {
  // ZMIANA: Stan dla pól formularza
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false); // ZMIANA: Stan dla statusu wysyłki
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'success' | 'error'>('idle'); // ZMIANA: Stan dla wyniku wysyłki

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => { // ZMIANA: Funkcja jest teraz async
    event.preventDefault();
    setIsSubmitting(true);
    setSubmissionStatus('idle'); // Resetujemy status przy każdej nowej próbie

    // Symulacja wysyłki danych do API / Server Action
    console.log({ name, email, message });

    // Tutaj normalnie byłoby wywołanie API lub Server Action
    // np. const response = await fetch('/api/contact', { method: 'POST', body: JSON.stringify({ name, email, message }) });
    // const data = await response.json();

    // Symulacja opóźnienia sieciowego
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Symulacja odpowiedzi (np. 70% szans na sukces)
    const success = Math.random() > 0.3;

    if (success) {
      setSubmissionStatus('success');
      setName(''); // Resetujemy pola po sukcesie
      setEmail('');
      setMessage('');
    } else {
      setSubmissionStatus('error');
    }
    
    setIsSubmitting(false);

    // Opcjonalnie: zresetowanie statusu wiadomości po pewnym czasie
    setTimeout(() => setSubmissionStatus('idle'), 5000);
  };

  return (
      <main className="container mx-auto px-4 py-16">

        <PageHeader
        title='Skontaktuj się z nami'
        description='Masz pytania lub chcesz nawiązać współpracę? Wypełnij formularz lub skorzystaj z poniższych danych.'
        />

        <div className="max-w-6xl mx-auto lg:grid lg:grid-cols-2 lg:gap-12">
          {/* SEKCJA DANYCH KONTAKTOWYCH */}
          <div className="mb-12 lg:mb-0 bg-transparent border-2 border-philippineSilver shadow-lg rounded-3xl p-8 transition-all">
            <h2 className="text-2xl font-bold">Dane kontaktowe</h2>
            
            <ContactDetails className="mt-6 text-lg" />
            
            <Divider className='w-full my-5' />
            <h3 className="text-xl font-bold mb-4">Znajdź nas w sieci</h3>
            
            <SocialLinks />
          </div>

          {/* SEKCJA FORMULARZA KONTAKTOWEGO */}
          <div className="bg-transparent border-2 border-philippineSilver shadow-lg rounded-3xl p-8 transition-all">
            <form onSubmit={handleFormSubmit} className="space-y-6">
              {/* ZMIANA: Użycie komponentu Input dla Imię i nazwisko */}
              <Input
                id="name"
                label="Imię i nazwisko"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                disabled={isSubmitting} // ZMIANA: Wyłącz input podczas wysyłki
              />
              {/* ZMIANA: Użycie komponentu Input dla Adres email */}
              <Input
                id="email"
                label="Adres email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isSubmitting} // ZMIANA: Wyłącz input podczas wysyłki
              />
              {/* ZMIANA: Użycie komponentu Textarea dla Wiadomość */}
              <Textarea
                id="message"
                label="Wiadomość"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                required
                disabled={isSubmitting} // ZMIANA: Wyłącz textarea podczas wysyłki
              />
              <div className='text-center'>
                <Button 
                  type="submit" 
                  className='w-full text-lg'
                  disabled={isSubmitting} // ZMIANA: Wyłącz przycisk podczas wysyłki
                >
                  {isSubmitting ? 'Wysyłanie...' : 'Wyślij wiadomość'}
                </Button>
              </div>

              {/* ZMIANA: Komunikaty o statusie wysyłki */}
              {submissionStatus === 'success' && (
                <p className="p-3 text-sm text-center text-green-400 bg-green-900/20 rounded-lg">
                  Dziękujemy za wiadomość! Odpowiemy najszybciej, jak to możliwe.
                </p>
              )}
              {submissionStatus === 'error' && (
                <p className="p-3 text-sm text-center text-red-400 bg-red-900/20 rounded-lg">
                  Wystąpił błąd podczas wysyłania wiadomości. Spróbuj ponownie.
                </p>
              )}
            </form>
          </div>
        </div>
      </main>
  );
}