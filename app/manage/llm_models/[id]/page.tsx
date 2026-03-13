import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { updateLlmModel } from "../actions";
import { notFound } from "next/navigation";

export default async function EditModelPage({ params }: { params: Promise<{ id: string }> }) {
  const supabase = await createClient();
  const { id } = await params;

  const { data: model, error } = await supabase
    .from("llm_models")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !model) return notFound();

  return (
    <div className="min-h-screen bg-black text-white p-8 font-sans">
      <div className="max-w-lg mx-auto">
        <Link href="/manage/llm_models" className="text-gray-400 hover:text-white transition-colors mb-6 inline-block">
          &larr; Back to Models
        </Link>
        <h1 className="text-3xl font-bold text-teal-400 mb-8">Edit Model: {model.name}</h1>

        <form action={updateLlmModel} className="bg-gray-900 border border-gray-800 p-6 rounded-lg flex flex-col gap-4 shadow-xl">
          <input type="hidden" name="id" value={model.id} />

          <div>
            <label className="block text-sm text-gray-400 mb-1">Model Name</label>
            <input type="text" name="name" defaultValue={model.name || ""} required className="w-full bg-black border border-gray-700 rounded p-2 text-white" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Provider ID</label>
              <input type="number" name="llm_provider_id" defaultValue={model.llm_provider_id ?? ""} className="w-full bg-black border border-gray-700 rounded p-2 text-white" />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Provider Model ID</label>
              <input type="text" name="provider_model_id" defaultValue={model.provider_model_id || ""} className="w-full bg-black border border-gray-700 rounded p-2 text-white" />
            </div>
          </div>

          <div className="flex items-center gap-2 mt-2">
            <input type="checkbox" name="is_temperature_supported" id="tempSupport" defaultChecked={model.is_temperature_supported} className="w-4 h-4" />
            <label htmlFor="tempSupport" className="text-sm text-gray-300">Supports Temperature?</label>
          </div>

          <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded mt-4 transition-colors">
            Update Model
          </button>
        </form>
      </div>
    </div>
  );
}