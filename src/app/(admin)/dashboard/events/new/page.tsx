import { createEvent } from "@/actions/events";
import { Button } from "@/components/ui/Button";

export default function NewEventPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Nowe Wydarzenie</h1>
      <form action={createEvent} className="space-y-6 max-w-lg">
        <div><label className="block text-sm font-medium">Tytuł</label><input name="title" required className="w-full mt-1 p-2 border rounded-md dark:bg-gray-700"/></div>
        <div><label className="block text-sm font-medium">Data i czas</label><input type="datetime-local" name="date_time" required className="w-full mt-1 p-2 border rounded-md dark:bg-gray-700"/></div>
        <div><label className="block text-sm font-medium">Lokalizacja</label><input name="location" required className="w-full mt-1 p-2 border rounded-md dark:bg-gray-700"/></div>
        <div><label className="block text-sm font-medium">Status</label>
          <select name="status" required className="w-full mt-1 p-2 border rounded-md dark:bg-gray-700">
            <option value="nadchodzące">Nadchodzące</option>
            <option value="wyprzedane">Wyprzedane</option>
            <option value="zakończone">Zakończone</option>
          </select>
        </div>
        <div><label className="block text-sm font-medium">Link do biletów (opcjonalnie)</label><input name="ticket_url" className="w-full mt-1 p-2 border rounded-md dark:bg-gray-700"/></div>
        <div><label className="block text-sm font-medium">Obraz</label><input type="file" name="image" required className="w-full mt-1"/></div>
        
        {/* === ZMIANA JEST TUTAJ === */}
        <div>
          <label className="block text-sm font-medium">Szczegółowy opis</label>
          <textarea name="details" rows={10} required className="w-full mt-1 p-2 border rounded-md dark:bg-gray-700"/>
        </div>
        
        <Button type="submit">Opublikuj Wydarzenie</Button>
      </form>
    </div>
  );
}