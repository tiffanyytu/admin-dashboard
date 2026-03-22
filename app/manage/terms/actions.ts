"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// --- CREATE ---
export async function createTerm(formData: FormData) {
  const supabase = await createClient();

  // --- NEW: Fetch the user so we know who is creating the row! ---
  const { data: { user } } = await supabase.auth.getUser();

  // Extract data from the form
  const term = formData.get("term") as string;
  const definition = formData.get("definition") as string;
  const example = formData.get("example") as string;
  const priority = formData.get("priority") ? parseInt(formData.get("priority") as string) : null;
  const term_type_id = formData.get("term_type_id") ? parseInt(formData.get("term_type_id") as string) : null;

  const { error } = await supabase.from("terms").insert({
    term,
    definition,
    example,
    priority,
    term_type_id,

    // --- NEW REQUIRED FIELDS ---
    created_by_user_id: user?.id,
    modified_by_user_id: user?.id
    // ---------------------------
  });

  if (error) console.error("Error creating term:", error.message);

  // Refresh the data and send the user back to the main table
  revalidatePath("/manage/terms");
  redirect("/manage/terms");
}

// --- DELETE ---
export async function deleteTerm(formData: FormData) {
  const supabase = await createClient();
  const id = formData.get("id") as string;

  const { error } = await supabase.from("terms").delete().eq("id", id);

  if (error) console.error("Error deleting term:", error.message);

  // Refresh the data so the deleted row disappears
  revalidatePath("/manage/terms");
}

// --- UPDATE ---
export async function updateTerm(formData: FormData) {
  const supabase = await createClient();

  // --- NEW: Fetch the user so we know who is modifying the row! ---
  const { data: { user } } = await supabase.auth.getUser();

  // Extract data from the form
  const id = formData.get("id") as string;
  const term = formData.get("term") as string;
  const definition = formData.get("definition") as string;
  const example = formData.get("example") as string;
  const priority = formData.get("priority") ? parseInt(formData.get("priority") as string) : null;
  const term_type_id = formData.get("term_type_id") ? parseInt(formData.get("term_type_id") as string) : null;

  const { error } = await supabase
    .from("terms")
    .update({
      term,
      definition,
      example,
      priority,
      term_type_id,

      // --- NEW REQUIRED FIELD ---
      modified_by_user_id: user?.id
      // --------------------------
    })
    .eq("id", id);

  if (error) console.error("Error updating term:", error.message);

  // Refresh the data and send the user back to the main table
  revalidatePath("/manage/terms");
  redirect("/manage/terms");
}