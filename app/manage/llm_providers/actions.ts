"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// --- CREATE ---
export async function createLlmProvider(formData: FormData) {
  const supabase = await createClient();
  const name = formData.get("name") as string;

  const { error } = await supabase.from("llm_providers").insert({ name });

  if (error) console.error("Error creating provider:", error.message);

  revalidatePath("/manage/llm_providers");
  redirect("/manage/llm_providers");
}

// --- UPDATE ---
export async function updateLlmProvider(formData: FormData) {
  const supabase = await createClient();
  const id = formData.get("id") as string;
  const name = formData.get("name") as string;

  const { error } = await supabase
    .from("llm_providers")
    .update({ name })
    .eq("id", id);

  if (error) console.error("Error updating provider:", error.message);

  revalidatePath("/manage/llm_providers");
  redirect("/manage/llm_providers");
}

// --- DELETE ---
export async function deleteLlmProvider(formData: FormData) {
  const supabase = await createClient();
  const id = formData.get("id") as string;

  const { error } = await supabase.from("llm_providers").delete().eq("id", id);

  if (error) console.error("Error deleting provider:", error.message);

  revalidatePath("/manage/llm_providers");
}