"use client";

import { useState, useEffect } from "react";
import { getStoredUser } from "@/lib/auth/getUser";

export default function DutyRosterHeader() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [administeredBy, setAdministeredBy] = useState("");

  // Update the date/time every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentDate(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Get logged-in user from backend
  useEffect(() => {
    const user = getStoredUser();
    if (user?.fullName) {
      setAdministeredBy(user.fullName);
    }
  }, []);

  // Format date like "Saturday, January 31, 2026"
  const formattedDate = currentDate.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Format time as HH:MM (24-hour) for input type="time"
  const formattedTime = currentDate
    .toTimeString()
    .slice(0, 5); // "HH:MM"

  return (
    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 flex justify-between items-center">
      <div>
        <h1 className="text-xl font-semibold">Daily Duty Roster</h1>
        <p className="text-sm opacity-90">{formattedDate}</p>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span>Administered By</span>
          <select
            value={administeredBy}
            onChange={(e) => setAdministeredBy(e.target.value)}
            className="text-black bg-white rounded px-2 py-1"
          >
            <option>{administeredBy || "Select"}</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <span>Time</span>
          <input
            type="time"
            value={formattedTime}
            readOnly
            className="text-black bg-white rounded px-2 py-1"
          />
        </div>
      </div>
    </div>
  );
}