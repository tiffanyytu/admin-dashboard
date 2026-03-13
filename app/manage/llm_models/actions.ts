"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// --- CREATE ---
export async function createLlmModel(formData: FormData) {
  const supabase = await createClient();

  const name = formData.get("name") as string;
  const llm_provider_id = formData.get("llm_provider_id") ? parseInt(formData.get("llm_provider_id") as string) : null;
  const provider_model_id = formData.get("provider_model_id") as string;
  // Checkboxes send "on" if checked, otherwise they are null
  const is_temperature_supported = formData.get("is_temperature_supported") === "on";

  const { error } = await supabase.from("llm_models").insert({
    name,
    llm_provider_id,
    provider_model_id,
    is_temperature_supported
  });

  if (error) console.error("Error creating model:", error.message);

  revalidatePath("/manage/llm_models");
  redirect("/manage/llm_models");
}

// --- UPDATE ---
export async function updateLlmModel(formData: FormData) {
  const supabase = await createClient();

  const id = formData.get("id") as string;
  const name = formData.get("name") as string;
  const llm_provider_id = formData.get("llm_provider_id") ? parseInt(formData.get("llm_provider_id") as string) : null;
  const provider_model_id = formData.get("provider_model_id") as string;
  const is_temperature_supported = formData.get("is_temperature_supported") === "on";

  const { error } = await supabase
    .from("llm_models")
    .update({
      name,
      llm_provider_id,
      provider_model_id,
      is_temperature_supported
    })
    .eq("id", id);

  if (error) console.error("Error updating model:", error.message);

  revalidatePath("/manage/llm_models");
  redirect("/manage/llm_models");
}

// --- DELETE ---
export async function deleteLlmModel(formData: FormData) {
  const supabase = await createClient();
  const id = formData.get("id") as string;

  const { error } = await supabase.from("llm_models").delete().eq("id", id);

  if (error) console.error("Error deleting model:", error.message);

  revalidatePath("/manage/llm_models");
}