import { draftMode } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  // 1. Wyłączamy tryb draft (usuwa ciasteczko)
  (await draftMode()).disable();

  // 2. Przekierowujemy użytkownika na stronę główną (lub tam skąd przyszedł)
  const url = new URL(request.url);
  return NextResponse.redirect(new URL("/", url.origin));
}
