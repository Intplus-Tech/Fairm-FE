"use client";

export default function TransferHeader() {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="rounded-t-xl bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white shadow">
      <h1 className="text-2xl font-semibold">Bulk Transfer to Lagos</h1>
      <p className="text-sm opacity-90">
        {today}
      </p>
    </div>
  );
}