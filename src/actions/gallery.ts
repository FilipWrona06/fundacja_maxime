'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import sizeOf from 'image-size';

// Schemat walidacji Zod
const GallerySchema = z.object({
  alt_text: z.string().min(1, "Opis (tekst alternatywny) jest wymagany."),
});

// --- ZMODYFIKOWANA AKCJA DODAWANIA ---
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
    const imageBuffer = Buffer.from(await imageFile.arrayBuffer());
    const dimensions = sizeOf(imageBuffer);

    if (!dimensions.width || !dimensions.height) {
      return { success: false, message: "Nie udało się odczytać wymiarów obrazu." };
    }

    const { data: maxPositionData, error: positionError } = await supabase
      .from('gallery')
      .select('position')
      .order('position', { ascending: false, nullsFirst: false })
      .limit(1)
      .single();

    if (positionError && positionError.code !== 'PGRST116') {
      return { success: false, message: `Błąd odczytu pozycji: ${positionError.message}` };
    }
    
    const newPosition = (maxPositionData?.position ?? -1) + 1;

    // Zmieniono nazwę bucket'a z 'gallery-images' na 'gallery'
    const filePath = `public/${Date.now()}-${imageFile.name}`;
    const { error: uploadError } = await supabase.storage.from('gallery').upload(filePath, imageFile);
    if (uploadError) { return { success: false, message: `Błąd wysyłania obrazka: ${uploadError.message}` }; }

    const { data: { publicUrl } } = supabase.storage.from('gallery').getPublicUrl(filePath);

    const { error: dbError } = await supabase.from('gallery').insert({
      image_url: publicUrl,
      alt_text: alt_text,
      width: dimensions.width,
      height: dimensions.height,
      position: newPosition,
    });
    if (dbError) { return { success: false, message: `Błąd bazy danych: ${dbError.message}` }; }

    revalidatePath('/gallery');
    revalidatePath('/dashboard/gallery');

    return { success: true, message: 'Obraz został pomyślnie dodany.' };

  } catch (error) {
    return { success: false, message: "Wystąpił nieoczekiwany błąd podczas przetwarzania obrazu." };
  }
}

// --- AKCJA USUWANIA (bez zmian, ale załączona dla kompletności) ---
export async function deleteGalleryImage(id: number, imageUrl: string) {
    const supabase = await createClient();
    
    const fileName = imageUrl.split('/').pop();
    if (fileName) {
        // Zmieniono nazwę bucket'a z 'gallery-images' na 'gallery'
        await supabase.storage.from('gallery').remove([`public/${fileName}`]);
    }
    
    await supabase.from('gallery').delete().eq('id', id);

    revalidatePath('/gallery');
    revalidatePath('/dashboard/gallery');
}

// --- NOWA AKCJA DO AKTUALIZACJI KOLEJNOŚCI ---
export async function updateGalleryOrder(images: { id: number; position: number }[]) {
  const supabase = await createClient();

  const { error } = await supabase.from('gallery').upsert(images);

  if (error) {
    return { success: false, message: `Błąd zapisu kolejności: ${error.message}` };
  }
  
  revalidatePath('/gallery');
  revalidatePath('/dashboard/gallery');

  return { success: true, message: 'Kolejność została zapisana.' };
}