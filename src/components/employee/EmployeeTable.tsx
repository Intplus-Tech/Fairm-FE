"use client";

import { useState } from "react";
import EmployeeRow from "./EmployeeRow";
import { EmployeeResponse } from "@/types/employee";

interface Props {
  employees: EmployeeResponse[];
}

export default function EmployeeTable({ employees }: Props) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className="rounded-xl border overflow-hidden">
      <table className="w-full border-collapse">
        <thead className="bg-muted text-sm">
          <tr>
            {/* ID header aligned with ID text (not chevron) */}
            <th className="p-4 pl-[56px] text-left">ID</th>

            <th className="p-4 text-left">Name & ID</th>
            <th className="p-4 text-left">Position</th>
            <th className="p-4 text-left">Department</th>
            <th className="p-4 text-left">Status</th>
          </tr>
        </thead>

        <tbody>
          {employees.map(emp => (
            <EmployeeRow
              key={emp._id}
              employee={emp}
              expanded={expandedId === emp._id}
              onToggle={() =>
                setExpandedId(expandedId === emp._id ? null : emp._id)
              }
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
