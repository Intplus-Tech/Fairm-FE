"use client";

import { useState } from "react";
import EmployeeTable from "./EmployeeTable";
import AddEmployeeModal from "./AddEmployeeModal";
import { Employee } from "./types";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import Pagination from "../birds/broiler/Pagination";

const employees: Employee[] = [
  {
    id: "STF-0001",
    name: "David Omoye",
    position: "Manager",
    department: "Mgt.",
    status: "Active",
    joined: "Aug 2024",
    phone: "08052223344",
    age: 38,
    salary: 120800,
    attendance: 85,
    overAttendance: 72,
  },
  {
    id: "STF-0002",
    name: "Azeez Rauf",
    position: "Supervisor",
    department: "Mgt.",
    status: "Active",
    joined: "Aug 2024",
    phone: "08052223344",
    age: 38,
    salary: 120800,
    attendance: 85,
    overAttendance: 72,
  },
  {
    id: "STF-0003",
    name: "Iyanu Ahmed",
    position: "Supervisor",
    department: "Mgt.",
    status: "Active",
    joined: "Aug 2024",
    phone: "08052223344",
    age: 38,
    salary: 120800,
    attendance: 85,
    overAttendance: 72,
  },
  {
    id: "STF-0004",
    name: "Adebare David",
    position: "Supervisor",
    department: "Mgt.",
    status: "Active",
    joined: "Aug 2024",
    phone: "08052223344",
    age: 38,
    salary: 120800,
    attendance: 85,
    overAttendance: 72,
  },
  {
    id: "STF-0005",
    name: "June Benedicts",
    position: "Supervisor",
    department: "Mgt.",
    status: "Active",
    joined: "Aug 2024",
    phone: "08052223344",
    age: 38,
    salary: 120800,
    attendance: 85,
    overAttendance: 72,
  },

];

export default function EmployeePage() {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);

  return (
    <section className="space-y-6">
      <header className="space-y-4">
        {/* Title */}
        <div>
          <h1 className="text-xl font-semibold">Employees Updates</h1>
          <p className="text-sm text-muted-foreground">
            An overview to see and manage farm employees
          </p>
        </div>

        {/* Controls */}
        <div className="flex w-full flex-col gap-4 md:flex-row md:items-center">
          {/* Left section */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
            <Button
              onClick={() => setOpen(true)}
              className="bg-[#5B4DFF] whitespace-nowrap"
            >
              + Add New Employee
            </Button>

            {/* Search input with icon */}
            <div className="relative w-full sm:w-[380px]">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <input
                type="text"
                placeholder="Search by names or roles"
                className="h-10 w-full rounded-md border pl-9 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#5B4DFF]"
              />
            </div>
          </div>

          {/* Export button — extreme right */}
          <Button
            variant="outline"
            className="w-full sm:w-auto md:ml-auto"
          >
            Export CSV
          </Button>
        </div>
      </header>

      <EmployeeTable employees={employees} />

      {open && <AddEmployeeModal onClose={() => setOpen(false)} />}

     <Pagination page={page} totalPages={5} onChange={setPage} />
    </section>
  );
}
