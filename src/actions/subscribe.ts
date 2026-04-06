"use server";

export async function subscribeToNewsletter(formData: FormData) {
  const email = formData.get("email") as string;

  if (!email) {
    return { error: "Adres e-mail jest wymagany." };
  }

  try {
    // Wysyłamy zapytanie POST prosto do API MailerLite
    const response = await fetch(
      "https://connect.mailerlite.com/api/subscribers",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${process.env.MAILERLITE_API_KEY}`,
        },
        body: JSON.stringify({
          email: email,
          // Status "unconfirmed" sprawia, że MailerLite natychmiast
          // wyśle maila Double Opt-In (jeśli włączyłeś to w Kroku 2).
          status: "unconfirmed",
        }),
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Błąd API MailerLite:", errorData);

      return {
        error: "Wystąpił błąd podczas zapisu. Być może jesteś już na liście.",
      };
    }

    // Sukces! Użytkownik właśnie otrzymał maila weryfikacyjnego.
    return { success: true };
  } catch (error) {
    console.error("Błąd serwera (Next.js):", error);
    return { error: "Wystąpił nieoczekiwany błąd serwera." };
  }
}
