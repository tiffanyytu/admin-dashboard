import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { updateTerm } from "../actions";
import { notFound } from "next/navigation";

export default async function EditTermPage({ params }: { params: Promise<{ id: string }> }) {
  const supabase = await createClient();
  const { id } = await params;

  // Fetch the existing data for this specific term
  const { data: term, error } = await supabase
    .from("terms")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !term) {
    return notFound(); // Shows a 404 page if the ID doesn't exist
  }

  return (
    <div className="min-h-screen bg-black text-white p-8 font-sans">
      <div className="max-w-2xl mx-auto">

        <Link href="/manage/terms" className="text-gray-400 hover:text-white transition-colors mb-6 inline-block">
          &larr; Back to Terms
        </Link>
        <h1 className="text-3xl font-bold text-yellow-500 mb-8">Edit Term: {term.term}</h1>

        <form action={updateTerm} className="bg-gray-900 border border-gray-800 p-6 rounded-lg flex flex-col gap-4 shadow-xl">

          {/* HIDDEN INPUT: We need to pass the ID to our Server Action so it knows which row to update! */}
          <input type="hidden" name="id" value={term.id} />

          <div>
            <label className="block text-sm text-gray-400 mb-1">Term</label>
            <input type="text" name="term" defaultValue={term.term || ""} required className="w-full bg-black border border-gray-700 rounded p-2 text-white" />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Definition</label>
            <textarea name="definition" defaultValue={term.definition || ""} rows={3} className="w-full bg-black border border-gray-700 rounded p-2 text-white" />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Example</label>
            <textarea name="example" defaultValue={term.example || ""} rows={2} className="w-full bg-black border border-gray-700 rounded p-2 text-white" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Priority (Number)</label>
              <input type="number" name="priority" defaultValue={term.priority ?? ""} className="w-full bg-black border border-gray-700 rounded p-2 text-white" />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Term Type ID</label>
              <input type="number" name="term_type_id" defaultValue={term.term_type_id ?? ""} className="w-full bg-black border border-gray-700 rounded p-2 text-white" />
            </div>
          </div>

          <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded mt-4 transition-colors">
            Update Term
          </button>
        </form>

      </div>
    </div>
  );
}