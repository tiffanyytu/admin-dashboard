import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { updateImage } from "../actions";
import { notFound } from "next/navigation";

export default async function EditImagePage({ params }: { params: Promise<{ id: string }> }) {
  const supabase = await createClient();
  const { id } = await params;

  const { data: image, error } = await supabase
    .from("images")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !image) return notFound();

  return (
    <div className="min-h-screen bg-black text-white p-8 font-sans">
      <div className="max-w-lg mx-auto">
        <Link href="/manage/images" className="text-gray-400 hover:text-white transition-colors mb-6 inline-block">
          &larr; Back to Images
        </Link>
        <h1 className="text-3xl font-bold text-green-400 mb-8">Edit Image Settings</h1>

        <form action={updateImage} className="bg-gray-900 border border-gray-800 p-6 rounded-lg flex flex-col gap-6 shadow-xl">
          <input type="hidden" name="id" value={image.id} />

          {/* Show the admin the image they are editing */}
          {image.url && (
            <div className="w-full h-48 bg-black rounded border border-gray-700 overflow-hidden flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={image.url} alt="Editing preview" className="max-h-full object-contain" />
            </div>
          )}

          <div className="flex items-center gap-2 border-t border-gray-800 pt-4">
            <input type="checkbox" name="is_public" id="isPublic" defaultChecked={image.is_public} className="w-5 h-5 accent-green-500" />
            <label htmlFor="isPublic" className="text-sm font-bold text-gray-200">Make Image Public?</label>
          </div>

          <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded transition-colors">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}