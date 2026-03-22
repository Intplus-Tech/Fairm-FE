"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { departmentService } from "../../../services/department.service";
import { positionService } from "../../../services/position.service";
import { EmployeeRequest } from "@/types/employee";
import { DepartmentResponse } from "@/types/department";
import { PositionResponse } from "@/types/position";
import { employeeService } from "../../../services/employee.service";
import { toast } from "react-hot-toast";

export default function AddEmployeeModal({
  onClose,
}: {
  onClose: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState<EmployeeRequest>({
    firstName: "",
    lastName: "",
    email: "",
    age: 0,
    departmentId: "",
    positionId: "",
    dob: new Date(),
    phoneNumber: 0,
    salary: 0,
  });

  const [departments, setDepartments] = useState<DepartmentResponse[]>([]);
  const [positions, setPositions] = useState<PositionResponse[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [deptRes, posRes] = await Promise.all([
          departmentService.list(),
          positionService.list(),
        ]);

        setDepartments(deptRes);
        setPositions(posRes);
      } catch (err) {
        const message =
          err instanceof Error
            ? err.message
            : "Failed to load departments/positions";

        setError(message);
      }
    };

    fetchData();
  }, []);

  const handleChange = (
    field: keyof EmployeeRequest,
    value: string | number | Date
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: field === "dob" ? new Date(value as string) : value,
    }));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError(null);

      await employeeService.create(form);

      toast.success("Employee added successfully 🎉", {
        duration: 3000,
      });

      setTimeout(() => {
        onClose();
      }, 1200);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to create employee";

      toast.error(message, {
        duration: 4000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      {/* Modal container */}
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-lg flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-start justify-between px-6 py-4 border-b">
          <div>
            <h2 className="text-xl font-semibold">Create New Farm Employee</h2>
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
                <Input
                  placeholder="John"
                  value={form.firstName}
                  onChange={(e) => handleChange("firstName", e.target.value)}
                />
              </div>

              <div className="space-y-1">
                <Label>Last Name</Label>
                <Input
                  placeholder="Doe"
                  value={form.lastName}
                  onChange={(e) => handleChange("lastName", e.target.value)}
                />
              </div>

              <div className="space-y-1">
                <Label>Email</Label>
                <Input
                  type="email"
                  placeholder="john@farm.com"
                  value={form.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                />
              </div>

              <div className="space-y-1">
                <Label>Phone Number</Label>
                <Input
                  placeholder="080xxxxxxxx"
                  value={form.phoneNumber}
                  onChange={(e) =>
                    handleChange("phoneNumber", Number(e.target.value))
                  }
                />
              </div>

              <div className="space-y-1">
                <Label>Age</Label>
                <Input
                  type="number"
                  placeholder="35"
                  value={form.age}
                  onChange={(e) => handleChange("age", Number(e.target.value))}
                />
              </div>
            </div>
          </section>

          {/* Role Information */}
          <section className="space-y-4">
            <h3 className="font-semibold text-sm">Role Information</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label>Department</Label>
                <select
                  className="w-full border rounded-md p-2"
                  value={form.departmentId}
                  onChange={(e) =>
                    handleChange("departmentId", e.target.value)
                  }
                >
                  <option value="">Select Department</option>
                  {departments.map((dept) => (
                    <option key={dept._id} value={dept._id}>
                      {dept.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <Label>Position</Label>
                <select
                  className="w-full border rounded-md p-2"
                  value={form.positionId}
                  onChange={(e) => handleChange("positionId", e.target.value)}
                >
                  <option value="">Select Position</option>
                  {positions.map((pos) => (
                    <option key={pos._id} value={pos._id}>
                      {pos.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <Label>Salary</Label>
                <Input
                  placeholder="₦120,000"
                  value={form.salary}
                  onChange={(e) =>
                    handleChange("salary", Number(e.target.value))
                  }
                />
              </div>

              <div className="space-y-1">
                <Label>Employee ID</Label>
                <Input disabled value="Auto-generated" />
              </div>
            </div>
          </section>
        </div>

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        {/* Footer */}
        <div className="px-6 py-4 border-t flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>

          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-[#5B5AF7] hover:bg-[#4a49e6]"
          >
            {loading ? "Creating..." : "Add Employee"}
          </Button>
        </div>
      </div>
    </div>
  );
}