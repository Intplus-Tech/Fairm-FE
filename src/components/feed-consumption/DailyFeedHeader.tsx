"use client";

import { useEffect } from "react";
import { getStoredUser } from "@/lib/auth/getUser";

type Props = {
  time: string;
  setTime: (value: string) => void;
  checker: string;
  setChecker: (value: string) => void;
};

export default function DailyFeedHeader({
  time,
  setTime,
  checker,
  setChecker,
}: Props) {

  useEffect(() => {
    // Auto set logged in user
    const user = getStoredUser();
    if (user?.fullName) {
      setChecker(user.fullName);
    }

    // Auto update time every minute
    const updateTime = () => {
      const now = new Date();
      const hh = now.getHours().toString().padStart(2, "0");
      const mm = now.getMinutes().toString().padStart(2, "0");

      setTime(`${hh}:${mm}`);
    };

    updateTime(); // run immediately

    const interval = setInterval(updateTime, 60000); // update every minute

    return () => clearInterval(interval);
  }, [setTime, setChecker]);

  return (
    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 rounded-xl">
      <h1 className="text-xl font-semibold mb-4">Daily Feed Consumption</h1>

      <div className="flex gap-6 items-center text-sm">
        <div>
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>

        <div className="flex items-center gap-2">
          <span>Time</span>
          <select
            className="text-black bg-white px-2 py-1 rounded"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          >
            <option>{time}</option>
            <option>08:00</option>
            <option>07:30</option>
            <option>06:00</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <span>Checked By</span>
          <select
            className="text-black bg-white px-2 py-1 rounded"
            value={checker}
            onChange={(e) => setChecker(e.target.value)}
          >
            <option>{checker}</option>
            <option>Ajewole Iyanuloluwa</option>
            <option>Manager</option>
          </select>
        </div>
      </div>
    </div>
  );
}