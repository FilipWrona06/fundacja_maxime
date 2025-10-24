'use client';

import { useState, useRef, useEffect } from 'react';
import { useActionState } from 'react';
import Image from 'next/image';
import { createTimelineItem, deleteTimelineItem, FormState } from '@/actions/timeline';
import { EditTimelineModal } from './EditTimelineModal';

// Typ danych (bez zmian)
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
  const [createState, createFormAction] = useActionState(createTimelineItem, initialState);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<TimelineItem | null>(null);

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (createState.success) {
      formRef.current?.reset();
    }
  }, [createState]);

  const handleDelete = async (id: number, imageUrl: string) => {
    if (confirm('Czy na pewno chcesz usunąć ten wpis? Ta operacja jest nieodwracalna.')) {
      setItems(prevItems => prevItems.filter(item => item.id !== id));
      await deleteTimelineItem(id, imageUrl);
    }
  };

  const handleEditClick = (item: TimelineItem) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
  };
  
  return (
    <>
      {/* ZMIANA 1: Zmiana siatki na 2-kolumnową (50/50) dla dużych ekranów. */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        
        {/* === Kolumna z formularzem dodawania (zajmuje 1 z 2 kolumn) === */}
        {/* Usunęliśmy klasę lg:col-span-2 */}
        <div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Dodaj nowy wpis</h2>
            <form ref={formRef} action={createFormAction} className="space-y-4">
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
              {createState.message && <p className={`mt-2 text-sm ${createState.success ? 'text-green-500' : 'text-red-500'}`}>{createState.message}</p>}
            </form>
          </div>
        </div>
        
        {/* === Kolumna z listą istniejących wpisów (zajmuje 1 z 2 kolumn) === */}
        {/* Usunęliśmy klasę lg:col-span-1 */}
        <div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Istniejące wpisy</h2>
              <ul className="space-y-4">
                {items.map(item => (
                  <li key={item.id} className="flex justify-between items-start border-b border-gray-200 dark:border-gray-700 pb-4 gap-4">
                    <div className="flex items-start gap-4 flex-grow min-w-0">
                      <Image src={item.image_url} alt={item.image_alt} width={60} height={60} className="rounded-md object-cover flex-shrink-0" />
                      <div className="flex-grow min-w-0">
                        <p className="font-bold truncate">{item.title}</p>
                        {/* ZMIANA 2: Usunięcie klasy `line-clamp-2` i dodanie `break-words` dla bezpieczeństwa */}
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 break-words">
                          {item.description}
                        </p>
                      </div>
                    </div>
                    {/* ZMIANA 3: Przywrócenie horyzontalnego układu przycisków */}
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <button onClick={() => handleEditClick(item)} className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 font-medium text-sm transition-colors">Edytuj</button>
                      <button onClick={() => handleDelete(item.id, item.image_url)} className="text-red-600 hover:text-red-800 dark:text-red-500 dark:hover:text-red-400 font-medium text-sm transition-colors">Usuń</button>
                    </div>
                  </li>
                ))}
                {items.length === 0 && <p className="text-gray-500">Brak wpisów do wyświetlenia.</p>}
              </ul>
          </div>
        </div>
      </div>

      {editingItem && (
        <EditTimelineModal
          item={editingItem}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
}