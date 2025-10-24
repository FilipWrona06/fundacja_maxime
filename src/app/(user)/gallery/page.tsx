import { createClient } from '@/lib/supabase/server';
import { PageHeader } from '@/components/ui/PageHeader';
import { GalleryClient, GalleryImage } from './GalleryClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Galeria',
  description: 'Chwile, które tworzą naszą historię. Zobacz pasję i zaangażowanie Fundacji Maxime w działaniu.',
};

export default async function GalleryPage() {
  const supabase = await createClient();

  // Zmieniamy sortowanie na `position`, aby odzwierciedlało ustawioną kolejność
  const { data, error } = await supabase
    .from('gallery')
    .select('*')
    .order('position', { ascending: true });

  const galleryImages: GalleryImage[] = data?.map(img => ({
    id: img.id,
    src: img.image_url,
    alt: img.alt_text,
    width: img.width,
    height: img.height,
    position: img.position, // Przekazujemy pozycję, choć nie jest tu używana, to dobra praktyka
  })) || [];

  return (
    <main className="py-12 overflow-x-hidden">
      <div className="container mx-auto px-6">
        <PageHeader
          title='Nasza Galeria'
          description='Chwile, które tworzą naszą historię. Zobacz naszą pasję i zaangażowanie w działaniu.'
        />
      </div>
      
      <GalleryClient galleryImages={galleryImages} />
    </main>
  );
}