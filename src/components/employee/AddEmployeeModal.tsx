"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AddEmployeeModal({
  onClose,
}: {
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      {/* Modal container */}
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-lg flex flex-col max-h-[90vh]">

        {/* Header */}
        <div className="flex items-start justify-between px-6 py-4 border-b">
          <div>
            <h2 className="text-xl font-semibold">
              Create New Farm Employee
            </h2>
            <p className="text-sm text-muted-foreground">
              Set up workers and their roles for your farm.
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 text-lg"
          >
            ✕
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">

          {/* Basic Information */}
          <section className="space-y-4">
            <h3 className="font-semibold text-sm">Basic Information</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label>First Name</Label>
                <Input placeholder="John" />
              </div>

              <div className="space-y-1">
                <Label>Last Name</Label>
                <Input placeholder="Doe" />
              </div>

              <div className="space-y-1">
                <Label>Email</Label>
                <Input type="email" placeholder="john@farm.com" />
              </div>

              <div className="space-y-1">
                <Label>Phone Number</Label>
                <Input placeholder="080xxxxxxxx" />
              </div>

              <div className="space-y-1">
                <Label>Date Joined</Label>
                <Input type="date" />
              </div>

              <div className="space-y-1">
                <Label>Age</Label>
                <Input type="number" placeholder="35" />
              </div>
            </div>
          </section>

          {/* Role Information */}
          <section className="space-y-4">
            <h3 className="font-semibold text-sm">Role Information</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label>Department</Label>
                <Input placeholder="Management" />
              </div>

              <div className="space-y-1">
                <Label>Position</Label>
                <Input placeholder="Supervisor" />
              </div>

              <div className="space-y-1">
                <Label>Salary</Label>
                <Input placeholder="₦120,000" />
              </div>

              <div className="space-y-1">
                <Label>Employee ID</Label>
                <Input disabled value="Auto-generated" />
              </div>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button className="bg-[#5B5AF7] hover:bg-[#4a49e6]">
            Add Employee
          </Button>
        </div>
      </div>
    </div>
  );
}
