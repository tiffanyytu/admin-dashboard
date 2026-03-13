import Link from "next/link";
import { createTerm } from "../actions";

export default function NewTermPage() {
  return (
    <div className="min-h-screen bg-black text-white p-8 font-sans">
      <div className="max-w-2xl mx-auto">

        <Link href="/manage/terms" className="text-gray-400 hover:text-white transition-colors mb-6 inline-block">
          &larr; Back to Terms
        </Link>
        <h1 className="text-3xl font-bold text-blue-400 mb-8">Create New Term</h1>

        <form action={createTerm} className="bg-gray-900 border border-gray-800 p-6 rounded-lg flex flex-col gap-4 shadow-xl">

          <div>
            <label className="block text-sm text-gray-400 mb-1">Term</label>
            <input type="text" name="term" required className="w-full bg-black border border-gray-700 rounded p-2 text-white" />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Definition</label>
            <textarea name="definition" rows={3} className="w-full bg-black border border-gray-700 rounded p-2 text-white" />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Example</label>
            <textarea name="example" rows={2} className="w-full bg-black border border-gray-700 rounded p-2 text-white" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Priority (Number)</label>
              <input type="number" name="priority" className="w-full bg-black border border-gray-700 rounded p-2 text-white" />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Term Type ID</label>
              <input type="number" name="term_type_id" className="w-full bg-black border border-gray-700 rounded p-2 text-white" />
            </div>
          </div>

          <button type="submit" className="bg-green-600 hover:bg-green-500 text-white font-bold py-3 rounded mt-4 transition-colors">
            Save Term
          </button>
        </form>

      </div>
    </div>
  );
}