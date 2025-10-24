'use client';

import { addGalleryImage, deleteGalleryImage } from "@/actions/gallery";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useActionState } from 'react';

type GalleryImage = { id: number; image_url: string; alt_text: string; };

const initialState = { success: false, message: '' };

export function GalleryManager({ initialImages }: { initialImages: GalleryImage[] }) {
  const [images, setImages] = useState(initialImages);
  const [state, formAction] = useActionState(addGalleryImage, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  // Efekt do czyszczenia formularza po sukcesie
  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
    }
  }, [state]);
      
  const handleDelete = async (id: number, imageUrl: string) => {
    if (confirm('Czy na pewno chcesz usunąć to zdjęcie?')) {
      setImages(prev => prev.filter(img => img.id !== id));
      await deleteGalleryImage(id, imageUrl);
    }
  };

  return (
    <div className="mt-8">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Dodaj nowe zdjęcie</h2>
        
        {/* ZMIANA: Formularz jest teraz prostszy */}
        <form ref={formRef} action={formAction} className="max-w-md space-y-4">
          <div>
            <label htmlFor="alt_text" className="block text-sm font-medium">Opis zdjęcia (Alt Text)</label>
            <input type="text" name="alt_text" required className="w-full mt-1 p-2 border rounded-md dark:bg-gray-700"/>
          </div>
          <div>
            <label htmlFor="image" className="block text-sm font-medium">Plik obrazu</label>
            <input type="file" name="image" required accept="image/*" className="w-full mt-1"/>
          </div>
          <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-md">Dodaj zdjęcie</button>
          {state.message && <p className={`mt-2 text-sm ${state.success ? 'text-green-500' : 'text-red-500'}`}>{state.message}</p>}
        </form>
      </div>

      {/* Siatka istniejących zdjęć - bez zmian */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {images.map(image => (
          <div key={image.id} className="relative group aspect-square">
            <Image src={image.image_url} alt={image.alt_text} fill className="object-cover rounded-md" sizes="20vw" />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <button onClick={() => handleDelete(image.id, image.image_url)} className="text-white bg-red-600 px-3 py-1 rounded-md text-sm">Usuń</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}