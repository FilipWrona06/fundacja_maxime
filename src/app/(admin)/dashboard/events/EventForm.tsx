'use client';

import { Button } from "@/components/ui/Button";

// Prosta funkcja do formatowania daty dla inputa datetime-local
const formatDateTimeForInput = (isoString: string) => {
  if (!isoString) return '';
  const date = new Date(isoString);
  // Odejmujemy informację o strefie czasowej, aby input ją poprawnie zinterpretował
  const timezoneOffset = date.getTimezoneOffset() * 60000;
  const localDate = new Date(date.getTime() - timezoneOffset);
  return localDate.toISOString().slice(0, 16);
};

export function EventForm({ action, event }: { action: (formData: FormData) => void; event?: any }) {
  return (
    <form action={action} className="space-y-6 max-w-lg">
      {/* Przekazujemy ukryte pola, jeśli edytujemy */}
      {event && <input type="hidden" name="oldImageUrl" value={event.image_url} />}
      {event && <input type="hidden" name="slug" value={event.slug} />}

      <div><label className="block text-sm font-medium">Tytuł</label><input name="title" defaultValue={event?.title} required className="w-full mt-1 p-2 border rounded-md dark:bg-gray-700"/></div>
      <div><label className="block text-sm font-medium">Data i czas</label><input type="datetime-local" name="date_time" defaultValue={event ? formatDateTimeForInput(event.date_time) : ''} required className="w-full mt-1 p-2 border rounded-md dark:bg-gray-700"/></div>
      <div><label className="block text-sm font-medium">Lokalizacja</label><input name="location" defaultValue={event?.location} required className="w-full mt-1 p-2 border rounded-md dark:bg-gray-700"/></div>
      <div><label className="block text-sm font-medium">Status</label>
        <select name="status" defaultValue={event?.status} required className="w-full mt-1 p-2 border rounded-md dark:bg-gray-700">
          <option value="nadchodzące">Nadchodzące</option>
          <option value="wyprzedane">Wyprzedane</option>
          <option value="zakończone">Zakończone</option>
        </select>
      </div>
      <div><label className="block text-sm font-medium">Link do biletów (opcjonalnie)</label><input name="ticket_url" defaultValue={event?.ticket_url} className="w-full mt-1 p-2 border rounded-md dark:bg-gray-700"/></div>
      <div>
        <label className="block text-sm font-medium">Obraz</label>
        {event && <img src={event.image_url} alt="Podgląd" className="w-32 h-32 object-cover rounded-md my-2" />}
        <input type="file" name="image" required={!event} className="w-full mt-1"/>
        {event && <p className="text-xs text-gray-500 mt-1">Wybierz nowy plik tylko, jeśli chcesz zmienić obecny obraz.</p>}
      </div>
      <div>
        <label className="block text-sm font-medium">Szczegółowy opis</label>
        <textarea name="details" defaultValue={event?.details} rows={10} required className="w-full mt-1 p-2 border rounded-md dark:bg-gray-700"/>
      </div>
      <Button type="submit">{event ? 'Zapisz zmiany' : 'Opublikuj Wydarzenie'}</Button>
    </form>
  );
}