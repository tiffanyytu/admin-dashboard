import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { updateWhitelistEmail } from "../actions";
import { notFound } from "next/navigation";

export default async function EditWhitelistEmailPage({ params }: { params: Promise<{ id: string }> }) {
  const supabase = await createClient();
  const { id } = await params;

  const { data: emailRecord, error } = await supabase
    .from("whitelist_email_addresses")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !emailRecord) return notFound();

  return (
    <div className="min-h-screen bg-black text-white p-8 font-sans">
      <div className="max-w-lg mx-auto">
        <Link href="/manage/whitelist_email_addresses" className="text-gray-400 hover:text-white transition-colors mb-6 inline-block">
          &larr; Back to Whitelist
        </Link>
        <h1 className="text-3xl font-bold text-orange-500 mb-8">Edit Whitelisted Email</h1>

        <form action={updateWhitelistEmail} className="bg-gray-900 border border-gray-800 p-6 rounded-lg flex flex-col gap-4 shadow-xl">
          <input type="hidden" name="id" value={emailRecord.id} />

          <div>
            <label className="block text-sm text-gray-400 mb-1">Email Address</label>
            <input type="email" name="email_address" defaultValue={emailRecord.email_address || ""} required className="w-full bg-black border border-gray-700 rounded p-2 text-white" />
          </div>

          <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded mt-4 transition-colors">
            Update Email
          </button>
        </form>
      </div>
    </div>
  );
}