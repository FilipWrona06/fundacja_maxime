// src/app/contact/page.tsx
'use client';

import { Button } from '@/components/ui/Button';
import { SocialLinks } from '@/components/ui/SocialLinks';
import { ContactDetails } from '@/components/ui/ContactDetails';
import React, { FormEvent } from 'react';
import { Divider } from '@/components/ui/Divider';
import { PageHeader } from '@/components/ui/PageHeader';

export default function ContactPage() {
  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    alert('Dziękujemy za wiadomość! (To jest symulacja wysyłki)');
    event.currentTarget.reset();
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
            
            <hr className="my-8 border-philippineSilver" />
            <h3 className="text-xl font-bold mb-4">Znajdź nas w sieci</h3>
            
            <div className="flex gap-6 text-2xl">
              <SocialLinks platform="facebook" />
              <SocialLinks platform="instagram" />
              <SocialLinks platform="youtube" />
              <SocialLinks platform="patronite" />
            </div>
          </div>

          {/* SEKCJA FORMULARZA KONTAKTOWEGO */}
          <div className="bg-transparent border-2 border-philippineSilver shadow-lg rounded-3xl p-8 transition-all">
            <form onSubmit={handleFormSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-bold">Imię i nazwisko</label>
                <input type="text" id="name" name="name" required className="mt-1 block w-full px-4 py-2 bg-transparent border-2 border-philippineSilver rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-raisinBlack transition-all"/>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-bold">Adres email</label>
                <input type="email" id="email" name="email" required className="mt-1 block w-full px-4 py-2 bg-transparent border-2 border-philippineSilver rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-raisinBlack transition-all"/>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-bold">Wiadomość</label>
                <textarea id="message" name="message" rows={4} required className="mt-1 block w-full px-4 py-2 bg-transparent border-2 border-philippineSilver rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-raisinBlack transition-all"></textarea>
              </div>
              <div className='text-center'>
                <Button type="submit" className='w-full text-lg'>
                  Wyślij wiadomość
                </Button>
              </div>
            </form>
          </div>
        </div>
      </main>
  );
}