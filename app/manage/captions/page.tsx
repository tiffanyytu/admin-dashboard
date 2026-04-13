import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import SortableTable from "./SortableTable"; // Adjust path if you placed this elsewhere!

export default async function ManageCaptions() {
    const supabase = await createClient();

    // 1. Fetch captions, images, AND the votes associated with each caption
    const { data: rawCaptions, error } = await supabase
        .from("captions")
        .select("*, images(url), caption_votes(vote_value)");

    if (error) {
        console.error("Error fetching captions:", error);
    }

    // 2. Calculate Upvotes, Downvotes, and Net Score for each row
    const enrichedCaptions = (rawCaptions || []).map((caption) => {
        const votes = caption.caption_votes || [];

        // Count the 1s and -1s based on the logic we set up in Week 11
        const upvotes = votes.filter((v: any) => v.vote_value === 1).length;
        const downvotes = votes.filter((v: any) => v.vote_value === -1).length;
        const net_score = upvotes - downvotes;

        return {
            id: caption.id,
            content: caption.content,
            images: caption.images,
            upvotes,
            downvotes,
            net_score
        };
    });

    return (
        <div className="min-h-screen bg-black text-white p-8 font-sans">
            <div className="max-w-7xl mx-auto">

                {/* Navigation / Header */}
                <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-end">
                    <div>
                        <Link href="/" className="text-gray-400 hover:text-white transition-colors mb-4 inline-block">
                            &larr; Back to Dashboard
                        </Link>
                        <h1 className="text-3xl font-bold text-purple-400">Caption Performance</h1>
                        <p className="text-gray-400 mt-2">
                            Review AI-generated captions and click column headers to sort by user ratings.
                        </p>
                    </div>

                    {/* Quick Stat Summary Bubble */}
                    <div className="mt-4 md:mt-0 bg-gray-900 border border-gray-800 px-4 py-2 rounded-lg text-sm text-gray-400">
                        Tracking <span className="text-white font-bold">{enrichedCaptions.length}</span> total captions
                    </div>
                </div>

                {/* Render the interactive Client Component table */}
                <SortableTable initialData={enrichedCaptions} />

            </div>
        </div>
    );
}