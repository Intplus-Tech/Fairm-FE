"use client";

import { X, ChevronDown } from "lucide-react";
import { useState } from "react";

interface CreateRoleModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

type Permission = "None" | "View" | "Edit";

const MODULES = [
  "Threshold Config",
  "Financial/Sales",
  "Employee Management",
  "Daily Farm Logs",
  "Inventory/Stock",
  "Uniformity (Pullets)",
  "Daily Report Entry",
];

export default function CreateRoleModal({
  onClose,
  onSuccess,
}: CreateRoleModalProps) {
  const [roleName, setRoleName] = useState("");
  const [permissions, setPermissions] = useState<Record<string, Permission>>(
    () =>
      Object.fromEntries(
        MODULES.map((module) => [module, "View"]),
      ) as Record<string, Permission>,
  );

  const updatePermission = (module: string, value: Permission) => {
    setPermissions((prev) => ({
      ...prev,
      [module]: value,
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="relative w-full max-w-3xl rounded-xl bg-white shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-4">
          <h4 className="text-lg font-semibold">
            Create New Role & Permission
          </h4>
          <button
            onClick={onClose}
            className="rounded-md p-1 text-muted-foreground hover:bg-muted"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-6 px-6 py-5">
          {/* Role Name */}
          <div className="space-y-1">
            <label className="text-sm font-medium">Role Name</label>
            <input
              value={roleName}
              onChange={(e) => setRoleName(e.target.value)}
              placeholder="Manager"
              className="w-full rounded-lg border px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Permission Config */}
          <div className="space-y-3">
            <h5 className="text-sm font-semibold">
              Permission Configuration
            </h5>

            {/* Table Header */}
            <div className="grid grid-cols-2 gap-4 border-b pb-2 text-sm font-medium text-muted-foreground">
              <span>Feature / Module</span>
              <span>Permission</span>
            </div>

            {/* Permissions */}
            <div className="space-y-3">
              {MODULES.map((module) => (
                <div
                  key={module}
                  className="grid grid-cols-2 items-center gap-4"
                >
                  <span className="text-sm">{module}</span>

                  <div className="relative">
                    <select
                      value={permissions[module]}
                      onChange={(e) =>
                        updatePermission(
                          module,
                          e.target.value as Permission,
                        )
                      }
                      className="w-full appearance-none rounded-lg border px-4 py-2 pr-9 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="None">None</option>
                      <option value="View">View</option>
                      <option value="Edit">Edit</option>
                    </select>
                    <ChevronDown
                      size={16}
                      className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col-reverse gap-3 border-t px-6 py-4 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border px-5 py-2 text-sm hover:bg-muted"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onSuccess}
            className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-primary/90"
          >
            Create Role
          </button>
        </div>
      </div>
    </div>
  );
}
