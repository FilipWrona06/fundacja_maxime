// src/app/(user)/privacy/page.tsx
import { PageHeader } from "@/components/ui/PageHeader";
import { legalData } from "@/data/legal"; 

export default function PrivacyPolicyPage() {
  return (
    <main className="container mx-auto px-4 py-16">
      <PageHeader
        title="Polityka Prywatności i Plików Cookies"
        description={`Ostatnia aktualizacja: ${legalData.lastPrivacyUpdate}`}
      />
      
      <article className="prose prose-invert max-w-4xl mx-auto mt-8">
        <h2>§ 1 Informacje ogólne</h2>
        <ol>
            <li>Niniejsza polityka prywatności określa zasady przetwarzania i ochrony danych osobowych oraz wykorzystania plików cookies w związku z korzystaniem przez Użytkowników z serwisu internetowego Fundacji Maxime dalej: serwis.</li>
        </ol>

        <h2>§ 2 Administrator Danych Osobowych</h2>
        <ol>
            <li>
                Administratorem Państwa danych osobowych w rozumieniu Rozporządzenia
                Parlamentu Europejskiego i Rady (UE) 2016/679 z dnia 27 kwietnia 2016 r. (RODO)
                jest:
                <ul>
                    <li><strong>Nazwa:</strong> {legalData.fullName}</li>
                    <li><strong>Adres:</strong> {`${legalData.address.street}, ${legalData.address.zipCode} ${legalData.address.city}`}</li>
                    <li><strong>NIP:</strong> {legalData.nip}</li>
                    <li><strong>KRS:</strong> {legalData.krs}</li>
                </ul>
            </li>
            <li>W sprawach związanych z przetwarzaniem danych osobowych można kontaktować się z nami poprzez adres e-mail dostępny na stronie kontaktowej Serwisu.</li>
        </ol>
        
        <h2>§ 3 Cel i podstawa prawna przetwarzania danych</h2>
        <ol>
            <li>Państwa dane osobowe przetwarzane są w celu odpowiedzi na zapytania przesłane przez formularz kontaktowy, w celu obsługi zapisu na newsletter, a także w celach analitycznych i statystycznych.</li>
            <li>Podstawą prawną przetwarzania danych jest Państwa zgoda (art. 6 ust. 1 lit. a RODO) oraz prawnie uzasadniony interes Administratora (art. 6 ust. 1 lit. f RODO), polegający na obsłudze korespondencji i analizie ruchu w Serwisie.</li>
            <li>Podanie danych osobowych jest dobrowolne, lecz niezbędne do realizacji wskazanych celów.</li>
        </ol>
        
        <h2>§ 4 Polityka Plików Cookies</h2>
        <ol>
            <li>
                <strong>Czym są pliki cookies?</strong>
                <p>Pliki cookies tzw. ciasteczka stanowią dane informatyczne, w szczególności pliki tekstowe, które przechowywane są w urządzeniu końcowym Użytkownika Serwisu. Cookies zazwyczaj zawierają nazwę strony internetowej, z której pochodzą, czas przechowywania ich na urządzeniu końcowym oraz unikalny numer.</p>
            </li>
            <li>
                <strong>W jakim celu wykorzystujemy pliki cookies?</strong>
                <p>Pliki cookies wykorzystywane są w celu dostosowania zawartości Serwisu do preferencji Użytkownika oraz optymalizacji korzystania z niego. Używane są również w celu tworzenia anonimowych, zagregowanych statystyk (np. za pomocą Google Analytics), które pomagają zrozumieć, w jaki sposób Użytkownicy korzystają z Serwisu, co umożliwia ulepszanie jego struktury i zawartości.</p>
            </li>
            <li>
                <strong>Jakie rodzaje plików cookies stosujemy?</strong>
                <ul>
                    <li><strong>Niezbędne (techniczne)</strong> – kluczowe do prawidłowego funkcjonowania serwisu, umożliwiające nawigację.</li>
                    <li><strong>Analityczne</strong> – pomagają nam zrozumieć, jak Użytkownicy wchodzą w interakcję z Serwisem poprzez gromadzenie i raportowanie anonimowych informacji.</li>
                    <li><strong>Marketingowe</strong> – mogą być używane do wyświetlania reklam dopasowanych do Użytkowników (np. przez Google, Meta/Facebook).</li>
                </ul>
            </li>
            <li>
                <strong>Jak zarządzać plikami cookies?</strong>
                <p>Standardowo przeglądarki internetowe domyślnie dopuszczają umieszczanie plików cookies. Ustawienia te mogą zostać zmienione w taki sposób, aby blokować automatyczną obsługę plików cookies lub informować o ich każdorazowym przesłaniu na urządzenie. Szczegółowe informacje o możliwości i sposobach obsługi plików cookies dostępne są w ustawieniach przeglądarki internetowej.</p>
            </li>
            <li>
                <strong>Zgoda na pliki cookies</strong>
                <p>Przy pierwszej wizycie w Serwisie wyświetlana jest informacja o stosowaniu plików cookies wraz z możliwością zarządzania zgodami. Użytkownik może w każdej chwili zmienić swoje preferencje dotyczące cookies.</p>
            </li>
        </ol>
        
        <h2>§ 5 Odbiorcy danych</h2>
        <ol>
            <li>Państwa dane osobowe mogą być przekazywane podmiotom świadczącym usługi na rzecz Administratora, w tym dostawcom usług IT, analitycznych (np. Google Analytics) oraz usług hostingowych.</li>
            <li>Administrator nie przekazuje danych osobowych poza Europejski Obszar Gospodarczy, chyba że jest to niezbędne do świadczenia usług i odbywa się z zachowaniem odpowiednich zabezpieczeń.</li>
        </ol>

        <h2>§ 6 Okres przechowywania danych</h2>
        <ol>
            <li>Dane osobowe będą przetwarzane przez okres niezbędny do realizacji celów określonych w §3, a po tym czasie przez okres oraz w zakresie wymaganym przez przepisy prawa.</li>
            <li>Dane dotyczące subskrypcji newslettera będą przetwarzane do momentu cofnięcia zgody przez Użytkownika.</li>
        </ol>
        
        <h2>§ 7 Prawa Użytkownika</h2>
        <ol>
            <li>W związku z przetwarzaniem danych osobowych przysługują Państwu następujące prawa: prawo dostępu do treści swoich danych, prawo ich sprostowania, usunięcia, ograniczenia przetwarzania, prawo do przenoszenia danych, prawo wniesienia sprzeciwu, a także prawo do cofnięcia zgody w dowolnym momencie bez wpływu na zgodność z prawem przetwarzania, którego dokonano na podstawie zgody przed jej cofnięciem.</li>
            <li>Użytkownikowi przysługuje prawo wniesienia skargi do organu nadzorczego – Prezesa Urzędu Ochrony Danych Osobowych.</li>
        </ol>

        <h2>§ 8 Bezpieczeństwo danych</h2>
        <ol>
            <li>Administrator stosuje odpowiednie środki techniczne i organizacyjne zapewniające ochronę przetwarzanych danych osobowych odpowiednią do zagrożeń oraz kategorii danych objętych ochroną.</li>
        </ol>
      </article>
    </main>
  );
}