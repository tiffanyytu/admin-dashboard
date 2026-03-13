import Link from "next/link";
import { createCaptionExample } from "../actions";

export default function NewCaptionExamplePage() {
  return (
    <div className="min-h-screen bg-black text-white p-8 font-sans">
      <div className="max-w-2xl mx-auto">
        <Link href="/manage/caption_examples" className="text-gray-400 hover:text-white transition-colors mb-6 inline-block">
          &larr; Back to Examples
        </Link>
        <h1 className="text-3xl font-bold text-pink-500 mb-8">Create Caption Example</h1>

        <form action={createCaptionExample} className="bg-gray-900 border border-gray-800 p-6 rounded-lg flex flex-col gap-4 shadow-xl">

          <div>
            <label className="block text-sm text-gray-400 mb-1">Image Description</label>
            <textarea name="image_description" rows={3} required className="w-full bg-black border border-gray-700 rounded p-2 text-white" />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Caption</label>
            <textarea name="caption" rows={2} required className="w-full bg-black border border-gray-700 rounded p-2 text-white font-bold" />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Explanation</label>
            <textarea name="explanation" rows={3} className="w-full bg-black border border-gray-700 rounded p-2 text-white" />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Priority (Number)</label>
            <input type="number" name="priority" className="w-full bg-black border border-gray-700 rounded p-2 text-white" />
          </div>

          <button type="submit" className="bg-green-600 hover:bg-green-500 text-white font-bold py-3 rounded mt-4 transition-colors">
            Save Example
          </button>
        </form>
      </div>
    </div>
  );
}