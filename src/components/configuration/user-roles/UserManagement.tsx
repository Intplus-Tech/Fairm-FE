

import UserTable from "./userTable";

export default function UserManagement({ onInvite }: { onInvite: () => void }) {
  return (
    <div className="rounded-lg border bg-white p-4 space-y-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <input
          placeholder="Search by name or role"
          className="w-full md:w-72 rounded-md border px-3 py-2 text-sm"
        />

        <div className="flex gap-2">
          <button className="rounded-md border px-4 py-2 text-sm">
            Export Users
          </button>
          <button
            onClick={onInvite}
            className="rounded-md bg-primary px-4 py-2 text-sm text-white"
          >
            + Invite New User
          </button>
        </div>
      </div>

     <UserTable/>
    </div>
  );
}
