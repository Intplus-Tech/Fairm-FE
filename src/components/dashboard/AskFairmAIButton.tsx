"use client";

import { Sparkles } from "lucide-react";

type Props = {
  onClick: () => void;
};

export default function AskFairmAIButton({ onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 px-4 py-3 rounded-full text-white shadow-lg"
      style={{ backgroundColor: "#531599" }}
    >
      <Sparkles size={16} />
      Ask FAIRM AI
    </button>
  );
}