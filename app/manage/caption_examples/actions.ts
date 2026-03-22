"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// --- CREATE ---
export async function createCaptionExample(formData: FormData) {
  const supabase = await createClient();

  // --- NEW: Fetch the user so we know who is creating the row! ---
  const { data: { user } } = await supabase.auth.getUser();

  const image_description = formData.get("image_description") as string;
  const caption = formData.get("caption") as string;
  const explanation = formData.get("explanation") as string;
  const priority = formData.get("priority") ? parseInt(formData.get("priority") as string) : null;

  const { error } = await supabase.from("caption_examples").insert({
    image_description,
    caption,
    explanation,
    priority,

    // --- NEW REQUIRED FIELDS ---
    created_by_user_id: user?.id,
    modified_by_user_id: user?.id
    // ---------------------------
  });

  if (error) console.error("Error creating caption example:", error.message);

  revalidatePath("/manage/caption_examples");
  redirect("/manage/caption_examples");
}

// --- UPDATE ---
export async function updateCaptionExample(formData: FormData) {
  const supabase = await createClient();

  // --- NEW: Fetch the user so we know who is modifying the row! ---
  const { data: { user } } = await supabase.auth.getUser();

  const id = formData.get("id") as string;
  const image_description = formData.get("image_description") as string;
  const caption = formData.get("caption") as string;
  const explanation = formData.get("explanation") as string;
  const priority = formData.get("priority") ? parseInt(formData.get("priority") as string) : null;

  const { error } = await supabase
    .from("caption_examples")
    .update({
      image_description,
      caption,
      explanation,
      priority,

      // --- NEW REQUIRED FIELD ---
      modified_by_user_id: user?.id
      // --------------------------
    })
    .eq("id", id);

  if (error) console.error("Error updating caption example:", error.message);

  revalidatePath("/manage/caption_examples");
  redirect("/manage/caption_examples");
}

// --- DELETE ---
export async function deleteCaptionExample(formData: FormData) {
  const supabase = await createClient();
  const id = formData.get("id") as string;

  const { error } = await supabase.from("caption_examples").delete().eq("id", id);

  if (error) console.error("Error deleting caption example:", error.message);

  revalidatePath("/manage/caption_examples");
}