import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { deleteWhitelistEmail } from "./actions";

export default async function ManageWhitelistEmails() {
  const supabase = await createClient();

  const { data: emails, error } = await supabase
    .from("whitelist_email_addresses")
    .select("*")
    .order("id", { ascending: true });

  if (error) console.error("Error fetching whitelisted emails:", error);

  return (
    <div className="min-h-screen bg-black text-white p-8 font-sans">
      <div className="max-w-4xl mx-auto">

        <div className="flex justify-between items-center mb-8">
          <div>
            <Link href="/" className="text-gray-400 hover:text-white transition-colors mb-4 inline-block">
              &larr; Back to Dashboard
            </Link>
            <h1 className="text-3xl font-bold text-orange-500">Manage Whitelisted Emails</h1>
          </div>
          <Link href="/manage/whitelist_email_addresses/new" className="bg-orange-600 hover:bg-orange-500 px-4 py-2 rounded font-bold transition-colors">
            + Whitelist New Email
          </Link>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-lg shadow-xl overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-950 border-b border-gray-800 text-gray-400 text-sm">
                <th className="p-4">ID</th>
                <th className="p-4 w-full">Email Address</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {emails?.map((e) => (
                <tr key={e.id} className="border-b border-gray-800 hover:bg-gray-800/50">
                  <td className="p-4 font-mono text-xs text-gray-500">{e.id}</td>
                  <td className="p-4 font-bold text-gray-200">{e.email_address}</td>
                  <td className="p-4 flex justify-end gap-4 items-center">
                    <Link href={`/manage/whitelist_email_addresses/${e.id}`} className="text-blue-400 hover:text-blue-300 text-sm font-bold">
                      Edit
                    </Link>
                    <form action={deleteWhitelistEmail}>
                      <input type="hidden" name="id" value={e.id} />
                      <button type="submit" className="text-red-500 hover:text-red-400 text-sm font-bold">
                        Delete
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
              {(!emails || emails.length === 0) && (
                <tr><td colSpan={3} className="p-8 text-center text-gray-500">No whitelisted emails found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}