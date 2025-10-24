// src/app/(user)/terms/page.tsx
import { PageHeader } from "@/components/ui/PageHeader";
import { legalData } from "@/data/legal";

export default function TermsOfServicePage() {
  return (
    <main className="container mx-auto px-4 py-16">
      <PageHeader
        title="Regulamin Świadczenia Usług Drogą Elektroniczną"
        description={`Obowiązuje od dnia: ${legalData.termsEffectiveDate}`}
      />
      
      <article className="prose prose-invert max-w-4xl mx-auto mt-8">
        <h2>§ 1 Postanowienia ogólne</h2>
        <ol>
          <li>
            Niniejszy regulamin określa rodzaje, zakres oraz warunki świadczenia usług 
            drogą elektroniczną przez <strong>{legalData.fullName}</strong> za pośrednictwem 
            strony internetowej dostępnej pod adresem {legalData.websiteUrl}.
          </li>
          <li>
            Użyte w regulaminie pojęcia oznaczają:
            <ul>
                <li><strong>Usługodawca</strong> – {legalData.fullName} z siedzibą w {legalData.address.city}, {legalData.address.street}, {legalData.address.zipCode}, NIP: {legalData.nip}, KRS: {legalData.krs}.</li>
                <li><strong>Serwis</strong> – strona internetowa Usługodawcy dostępna pod adresem {legalData.websiteUrl}.</li>
                <li><strong>Użytkownik</strong> – każda osoba fizyczna korzystająca z usług Serwisu.</li>
            </ul>
          </li>
          <li>
            Regulamin określa w szczególności zasady korzystania z Serwisu oraz prawa i obowiązki Użytkowników i Usługodawcy.
          </li>
        </ol>

        <h2>§ 2 Rodzaje i zakres usług świadczonych drogą elektroniczną</h2>
        <p>
          Usługodawca świadczy za pośrednictwem Serwisu następujące nieodpłatne usługi:
        </p>
        <ol>
            <li>
                <strong>Formularz kontaktowy</strong> – umożliwienie Użytkownikom wysyłania wiadomości 
                do Usługodawcy w celach informacyjnych i kontaktowych.
            </li>
            <li>
                <strong>Newsletter</strong> – usługa polegająca na przesyłaniu informacji o działalności 
                Fundacji, wydarzeniach oraz innych treści informacyjnych na podany przez Użytkownika adres e-mail.
            </li>
            <li>
                <strong>Dostęp do treści</strong> – umożliwienie przeglądania treści publicznych 
                zamieszczonych w Serwisie, w tym informacji o działalności Fundacji, projektach i wydarzeniach.
            </li>
        </ol>

        <h2>§ 3 Warunki świadczenia usług</h2>
        <ol>
          <li>
            Do korzystania z Serwisu niezbędne jest posiadanie urządzenia z dostępem do 
            Internetu oraz aktualnej przeglądarki internetowej z włączoną obsługą JavaScript i akceptacją plików cookies niezbędnych do funkcjonowania Serwisu.
          </li>
          <li>
            Użytkownika obowiązuje zakaz dostarczania treści o charakterze bezprawnym oraz treści naruszających dobre obyczaje.
          </li>
          <li>
            Korzystanie z usług opisanych w § 2 jest dobrowolne i nieodpłatne.
          </li>
          <li>
            Zakazane jest korzystanie z Serwisu w sposób sprzeczny z prawem, dobrymi obyczajami lub naruszający uzasadnione interesy Usługodawcy.
          </li>
        </ol>

        <h2>§ 4 Warunki zawierania i rozwiązywania umów o świadczenie usług</h2>
        <ol>
          <li>
            Umowa o świadczenie usługi formularz kontaktowy zawierana jest na czas oznaczony i ulega rozwiązaniu z chwilą wysłania wiadomości przez Użytkownika lub zaprzestania wypełniania formularza.
          </li>
          <li>
            Umowa o świadczenie usługi newsletter zawierana jest na czas nieoznaczony z chwilą zapisania się do newslettera. Użytkownik może w każdej chwili zrezygnować z otrzymywania newslettera poprzez kliknięcie linku rezygnacji zawartego w każdej wiadomości lub kontakt z Usługodawcą.
          </li>
        </ol>

        <h2>§ 5 Tryb postępowania reklamacyjnego</h2>
        <ol>
          <li>
            Wszelkie reklamacje związane ze świadczeniem usług drogą elektroniczną przez 
            Usługodawcę Użytkownik może składać za pośrednictwem poczty elektronicznej 
            na adres e-mail podany w Serwisie lub pisemnie na adres siedziby Usługodawcy.
          </li>
          <li>
            Reklamacja powinna zawierać co najmniej: imię i nazwisko oraz adres e-mail Użytkownika, opis problemu będącego przedmiotem reklamacji.
          </li>
          <li>
            Usługodawca rozpatrzy reklamację w terminie 14 dni od dnia jej otrzymania i poinformuje Użytkownika o sposobie jej rozpatrzenia na adres e-mail podany w reklamacji.
          </li>
        </ol>

        <h2>§ 6 Wyłączenie odpowiedzialności</h2>
        <ol>
          <li>
            Usługodawca nie ponosi odpowiedzialności za zakłócenia w funkcjonowaniu Serwisu spowodowane siłą wyższą, niedozwolonym działaniem osób trzecich lub niekompatybilnością Serwisu z infrastrukturą techniczną Użytkownika.
          </li>
          <li>
            Usługodawca zastrzega sobie prawo do czasowego wyłączenia Serwisu ze względu na jego konserwację, przegląd lub wprowadzanie modyfikacji.
          </li>
        </ol>

        <h2>§ 7 Postanowienia końcowe</h2>
        <ol>
            <li>
                Usługodawca zastrzega sobie prawo do dokonywania zmian w Regulaminie z ważnych przyczyn technicznych, prawnych lub organizacyjnych. O wszelkich zmianach Użytkownicy zostaną poinformowani poprzez umieszczenie informacji w Serwisie z co najmniej 7-dniowym wyprzedzeniem.
            </li>
            <li>
                W sprawach nieuregulowanych w niniejszym Regulaminie mają zastosowanie 
                przepisy prawa polskiego, w szczególności Kodeksu cywilnego oraz ustawy o świadczeniu usług drogą elektroniczną.
            </li>
            <li>
                Regulamin wchodzi w życie z dniem jego opublikowania w Serwisie.
            </li>
        </ol>
      </article>
    </main>
  );
}