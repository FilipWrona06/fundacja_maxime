// src/app/(user)/contact/page.tsx
'use client';

import { useState, FormEvent } from 'react';
import { Button } from '@/components/ui/Button';
import { SocialLinks } from '@/components/ui/SocialLinks';
import { ContactDetails } from '@/components/ui/ContactDetails';
import { Divider } from '@/components/ui/Divider';
import { PageHeader } from '@/components/ui/PageHeader';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { legalData } from '@/data/legal';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmissionStatus('idle');

    await new Promise(resolve => setTimeout(resolve, 1500));
    const success = Math.random() > 0.3;

    if (success) {
      setSubmissionStatus('success');
      setName('');
      setEmail('');
      setMessage('');
    } else {
      setSubmissionStatus('error');
    }
    
    setIsSubmitting(false);
    setTimeout(() => setSubmissionStatus('idle'), 5000);
  };

  return (
      <main className="container mx-auto px-4 py-16">
        <PageHeader
        title='Skontaktuj się z nami'
        description='Masz pytania lub chcesz nawiązać współpracę? Wypełnij formularz lub skorzystaj z poniższych danych.'
        />

        <div className="max-w-6xl mx-auto lg:grid lg:grid-cols-2 lg:gap-12">
          {/* SEKCJA DANYCH KONTAKTOWYCH I REJESTROWYCH */}
          <div className="mb-12 lg:mb-0 bg-transparent border-2 border-philippineSilver shadow-lg rounded-3xl p-8 transition-all">
            <h2 className="text-2xl font-bold">Dane kontaktowe</h2>
            <ContactDetails className="mt-6 text-lg" />
            
            {/* === DODANA SEKCJA Z DANYMI REJESTROWYMI === */}
            <Divider className='w-full my-5' />
            <h3 className="text-xl font-bold mb-4">Dane rejestrowe Fundacji</h3>
            <ul className="text-sm font-montserrat space-y-1">
              <li><strong>Pełna nazwa:</strong> {legalData.fullName}</li>
              <li><strong>Adres siedziby:</strong> {`${legalData.address.street}, ${legalData.address.zipCode} ${legalData.address.city}`}</li>
              <li><strong>NIP:</strong> {legalData.nip}</li>
              <li><strong>REGON:</strong> {legalData.regon}</li>
              <li><strong>KRS:</strong> {legalData.krs}</li>
            </ul>
            
            <Divider className='w-full my-5' />
            <h3 className="text-xl font-bold mb-4">Znajdź nas w sieci</h3>
            <SocialLinks />
          </div>

          {/* SEKCJA FORMULARZA KONTAKTOWEGO */}
          <div className="bg-transparent border-2 border-philippineSilver shadow-lg rounded-3xl p-8 transition-all">
            <form onSubmit={handleFormSubmit} className="space-y-6">
              <Input
                id="name"
                label="Imię i nazwisko"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                disabled={isSubmitting}
              />
              <Input
                id="email"
                label="Adres email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isSubmitting}
              />
              <Textarea
                id="message"
                label="Wiadomość"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                required
                disabled={isSubmitting}
              />
              <div className='text-center'>
                <Button 
                  type="submit" 
                  className='w-full text-lg'
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Wysyłanie...' : 'Wyślij wiadomość'}
                </Button>
              </div>

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