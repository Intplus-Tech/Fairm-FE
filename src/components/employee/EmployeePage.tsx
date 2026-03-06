"use client";

import { useEffect, useState } from "react";
import EmployeeTable from "./EmployeeTable";
import AddEmployeeModal from "./AddEmployeeModal";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import Pagination from "../birds/broiler/Pagination";
import { employeeService } from "../../../services/employee.service";
import { EmployeeResponse } from "@/types/employee";


export default function EmployeePage() {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [employees, setEmployees] = useState<EmployeeResponse[]>([])

useEffect(() => {
  const fetchDepartments = async () => {
    try {
      const res = await employeeService.list();
      setEmployees(res);
    } catch (err) {
      console.error(err);
    }
  };

  fetchDepartments();
}, []);

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
