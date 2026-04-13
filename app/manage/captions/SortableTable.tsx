"use client";

import { useState } from "react";

// Define the shape of our enriched data
type EnrichedCaption = {
    id: string;
    content: string;
    images?: { url: string } | null;
    upvotes: number;
    downvotes: number;
    net_score: number;
};

export default function SortableTable({ initialData }: { initialData: EnrichedCaption[] }) {
    // Default sort by net_score, highest first
    const [sortKey, setSortKey] = useState<keyof EnrichedCaption>("net_score");
    const [isDescending, setIsDescending] = useState(true);

    const handleSort = (key: keyof EnrichedCaption) => {
        if (sortKey === key) {
            // If clicking the same column, toggle direction
            setIsDescending(!isDescending);
        } else {
            // If clicking a new column, sort by it descending by default
            setSortKey(key);
            setIsDescending(true);
        }
    };

    // Sort the data based on current state
    const sortedData = [...initialData].sort((a, b) => {
        let aValue = a[sortKey];
        let bValue = b[sortKey];

        // Handle nulls safely
        if (aValue === undefined || aValue === null) aValue = "";
        if (bValue === undefined || bValue === null) bValue = "";

        if (aValue < bValue) return isDescending ? 1 : -1;
        if (aValue > bValue) return isDescending ? -1 : 1;
        return 0;
    });

    // Helper for rendering the sort arrow
    const renderSortArrow = (key: string) => {
        if (sortKey !== key) return " ↕";
        return isDescending ? " ↓" : " ↑";
    };

    return (
        <div className="bg-gray-900 border border-gray-800 rounded-lg shadow-xl overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                    <tr className="bg-gray-950 border-b border-gray-800 text-gray-400 text-sm select-none">
                        <th className="p-4 font-semibold w-24">Context</th>
                        <th
                            className="p-4 font-semibold cursor-pointer hover:text-white transition-colors"
                            onClick={() => handleSort("content")}
                        >
                            Caption Text{renderSortArrow("content")}
                        </th>
                        <th
                            className="p-4 font-semibold cursor-pointer hover:text-green-400 transition-colors text-center"
                            onClick={() => handleSort("upvotes")}
                        >
                            👍 Upvotes{renderSortArrow("upvotes")}
                        </th>
                        <th
                            className="p-4 font-semibold cursor-pointer hover:text-red-400 transition-colors text-center"
                            onClick={() => handleSort("downvotes")}
                        >
                            👎 Downvotes{renderSortArrow("downvotes")}
                        </th>
                        <th
                            className="p-4 font-semibold cursor-pointer hover:text-blue-400 transition-colors text-center"
                            onClick={() => handleSort("net_score")}
                        >
                            🔥 Net Score{renderSortArrow("net_score")}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {sortedData.map((caption) => (
                        <tr key={caption.id} className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors">
                            {/* Image Context Column */}
                            <td className="p-4">
                                {caption.images?.url ? (
                                    <div className="w-16 h-16 rounded bg-black/50 overflow-hidden border border-gray-700 shrink-0">
                                        <img
                                            src={caption.images.url}
                                            alt="Context"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                ) : (
                                    <div className="w-16 h-16 rounded bg-gray-800 flex items-center justify-center text-xs text-gray-500 border border-gray-700 text-center p-1 shrink-0">
                                        No Image
                                    </div>
                                )}
                            </td>

                            {/* Caption Text Column */}
                            <td className="p-4 font-medium text-gray-200 max-w-md">
                                &quot;{caption.content}&quot;
                            </td>

                            {/* Rating Columns */}
                            <td className="p-4 text-center font-mono text-green-400">
                                {caption.upvotes}
                            </td>
                            <td className="p-4 text-center font-mono text-red-400">
                                {caption.downvotes}
                            </td>
                            <td className="p-4 text-center font-mono font-bold text-blue-400 text-lg">
                                {caption.net_score}
                            </td>
                        </tr>
                    ))}

                    {sortedData.length === 0 && (
                        <tr>
                            <td colSpan={5} className="p-8 text-center text-gray-500">
                                No captions found in the database.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}