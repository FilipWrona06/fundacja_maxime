// src/actions/auth.ts
"use server"; // Ten dyrektywa MUSI być na samej górze pliku

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function signOutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return redirect("/");
}