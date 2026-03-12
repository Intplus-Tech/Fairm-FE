"use client";

import DutyRosterFooter from "@/components/duty-roster/DutyRosterFooter";
import DutyRosterHeader from "@/components/duty-roster/DutyRosterHeader";
import DutyRosterSection from "@/components/duty-roster/DutyRosterSection";
// import DutyRosterSection from "@/components/duty-roster/DutyRosterSection";
// import DutyRosterFooter from "@/components/duty-roster/DutyRosterFooter";

export default function MortalityPage() {
  const managementTeam = [
    {
      name: "Mr. David",
      position: "Manager",
      dutyStatus: "Off",
      location: "--",
      task: "Day off",
    },
    {
      name: "Mr. Azeez",
      position: "Supervisor",
      dutyStatus: "On",
      location: "Office",
      task: "Supervision, Feed Ordering",
    },
    {
      name: "Mr. Iyanu",
      position: "Supervisor",
      dutyStatus: "On",
      location: "Pen 2",
      task: "Egg Collection & Quality Checks",
    },
    {
      name: "Mr. Adebare",
      position: "Supervisor",
      dutyStatus: "On",
      location: "Storage",
      task: "Medication & Equipment Checks",
    },
  ];

  const attendants = [
    {
      name: "Nickola Samuel Ayomide",
      position: "",
      dutyStatus: "Select",
      location: "Pen 2",
      task: "Feed distribution, Water checks",
    },
    {
      name: "Ajibade Omolola",
      position: "",
      dutyStatus: "Select",
      location: "Pen 2",
      task: "Pen Cleaning, feed assist",
    },
    {
      name: "Joshua Adebola",
      position: "",
      dutyStatus: "Select",
      location: "Pen 3",
      task: "Eggs Collection and counting",
    },
    {
      name: "Uzoma junior",
      position: "",
      dutyStatus: "Select",
      location: "All Pens",
      task: "General Cleaning and waste disposal",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">

        <DutyRosterHeader />

        <div className="p-6 space-y-8">
       <DutyRosterSection
            title="MANAGEMENT TEAM"
            employees={managementTeam}
          />

          <DutyRosterSection
            title="ATTENDANTS"
            employees={attendants}
          />
        </div>

        <DutyRosterFooter/>

      </div>
    </div>
  );
}