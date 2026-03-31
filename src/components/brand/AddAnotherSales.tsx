"use client";

import { Plus } from "lucide-react";

interface AddAnotherSalesProps {
  onClick: () => void;
  className?: string;
}

export default function AddAnotherSales({
  onClick,
  className = "",
}: AddAnotherSalesProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        flex items-center justify-center gap-2
        border border-dashed
        rounded-md
        text-sm font-medium
        transition-colors
        hover:bg-muted/40
        ${className}
      `}
      style={{
        width: "169px",
        height: "41px",
        borderColor: "#514F6E",
      }}
    >
      <Plus size={16} />
      Add another sales
    </button>
  );
}