"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// --- CREATE (UPLOAD) ---
export async function uploadImage(formData: FormData) {
  const supabase = await createClient();

  const file = formData.get("file") as File;
  const is_public = formData.get("is_public") === "on";

  if (!file || file.size === 0) {
    console.error("No file selected.");
    return;
  }

  // 1. Generate a unique filename and upload to the Storage Bucket
  const fileExtension = file.name.split('.').pop();
  const uniqueFileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExtension}`;

  const { data: storageData, error: storageError } = await supabase.storage
    .from("images") // <--- Change this if your bucket is NOT named "images"
    .upload(uniqueFileName, file);

  if (storageError) {
    console.error("Error uploading to storage bucket:", storageError.message);
    return;
  }

  // 2. Get the public URL of the uploaded image
  const { data: publicUrlData } = supabase.storage
    .from("images")
    .getPublicUrl(uniqueFileName);

  const url = publicUrlData.publicUrl;

  // 3. Get your admin user ID to attach as the uploader
  const { data: { user } } = await supabase.auth.getUser();

  // 4. Save the record to the Database
  const { error: dbError } = await supabase.from("images").insert({
    url: url,
    is_public: is_public,
    profile_id: user?.id || null,

    // --- NEW REQUIRED FIELDS ---
    created_by_user_id: user?.id,
    modified_by_user_id: user?.id
    // ---------------------------
  });

  if (dbError) console.error("Error saving to database:", dbError.message);

  revalidatePath("/manage/images");
  redirect("/manage/images");
}

// --- UPDATE (Metadata Only) ---
export async function updateImage(formData: FormData) {
  const supabase = await createClient();
  const id = formData.get("id") as string;
  const is_public = formData.get("is_public") === "on";

  // --- NEW: Fetch the user so we know who is modifying the row! ---
  const { data: { user } } = await supabase.auth.getUser();

  // Usually, you don't "update" a physical image file. You just change its settings!
  const { error } = await supabase
    .from("images")
    .update({
        is_public,

        // --- NEW REQUIRED FIELD ---
        modified_by_user_id: user?.id
        // --------------------------
    })
    .eq("id", id);

  if (error) console.error("Error updating image visibility:", error.message);

  revalidatePath("/manage/images");
  redirect("/manage/images");
}

// --- DELETE ---
export async function deleteImage(formData: FormData) {
  const supabase = await createClient();
  const id = formData.get("id") as string;
  const url = formData.get("url") as string;

  // 1. Delete the file from the Storage Bucket so it doesn't waste space
  if (url) {
    const parts = url.split('/');
    const fileName = parts[parts.length - 1];
    await supabase.storage.from("images").remove([fileName]);
  }

  // 2. Delete the row from the database
  const { error } = await supabase.from("images").delete().eq("id", id);

  if (error) console.error("Error deleting image from database:", error.message);

  revalidatePath("/manage/images");
}