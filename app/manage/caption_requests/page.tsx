import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

export default async function ViewCaptionRequests() {
  const supabase = await createClient();

  // Ordering by descending ID so the newest requests are at the top!
  const { data: requests, error } = await supabase
    .from("caption_requests")
    .select("*")
    .order("id", { ascending: false });

  if (error) console.error("Error fetching caption requests:", error);

  return (
    <div className="min-h-screen bg-black text-white p-8 font-sans">
      <div className="max-w-4xl mx-auto">

        <div className="flex justify-between items-center mb-8">
          <div>
            <Link href="/" className="text-gray-400 hover:text-white transition-colors mb-4 inline-block">
              &larr; Back to Dashboard
            </Link>
            <h1 className="text-3xl font-bold text-amber-500">View Caption Requests</h1>
            <p className="text-gray-400 mt-2">Log of all image-to-caption generation requests.</p>
          </div>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-lg shadow-xl overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-950 border-b border-gray-800 text-gray-400 text-sm">
                <th className="p-4">ID</th>
                <th className="p-4">Profile ID</th>
                <th className="p-4 w-full">Image ID</th>
              </tr>
            </thead>
            <tbody>
              {requests?.map((req) => (
                <tr key={req.id} className="border-b border-gray-800 hover:bg-gray-800/50">
                  <td className="p-4 font-mono text-xs text-amber-400">{req.id}</td>
                  <td className="p-4 font-mono text-xs text-gray-400">{req.profile_id}</td>
                  <td className="p-4 font-mono text-xs text-gray-400">{req.image_id}</td>
                </tr>
              ))}
              {(!requests || requests.length === 0) && (
                <tr><td colSpan={3} className="p-8 text-center text-gray-500">No caption requests found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}