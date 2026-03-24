import { ChangeEvent } from "react";

interface EggTransferGradeValue {
  unsorted: number;
  medium: number;
  standard: number;
  pullet: number;
}

interface EggTransferGradeProps {
  value: EggTransferGradeValue;
  onChange: (value: EggTransferGradeValue) => void;
}

export default function EggTransferGrade({
  value,
  onChange,
}: EggTransferGradeProps) {
  const handleChange =
    (field: keyof EggTransferGradeValue) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;

      onChange({
        ...value,
        [field]: val === "" ? 0 : Number(val),
      });
    };

  const renderInput = (
    label: string,
    field: keyof EggTransferGradeValue,
    fieldValue: number
  ) => (
    <div>
      <label className="text-sm text-gray-600">{label}</label>

      <div className="flex items-center border rounded-lg mt-1 overflow-hidden focus-within:ring-2 focus-within:ring-primary">
        <input
          type="number"
          value={fieldValue === 0 ? "" : fieldValue}
          onChange={handleChange(field)}
          placeholder="0"
          className="flex-1 p-2 outline-none bg-transparent no-spinner"
        />

        <span className="px-3 text-gray-500 text-sm bg-gray-50 border-l">
          pcs
        </span>
      </div>
    </div>
  );

  return (
    <div className="bg-white p-6 rounded-xl border shadow-sm">
      <h2 className="font-semibold text-lg mb-4">
        Egg Transfer by Grade
      </h2>

      <div className="grid md:grid-cols-4 gap-4">
        {renderInput("Unsorted", "unsorted", value.unsorted)}
        {renderInput("Medium", "medium", value.medium)}
        {renderInput("Standard", "standard", value.standard)}
        {renderInput("Pullet", "pullet", value.pullet)}
      </div>

      {/* Spinner removal styles */}
      <style jsx>{`
        /* Chrome, Safari, Edge */
        input.no-spinner::-webkit-outer-spin-button,
        input.no-spinner::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        /* Firefox */
        input.no-spinner {
          -moz-appearance: textfield;
        }
      `}</style>
    </div>
  );
}