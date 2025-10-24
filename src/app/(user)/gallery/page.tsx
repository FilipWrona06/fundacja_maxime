import { createClient } from '@/lib/supabase/server';
import { PageHeader } from '@/components/ui/PageHeader';
import { GalleryClient, GalleryImage } from './GalleryClient'; // Importujemy komponent kliencki i typ
import { Metadata } from 'next';

// Metadane strony dla SEO
export const metadata: Metadata = {
  title: 'Galeria',
  description: 'Chwile, które tworzą naszą historię. Zobacz pasję i zaangażowanie Fundacji Maxime w działaniu.',
};

// Główny, domyślny eksport - Komponent Serwerowy
export default async function GalleryPage() {
  const supabase = await createClient();

  // Pobieramy wszystkie dane z tabeli 'gallery', sortując od najnowszych
  const { data, error } = await supabase
    .from('gallery')
    .select('*')
    .order('created_at', { ascending: false });

  // Mapujemy dane z bazy (z nazwami snake_case) na format oczekiwany przez komponent kliencki (camelCase)
  // To jest dobry wzorzec, aby komponent kliencki był niezależny od struktury bazy danych.
  const galleryImages: GalleryImage[] = data?.map(img => ({
    id: img.id,
    src: img.image_url,
    alt: img.alt_text,
    width: img.width,
    height: img.height,
  })) || [];

  return (
    <main className="py-12 overflow-x-hidden"> {/* Dodajemy overflow-x-hidden, aby zapobiec poziomemu scrollowi */}
      <div className="container mx-auto px-6">
        <PageHeader
          title='Nasza Galeria'
          description='Chwile, które tworzą naszą historię. Zobacz naszą pasję i zaangażowanie w działaniu.'
        />
      </div>

      {/* Renderujemy komponent kliencki, przekazując mu dynamicznie pobrane dane */}
      {/* Jeśli wystąpił błąd lub nie ma obrazów, komponent kliencki sam to obsłuży */}
      <GalleryClient galleryImages={galleryImages} />

    </main>
  );
}