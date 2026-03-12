// import DutyRosterRow from "./DutyRosterRow";

import DutyRosterRow from "./DutyRoasterRow";

interface Employee {
  name: string;
  position: string;
  dutyStatus: string;
  location: string;
  task: string;
}

interface Props {
  title: string;
  employees: Employee[];
}

export default function DutyRosterSection({ title, employees }: Props) {
  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="bg-gray-50 px-4 py-3 font-semibold text-gray-700">
        {title}
      </div>

      <div className="grid grid-cols-4 bg-gray-100 text-sm font-medium p-3">
        <div>Name & Position</div>
        <div>Duty Status</div>
        <div>Location</div>
        <div>Task Assigned</div>
      </div>

      {employees.map((employee, index) => (
        <DutyRosterRow key={index} employee={employee} />
      ))}
    </div>
  );
}