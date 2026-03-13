import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { updateHumorMix } from "../actions";
import { notFound } from "next/navigation";

export default async function EditHumorMixPage({ params }: { params: Promise<{ id: string }> }) {
  const supabase = await createClient();
  const { id } = await params;

  const { data: mix, error } = await supabase
    .from("humor_flavor_mix")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !mix) return notFound();

  return (
    <div className="min-h-screen bg-black text-white p-8 font-sans">
      <div className="max-w-lg mx-auto">
        <Link href="/manage/humor_flavor_mix" className="text-gray-400 hover:text-white transition-colors mb-6 inline-block">
          &larr; Back to Humor Mix
        </Link>
        <h1 className="text-3xl font-bold text-emerald-500 mb-8">Edit Humor Mix</h1>

        <form action={updateHumorMix} className="bg-gray-900 border border-gray-800 p-6 rounded-lg flex flex-col gap-4 shadow-xl">
          <input type="hidden" name="id" value={mix.id} />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Humor Flavor ID</label>
              <input type="number" name="humor_flavor_id" defaultValue={mix.humor_flavor_id ?? ""} required className="w-full bg-black border border-gray-700 rounded p-2 text-white" />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Caption Count</label>
              <input type="number" name="caption_count" defaultValue={mix.caption_count ?? ""} required className="w-full bg-black border border-gray-700 rounded p-2 text-white" />
            </div>
          </div>

          <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded mt-4 transition-colors">
            Update Mix
          </button>
        </form>
      </div>
    </div>
  );
}