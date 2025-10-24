import { createClient } from '@/lib/supabase/server';
import { GalleryManager } from './GalleryManager';

export default async function ManageGalleryPage() {
  const supabase = await createClient();
  
  // Zmieniamy sortowanie na 'position'
  const { data: galleryImages, error } = await supabase
    .from('gallery')
    .select('*')
    .order('position', { ascending: true });

  if (error) {
    return <p className="text-red-500">Wystąpił błąd podczas pobierania danych galerii: {error.message}</p>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Zarządzaj Galerią</h1>
      <p className="mt-2 text-gray-600 dark:text-gray-400">Przeciągnij zdjęcia, aby zmienić ich kolejność, a następnie zapisz zmiany.</p>
      
      <GalleryManager initialImages={galleryImages || []} />
    </div>
  );
}