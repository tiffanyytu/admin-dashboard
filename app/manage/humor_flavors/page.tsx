import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

export default async function ViewHumorFlavors() {
  const supabase = await createClient();

  const { data: flavors, error } = await supabase
    .from("humor_flavors")
    .select("*")
    .order("id", { ascending: true });

  if (error) console.error("Error fetching humor flavors:", error);

  return (
    <div className="min-h-screen bg-black text-white p-8 font-sans">
      <div className="max-w-5xl mx-auto">

        <div className="flex justify-between items-center mb-8">
          <div>
            <Link href="/" className="text-gray-400 hover:text-white transition-colors mb-4 inline-block">
              &larr; Back to Dashboard
            </Link>
            <h1 className="text-3xl font-bold text-indigo-500">View Humor Flavors</h1>
            <p className="text-gray-400 mt-2">This data is Read-Only per system requirements.</p>
          </div>
          {/* Notice: No "Create New" button here! */}
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-lg shadow-xl overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-950 border-b border-gray-800 text-gray-400 text-sm">
                <th className="p-4 w-24">ID</th>
                <th className="p-4 w-48">Slug</th>
                <th className="p-4">Description</th>
              </tr>
            </thead>
            <tbody>
              {flavors?.map((flavor) => (
                <tr key={flavor.id} className="border-b border-gray-800 hover:bg-gray-800/50">
                  <td className="p-4 font-mono text-xs text-gray-500">{flavor.id}</td>
                  <td className="p-4 font-bold text-gray-200">{flavor.slug}</td>
                  <td className="p-4 text-sm text-gray-400">{flavor.description}</td>
                </tr>
              ))}
              {(!flavors || flavors.length === 0) && (
                <tr><td colSpan={3} className="p-8 text-center text-gray-500">No humor flavors found.</td></tr>
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}