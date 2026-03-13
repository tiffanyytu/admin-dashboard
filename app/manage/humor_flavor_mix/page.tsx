import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

export default async function ManageHumorMix() {
  const supabase = await createClient();

  const { data: mixes, error } = await supabase
    .from("humor_flavor_mix")
    .select("*")
    .order("id", { ascending: true });

  if (error) console.error("Error fetching humor mix:", error);

  return (
    <div className="min-h-screen bg-black text-white p-8 font-sans">
      <div className="max-w-4xl mx-auto">

        <div className="flex justify-between items-center mb-8">
          <div>
            <Link href="/" className="text-gray-400 hover:text-white transition-colors mb-4 inline-block">
              &larr; Back to Dashboard
            </Link>
            <h1 className="text-3xl font-bold text-emerald-500">Manage Humor Mix</h1>
            <p className="text-gray-400 mt-2">Adjust the caption counts for the humor pipeline.</p>
          </div>
          {/* Read/Update ONLY: Intentionally no "Create" button here */}
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-lg shadow-xl overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-950 border-b border-gray-800 text-gray-400 text-sm">
                <th className="p-4">ID</th>
                <th className="p-4">Humor Flavor ID</th>
                <th className="p-4 w-full">Caption Count</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mixes?.map((mix) => (
                <tr key={mix.id} className="border-b border-gray-800 hover:bg-gray-800/50">
                  <td className="p-4 font-mono text-xs text-gray-500">{mix.id}</td>
                  <td className="p-4 font-bold text-gray-300">{mix.humor_flavor_id}</td>
                  <td className="p-4 font-mono text-emerald-400">{mix.caption_count}</td>

                  <td className="p-4 flex justify-end items-center">
                    <Link href={`/manage/humor_flavor_mix/${mix.id}`} className="text-blue-400 hover:text-blue-300 text-sm font-bold">
                      Edit
                    </Link>
                    {/* Read/Update ONLY: Intentionally no "Delete" button here */}
                  </td>
                </tr>
              ))}
              {(!mixes || mixes.length === 0) && (
                <tr><td colSpan={4} className="p-8 text-center text-gray-500">No humor mix configurations found.</td></tr>
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}