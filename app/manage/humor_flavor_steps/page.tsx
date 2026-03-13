import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

export default async function ViewHumorFlavorSteps() {
  const supabase = await createClient();

  // Fetch steps, ordered logically by the flavor they belong to, then their sequence step
  const { data: steps, error } = await supabase
    .from("humor_flavor_steps")
    .select("*")
    .order("humor_flavor_id", { ascending: true })
    .order("order_by", { ascending: true });

  if (error) console.error("Error fetching humor flavor steps:", error);

  return (
    <div className="min-h-screen bg-black text-white p-8 font-sans">
      <div className="max-w-7xl mx-auto">

        <div className="flex justify-between items-center mb-8">
          <div>
            <Link href="/" className="text-gray-400 hover:text-white transition-colors mb-4 inline-block">
              &larr; Back to Dashboard
            </Link>
            <h1 className="text-3xl font-bold text-violet-500">View Humor Flavor Steps</h1>
            <p className="text-gray-400 mt-2">Review the LLM prompt chains. This data is Read-Only.</p>
          </div>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-lg shadow-xl overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1200px]">
            <thead>
              <tr className="bg-gray-950 border-b border-gray-800 text-gray-400 text-sm">
                <th className="p-4">ID</th>
                <th className="p-4">Flavor ID</th>
                <th className="p-4">Order</th>
                <th className="p-4">Model ID</th>
                <th className="p-4">Temp</th>
                <th className="p-4">System Prompt</th>
                <th className="p-4">User Prompt</th>
                <th className="p-4">Description</th>
              </tr>
            </thead>
            <tbody>
              {steps?.map((step) => (
                <tr key={step.id} className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors">
                  <td className="p-4 font-mono text-xs text-gray-500">{step.id}</td>
                  <td className="p-4 font-bold text-violet-400">{step.humor_flavor_id}</td>
                  <td className="p-4 font-mono text-gray-300">Step {step.order_by}</td>
                  <td className="p-4 text-sm text-gray-400">{step.llm_model_id}</td>
                  <td className="p-4 text-sm text-gray-400">{step.llm_temperature}</td>

                  {/* Truncated Prompts with hover titles */}
                  <td className="p-4 text-sm text-gray-300 truncate max-w-[200px]" title={step.llm_system_prompt}>
                    {step.llm_system_prompt || <span className="text-gray-600 italic">None</span>}
                  </td>
                  <td className="p-4 text-sm text-gray-300 truncate max-w-[200px]" title={step.llm_user_prompt}>
                    {step.llm_user_prompt || <span className="text-gray-600 italic">None</span>}
                  </td>

                  <td className="p-4 text-sm text-gray-400 truncate max-w-[150px]" title={step.description}>
                    {step.description || <span className="text-gray-600 italic">N/A</span>}
                  </td>
                </tr>
              ))}
              {(!steps || steps.length === 0) && (
                <tr><td colSpan={8} className="p-8 text-center text-gray-500">No flavor steps found.</td></tr>
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}