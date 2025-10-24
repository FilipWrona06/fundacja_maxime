import { PageHeader } from '@/components/ui/PageHeader';
import { createClient } from '@/lib/supabase/server';
import { Metadata } from 'next';
import Image from 'next/image';

// Metadane dla strony, zoptymalizowane pod SEO
export const metadata: Metadata = {
  title: 'Nasza Historia',
  description: 'Poznaj kluczowe momenty i osiągnięcia na drodze rozwoju Fundacji Maxime. Każdy krok to nowa melodia w naszej symfonii działania.',
};

// Typ danych, który idealnie pasuje do Twojej tabeli w Supabase (bez pola 'year')
type TimelineItemFromDB = {
  id: number;
  created_at: string;
  title: string;
  description: string;
  image_url: string;
  image_alt: string;
};

// Główny komponent strony, który jest asynchroniczny, aby pobierać dane na serwerze
export default async function AboutPage() {
  
  // Inicjalizacja klienta Supabase
  const supabase = await createClient();

  // Pobieranie danych z tabeli 'timeline', posortowanych chronologicznie (od najstarszego do najnowszego)
  const { data: timelineData, error } = await supabase
    .from('timeline')
    .select('*')
    .order('created_at', { ascending: true });

  // Obsługa sytuacji, gdy dane nie mogą zostać załadowane
  if (error || !timelineData) {
    return (
      <main className="container mx-auto px-6 py-16 md:py-24 text-center">
        <PageHeader
          title='Nasza Historia'
          description='Poznaj kluczowe momenty i osiągnięcia na drodze rozwoju naszej fundacji. Każdy krok to nowa melodia w naszej symfonii działania.'
        />
        <p className="mt-16 text-red-500">
          Wystąpił błąd podczas ładowania naszej historii. Prosimy spróbować ponownie później.
        </p>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-6 py-16 md:py-24">
      
      <PageHeader
        title='Nasza Historia'
        description='Poznaj kluczowe momenty i osiągnięcia na drodze rozwoju naszej fundacji. Każdy krok to nowa melodia w naszej symfonii działania.'
      />

      {/* Sekcja z dynamicznie renderowaną historią */}
      <div className="space-y-16 md:space-y-24 mt-16 md:mt-24">
        {timelineData.map((item: TimelineItemFromDB, index) => {
          // Logika do naprzemiennego układu (obraz po lewej, obraz po prawej)
          const isReversed = index % 2 !== 0;
          const flexDirection = isReversed ? 'md:flex-row-reverse' : 'md:flex-row';
          const isFirstItem = index === 0;

          return (
            <section 
              key={item.id}
              className={`flex flex-col items-center gap-8 md:gap-12 lg:gap-16 ${flexDirection}`}
              aria-labelledby={`timeline-item-${item.id}`} // Unikalne ID dla dostępności
            >
              
              {/* Kontener na obraz */}
              <div className="w-full md:w-5/12">
                <div className="relative aspect-square overflow-hidden rounded-3xl border-2 border-philippineSilver shadow-xl transition-transform duration-300 hover:scale-105">
                  <Image
                    src={item.image_url}
                    alt={item.image_alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                    className="object-cover"
                    priority={isFirstItem}
                    loading={isFirstItem ? 'eager' : 'lazy'}
                  />
                </div>
              </div>

              {/* Kontener na treść */}
              <div className="w-full md:w-7/12 space-y-4">
                {/* Element z rokiem został usunięty */}
                <h2 
                  id={`timeline-item-${item.id}`}
                  className="text-3xl lg:text-4xl font-montserrat font-bold"
                >
                  {item.title}
                </h2>
                
<p className="text-base md:text-lg font-montserrat leading-relaxed text-philippineSilver break-words">
  {item.description}
</p>
              </div>

            </section>
          );
        })}
      </div>
    </main>
  );
}