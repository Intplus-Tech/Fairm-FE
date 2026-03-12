"use client";

import { useState } from "react";
import AskFairmAIButton from "./AskFairmAIButton";
import FairmAIPanel from "./FairmAiPanel";


export default function FloatingAskAI() {

  const [open, setOpen] = useState(false);

  return (
    <>
      {open && (
        <FairmAIPanel onClose={() => setOpen(false)} />
      )}

      <div className="fixed bottom-6 right-6 z-[9999]">
        <AskFairmAIButton onClick={() => setOpen(true)} />
      </div>
    </>
  );
}