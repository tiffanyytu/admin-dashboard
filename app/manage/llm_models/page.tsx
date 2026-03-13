import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { deleteLlmModel } from "./actions";

export default async function ManageLlmModels() {
  const supabase = await createClient();

  const { data: models, error } = await supabase
    .from("llm_models")
    .select("*")
    .order("id", { ascending: true });

  if (error) console.error("Error fetching models:", error);

  return (
    <div className="min-h-screen bg-black text-white p-8 font-sans">
      <div className="max-w-6xl mx-auto">

        <div className="flex justify-between items-center mb-8">
          <div>
            <Link href="/" className="text-gray-400 hover:text-white transition-colors mb-4 inline-block">
              &larr; Back to Dashboard
            </Link>
            <h1 className="text-3xl font-bold text-teal-400">Manage LLM Models</h1>
          </div>
          <Link href="/manage/llm_models/new" className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded font-bold transition-colors">
            + Create New Model
          </Link>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-lg shadow-xl overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-gray-950 border-b border-gray-800 text-gray-400 text-sm">
                <th className="p-4">ID</th>
                <th className="p-4">Name</th>
                <th className="p-4">Provider ID</th>
                <th className="p-4">Provider Model ID</th>
                <th className="p-4">Temp Supported</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {models?.map((m) => (
                <tr key={m.id} className="border-b border-gray-800 hover:bg-gray-800/50">
                  <td className="p-4 font-mono text-xs text-gray-500">{m.id}</td>
                  <td className="p-4 font-bold text-gray-200">{m.name}</td>
                  <td className="p-4 text-sm text-gray-400">{m.llm_provider_id}</td>
                  <td className="p-4 font-mono text-xs text-gray-400">{m.provider_model_id}</td>
                  <td className="p-4 text-sm">
                    {m.is_temperature_supported ? "✅ Yes" : "❌ No"}
                  </td>
                  <td className="p-4 flex justify-end gap-4 items-center">
                    <Link href={`/manage/llm_models/${m.id}`} className="text-blue-400 hover:text-blue-300 text-sm font-bold">
                      Edit
                    </Link>
                    <form action={deleteLlmModel}>
                      <input type="hidden" name="id" value={m.id} />
                      <button type="submit" className="text-red-500 hover:text-red-400 text-sm font-bold">
                        Delete
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
              {(!models || models.length === 0) && (
                <tr><td colSpan={6} className="p-8 text-center text-gray-500">No models found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}