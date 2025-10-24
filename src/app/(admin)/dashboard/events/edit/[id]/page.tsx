import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { updateEvent } from "@/actions/events";
import { EventForm } from "../../EventForm"; // Zaktualizowana ścieżka importu

// Sygnatura funkcji musi odzwierciedlać, że `params` to Promise
export default async function EditEventPage({ params }: { params: Promise<{ id: string }> }) {
  
  // === NAJWAŻNIEJSZA POPRAWKA ===
  // Czekamy na rozwiązanie obietnicy `params`, zgodnie z komunikatem błędu
  const resolvedParams = await params;
  const { id } = resolvedParams;
  // ==============================

  const supabase = await createClient();
  
  // Używamy `id` z rozpakowanego obiektu
  const { data: event } = await supabase
    .from('events')
    .select('*')
    .eq('id', id)
    .single();
  
  if (!event) {
    notFound();
  }

  const updateEventWithId = updateEvent.bind(null, event.id);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Edytuj Wydarzenie</h1>
      <EventForm action={updateEventWithId} event={event} />
    </div>
  );
}