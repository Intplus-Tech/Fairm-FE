"use client";

import { createContext, useContext, useState } from "react";

type FlowState = {
  mortality: boolean;
  feed: boolean;
  egg: boolean;
  farm: boolean;
  lagos: boolean;
  medication: boolean;
};

const FlowContext = createContext<any>(null);

export function EntryFlowProvider({ children }: { children: React.ReactNode }) {
  const [flow, setFlow] = useState<FlowState>({
    mortality: false,
    feed: false,
    egg: false,
    farm: false,
    lagos: false,
    medication: false,
  });

  return (
    <FlowContext.Provider value={{ flow, setFlow }}>
      {children}
    </FlowContext.Provider>
  );
}

export const useEntryFlow = () => useContext(FlowContext);