"use client";

interface CreateRoleModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

export default function CreateRoleModal({
  onClose,
  onSuccess,
}: CreateRoleModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded-lg bg-white p-6">
        <h4 className="mb-4 text-lg font-semibold">Create Role</h4>

        <input
          placeholder="Role name"
          className="mb-4 w-full rounded-md border px-3 py-2 text-sm"
        />

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onSuccess}
            className="rounded-md bg-primary px-4 py-2 text-sm text-white"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
