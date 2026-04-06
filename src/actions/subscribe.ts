"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function subscribeToNewsletter(formData: FormData) {
  // Pobieramy adres wpisany na stronie w inpucie
  const email = formData.get("email") as string;

  if (!email) {
    return { error: "Adres e-mail jest wymagany." };
  }

  try {
    // Dokładnie to, co widzisz u siebie w dokumentacji (Create Contact)
    const { error } = await resend.contacts.create({
      email: email,
      unsubscribed: false,
    });

    if (error) {
      console.error("Błąd zapisu kontaktu:", error);
      return { error: "Ten adres e-mail jest już zapisany lub wystąpił błąd." };
    }

    return { success: true };
  } catch (error) {
    console.error("Błąd serwera:", error);
    return { error: "Wystąpił nieoczekiwany błąd serwera." };
  }
}
