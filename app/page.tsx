import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

export default async function AdminDashboard() {
  const supabase = await createClient();

  // 1. Fetch our statistics efficiently!
  // 'head: true' tells Supabase to just give us the count, not the actual rows, which makes it lightning fast.
  const { count: userCount } = await supabase.from("profiles").select("*", { count: "exact", head: true });
  const { count: imageCount } = await supabase.from("images").select("*", { count: "exact", head: true });
  const { count: captionCount } = await supabase.from("captions").select("*", { count: "exact", head: true });
  const { count: voteCount } = await supabase.from("caption_votes").select("*", { count: "exact", head: true });

  return (
      <div className="min-h-screen bg-black text-white p-8 font-sans">
        <div className="max-w-6xl mx-auto">

          {/* --- HEADER --- */}
          <header className="flex justify-between items-center mb-10 pb-6 border-b border-gray-800">
            <h1 className="text-3xl font-bold text-blue-400">Crackd Admin Dashboard ⚙️</h1>
          </header>

          {/* --- STATISTICS SECTION --- */}
          <h2 className="text-xl font-semibold mb-6 text-gray-300">Platform Analytics</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <StatCard title="Total Users" value={userCount || 0} icon="👤" color="border-blue-500 bg-blue-900/20" />
            <StatCard title="Images Uploaded" value={imageCount || 0} icon="🖼️" color="border-green-500 bg-green-900/20" />
            <StatCard title="Captions Generated" value={captionCount || 0} icon="💬" color="border-purple-500 bg-purple-900/20" />
            <StatCard title="Votes Cast" value={voteCount || 0} icon="⚖️" color="border-orange-500 bg-orange-900/20" />
          </div>

          {/* --- DATA MANAGEMENT NAVIGATION --- */}
          <h2 className="text-xl font-semibold mb-6 text-gray-300">Data Management</h2>
          <div className="flex flex-col md:flex-row gap-4">
            {/* We will build these actual pages next! */}
            <a href="/manage/profiles" className="flex-1 p-6 bg-gray-900 border border-gray-700 rounded-lg hover:bg-gray-800 hover:border-blue-400 transition-all group">
              <h3 className="text-lg font-bold text-white group-hover:text-blue-400">Profiles &rarr;</h3>
              <p className="text-sm text-gray-400 mt-2">View and manage user accounts</p>
            </a>

            <a href="/manage/images" className="flex-1 p-6 bg-gray-900 border border-gray-700 rounded-lg hover:bg-gray-800 hover:border-green-400 transition-all group">
              <h3 className="text-lg font-bold text-white group-hover:text-green-400">Images &rarr;</h3>
              <p className="text-sm text-gray-400 mt-2">Audit uploaded pipeline images</p>
            </a>

            <a href="/manage/captions" className="flex-1 p-6 bg-gray-900 border border-gray-700 rounded-lg hover:bg-gray-800 hover:border-purple-400 transition-all group">
              <h3 className="text-lg font-bold text-white group-hover:text-purple-400">Captions &rarr;</h3>
              <p className="text-sm text-gray-400 mt-2">Review AI-generated captions</p>
            </a>
          </div>

          {/* --- SYSTEM CONFIGURATION (Week 7) --- */}
                  <h2 className="text-xl font-semibold mb-6 mt-12 text-gray-300">System Configuration</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

                     <Link href="/manage/humor_flavors" className="p-4 bg-gray-900 border border-gray-800 rounded-lg hover:bg-gray-800 hover:border-indigo-500 transition-all group">
                       <h3 className="text-md font-bold text-gray-300 group-hover:text-indigo-500">Humor Flavors</h3>
                     </Link>

                     <Link href="/manage/humor_flavor_steps" className="p-4 bg-gray-900 border border-gray-800 rounded-lg hover:bg-gray-800 hover:border-violet-500 transition-all group">
                       <h3 className="text-md font-bold text-gray-300 group-hover:text-violet-500">Flavor Steps</h3>
                     </Link>

                     <Link href="/manage/humor_flavor_mix" className="p-4 bg-gray-900 border border-gray-800 rounded-lg hover:bg-gray-800 hover:border-emerald-500 transition-all group">
                       <h3 className="text-md font-bold text-gray-300 group-hover:text-emerald-500">Humor Mix</h3>
                     </Link>

                     <Link href="/manage/terms" className="p-4 bg-gray-900 border border-gray-800 rounded-lg hover:bg-gray-800 hover:border-yellow-500 transition-all group">
                       <h3 className="text-md font-bold text-gray-300 group-hover:text-yellow-500">Terms</h3>
                     </Link>

                     <Link href="/manage/caption_requests" className="p-4 bg-gray-900 border border-gray-800 rounded-lg hover:bg-gray-800 hover:border-amber-500 transition-all group">
                       <h3 className="text-md font-bold text-gray-300 group-hover:text-amber-500">Caption Requests</h3>
                     </Link>

                     <Link href="/manage/caption_examples" className="p-4 bg-gray-900 border border-gray-800 rounded-lg hover:bg-gray-800 hover:border-pink-500 transition-all group">
                       <h3 className="text-md font-bold text-gray-300 group-hover:text-pink-500">Caption Examples</h3>
                     </Link>

                     <Link href="/manage/llm_models" className="p-4 bg-gray-900 border border-gray-800 rounded-lg hover:bg-gray-800 hover:border-teal-400 transition-all group">
                       <h3 className="text-md font-bold text-gray-300 group-hover:text-teal-400">LLM Models</h3>
                     </Link>

                     <Link href="/manage/llm_providers" className="p-4 bg-gray-900 border border-gray-800 rounded-lg hover:bg-gray-800 hover:border-blue-500 transition-all group">
                       <h3 className="text-md font-bold text-gray-300 group-hover:text-blue-500">LLM Providers</h3>
                     </Link>

                     <Link href="/manage/llm_prompt_chains" className="p-4 bg-gray-900 border border-gray-800 rounded-lg hover:bg-gray-800 hover:border-sky-400 transition-all group">
                       <h3 className="text-md font-bold text-gray-300 group-hover:text-sky-400">Prompt Chains</h3>
                     </Link>

                     <Link href="/manage/llm_model_responses" className="p-4 bg-gray-900 border border-gray-800 rounded-lg hover:bg-gray-800 hover:border-rose-500 transition-all group">
                       <h3 className="text-md font-bold text-gray-300 group-hover:text-rose-500">Model Responses</h3>
                     </Link>

                     <Link href="/manage/allowed_signup_domains" className="p-4 bg-gray-900 border border-gray-800 rounded-lg hover:bg-gray-800 hover:border-cyan-400 transition-all group">
                       <h3 className="text-md font-bold text-gray-300 group-hover:text-cyan-400">Allowed Domains</h3>
                     </Link>

                     <Link href="/manage/whitelist_email_addresses" className="p-4 bg-gray-900 border border-gray-800 rounded-lg hover:bg-gray-800 hover:border-orange-500 transition-all group">
                        <h3 className="text-md font-bold text-gray-300 group-hover:text-orange-500">Whitelisted Emails</h3>
                     </Link>

                  </div>

        </div>
      </div>
  );
}

// A reusable mini-component for the stat cards to keep our code clean!
function StatCard({ title, value, icon, color }: { title: string, value: number, icon: string, color: string }) {
  return (
      <div className={`p-6 rounded-lg border-l-4 shadow-lg flex flex-col ${color}`}>
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-400 font-medium">{title}</span>
          <span className="text-2xl">{icon}</span>
        </div>
        <span className="text-4xl font-bold">{value}</span>
      </div>
  );
}