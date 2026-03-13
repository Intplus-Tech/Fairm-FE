"use client";

import { useRouter } from "next/navigation";
// import { useEntryFlow } from "@/context/entry-flow-context";

import DutyRosterFooter from "@/components/duty-roster/DutyRosterFooter";
import DutyRosterHeader from "@/components/duty-roster/DutyRosterHeader";
import DutyRosterSection from "@/components/duty-roster/DutyRosterSection";
import { useEntryFlow } from "../../../../context/entry-flow-context";
import { DutyRoasterRequest, DutyStatus } from "@/types/duty-roaster";
import { dutyRoasterService } from "../../../../services/duty-roaster.service";

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

  const handleFinish = () => {

    setFlow({
      mortality:false,
      feed:false,
      egg:false,
      farm:false,
      lagos:false,
      medication:false
    });

    router.push("/entry-officer");
  };

  const managementTeam = [
    { name:"Mr. David", position:"Manager", dutyStatus:"Off", location:"--", task:"Day off" },
    { name:"Mr. Azeez", position:"Supervisor", dutyStatus:"On", location:"Office", task:"Supervision, Feed Ordering" },
    { name:"Mr. Iyanu", position:"Supervisor", dutyStatus:"On", location:"Pen 2", task:"Egg Collection & Quality Checks" },
    { name:"Mr. Adebare", position:"Supervisor", dutyStatus:"On", location:"Storage", task:"Medication & Equipment Checks" },
  ];

  const attendants = [
    { name:"Nickola Samuel Ayomide", position:"", dutyStatus:"Select", location:"Pen 2", task:"Feed distribution, Water checks" },
    { name:"Ajibade Omolola", position:"", dutyStatus:"Select", location:"Pen 2", task:"Pen Cleaning, feed assist" },
    { name:"Joshua Adebola", position:"", dutyStatus:"Select", location:"Pen 3", task:"Eggs Collection and counting" },
    { name:"Uzoma junior", position:"", dutyStatus:"Select", location:"All Pens", task:"General Cleaning and waste disposal" },
  ];

  const updateAttendant = (
    id: string,
    field: keyof Employee,
    value: string
  ) => {
    setAttendants((prev) =>
      prev.map((employee) =>
        employee.id === id ? { ...employee, [field]: value } : employee
      )
    );
  };

    const handleSaveAttendance = async () => {
    try {
      setLoading(true);

      const payloads: DutyRoasterRequest[] = attendants.map((employee) => ({
        attendantId: employee._id, // replace with real employee DB _id
        dutyStatus: employee.dutyStatus,
        location: employee.location,
        taskAssigned: employee.taskAssigned,
      }));

      await Promise.all(payloads.map((payload) => dutyRoasterService.create(payload)));

      alert("Duty roster saved successfully");
    } catch (error) {
      console.error("Failed to save duty roster:", error);
      alert("Failed to save duty roster");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">

        <DutyRosterHeader />

        <div className="p-6 space-y-8">

          <DutyRosterSection
            title="MANAGEMENT TEAM"
            employees={managementTeam}
            editable={false}
          />

          <DutyRosterSection
            title="ATTENDANTS"
            employees={attendants}
            editable
            onUpdate={updateAttendant}
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