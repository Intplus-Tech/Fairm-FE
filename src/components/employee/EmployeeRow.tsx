"use client";

import { EmployeeResponse } from "@/types/employee";
import EmployeeDetails from "./EmployeeDetails";
import { ChevronDown } from "lucide-react";

interface Props {
  employee: EmployeeResponse;
  expanded: boolean;
  onToggle: () => void;
}

export default function EmployeeRow({ employee, expanded, onToggle }: Props) {
  return (
    <>
      <tr
        className={`border-b cursor-pointer ${expanded ? "bg-muted" : ""}`}
        onClick={onToggle}
      >
        {/* ID + Chevron */}
        <td className="p-4">
          <div className="flex items-center gap-6">
            <ChevronDown
              size={16}
              className={`transition-transform ${expanded ? "rotate-180" : ""
                }`}
            />
            <span>{"EMP-" + employee._id.slice(-6)}</span>
          </div>
        </td>

        <td className="p-4 font-medium">{employee.userId?.firstName} {employee.userId?.lastName}</td>
        <td className="p-4">{employee.positionId?.name}</td>
        <td className="p-4">{employee.departmentId?.name}</td>

        {/* Status (chevron removed from here) */}
        <td className="p-4">
          <span className="text-green-600">{employee.userId?.status}</span>
        </td>
      </tr>

      {expanded && (
        <tr>
          <td colSpan={5} className="p-0">
            <EmployeeDetails employee={employee} />
          </td>
        </tr>
      )}
    </>
  );
}
