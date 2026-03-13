"use client";

import { DutyStatus } from "@/types/duty-roaster";

export interface Employee {
  id: string;
  name: string;
  position: string;
  dutyStatus: DutyStatus;
  location: string;
  taskAssigned: string;
}

interface DutyRosterRowProps {
  employee: Employee;
  editable?: boolean;
  onUpdate?: (
    id: string,
    field: keyof Employee,
    value: string
  ) => void;
}

export default function DutyRosterRow({
  employee,
  editable = true,
  onUpdate,
}: DutyRosterRowProps) {
  return (
    <div className="grid grid-cols-4 items-center border-t p-3 text-sm">

      <div>
        <p>{employee.name}</p>
        {employee.position && (
          <span className="text-xs text-gray-500">
            {employee.position}
          </span>
        )}
      </div>

      <div>
        {editable ? (
      <select
        defaultValue={employee.dutyStatus}
        onChange={(e) =>
          onUpdate?.(employee.id, "dutyStatus", e.target.value)
        }
        className="border rounded px-2 py-1 w-[120px]"
      >
        <option>On</option>
        <option>Off</option>
        <option>Select</option>
      </select>
      ) : (
          <span className="capitalize">
            {employee.dutyStatus.replace("_", " ")}
          </span>
        )}
      </div>

      <div>
        {editable ? (
      <select
        defaultValue={employee.location}
        onChange={(e) =>
          onUpdate?.(employee.id, "location", e.target.value)
        }
        className="border rounded px-2 py-1 w-[150px]"
      >
        <option>--</option>
        <option>Office</option>
        <option>Pen 2</option>
        <option>Pen 3</option>
        <option>Storage</option>
        <option>All Pens</option>
      </select>
              ) : (
          <span>{employee.location || "--"}</span>
        )}
      </div>

      <div>
        {editable ? (
          <input
            type="text"
            value={employee.taskAssigned}
            onChange={(e) =>
              onUpdate?.(employee.id, "taskAssigned", e.target.value)
            }
            placeholder="Enter task"
            className="border rounded px-3 py-1 w-full"
          />
        ) : (
          <span>{employee.taskAssigned}</span>
        )}
      </div>
    </div>
  );
}