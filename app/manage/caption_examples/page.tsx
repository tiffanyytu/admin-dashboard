import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { deleteCaptionExample } from "./actions";

export default async function ManageCaptionExamples() {
  const supabase = await createClient();

  const { data: examples, error } = await supabase
    .from("caption_examples")
    .select("*")
    .order("id", { ascending: true });

  if (error) console.error("Error fetching caption examples:", error);

  return (
    <div className="min-h-screen bg-black text-white p-8 font-sans">
      <div className="max-w-7xl mx-auto">

        <div className="flex justify-between items-center mb-8">
          <div>
            <Link href="/" className="text-gray-400 hover:text-white transition-colors mb-4 inline-block">
              &larr; Back to Dashboard
            </Link>
            <h1 className="text-3xl font-bold text-pink-500">Manage Caption Examples</h1>
          </div>
          <Link href="/manage/caption_examples/new" className="bg-pink-600 hover:bg-pink-500 px-4 py-2 rounded font-bold transition-colors">
            + Create New Example
          </Link>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-lg shadow-xl overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="bg-gray-950 border-b border-gray-800 text-gray-400 text-sm">
                <th className="p-4">ID</th>
                <th className="p-4">Image Description</th>
                <th className="p-4">Caption</th>
                <th className="p-4">Explanation</th>
                <th className="p-4">Priority</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {examples?.map((ex) => (
                <tr key={ex.id} className="border-b border-gray-800 hover:bg-gray-800/50">
                  <td className="p-4 font-mono text-xs text-gray-500">{ex.id}</td>
                  <td className="p-4 text-sm text-gray-300 truncate max-w-xs" title={ex.image_description}>{ex.image_description}</td>
                  <td className="p-4 font-bold text-gray-200 truncate max-w-xs" title={ex.caption}>{ex.caption}</td>
                  <td className="p-4 text-sm text-gray-400 truncate max-w-xs" title={ex.explanation}>{ex.explanation}</td>
                  <td className="p-4 font-mono text-sm text-gray-400">{ex.priority}</td>

                  <td className="p-4 flex justify-end gap-4 items-center">
                    <Link href={`/manage/caption_examples/${ex.id}`} className="text-blue-400 hover:text-blue-300 text-sm font-bold">
                      Edit
                    </Link>
                    <form action={deleteCaptionExample}>
                      <input type="hidden" name="id" value={ex.id} />
                      <button type="submit" className="text-red-500 hover:text-red-400 text-sm font-bold">
                        Delete
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
              {(!examples || examples.length === 0) && (
                <tr><td colSpan={6} className="p-8 text-center text-gray-500">No caption examples found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}