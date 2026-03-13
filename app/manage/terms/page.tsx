import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { deleteTerm } from "./actions";

export default async function ManageTerms() {
  const supabase = await createClient();

  // READ: Fetch all terms
  const { data: terms, error } = await supabase.from("terms").select("*").order("id", { ascending: true });

  if (error) console.error("Error fetching terms:", error);

  return (
    <div className="min-h-screen bg-black text-white p-8 font-sans">
      <div className="max-w-7xl mx-auto">

        <div className="flex justify-between items-center mb-8">
          <div>
            <Link href="/" className="text-gray-400 hover:text-white transition-colors mb-4 inline-block">
              &larr; Back to Dashboard
            </Link>
            <h1 className="text-3xl font-bold text-yellow-500">Manage Terms</h1>
          </div>
          {/* Link to our Create form (we will build this next!) */}
          <Link href="/manage/terms/new" className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded font-bold transition-colors">
            + Create New Term
          </Link>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-lg shadow-xl overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-gray-950 border-b border-gray-800 text-gray-400 text-sm">
                <th className="p-4">ID</th>
                <th className="p-4">Term</th>
                <th className="p-4">Definition</th>
                <th className="p-4">Priority</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {terms?.map((t) => (
                <tr key={t.id} className="border-b border-gray-800 hover:bg-gray-800/50">
                  <td className="p-4 font-mono text-xs text-gray-500">{t.id}</td>
                  <td className="p-4 font-bold text-gray-200">{t.term}</td>
                  <td className="p-4 text-sm text-gray-400 truncate max-w-xs">{t.definition}</td>
                  <td className="p-4 text-sm text-gray-400">{t.priority}</td>

                  <td className="p-4 flex justify-end gap-4 items-center">
                    {/* EDIT Link */}
                    <Link href={`/manage/terms/${t.id}`} className="text-blue-400 hover:text-blue-300 text-sm font-bold">
                      Edit
                    </Link>

                    {/* DELETE Form */}
                    <form action={deleteTerm}>
                      <input type="hidden" name="id" value={t.id} />
                      <button type="submit" className="text-red-500 hover:text-red-400 text-sm font-bold">
                        Delete
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
              {(!terms || terms.length === 0) && (
                <tr><td colSpan={5} className="p-8 text-center text-gray-500">No terms found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}