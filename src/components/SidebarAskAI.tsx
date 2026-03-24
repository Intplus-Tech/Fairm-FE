"use client";

import AskFairmAIButton from "./dashboard/AskFairmAIButton";

// import AskFairmAIButton from "./AskFairmAIButton";

type Props = {
  onOpenAI: () => void;
};

export default function SidebarAskAI({ onOpenAI }: Props) {
  return (
    <AskFairmAIButton onClick={onOpenAI} />
  );
}
