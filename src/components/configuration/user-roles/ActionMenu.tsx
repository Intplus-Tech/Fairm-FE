import { useState } from "react";
import EditUserModal from "./EditUserModal";
import { toast } from "sonner";

export default function ActionMenu() {
  const [openEdit, setOpenEdit] = useState(false);

  return (
    <>
      <div className="relative">
        <button className="px-2">⋮</button>
        <div className="absolute right-0 mt-2 w-40 rounded-md border bg-white shadow">
          <button
            onClick={() => setOpenEdit(true)}
            className="block w-full px-4 py-2 text-left text-sm hover:bg-muted"
          >
            Edit
          </button>
          <button className="block w-full px-4 py-2 text-left text-sm hover:bg-muted">
            Deactivate
          </button>
          <button className="block w-full px-4 py-2 text-left text-sm hover:bg-muted">
            Toggle
          </button>
        </div>
      </div>

      {openEdit && (
        <EditUserModal
          onClose={() => setOpenEdit(false)}
          onSuccess={() => {
            toast.success("User updated");
            setOpenEdit(false);
          }}
        />
      )}
    </>
  );
}
