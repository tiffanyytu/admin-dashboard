import Link from "next/link";
import { createLlmModel } from "../actions";

export default function NewModelPage() {
  return (
    <div className="min-h-screen bg-black text-white p-8 font-sans">
      <div className="max-w-lg mx-auto">
        <Link href="/manage/llm_models" className="text-gray-400 hover:text-white transition-colors mb-6 inline-block">
          &larr; Back to Models
        </Link>
        <h1 className="text-3xl font-bold text-teal-400 mb-8">Create New Model</h1>

        <form action={createLlmModel} className="bg-gray-900 border border-gray-800 p-6 rounded-lg flex flex-col gap-4 shadow-xl">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Model Name</label>
            <input type="text" name="name" required className="w-full bg-black border border-gray-700 rounded p-2 text-white" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Provider ID</label>
              <input type="number" name="llm_provider_id" className="w-full bg-black border border-gray-700 rounded p-2 text-white" />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Provider Model ID</label>
              <input type="text" name="provider_model_id" className="w-full bg-black border border-gray-700 rounded p-2 text-white" />
            </div>
          </div>

          <div className="flex items-center gap-2 mt-2">
            <input type="checkbox" name="is_temperature_supported" id="tempSupport" className="w-4 h-4" />
            <label htmlFor="tempSupport" className="text-sm text-gray-300">Supports Temperature?</label>
          </div>

          <button type="submit" className="bg-green-600 hover:bg-green-500 text-white font-bold py-3 rounded mt-4 transition-colors">
            Save Model
          </button>
        </form>
      </div>
    </div>
  );
}