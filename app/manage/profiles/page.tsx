import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

export default async function ManageProfiles() {
    const supabase = await createClient();

    // Fetch all user profiles from the database
    const { data: profiles, error } = await supabase
        .from("profiles")
        .select("*")
        .order("is_superadmin", { ascending: false }); // Puts superadmins at the top of the list!

    if (error) {
        console.error("Error fetching profiles:", error);
    }

    return (
        <div className="min-h-screen bg-black text-white p-8 font-sans">
            <div className="max-w-6xl mx-auto">

                {/* Navigation / Header */}
                <div className="mb-8">
                    {/* Replaced <a> with Next.js <Link> to fix the ESLint warning */}
                    <Link href="/" className="text-gray-400 hover:text-white transition-colors mb-4 inline-block">
                        &larr; Back to Dashboard
                    </Link>
                    <h1 className="text-3xl font-bold text-blue-400">Manage Profiles</h1>
                    <p className="text-gray-400 mt-2">View and audit registered user accounts.</p>
                </div>

                {/* Data Table */}
                <div className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden shadow-xl">
                    <table className="w-full text-left border-collapse">
                        <thead>
                        <tr className="bg-gray-950 border-b border-gray-800 text-gray-400 text-sm">
                            <th className="p-4 font-semibold">User ID</th>
                            <th className="p-4 font-semibold">Superadmin Status</th>
                            <th className="p-4 font-semibold text-right">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {profiles?.map((profile) => (
                            <tr key={profile.id} className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors">

                                {/* ID Column */}
                                <td className="p-4 font-mono text-sm text-gray-300">
                                    {profile.id}
                                </td>

                                {/* Status Column */}
                                <td className="p-4">
                                    {profile.is_superadmin ? (
                                        <span className="bg-blue-900/50 text-blue-400 border border-blue-700/50 px-3 py-1 rounded-full text-xs font-bold tracking-wide">
                        SUPERADMIN
                      </span>
                                    ) : (
                                        <span className="bg-gray-800 text-gray-400 border border-gray-700 px-3 py-1 rounded-full text-xs font-bold tracking-wide">
                        USER
                      </span>
                                    )}
                                </td>

                                {/* Actions Placeholder (Prep for Week 7) */}
                                <td className="p-4 text-right">
                                    <button className="text-sm text-gray-500 hover:text-white underline transition-colors cursor-not-allowed" title="Update/Delete coming in Week 7!">
                                        Edit
                                    </button>
                                </td>

                            </tr>
                        ))}

                        {(!profiles || profiles.length === 0) && (
                            <tr>
                                <td colSpan={3} className="p-8 text-center text-gray-500">
                                    No profiles found.
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