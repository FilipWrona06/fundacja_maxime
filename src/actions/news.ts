'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { redirect } from 'next/navigation';

// Prosta funkcja do generowania slugów
function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

const ArticleSchema = z.object({
  title: z.string().min(1, "Tytuł jest wymagany."),
  date: z.string().min(1, "Data jest wymagana."),
  excerpt: z.string().min(1, "Wstęp jest wymagany."),
  content: z.string().min(1, "Treść jest wymagana."),
});

// --- TWORZENIE NOWEGO ARTYKUŁU ---
export async function createNewsArticle(formData: FormData) {
  const supabase = await createClient();

  const validatedFields = ArticleSchema.safeParse({
    title: formData.get('title'),
    date: formData.get('date'),
    excerpt: formData.get('excerpt'),
    content: formData.get('content'),
  });

  if (!validatedFields.success) {
    // Zwracamy błąd i kończymy działanie
    throw new Error("Błędy walidacji: " + JSON.stringify(validatedFields.error.flatten().fieldErrors));
  }

  const { title, date, excerpt, content } = validatedFields.data;
  const imageFile = formData.get('image') as File;
  const slug = `${slugify(title)}-${Date.now().toString().slice(-5)}`;

  if (!imageFile || imageFile.size === 0) {
    throw new Error("Obraz jest wymagany.");
  }
  
  const filePath = `public/${slug}-${imageFile.name}`;
  const { error: uploadError } = await supabase.storage.from('news-images').upload(filePath, imageFile);
  if (uploadError) {
    throw new Error(`Błąd uploadu: ${uploadError.message}`);
  }

  const { data: { publicUrl } } = supabase.storage.from('news-images').getPublicUrl(filePath);

  const { error: dbError } = await supabase.from('news').insert({
    title, date, excerpt, content, slug, image_url: publicUrl
  });
  if (dbError) {
    throw new Error(`Błąd bazy danych: ${dbError.message}`);
  }

  revalidatePath('/news');
  revalidatePath('/dashboard/news');
  // `redirect` jest specjalną funkcją, która rzuca błąd, więc przerywa wykonanie funkcji.
  // Jest to poprawny sposób na zakończenie Server Action.
  redirect('/dashboard/news');
}


// --- USUWANIE ARTYKUŁU (BRAKUJĄCA FUNKCJA) ---
export async function deleteNewsArticle(id: number, imageUrl: string) {
  const supabase = await createClient();
  
  // Usuń obrazek ze storage
  const fileName = imageUrl.split('/').pop();
  if (fileName) {
    await supabase.storage.from('news-images').remove([`public/${fileName}`]);
  }
  
  // Usuń wpis z bazy danych
  const { error } = await supabase.from('news').delete().eq('id', id);

  if (error) {
    throw new Error(`Błąd usuwania z bazy danych: ${error.message}`);
  }

  revalidatePath('/news');
  revalidatePath('/dashboard/news');
}