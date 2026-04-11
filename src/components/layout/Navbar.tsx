import { groq } from "next-sanity";
import NavbarInteractive from "@/components/navbar/NavbarInteractive";
import { client } from "@/sanity/lib/client"; // Upewnij się, że ta ścieżka jest poprawna

export default async function Navbar() {
  // Pobieramy z Sanity tylko tablicę 'socials'
  const query = groq`*[_type == "siteSettings"][0]{ socials }`;
  const settings = await client.fetch(query);

  // Brak fallbacków!
  // Jeśli settings.socials nie istnieje, .find() wyrzuci błąd.
  // Jeśli nie znajdzie Patronite, .url wyrzuci błąd.
  // Dzięki temu od razu wiesz, czy dokument w Sanity jest poprawnie uzupełniony.
  const patroniteUrl = settings.socials.find(
    (s: { platform: string; url: string }) =>
      s.platform.toLowerCase() === "patronite",
  ).url;

  return <NavbarInteractive patroniteUrl={patroniteUrl} />;
}
