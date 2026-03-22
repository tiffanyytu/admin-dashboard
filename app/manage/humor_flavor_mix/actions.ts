"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// --- UPDATE ONLY ---
export async function updateHumorMix(formData: FormData) {
  const supabase = await createClient();

  // --- NEW: Fetch the user so we know who is modifying the row! ---
  const { data: { user } } = await supabase.auth.getUser();

  const id = formData.get("id") as string;
  const humor_flavor_id = formData.get("humor_flavor_id") ? parseInt(formData.get("humor_flavor_id") as string) : null;
  const caption_count = formData.get("caption_count") ? parseInt(formData.get("caption_count") as string) : null;

  const { error } = await supabase
    .from("humor_flavor_mix")
    .update({
      humor_flavor_id,
      caption_count,

      // --- NEW REQUIRED FIELD ---
      modified_by_user_id: user?.id
      // --------------------------
    })
    .eq("id", id);

  if (error) console.error("Error updating humor mix:", error.message);

  revalidatePath("/manage/humor_flavor_mix");
  redirect("/manage/humor_flavor_mix");
}