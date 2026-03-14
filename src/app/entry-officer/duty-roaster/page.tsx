"use client";

import { useRouter } from "next/navigation";
// import { useEntryFlow } from "@/context/entry-flow-context";

import DutyRosterFooter from "@/components/duty-roster/DutyRosterFooter";
import DutyRosterHeader from "@/components/duty-roster/DutyRosterHeader";
import DutyRosterSection from "@/components/duty-roster/DutyRosterSection";
import { useEntryFlow } from "../../../../context/entry-flow-context";
import { DutyRoasterRequest, DutyStatus } from "@/types/duty-roaster";
import { dutyRoasterService } from "../../../../services/duty-roaster.service";
import { useEffect, useState } from "react";
import { usersService } from "../../../../services/user.service";
import { User } from "@/types/user";

type EmployeeRow = {
  id: string;
  name: string;
  position: string;
  dutyStatus: DutyStatus;
  location: string;
  taskAssigned: string;
};

export default function DutyRoasterPage() {

  const router = useRouter();
  const { setFlow } = useEntryFlow();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [managementTeam, setManagementTeam] = useState<EmployeeRow[]>([]);
  const [attendants, setAttendants] = useState<EmployeeRow[]>([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const users: User[] = await usersService.list();

        const managers = users
          .filter((u) => u.role === "manager" || u.role === "supervisor")
          .map((u) => ({
            id: u._id,
            name: `${u.firstName ?? ""} ${u.lastName ?? ""}`.trim() || u.email,
            position: u.role,
            dutyStatus: "" as DutyStatus,
            location: "",
            taskAssigned: "",
          }));

        const staff = users
          .filter((u) => u.role === "staff")
          .map((u) => ({
            id: u._id,
            name: `${u.firstName ?? ""} ${u.lastName ?? ""}`.trim() || u.email,
            position: u.role,
            dutyStatus: "" as DutyStatus,
            location: "",
            taskAssigned: "",
          }));

        setManagementTeam(managers);
        setAttendants(staff);
      } catch (err) {
        console.error("Failed to fetch employees:", err);
        setError("Failed to load employees");
      }
    };

    fetchEmployees();
  }, []);

  const handleSaveAttendance = async () => {
    try {
      setLoading(true);

    const allEmployees = [...managementTeam, ...attendants];

    const validEmployees = allEmployees.filter(
      (e) => e.dutyStatus === "on_duty" || e.dutyStatus === "off_duty"
    );

    if (validEmployees.length === 0) {
      alert("Please set duty status for at least one attendant.");
      return;
    }

      const payloads: DutyRoasterRequest[] = attendants.map((employee) => ({
        attendantId: employee.id,
        dutyStatus: employee.dutyStatus as DutyStatus,
        location: employee.location,
        taskAssigned: employee.taskAssigned,
      }));

      await Promise.all(
        payloads.map((payload) => dutyRoasterService.create(payload))
      );

      alert("Duty roster saved successfully");
    } catch (error) {
      console.error("Failed to save duty roster:", error);
      alert("Failed to save duty roster");
    } finally {
      setLoading(false);
    }
  };

  const updateEmployee = (
    id: string,
    field: keyof EmployeeRow,
    value: string
  ) => {
    const updater = (prev: EmployeeRow[]) =>
      prev.map((e) => (e.id === id ? { ...e, [field]: value } : e));

    setManagementTeam((prev) => {
      const found = prev.some((e) => e.id === id);
      return found ? updater(prev) : prev;
    });

    setAttendants((prev) => {
      const found = prev.some((e) => e.id === id);
      return found ? updater(prev) : prev;
    });
  };

  const handleFinish = async () => {
    await handleSaveAttendance();
    setFlow({
      mortality: false,
      feed: false,
      egg: false,
      farm: false,
      lagos: false,
      medication: false,
    });
    router.push("/entry-officer");
  };


  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">

      {error && (
        <p className="text-red-500 text-sm mb-2">
          {error}
        </p>
      )}

        <DutyRosterHeader />

        <div className="p-6 space-y-8">

          <DutyRosterSection
            title="MANAGEMENT TEAM"
            employees={managementTeam}
            editable={false}
            onUpdate={updateEmployee}
          />

          <DutyRosterSection
            title="ATTENDANTS"
            employees={attendants}
            editable
            onUpdate={updateEmployee}
          />

        </div>

        <DutyRosterFooter 
          loading={loading}
          onSave={handleSaveAttendance}
         handleFinish={handleFinish}/>

      </div>

    </div>
  );
}