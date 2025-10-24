'use client';

import { useState } from 'react';
import { useActionState } from 'react';
import Image from 'next/image';
import { createTimelineItem, deleteTimelineItem, FormState } from '@/actions/timeline';

// ZMIANA 3: Usuwamy 'year' z definicji typu
type TimelineItem = {
  id: number;
  created_at: string;
  title: string;
  description: string;
  image_url: string;
  image_alt: string;
};

const initialState: FormState = { success: false, message: '' };

export function TimelineClientPage({ initialItems }: { initialItems: TimelineItem[] }) {
  const [items, setItems] = useState(initialItems);
  const [state, formAction] = useActionState(createTimelineItem, initialState);
  
  const handleDelete = async (id: number, imageUrl: string) => {
    if (confirm('Czy na pewno chcesz usunąć ten wpis?')) {
      setItems(prevItems => prevItems.filter(item => item.id !== id));
      await deleteTimelineItem(id, imageUrl);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
      {/* Kolumna z formularzem */}
      <div className="lg:col-span-1">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Dodaj nowy wpis</h2>
          {/* ZMIANA 4: Usuwamy pole 'Rok' z formularza */}
          <form action={formAction} className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Tytuł</label>
              <input type="text" name="title" required className="w-full mt-1 p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" />
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Opis</label>
              <textarea name="description" required rows={4} className="w-full mt-1 p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"></textarea>
            </div>
            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Obraz</label>
              <input type="file" name="image" required accept="image/*" className="w-full mt-1 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100" />
            </div>
            <div>
              <label htmlFor="imageAlt" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Tekst alternatywny</label>
              <input type="text" name="imageAlt" required className="w-full mt-1 p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" />
            </div>
            <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition-colors">Dodaj wpis</button>
            {state.message && <p className={`mt-2 text-sm ${state.success ? 'text-green-500' : 'text-red-500'}`}>{state.message}</p>}
          </form>
        </div>
      </div>
      
      {/* Kolumna z listą */}
      <div className="lg:col-span-2">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Istniejące wpisy</h2>
            <ul className="space-y-4">
              {items.map(item => (
                <li key={item.id} className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-2">
                  <div className="flex items-center gap-4">
                    <Image src={item.image_url} alt={item.image_alt} width={50} height={50} className="rounded-md object-cover" />
                    {/* ZMIANA 5: Upraszczamy wyświetlanie, usuwając 'year' */}
                    <div>
                      <span className="font-bold">{item.title}</span>
                    </div>
                  </div>
                  <div>
                    <button onClick={() => handleDelete(item.id, item.image_url)} className="text-red-500 hover:text-red-700 font-medium text-sm">Usuń</button>
                  </div>
                </li>
              ))}
              {items.length === 0 && <p className="text-gray-500">Brak wpisów do wyświetlenia.</p>}
            </ul>
        </div>
      </div>
    </div>
  );
}