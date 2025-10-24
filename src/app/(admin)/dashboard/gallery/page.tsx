// src/app/(admin)/dashboard/gallery/page.tsx

import { createClient } from '@/lib/supabase/server';
import { GalleryManager } from './GalleryManager'; // Importujemy istniejący komponent kliencki

// Ten plik jest Komponentem Serwerowym. Jego zadaniem jest pobranie danych.
export default async function ManageGalleryPage() {
  const supabase = await createClient();
  const { data: galleryImages, error } = await supabase
    .from('gallery')
    .select('*')
    .order('created_at', { ascending: false });

  // Prosta obsługa błędów
  if (error) {
    return <p className="text-red-500">Wystąpił błąd podczas pobierania danych galerii: {error.message}</p>;
  }

  // Renderujemy główny layout strony i przekazujemy dane do komponentu klienckiego
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Zarządzaj Galerią</h1>
      <p className="mt-2 text-gray-600 dark:text-gray-400">Dodawaj i usuwaj zdjęcia z głównej galerii na stronie.</p>
      
      {/* Używamy tutaj Twojego istniejącego komponentu GalleryManager */}
      <GalleryManager initialImages={galleryImages || []} />
    </div>
  );
}