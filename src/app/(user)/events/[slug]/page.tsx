import { notFound } from 'next/navigation';
import Image from 'next/image';
import { createClient } from '@/lib/supabase/server';
import { Button } from '@/components/ui/Button';
import { PageHeader } from '@/components/ui/PageHeader';
import { formatEventDateTimeToPolish } from '@/data/events';

export const dynamic = 'force-dynamic'; // Dla bezpieczeństwa, jak w news

export default async function EventPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  const supabase = await createClient();
  const { data: event } = await supabase.from('events').select('*').eq('slug', slug).single();

  if (!event) { notFound(); }

  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="relative w-full h-64 md:h-96 rounded-3xl overflow-hidden mb-12 shadow-lg">
            <Image src={event.image_url} alt={event.title} fill className="object-cover" priority />
          </div>
          <PageHeader title={event.title}>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-lg">
              <span>📅 {formatEventDateTimeToPolish(event.date_time)}</span>
              <span>📍 {event.location}</span>
            </div>
          </PageHeader>
          <article className="prose prose-lg dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: event.details }} />
          <div className="mt-12 text-center">
            <Button asLink href="/events">← Wróć do wszystkich wydarzeń</Button>
          </div>
        </div>
      </div>
    </main>
  );
}