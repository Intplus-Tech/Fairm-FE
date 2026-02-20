"use client";

import { useEffect, useRef, useState } from "react";
import EditUserModal from "./EditUserModal";
import { toast } from "sonner";

export default function ActionMenu() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <div ref={menuRef} className="relative inline-block">
        {/* Three dots */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setMenuOpen((prev) => !prev);
          }}
          className="px-2"
        >
          ⋮
        </button>

        {/* Dropdown menu */}
        {menuOpen && (
          <div className="absolute right-0 z-50 mt-2 w-40 rounded-md border bg-white shadow">
            <button
              onClick={() => {
                setOpenEdit(true);
                setMenuOpen(false);
              }}
              className="block w-full px-4 py-2 text-left text-sm hover:bg-muted"
            >
              Edit
            </button>

            <button
              onClick={() => setMenuOpen(false)}
              className="block w-full px-4 py-2 text-left text-sm hover:bg-muted"
            >
              Deactivate
            </button>

            <button
              onClick={() => setMenuOpen(false)}
              className="block w-full px-4 py-2 text-left text-sm hover:bg-muted"
            >
              Toggle
            </button>
          </div>
        )}
      </div>

      {/* Edit modal */}
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
