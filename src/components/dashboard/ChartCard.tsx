"use client";

import { ReactNode } from "react";

export default function ChartCard({
  title,
  actions,
  children,
}: {
  title: string;
  actions?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm w-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-sm">{title}</h3>
        {actions}
      </div>
      <div className="w-full h-[260px]">{children}</div>
    </div>
  );
}
