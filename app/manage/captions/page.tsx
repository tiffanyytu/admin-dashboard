import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

export default async function ManageCaptions() {
    const supabase = await createClient();

    // Fetch all captions AND join the associated image URL for context
    const { data: captions, error } = await supabase
        .from("captions")
        .select("*, images(url)");

    if (error) {
        console.error("Error fetching captions:", error);
    }

    return (
        <div className="min-h-screen bg-black text-white p-8 font-sans">
            <div className="max-w-7xl mx-auto">

                {/* Navigation / Header */}
                <div className="mb-8">
                    <Link href="/" className="text-gray-400 hover:text-white transition-colors mb-4 inline-block">
                        &larr; Back to Dashboard
                    </Link>
                    <h1 className="text-3xl font-bold text-purple-400">Manage Captions</h1>
                    <p className="text-gray-400 mt-2">Review AI-generated captions and their associated images. This data is Read-Only.</p>
                </div>

                {/* Data Table */}
                <div className="bg-gray-900 border border-gray-800 rounded-lg shadow-xl overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[800px]">
                        <thead>
                        <tr className="bg-gray-950 border-b border-gray-800 text-gray-400 text-sm">
                            <th className="p-4 font-semibold w-24">Context</th>
                            <th className="p-4 font-semibold">Caption Text</th>
                            <th className="p-4 font-semibold">Caption ID</th>
                        </tr>
                        </thead>
                        <tbody>
                        {captions?.map((caption) => (
                            <tr key={caption.id} className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors">

                                {/* Image Context Column */}
                                <td className="p-4">
                                    {caption.images?.url ? (
                                        <div className="w-16 h-16 rounded bg-black/50 overflow-hidden border border-gray-700">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img
                                                src={caption.images.url}
                                                alt="Context for caption"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    ) : (
                                        <div className="w-16 h-16 rounded bg-gray-800 flex items-center justify-center text-xs text-gray-500 border border-gray-700 text-center p-1">
                                            No Image
                                        </div>
                                    )}
                                </td>

                                {/* Caption Text Column */}
                                <td className="p-4 font-medium text-gray-200 max-w-md">
                                    &quot;{caption.content}&quot;
                                </td>

                                {/* ID Column */}
                                <td className="p-4 font-mono text-xs text-gray-500">
                                    {caption.id}
                                </td>

                            </tr>
                        ))}

                        {(!captions || captions.length === 0) && (
                            <tr>
                                <td colSpan={3} className="p-8 text-center text-gray-500">
                                    No captions found in the database.
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    );
}