import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { updateCaptionExample } from "../actions";
import { notFound } from "next/navigation";

export default async function EditCaptionExamplePage({ params }: { params: Promise<{ id: string }> }) {
  const supabase = await createClient();
  const { id } = await params;

  const { data: example, error } = await supabase
    .from("caption_examples")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !example) return notFound();

  return (
    <div className="min-h-screen bg-black text-white p-8 font-sans">
      <div className="max-w-2xl mx-auto">
        <Link href="/manage/caption_examples" className="text-gray-400 hover:text-white transition-colors mb-6 inline-block">
          &larr; Back to Examples
        </Link>
        <h1 className="text-3xl font-bold text-pink-500 mb-8">Edit Caption Example</h1>

        <form action={updateCaptionExample} className="bg-gray-900 border border-gray-800 p-6 rounded-lg flex flex-col gap-4 shadow-xl">
          <input type="hidden" name="id" value={example.id} />

          <div>
            <label className="block text-sm text-gray-400 mb-1">Image Description</label>
            <textarea name="image_description" defaultValue={example.image_description || ""} rows={3} required className="w-full bg-black border border-gray-700 rounded p-2 text-white" />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Caption</label>
            <textarea name="caption" defaultValue={example.caption || ""} rows={2} required className="w-full bg-black border border-gray-700 rounded p-2 text-white font-bold" />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Explanation</label>
            <textarea name="explanation" defaultValue={example.explanation || ""} rows={3} className="w-full bg-black border border-gray-700 rounded p-2 text-white" />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Priority (Number)</label>
            <input type="number" name="priority" defaultValue={example.priority ?? ""} className="w-full bg-black border border-gray-700 rounded p-2 text-white" />
          </div>

          <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded mt-4 transition-colors">
            Update Example
          </button>
        </form>
      </div>
    </div>
  );
}