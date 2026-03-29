// src/app/opinie/page.tsx
import { defineQuery } from "next-sanity";
import { sanityFetch } from "@/sanity/lib/live";
import ReviewsClient from "./ReviewsClient";

const REVIEWS_QUERY = defineQuery(`
  *[_type == "review" && approved == true] | order(_createdAt desc) {
    _id,
    name,
    role,
    rating,
    text,
    _createdAt
  }
`);

export default async function ReviewsPage() {
  const { data: reviews } = await sanityFetch({ query: REVIEWS_QUERY });

  return <ReviewsClient reviews={reviews} />;
}
