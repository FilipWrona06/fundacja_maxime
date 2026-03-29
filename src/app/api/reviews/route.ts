// src/app/api/reviews/route.ts
import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";

// Inicjalizacja klienta z uprawnieniami do zapisu
// Ważne: musisz dodać SANITY_API_WRITE_TOKEN w panelu Sanity i pliku .env.local
const writeClient = client.withConfig({
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, role, rating, text } = body;

    // Podstawowa walidacja z poziomu backendu
    if (!name || !rating || !text) {
      return NextResponse.json(
        { message: "Brakujące wymagane pola" },
        { status: 400 },
      );
    }

    const newReview = {
      _type: "review",
      name,
      role: role || "Widz",
      rating: Number(rating),
      text,
      approved: false, // Domyślnie opinia jest niezatwierdzona
      featured: false,
    };

    await writeClient.create(newReview);

    return NextResponse.json(
      { message: "Opinia została wysłana." },
      { status: 200 },
    );
  } catch (error) {
    console.error("Błąd podczas zapisywania opinii:", error);
    return NextResponse.json(
      { message: "Wystąpił błąd serwera." },
      { status: 500 },
    );
  }
}
