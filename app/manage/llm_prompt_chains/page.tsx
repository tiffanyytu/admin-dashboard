import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

export default async function ViewPromptChains() {
  const supabase = await createClient();

  const { data: chains, error } = await supabase
    .from("llm_prompt_chains")
    .select("*")
    .order("id", { ascending: false });

  if (error) console.error("Error fetching prompt chains:", error);

  return (
    <div className="min-h-screen bg-black text-white p-8 font-sans">
      <div className="max-w-4xl mx-auto">

        <div className="flex justify-between items-center mb-8">
          <div>
            <Link href="/" className="text-gray-400 hover:text-white transition-colors mb-4 inline-block">
              &larr; Back to Dashboard
            </Link>
            <h1 className="text-3xl font-bold text-sky-400">View LLM Prompt Chains</h1>
            <p className="text-gray-400 mt-2">Execution groupings for caption requests.</p>
          </div>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-lg shadow-xl overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-950 border-b border-gray-800 text-gray-400 text-sm">
                <th className="p-4">Chain ID</th>
                <th className="p-4 w-full">Caption Request ID</th>
              </tr>
            </thead>
            <tbody>
              {chains?.map((chain) => (
                <tr key={chain.id} className="border-b border-gray-800 hover:bg-gray-800/50">
                  <td className="p-4 font-mono text-xs text-sky-400">{chain.id}</td>
                  <td className="p-4 font-mono text-xs text-gray-400">{chain.caption_request_id}</td>
                </tr>
              ))}
              {(!chains || chains.length === 0) && (
                <tr><td colSpan={2} className="p-8 text-center text-gray-500">No prompt chains found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}