import { redirect } from "next/navigation";

export default function EntryOfficerHome() {
  redirect("/entry-officer/mortality");

    return (
    <div className="min-h-screen bg-gray-100 p-6 space-y-6">
      Entry Officer Page
    </div>
  )
}