"use client";

import { useEffect, useState, useMemo } from "react";
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

  const [employees, setEmployees] = useState<EmployeeResponse[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await employeeService.list();
        setEmployees(res);
      } catch (err) {
        console.error(err);
      }
    };

    fetchEmployees();
  }, []);

  const filteredEmployees = useMemo(() => {
    if (!search) return employees;

    return employees.filter((emp) => {
      const text = search.toLowerCase();

      return (
        emp.userId?.firstName?.toLowerCase().includes(text) ||
        emp.userId?.lastName?.toLowerCase().includes(text) ||
        emp.positionId?.name?.toLowerCase().includes(text) ||
        emp.departmentId?.name?.toLowerCase().includes(text) ||
        emp._id.toLowerCase().includes(text)
      );
    });
  }, [search, employees]);

  const handleExport = () => {
    const headers = ["ID", "Name", "Position", "Department", "Status"];

    const rows = employees.map((emp) => [
      "EMP-" + emp._id.slice(-6),
      `${emp.userId?.firstName} ${emp.userId?.lastName}`,
      emp.positionId?.name,
      emp.departmentId?.name,
      emp.userId?.status,
    ]);

    const csv =
      [headers, ...rows]
        .map((row) => row.join(","))
        .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "employees.csv";
    a.click();
  };

  return (
    <section className="space-y-6">

      <header className="space-y-4">

        <div>
          <h1 className="text-xl font-semibold">
            Employees Updates
          </h1>
          <p className="text-sm text-muted-foreground">
            An overview to see and manage farm employees
          </p>
        </div>

        <div className="flex w-full flex-col gap-4 md:flex-row md:items-center">

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">

            <Button
              onClick={() => setOpen(true)}
              className="bg-[#5B4DFF]"
            >
              + Add New Employee
            </Button>

            <div className="relative w-full sm:w-[380px]">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                placeholder="Search by names or roles"
                className="h-10 w-full rounded-md border pl-9 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#5B4DFF]"
              />
            </div>

          </div>

          <Button
            variant="outline"
            className="w-full sm:w-auto md:ml-auto"
            onClick={handleExport}
          >
            Export CSV
          </Button>

        </div>
      </header>

      <EmployeeTable employees={filteredEmployees} />

      {open && (
        <AddEmployeeModal
          onClose={() => setOpen(false)}
        />
      )}

      <Pagination
        page={page}
        totalPages={5}
        onChange={setPage}
      />

    </section>
  );
}