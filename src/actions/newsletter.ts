"use server";

import { z } from "zod";

// 1. Walidacja środowiska
const MAILERLITE_API_KEY = process.env.MAILERLITE_API_KEY;
const GROUP_ID = null;

if (!MAILERLITE_API_KEY) {
  throw new Error("CRITICAL: Brak MAILERLITE_API_KEY w pliku .env");
}

// 2. Definicja Schematu
const schema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email({ message: "Wprowadź poprawny adres e-mail" }),

  // POPRAWKA 1: Używamy najprostszej składni, którą TypeScript akceptuje zawsze.
  // Jeśli wartość nie będzie równa "on" (np. null), Zod zwróci ten komunikat.
  consent: z.literal("on", {
    error: "Musisz zaakceptować politykę prywatności",
  }),
});

export type FormState = {
  status: "idle" | "loading" | "success" | "error";
  message: string;
};

export async function subscribe(
  _prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  // Pobranie danych
  const rawData = {
    email: formData.get("email"),
    consent: formData.get("consent"),
  };

  // 3. Walidacja Zod
  const validated = schema.safeParse(rawData);

  if (!validated.success) {
    // POPRAWKA 2: Używamy .flatten() - to bezpieczniejsza metoda wyciągania błędów w formularzach
    // Zwraca obiekt { fieldErrors: { email: [...], consent: [...] } }
    const fieldErrors = validated.error.flatten().fieldErrors;

    // Szukamy pierwszego błędu z emaila LUB zgody
    const errorMessage =
      fieldErrors.email?.[0] ||
      fieldErrors.consent?.[0] ||
      "Błąd walidacji danych";

    return { status: "error", message: errorMessage };
  }

  const { email } = validated.data;

  try {
    // 4. Wysyłka do MailerLite
    const response = await fetch(
      "https://connect.mailerlite.com/api/subscribers",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${MAILERLITE_API_KEY}`,
          Accept: "application/json",
        },
        body: JSON.stringify({
          email: email,
          groups: GROUP_ID ? [GROUP_ID] : [],
          status: "active",
        }),
      },
    );

    if (!response.ok) {
      // Cicha obsługa błędu dla klienta, logowanie dla developera
      const errorData = await response.json().catch(() => ({}));
      console.error("[MailerLite Error]:", errorData);

      return {
        status: "error",
        message: "Wystąpił problem z zapisem. Spróbuj ponownie.",
      };
    }

    return {
      status: "success",
      message: "Dziękujemy! Sprawdź skrzynkę, aby potwierdzić zapis.",
    };
  } catch (error) {
    console.error("[Network Error]:", error);
    return { status: "error", message: "Błąd połączenia. Spróbuj później." };
  }
}
