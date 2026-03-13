"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// --- CREATE ---
export async function createAllowedDomain(formData: FormData) {
  const supabase = await createClient();
  const apex_domain = formData.get("apex_domain") as string;

  const { error } = await supabase.from("allowed_signup_domains").insert({ apex_domain });

  if (error) console.error("Error creating allowed domain:", error.message);

  revalidatePath("/manage/allowed_signup_domains");
  redirect("/manage/allowed_signup_domains");
}

// --- UPDATE ---
export async function updateAllowedDomain(formData: FormData) {
  const supabase = await createClient();
  const id = formData.get("id") as string;
  const apex_domain = formData.get("apex_domain") as string;

  const { error } = await supabase
    .from("allowed_signup_domains")
    .update({ apex_domain })
    .eq("id", id);

  if (error) console.error("Error updating allowed domain:", error.message);

  revalidatePath("/manage/allowed_signup_domains");
  redirect("/manage/allowed_signup_domains");
}

// --- DELETE ---
export async function deleteAllowedDomain(formData: FormData) {
  const supabase = await createClient();
  const id = formData.get("id") as string;

  const { error } = await supabase.from("allowed_signup_domains").delete().eq("id", id);

  if (error) console.error("Error deleting allowed domain:", error.message);

  revalidatePath("/manage/allowed_signup_domains");
}