import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { deleteImage } from "./actions";

export default async function ManageImages() {
  const supabase = await createClient();

  const { data: images, error } = await supabase
    .from("images")
    .select("*")
    .order("id", { ascending: false }); // Newest images at the top!

  if (error) console.error("Error fetching images:", error);

  return (
    <div className="min-h-screen bg-black text-white p-8 font-sans">
      <div className="max-w-7xl mx-auto">

        {/* Navigation / Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <Link href="/" className="text-gray-400 hover:text-white transition-colors mb-4 inline-block">
              &larr; Back to Dashboard
            </Link>
            <h1 className="text-3xl font-bold text-green-400">Manage Images</h1>
            <p className="text-gray-400 mt-2">Audit and manage uploaded images.</p>
          </div>
          <Link href="/manage/images/new" className="bg-green-600 hover:bg-green-500 px-4 py-2 rounded font-bold transition-colors text-white">
            + Upload New Image
          </Link>
        </div>

        {/* Data Table */}
        <div className="bg-gray-900 border border-gray-800 rounded-lg shadow-xl overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-gray-950 border-b border-gray-800 text-gray-400 text-sm">
                <th className="p-4 font-semibold w-24">Preview</th>
                <th className="p-4 font-semibold">Image ID</th>
                <th className="p-4 font-semibold">Visibility</th>
                <th className="p-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {images?.map((image) => (
                <tr key={image.id} className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors">
                  <td className="p-4">
                    {image.url ? (
                      <div className="w-16 h-16 rounded bg-black/50 overflow-hidden border border-gray-700">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={image.url} alt="Uploaded content" className="w-full h-full object-cover" />
                      </div>
                    ) : (
                      <div className="w-16 h-16 rounded bg-gray-800 flex items-center justify-center text-xs text-gray-500 border border-gray-700">N/A</div>
                    )}
                  </td>
                  <td className="p-4 font-mono text-xs text-gray-400">{image.id}</td>
                  <td className="p-4">
                    {image.is_public ? (
                      <span className="bg-green-900/50 text-green-400 border border-green-700/50 px-3 py-1 rounded-full text-xs font-bold tracking-wide">PUBLIC</span>
                    ) : (
                      <span className="bg-gray-800 text-gray-400 border border-gray-700 px-3 py-1 rounded-full text-xs font-bold tracking-wide">PRIVATE</span>
                    )}
                  </td>
                  <td className="p-4 flex justify-end gap-4 items-center h-[96px]">
                    <Link href={`/manage/images/${image.id}`} className="text-blue-400 hover:text-blue-300 text-sm font-bold">
                      Edit
                    </Link>
                    <form action={deleteImage}>
                      <input type="hidden" name="id" value={image.id} />
                      <input type="hidden" name="url" value={image.url || ""} />
                      <button type="submit" className="text-red-500 hover:text-red-400 text-sm font-bold">
                        Delete
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
              {(!images || images.length === 0) && (
                <tr><td colSpan={4} className="p-8 text-center text-gray-500">No images found.</td></tr>
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}