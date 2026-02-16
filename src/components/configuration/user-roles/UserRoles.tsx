"use client";

import { useState } from "react";
import RolesTable from "./RolesTable";
import UserManagement from "./UserManagement";
import CreateRoleModal from "./CreateRoleModal";
import InviteUserModal from "./InviteUserModal";
import { toast } from "sonner";

export default function UserRoles() {
  const [openCreateRole, setOpenCreateRole] = useState(false);
  const [openInviteUser, setOpenInviteUser] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">User Roles and Access</h3>
          <p className="text-sm text-muted-foreground">
            Manage user permissions and role-based access control.
          </p>
        </div>

        <button
          onClick={() => setOpenCreateRole(true)}
          className="rounded-md bg-primary px-4 py-2 text-sm text-white hover:bg-primary/90"
        >
          + Create Role
        </button>
      </div>

      {/* Roles Table */}
      <RolesTable />

      {/* User Management */}
      <UserManagement onInvite={() => setOpenInviteUser(true)} />

      {/* Modals */}
      {openCreateRole && (
        <CreateRoleModal
          onClose={() => setOpenCreateRole(false)}
          onSuccess={() => {
            toast.success("New role successfully created");
            setOpenCreateRole(false);
          }}
        />
      )}

      {openInviteUser && (
        <InviteUserModal
          onClose={() => setOpenInviteUser(false)}
          onSuccess={() => {
            toast.success("Invitation sent");
            setOpenInviteUser(false);
          }}
        />
      )}
    </div>
  );
}
