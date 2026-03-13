import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { updateAllowedDomain } from "../actions";
import { notFound } from "next/navigation";

export default async function EditAllowedDomainPage({ params }: { params: Promise<{ id: string }> }) {
  const supabase = await createClient();
  const { id } = await params;

  const { data: domainRecord, error } = await supabase
    .from("allowed_signup_domains")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !domainRecord) return notFound();

  return (
    <div className="min-h-screen bg-black text-white p-8 font-sans">
      <div className="max-w-lg mx-auto">
        <Link href="/manage/allowed_signup_domains" className="text-gray-400 hover:text-white transition-colors mb-6 inline-block">
          &larr; Back to Domains
        </Link>
        <h1 className="text-3xl font-bold text-cyan-400 mb-8">Edit Allowed Domain</h1>

        <form action={updateAllowedDomain} className="bg-gray-900 border border-gray-800 p-6 rounded-lg flex flex-col gap-4 shadow-xl">
          <input type="hidden" name="id" value={domainRecord.id} />

          <div>
            <label className="block text-sm text-gray-400 mb-1">Apex Domain</label>
            <input type="text" name="apex_domain" defaultValue={domainRecord.apex_domain || ""} required className="w-full bg-black border border-gray-700 rounded p-2 text-white" />
          </div>

          <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded mt-4 transition-colors">
            Update Domain
          </button>
        </form>
      </div>
    </div>
  );
}