interface Employee {
  name: string;
  position: string;
  dutyStatus: string;
  location: string;
  task: string;
}

export default function DutyRosterRow({ employee }: { employee: Employee }) {
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

      <select
        defaultValue={employee.dutyStatus}
        className="border rounded px-2 py-1 w-[120px]"
      >
        <option>On</option>
        <option>Off</option>
        <option>Select</option>
      </select>

      <select
        defaultValue={employee.location}
        className="border rounded px-2 py-1 w-[150px]"
      >
        <option>--</option>
        <option>Office</option>
        <option>Pen 2</option>
        <option>Pen 3</option>
        <option>Storage</option>
        <option>All Pens</option>
      </select>

      <input
        type="text"
        defaultValue={employee.task}
        className="border rounded px-3 py-1 w-full"
      />
    </div>
  );
}