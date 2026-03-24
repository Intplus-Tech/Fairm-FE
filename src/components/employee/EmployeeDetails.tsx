"use client";

import { useState } from "react";
import { ToggleRight, ToggleLeft } from "lucide-react";
import { EmployeeResponse } from "@/types/employee";

export default function EmployeeDetails({
  employee,
}: {
  employee: EmployeeResponse;
}) {

  const [active, setActive] = useState(true);

  return (
    <div className="bg-[#F7F7FB] p-6 rounded-xl">

      <div className="flex items-center justify-between mb-4">

        <h3 className="font-semibold">
          Personnel Details
        </h3>

        <div className="flex items-center gap-2">

          <span className="text-sm">Active</span>

          <button
            onClick={() => setActive(!active)}
          >
            {active ? (
              <ToggleRight className="text-green-500" size={28} />
            ) : (
              <ToggleLeft className="text-gray-400" size={28} />
            )}
          </button>

        </div>

      </div>

      <div className="space-y-3 text-sm">

        <Detail
          label="Joined"
          value={new Date(employee.createdAt).toLocaleDateString(
            "en-US",
            { month: "long", year: "numeric" }
          )}
        />

        <Detail
          label="Contact Number"
          value={employee.phoneNumber}
        />

        <Detail
          label="Age"
          value={employee.age}
        />

        <Detail
          label="Salary"
          value={`₦${employee.salary.toLocaleString()}`}
        />

        <Detail
          label="Attendance / Month"
          value={`${employee.attendance}%`}
        />

      </div>

    </div>
  );
}

function Detail({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="flex justify-between border-b pb-2">

      <span className="text-muted-foreground">
        {label}
      </span>

      <span className="font-medium">
        {value}
      </span>

    </div>
  );
}