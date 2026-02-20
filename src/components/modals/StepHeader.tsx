export default function StepHeader({
  step,
  completedSteps,
}: {
  step: number;
  completedSteps: number[];
}) {
  const isDone = (n: number) => completedSteps.includes(n);

  return (
    <div className="flex items-center justify-center gap-2 mb-6">
      {/* STEP 1 */}
      <div className="flex items-center gap-2">
        <div
          className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium
          ${isDone(1) || step === 1 ? "bg-[#4A3AFF] text-white" : "bg-gray-200"}`}
        >
          1
        </div>
        <span className="text-sm font-medium">
          Add House/Pen/Shed
        </span>
      </div>

      {/* CONNECTOR LINE (LOADER IN IMAGE) */}
      <div className="w-10 h-[2px] bg-[#4A3AFF] rounded-full" />

      {/* STEP 2 */}
      <div className="flex items-center gap-2">
        <div
          className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium
          ${isDone(2) || step === 2 ? "bg-[#4A3AFF] text-white" : "bg-gray-200"}`}
        >
          2
        </div>
        <span className="text-sm font-medium">
          Default Thresholds
        </span>
      </div>
    </div>
  );
}
