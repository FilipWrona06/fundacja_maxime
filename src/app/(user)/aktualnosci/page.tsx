// src/app/(user)/aktualnosci/page.tsx
import { defineQuery } from "next-sanity";
import { sanityFetch } from "@/sanity/lib/live";
import NewsClient, { type NewsProps } from "./NewsClient";

// USUNIĘTO: category z zapytania
const NEWS_QUERY = defineQuery(`
  *[_type == "news"] | order(publishedAt desc) {
    "id": slug.current,
    title,
    excerpt,
    publishedAt,
    "image": image.asset->url
  }
`);

const monthsPlGenitive = [
  "Stycznia",
  "Lutego",
  "Marca",
  "Kwietnia",
  "Maja",
  "Czerwca",
  "Lipca",
  "Sierpnia",
  "Września",
  "Października",
  "Listopada",
  "Grudnia",
];

function formatNewsData(rawNews: any): NewsProps {
  const d = rawNews.publishedAt ? new Date(rawNews.publishedAt) : new Date();

  return {
    id: rawNews.id,
    title: rawNews.title || "Bez tytułu",
    excerpt: rawNews.excerpt || "",
    image: rawNews.image || "/video-poster.webp",
    date: String(d.getDate()).padStart(2, "0"),
    month: monthsPlGenitive[d.getMonth()],
    year: String(d.getFullYear()),
  };
}

export default async function NewsPage() {
  const { data } = await sanityFetch({ query: NEWS_QUERY });
  const formattedNews = data.map(formatNewsData);

  return <NewsClient newsData={formattedNews} />;
}
