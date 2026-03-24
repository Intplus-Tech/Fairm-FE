"use client";

import DutyRosterRow, { Employee } from "./DutyRoasterRow";

// import DutyRosterRow, { Employee } from "./DutyRosterRow";

interface Props {
  title: string;
  employees: Employee[];
  editable?: boolean;
  onUpdate?: (id: string, field: keyof Employee, value: string) => void;
}

export default function DutyRosterSection({
  title,
  employees,
  editable,
  onUpdate,
}: Props) {
  return (
    <div className="border rounded-lg overflow-hidden shadow-sm">
      <div className="bg-gray-50 px-4 py-3 font-semibold text-gray-700">
        {title}
      </div>

      <div className="grid grid-cols-4 bg-gray-100 text-sm font-medium p-3">
        <div>Name & Position</div>
        <div>Duty Status</div>
        <div>Location</div>
        <div>Task Assigned</div>
      </div>

      {employees.map((employee) => (
        <DutyRosterRow
          key={employee.id}
          employee={employee}
          editable={editable}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  );
}