"use client";

import { useEffect, useState } from "react";

import StepHeader from "./StepHeader";
import AddPenForm from "./AddPenForm";
import DefaultThresholdForm from "./DefaultThresholdForm";

export default function AddPenModal() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener("open-add-pen-modal", handler);
    return () => window.removeEventListener("open-add-pen-modal", handler);
  }, []);

  if (!open) return null;

  const markComplete = (stepNumber: number) => {
    setCompletedSteps((prev) =>
      prev.includes(stepNumber) ? prev : [...prev, stepNumber]
    );
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-black/40 flex items-center justify-center">
      <div className="w-[720px] bg-white rounded-2xl shadow-lg relative p-6">
        <button
          onClick={() => setOpen(false)}
          className="absolute top-4 right-4 text-xl"
        >
          ×
        </button>

        <StepHeader
          step={step}
          completedSteps={completedSteps}
        />

        {step === 1 && (
         <AddPenForm
            onNext={() => {
              markComplete(1);
              setStep(2);
            }}
          />
        )}

        {step === 2 && (
          <DefaultThresholdForm
            onBack={() => setStep(1)}
            onComplete={() => {
              markComplete(2);
              setOpen(false);
            }}
          />
        )}
      </div>
    </div>
  );
}
