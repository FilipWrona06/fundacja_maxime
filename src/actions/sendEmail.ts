// src/actions/sendEmail.ts
"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(formData: FormData) {
  // Pobieramy dane z formularza
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;
  const subjectCategory = formData.get("subjectCategory") as string;
  const customSubject = formData.get("customSubject") as string;

  // Ustalamy ostateczny temat wiadomości
  const finalSubject =
    subjectCategory === "Inne" && customSubject
      ? `Inne: ${customSubject}`
      : subjectCategory;

  // Prosta walidacja na backendzie
  if (!name || !email || !message) {
    return { error: "Wszystkie podstawowe pola są wymagane." };
  }

  try {
    const data = await resend.emails.send({
      // WAŻNE: Na darmowym koncie Resend musisz wysyłać Z adresu onboarding@resend.dev
      // DO adresu e-mail, na którym założyłeś konto w Resend.
      // Gdy dodasz własną domenę (np. stowarzyszeniemaxime.pl), zmienisz "from".
      from: "Strona Maxime <onboarding@resend.dev>",
      to: ["f.w9@interia.pl"], // <-- ZMIEŃ NA SWÓJ E-MAIL!
      subject: `[Maxime Web] Nowa wiadomość: ${finalSubject}`,
      replyTo: email, // Dzięki temu klikając "Odpowiedz", odpiszesz nadawcy
      html: `
        <div style="font-family: sans-serif; color: #111;">
          <h2>Nowa wiadomość ze strony internetowej Maxime</h2>
          <p><strong>Od:</strong> ${name} (${email})</p>
          <p><strong>Temat:</strong> ${finalSubject}</p>
          <hr />
          <p style="white-space: pre-wrap; font-size: 16px;">${message}</p>
        </div>
      `,
    });

    if (data.error) {
      return { error: data.error.message };
    }

    return { success: true };
  } catch (error) {
    return { error: "Wystąpił nieoczekiwany błąd serwera." };
  }
}
