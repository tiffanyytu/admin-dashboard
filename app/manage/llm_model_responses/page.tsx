import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

export default async function ViewModelResponses() {
  const supabase = await createClient();

  const { data: responses, error } = await supabase
    .from("llm_model_responses")
    .select("*")
    .order("id", { ascending: false });

  if (error) console.error("Error fetching model responses:", error);

  return (
    <div className="min-h-screen bg-black text-white p-8 font-sans">
      <div className="max-w-[95%] mx-auto">

        <div className="flex justify-between items-center mb-8">
          <div>
            <Link href="/" className="text-gray-400 hover:text-white transition-colors mb-4 inline-block">
              &larr; Back to Dashboard
            </Link>
            <h1 className="text-3xl font-bold text-rose-500">View LLM Responses</h1>
            <p className="text-gray-400 mt-2">Raw output logs from the AI models.</p>
          </div>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-lg shadow-xl overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1500px]">
            <thead>
              <tr className="bg-gray-950 border-b border-gray-800 text-gray-400 text-sm">
                <th className="p-4">Response ID</th>
                <th className="p-4">Model Output</th>
                <th className="p-4">Time (s)</th>
                <th className="p-4">Model ID</th>
                <th className="p-4">Flavor ID</th>
                <th className="p-4">Chain ID</th>
                <th className="p-4">Step ID</th>
                <th className="p-4">System Prompt</th>
                <th className="p-4">User Prompt</th>
              </tr>
            </thead>
            <tbody>
              {responses?.map((res) => (
                <tr key={res.id} className="border-b border-gray-800 hover:bg-gray-800/50">
                  <td className="p-4 font-mono text-xs text-gray-500">{res.id}</td>
                  <td className="p-4 font-medium text-rose-400 truncate max-w-[250px]" title={res.llm_model_response}>{res.llm_model_response}</td>
                  <td className="p-4 text-sm text-gray-300">{res.processing_time_seconds}s</td>
                  <td className="p-4 text-sm text-gray-400">{res.llm_model_id}</td>
                  <td className="p-4 text-sm text-gray-400">{res.humor_flavor_id}</td>
                  <td className="p-4 font-mono text-xs text-gray-400">{res.llm_prompt_chain_id}</td>
                  <td className="p-4 text-sm text-gray-400">{res.humor_flavor_step_id}</td>
                  <td className="p-4 text-sm text-gray-400 truncate max-w-[200px]" title={res.llm_system_prompt}>{res.llm_system_prompt}</td>
                  <td className="p-4 text-sm text-gray-400 truncate max-w-[200px]" title={res.llm_user_prompt}>{res.llm_user_prompt}</td>
                </tr>
              ))}
              {(!responses || responses.length === 0) && (
                <tr><td colSpan={9} className="p-8 text-center text-gray-500">No model responses found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}