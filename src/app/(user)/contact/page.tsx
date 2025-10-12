// src/app/contact/page.tsx

'use client';

import React, { FormEvent } from 'react';
// ZAKTUALIZOWANE: Dodajemy FaHeart do importów
import { FaFacebook, FaInstagram, FaYoutube, FaHeart, FaMapMarkerAlt, FaEnvelope, FaPhone } from 'react-icons/fa';

// =================================================================
//  1. CENTRALNA DEFINICJA DANYCH KONTAKTOWYCH
// =================================================================

export interface ContactDetail {
  label: string;
  value: string;
  href: string;
}

export const contactDetails: ContactDetail[] = [
  {
    label: 'Adres',
    value: 'ul. Przykładowa 123, 00-000 Warszawa',
    href: 'https://www.google.com/maps/search/?api=1&query=ul.+Przykładowa+123,+00-000+Warszawa',
  },
  {
    label: 'Email',
    value: 'kontakt@fundacjamaxime.pl',
    href: 'mailto:kontakt@fundacjamaxime.pl',
  },
  {
    label: 'Telefon',
    value: '+48 123 456 789',
    href: 'tel:+48123456789',
  },
];

// =================================================================
//  2. ZAKTUALIZOWANE MAPOWANIE IKON
// =================================================================

const contactIcons: { [key: string]: React.ReactNode } = {
  Adres: <FaMapMarkerAlt />,
  Email: <FaEnvelope />,
  Telefon: <FaPhone />,
};


// =================================================================
//  3. GŁÓWNY KOMPONENT STRONY KONTAKTOWEJ
// =================================================================
export default function ContactPage() {
  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    alert('Dziękujemy za wiadomość! (To jest symulacja wysyłki)');
    event.currentTarget.reset();
  };

  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Skontaktuj się z nami
          </h1>
          <p className="mt-4 text-lg">
            Masz pytania lub chcesz nawiązać współpracę? Wypełnij formularz lub skorzystaj z poniższych danych.
          </p>
          <div className="w-3/4 h-0.5 bg-philippineSilver mx-auto mt-8"></div>
        </header>

        <div className="max-w-6xl mx-auto lg:grid lg:grid-cols-2 lg:gap-12">
          {/* --- SEKCJA DANYCH KONTAKTOWYCH --- */}
          <div className="mb-12 lg:mb-0 bg-transparent border-2 border-philippineSilver shadow-lg rounded-3xl p-8 transition-all">
            <h2 className="text-2xl font-bold">Dane kontaktowe</h2>
            <div className="mt-6 space-y-6">
              {contactDetails.map((detail) => (
                <a key={detail.label} href={detail.href} target="_blank" rel="noopener noreferrer" className="flex items-start group">
                  <div className="flex-shrink-0 mt-1">{contactIcons[detail.label]}</div>
                  <div className="ml-4">
                    <p className="text-lg font-semibold">{detail.label}</p>
                    <p className="group-hover:font-semibold transition-all">{detail.value}</p>
                  </div>
                </a>
              ))}
            </div>
            
            <hr className="my-8 border-philippineSilver" />
            <h3 className="text-xl font-bold mb-4">Znajdź nas w sieci</h3>
            
            {/* ================================================== */}
            {/* ZAKTUALIZOWANE: Statyczna lista linków social media */}
            {/* ================================================== */}
            <div className="flex gap-6 text-3xl">
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

          {/* --- SEKCJA FORMULARZA KONTAKTOWEGO (bez zmian) --- */}
          <div className="bg-transparent border-2 border-philippineSilver shadow-lg rounded-3xl p-8 transition-all">
            <form onSubmit={handleFormSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium">Imię i nazwisko</label>
                <input type="text" id="name" name="name" required className="mt-1 block w-full px-4 py-2 bg-transparent border-2 border-philippineSilver rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-raisinBlack transition-all"/>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium">Adres email</label>
                <input type="email" id="email" name="email" required className="mt-1 block w-full px-4 py-2 bg-transparent border-2 border-philippineSilver rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-raisinBlack transition-all"/>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium">Wiadomość</label>
                <textarea id="message" name="message" rows={4} required className="mt-1 block w-full px-4 py-2 bg-transparent border-2 border-philippineSilver rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-raisinBlack transition-all"></textarea>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 bg-transparent border-2 border-philippineSilver hover:bg-philippineSilver hover:text-raisinBlack rounded-3xl shadow-lg hover:shadow-2xl hover:scale-105 text-lg font-bold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-raisinBlack transition-all duration-250"
                >
                  Wyślij wiadomość
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}