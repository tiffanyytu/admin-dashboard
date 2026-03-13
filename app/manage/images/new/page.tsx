import Link from "next/link";
import { uploadImage } from "../actions";

export default function UploadImagePage() {
  return (
    <div className="min-h-screen bg-black text-white p-8 font-sans">
      <div className="max-w-lg mx-auto">
        <Link href="/manage/images" className="text-gray-400 hover:text-white transition-colors mb-6 inline-block">
          &larr; Back to Images
        </Link>
        <h1 className="text-3xl font-bold text-green-400 mb-8">Upload New Image</h1>

        <form action={uploadImage} className="bg-gray-900 border border-gray-800 p-6 rounded-lg flex flex-col gap-6 shadow-xl">

          <div>
            <label className="block text-sm text-gray-400 mb-2">Select Image File</label>
            <input
              type="file"
              name="file"
              accept="image/*"
              required
              className="w-full bg-black border border-gray-700 rounded p-2 text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-900 file:text-green-400 hover:file:bg-green-800 cursor-pointer"
            />
          </div>

          <div className="flex items-center gap-2 border-t border-gray-800 pt-4">
            <input type="checkbox" name="is_public" id="isPublic" className="w-5 h-5 accent-green-500" defaultChecked />
            <label htmlFor="isPublic" className="text-sm font-bold text-gray-200">Make Image Public?</label>
          </div>

          <button type="submit" className="bg-green-600 hover:bg-green-500 text-white font-bold py-3 rounded transition-colors mt-2">
            Upload Image
          </button>
        </form>
      </div>
    </div>
  );
}