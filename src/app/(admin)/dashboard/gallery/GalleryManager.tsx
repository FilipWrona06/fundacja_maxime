'use client';

import { addGalleryImage, deleteGalleryImage, updateGalleryOrder } from "@/actions/gallery";
import Image from "next/image";
import { useEffect, useRef, useState, useTransition } from "react";
import { useActionState } from 'react';
import { Reorder } from "framer-motion";

// Typ danych musi zawierać 'position'
type GalleryImage = { id: number; image_url: string; alt_text: string; position: number };

const initialState = { success: false, message: '' };

export function GalleryManager({ initialImages }: { initialImages: GalleryImage[] }) {
  // Sortujemy obrazy po pozycji przy pierwszym renderowaniu
  const [images, setImages] = useState(() => initialImages.sort((a, b) => a.position - b.position));
  const [state, formAction] = useActionState(addGalleryImage, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  
  const [isPending, startTransition] = useTransition();

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
  
  const handleSaveOrder = () => {
    const reorderedImages = images.map((image, index) => ({
      id: image.id,
      position: index,
    }));

    startTransition(async () => {
      await updateGalleryOrder(reorderedImages);
    });
  };

  return (
    <div className="mt-8 space-y-8">
      {/* Formularz dodawania */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Dodaj nowe zdjęcie</h2>
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

      {/* Siatka do zmiany kolejności */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Istniejące zdjęcia</h2>
          <button 
            onClick={handleSaveOrder}
            disabled={isPending}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-green-400 transition-colors"
          >
            {isPending ? 'Zapisywanie...' : 'Zapisz kolejność'}
          </button>
        </div>
        
        <Reorder.Group 
          axis="y" 
          values={images} 
          onReorder={setImages}
          className="space-y-3"
        >
          {images.map(image => (
            <Reorder.Item 
              key={image.id} 
              value={image}
              className="flex items-center justify-between p-2 rounded-md bg-gray-50 dark:bg-gray-700/50 cursor-grab active:cursor-grabbing shadow-sm"
            >
              <div className="flex items-center gap-4">
                <Image src={image.image_url} alt={image.alt_text} width={80} height={80} className="object-cover rounded-md" />
                <span className="font-medium text-gray-800 dark:text-gray-200">{image.alt_text}</span>
              </div>
              <button onClick={() => handleDelete(image.id, image.image_url)} className="text-red-500 hover:text-red-700 font-medium text-sm px-3 py-1 transition-colors">
                Usuń
              </button>
            </Reorder.Item>
          ))}
        </Reorder.Group>
        {images.length === 0 && <p className="text-gray-500 text-center py-4">Brak zdjęć w galerii.</p>}
      </div>
    </div>
  );
}