"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// --- CREATE ---
export async function createWhitelistEmail(formData: FormData) {
  const supabase = await createClient();

  // --- NEW: Fetch the user so we know who is creating the row! ---
  const { data: { user } } = await supabase.auth.getUser();

  const email_address = formData.get("email_address") as string;

  const { error } = await supabase.from("whitelist_email_addresses").insert({
    email_address,

    // --- NEW REQUIRED FIELDS ---
    created_by_user_id: user?.id,
    modified_by_user_id: user?.id
    // ---------------------------
  });

  if (error) console.error("Error creating whitelisted email:", error.message);

  revalidatePath("/manage/whitelist_email_addresses");
  redirect("/manage/whitelist_email_addresses");
}

// --- UPDATE ---
export async function updateWhitelistEmail(formData: FormData) {
  const supabase = await createClient();

  // --- NEW: Fetch the user so we know who is modifying the row! ---
  const { data: { user } } = await supabase.auth.getUser();

  const id = formData.get("id") as string;
  const email_address = formData.get("email_address") as string;

  const { error } = await supabase
    .from("whitelist_email_addresses")
    .update({
      email_address,

      // --- NEW REQUIRED FIELD ---
      modified_by_user_id: user?.id
      // --------------------------
    })
    .eq("id", id);

  if (error) console.error("Error updating whitelisted email:", error.message);

  revalidatePath("/manage/whitelist_email_addresses");
  redirect("/manage/whitelist_email_addresses");
}

// --- DELETE ---
export async function deleteWhitelistEmail(formData: FormData) {
  const supabase = await createClient();
  const id = formData.get("id") as string;

  const { error } = await supabase.from("whitelist_email_addresses").delete().eq("id", id);

  if (error) console.error("Error deleting whitelisted email:", error.message);

  revalidatePath("/manage/whitelist_email_addresses");
}