"use client";

import { Sparkles } from "lucide-react";

export default function AskFairmAIButton() {
  return (
    <button
      className="
        fixed bottom-6 right-6
        flex items-center gap-2
        px-4 py-3 rounded-full
        text-white shadow-lg
      "
      style={{ backgroundColor: "#531599" }}
      onClick={() => alert("AI assistant coming soon")}
    >
      <Sparkles size={16} />
      Ask FAIRM AI
    </button>
  );
}
