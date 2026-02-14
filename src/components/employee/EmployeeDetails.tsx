"use client";

import { useState } from "react";
import { ToggleRight, ToggleLeft } from "lucide-react";
import { Employee } from "./types";

export default function EmployeeDetails({ employee }: { employee: Employee }) {
  const [isActive, setIsActive] = useState(true);

  return (
    <div className="bg-white p-6 space-y-3 border-t">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Personnel Details</h3>

        {/* Active Toggle */}
        <div className="flex items-center gap-4 ">
          <span className="text-sm font-medium text-gray-700">
            Active
          </span>

          <button
            type="button"
            onClick={() => setIsActive(prev => !prev)}
            className={`flex items-center gap-2 rounded-full border px-2 py-1 transition-colors
            ${isActive ? "bg-white border-[#34C759]" : "bg-white border-gray-300"}
          `}
          >

            <span className="flex items-center justify-center">
              {isActive ? (
                <ToggleRight size={24} className="text-[#34C759]" />
              ) : (
                <ToggleLeft size={24} className="text-gray-400" />
              )}
            </span>
          </button>
        </div>
       
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <Detail label="Joined" value={employee.joined} />
        <Detail label="Contact Number" value={employee.phone} />
        <Detail label="Age" value={employee.age.toString()} />
        <Detail label="Salary" value={`₦${employee.salary.toLocaleString()}`} />
        <Detail
          label="Attendance / Month"
          value={`${employee.attendance}%`}
        />
        <Detail
          label="Over Attendance"
          value={`${employee.overAttendance}%`}
        />
      </div>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between border-b pb-2">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
