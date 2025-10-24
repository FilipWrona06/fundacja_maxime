'use client';

import { useActionState, useEffect, useRef } from 'react';
import { updateTimelineItem, FormState } from '@/actions/timeline';
import Image from 'next/image';

// Typ dla elementu osi czasu
type TimelineItem = {
  id: number;
  title: string;
  description: string;
  image_url: string;
  image_alt: string;
};

// Propsy, które komponent będzie przyjmował
interface EditModalProps {
  item: TimelineItem;
  isOpen: boolean;
  onClose: () => void;
}

const initialState: FormState = { success: false, message: '' };

export function EditTimelineModal({ item, isOpen, onClose }: EditModalProps) {
  const [state, formAction] = useActionState(updateTimelineItem, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  // Efekt, który zamknie modal po pomyślnej aktualizacji
  useEffect(() => {
    if (state.success) {
      onClose();
    }
  }, [state, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    // Tło (overlay)
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      {/* Kontener modala */}
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-2xl w-full max-w-lg relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 dark:hover:text-gray-200">&times;</button>
        <h2 className="text-2xl font-bold mb-6">Edytuj wpis</h2>
        
        <form ref={formRef} action={formAction} className="space-y-4">
          {/* Ukryte pola do przekazania ID i starego URL obrazka */}
          <input type="hidden" name="id" value={item.id} />
          <input type="hidden" name="oldImageUrl" value={item.image_url} />

          <div>
            <label htmlFor="title" className="block text-sm font-medium">Tytuł</label>
            <input type="text" name="title" defaultValue={item.title} required className="w-full mt-1 p-2 border rounded-md dark:bg-gray-700" />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium">Opis</label>
            <textarea name="description" defaultValue={item.description} required rows={5} className="w-full mt-1 p-2 border rounded-md dark:bg-gray-700"></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium">Aktualny obraz</label>
            <Image src={item.image_url} alt={item.image_alt} width={100} height={100} className="rounded-md object-cover my-2" />
            <label htmlFor="image" className="block text-sm font-medium">Zmień obraz (opcjonalnie)</label>
            <input type="file" name="image" accept="image/*" className="w-full mt-1 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100" />
          </div>
          <div>
            <label htmlFor="imageAlt" className="block text-sm font-medium">Tekst alternatywny</label>
            <input type="text" name="imageAlt" defaultValue={item.image_alt} required className="w-full mt-1 p-2 border rounded-md dark:bg-gray-700" />
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 dark:bg-gray-600 rounded-md hover:bg-gray-300">Anuluj</button>
            <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">Zapisz zmiany</button>
          </div>
          {state.message && <p className={`mt-2 text-sm text-center ${state.success ? 'text-green-500' : 'text-red-500'}`}>{state.message}</p>}
        </form>
      </div>
    </div>
  );
}