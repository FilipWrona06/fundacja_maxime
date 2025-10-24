'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

function slugify(text: string): string {
  return text.toString().toLowerCase().trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
}

// --- TWORZENIE NOWEGO WYDARZENIA ---
export async function createEvent(formData: FormData) {
  const supabase = await createClient();

  const title = formData.get('title') as string;
  const imageFile = formData.get('image') as File;

  // Podstawowa walidacja
  if (!title || !imageFile || imageFile.size === 0) {
    throw new Error("Tytuł i obraz są wymagane.");
  }

  const slug = `${slugify(title)}-${Date.now().toString().slice(-5)}`;

  const filePath = `public/${slug}-${imageFile.name}`;
  const { error: uploadError } = await supabase.storage.from('events-images').upload(filePath, imageFile);
  if (uploadError) throw new Error(`Błąd uploadu: ${uploadError.message}`);

  const { data: { publicUrl } } = supabase.storage.from('events-images').getPublicUrl(filePath);

  const eventData = {
    title,
    date_time: formData.get('date_time'),
    location: formData.get('location'),
    ticket_url: formData.get('ticket_url'),
    status: formData.get('status'),
    details: formData.get('details'),
    image_url: publicUrl,
    slug: slug,
  };

  const { error: dbError } = await supabase.from('events').insert(eventData);
  if (dbError) throw new Error(`Błąd bazy danych: ${dbError.message}`);

  revalidatePath('/events');
  revalidatePath('/dashboard/events');
  redirect('/dashboard/events');
}

// --- USUWANIE WYDARZENIA ---
export async function deleteEvent(id: number, imageUrl: string) {
  const supabase = await createClient();
  
  const fileName = imageUrl.split('/').pop();
  if (fileName) {
    await supabase.storage.from('events-images').remove([`public/${fileName}`]);
  }
  
  await supabase.from('events').delete().eq('id', id);

  revalidatePath('/events');
  revalidatePath('/dashboard/events');
}

export async function updateEvent(id: number, formData: FormData) {
  const supabase = await createClient();

  const title = formData.get('title') as string;
  const imageFile = formData.get('image') as File;
  const oldImageUrl = formData.get('oldImageUrl') as string;

  if (!title) {
    throw new Error("Tytuł jest wymagany.");
  }
  
  let imageUrl = oldImageUrl;

  // Sprawdzamy, czy użytkownik załadował NOWY obrazek
  if (imageFile && imageFile.size > 0) {
    const slug = `${slugify(title)}-${Date.now().toString().slice(-5)}`;
    const filePath = `public/${slug}-${imageFile.name}`;

    // 1. Upload nowego obrazka
    const { error: uploadError } = await supabase.storage.from('events-images').upload(filePath, imageFile);
    if (uploadError) throw new Error(`Błąd wysyłania nowego obrazka: ${uploadError.message}`);

    imageUrl = supabase.storage.from('events-images').getPublicUrl(filePath).data.publicUrl;

    // 2. Usunięcie STAREGO obrazka, jeśli istniał
    if (oldImageUrl) {
      const oldFileName = oldImageUrl.split('/').pop();
      if (oldFileName) {
        await supabase.storage.from('events-images').remove([`public/${oldFileName}`]);
      }
    }
  }
  
  const eventData = {
    title,
    date_time: formData.get('date_time'),
    location: formData.get('location'),
    ticket_url: formData.get('ticket_url'),
    status: formData.get('status'),
    details: formData.get('details'),
    image_url: imageUrl, // Używamy nowego lub starego URL
  };

  const { error: dbError } = await supabase
    .from('events')
    .update(eventData)
    .eq('id', id);

  if (dbError) throw new Error(`Błąd bazy danych podczas aktualizacji: ${dbError.message}`);

  revalidatePath('/events');
  revalidatePath(`/events/${formData.get('slug')}`); // Odświeżamy też stronę konkretnego wydarzenia
  revalidatePath('/dashboard/events');
  redirect('/dashboard/events');
}