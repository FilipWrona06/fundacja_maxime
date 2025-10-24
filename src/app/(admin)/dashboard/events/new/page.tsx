import { createEvent } from "@/actions/events";
import { EventForm } from "../EventForm";

export default function NewEventPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Nowe Wydarzenie</h1>
      <EventForm action={createEvent} />
    </div>
  );
}