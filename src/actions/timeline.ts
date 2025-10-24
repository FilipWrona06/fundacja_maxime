'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

// ZMIANA 1: Usuwamy 'year' ze schematu walidacji Zod
const TimelineSchema = z.object({
  title: z.string().min(1, "Tytuł jest wymagany."),
  description: z.string().min(1, "Opis jest wymagany."),
  imageAlt: z.string().min(1, "Tekst alternatywny jest wymagany."),
});

export type FormState = {
  success: boolean;
  message: string;
  errors?: Record<string, string[] | undefined>;
};

// ZMIANA 2: Modyfikujemy funkcję createTimelineItem, aby nie używała 'year'
export async function createTimelineItem(prevState: FormState, formData: FormData): Promise<FormState> {
  const supabase = await createClient();

  const validatedFields = TimelineSchema.safeParse({
    title: formData.get('title'),
    description: formData.get('description'),
    imageAlt: formData.get('imageAlt'),
  });

  if (!validatedFields.success) {
    return { success: false, message: "Proszę poprawić błędy w formularzu.", errors: validatedFields.error.flatten().fieldErrors };
  }

  // Nie pobieramy już 'year'
  const { title, description, imageAlt } = validatedFields.data;
  const imageFile = formData.get('image') as File;

  if (!imageFile || imageFile.size === 0) {
    return { success: false, message: "Obraz jest wymagany." };
  }

  const filePath = `public/${Date.now()}-${imageFile.name}`;
  const { error: uploadError } = await supabase.storage.from('timeline-images').upload(filePath, imageFile);
  if (uploadError) { return { success: false, message: `Błąd wysyłania obrazka: ${uploadError.message}` }; }

  const { data: { publicUrl } } = supabase.storage.from('timeline-images').getPublicUrl(filePath);

  // Nie dodajemy już 'year' do bazy danych
  const { error: dbError } = await supabase.from('timeline').insert({
    title,
    description,
    image_alt: imageAlt,
    image_url: publicUrl,
  });
  if (dbError) { return { success: false, message: `Błąd bazy danych: ${dbError.message}` }; }

  revalidatePath('/about');
  revalidatePath('/dashboard/timeline');

  return { success: true, message: 'Nowy wpis został dodany.' };
}

// Funkcja deleteTimelineItem pozostaje bez zmian
export async function deleteTimelineItem(id: number, imageUrl: string) {
    const supabase = await createClient();
    
    const fileName = imageUrl.split('/').pop();
    if (fileName) {
        await supabase.storage.from('timeline-images').remove([`public/${fileName}`]);
    }
    
    await supabase.from('timeline').delete().eq('id', id);

    revalidatePath('/about');
    revalidatePath('/dashboard/timeline');
}