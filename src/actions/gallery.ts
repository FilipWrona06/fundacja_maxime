'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
// KROK 1: Importujemy bibliotekę do odczytu wymiarów
import sizeOf from 'image-size';

// Schemat walidacji - bez zmian, bo nie ma już pól width/height w formularzu
const GallerySchema = z.object({
  alt_text: z.string().min(1, "Opis (tekst alternatywny) jest wymagany."),
});

// Akcja dodawania nowego obrazu - ZMIENIONA
export async function addGalleryImage(prevState: any, formData: FormData) {
  const supabase = await createClient();

  const validatedFields = GallerySchema.safeParse({
    alt_text: formData.get('alt_text'),
  });

  if (!validatedFields.success) {
    return { success: false, message: validatedFields.error.issues[0].message };
  }

  const { alt_text } = validatedFields.data;
  const imageFile = formData.get('image') as File;

  if (!imageFile || imageFile.size === 0) {
    return { success: false, message: "Plik obrazu jest wymagany." };
  }

  try {
    // KROK 2: Konwertujemy plik na bufor, aby odczytać jego wymiary
    const imageBuffer = Buffer.from(await imageFile.arrayBuffer());
    const dimensions = sizeOf(imageBuffer);

    if (!dimensions.width || !dimensions.height) {
      return { success: false, message: "Nie udało się odczytać wymiarów obrazu." };
    }

    // KROK 3: Kontynuujemy proces uploadu, mając już wymiary
    const filePath = `public/${Date.now()}-${imageFile.name}`;
    const { error: uploadError } = await supabase.storage.from('gallery').upload(filePath, imageFile);
    if (uploadError) { return { success: false, message: `Błąd wysyłania obrazka: ${uploadError.message}` }; }

    const { data: { publicUrl } } = supabase.storage.from('gallery').getPublicUrl(filePath);

    // KROK 4: Zapisujemy do bazy danych URL ORAZ automatycznie odczytane wymiary
    const { error: dbError } = await supabase.from('gallery').insert({
      image_url: publicUrl,
      alt_text: alt_text,
      width: dimensions.width,   // Zapisujemy odczytaną szerokość
      height: dimensions.height, // Zapisujemy odczytaną wysokość
    });
    if (dbError) { return { success: false, message: `Błąd bazy danych: ${dbError.message}` }; }

    revalidatePath('/gallery');
    revalidatePath('/dashboard/gallery');

    return { success: true, message: 'Obraz został pomyślnie dodany.' };

  } catch (error) {
    return { success: false, message: "Wystąpił nieoczekiwany błąd podczas przetwarzania obrazu." };
  }
}

// Funkcja deleteGalleryImage pozostaje bez zmian
export async function deleteGalleryImage(id: number, imageUrl: string) {
    const supabase = await createClient();
    
    const fileName = imageUrl.split('/').pop();
    if (fileName) {
        await supabase.storage.from('gallery').remove([`public/${fileName}`]);
    }
    
    await supabase.from('gallery').delete().eq('id', id);

    revalidatePath('/gallery');
    revalidatePath('/dashboard/gallery');
}