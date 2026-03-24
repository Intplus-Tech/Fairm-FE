import { ChangeEvent } from "react";

interface QualityControlValue {
  crackedCrates: number;
  crackedPieces: number;
  brokenEggs: number;
  dirtyRemoved: number;
}

interface QualityControlProps {
  value: QualityControlValue;
  onChange: (value: QualityControlValue) => void;
}

export default function QualityControl({
  value,
  onChange,
}: QualityControlProps) {
  const handleChange =
    (field: keyof QualityControlValue) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;

      onChange({
        ...value,
        [field]: val === "" ? 0 : Number(val),
      });
    };

  const renderInput = (
    label: string,
    field: keyof QualityControlValue,
    fieldValue: number
  ) => (
    <div>
      <label className="text-sm text-gray-600">{label}</label>

      <input
        type="number"
        value={fieldValue === 0 ? "" : fieldValue}
        onChange={handleChange(field)}
        className="w-full border rounded-lg p-2 mt-1 outline-none no-spinner focus:ring-2 focus:ring-primary"
      />
    </div>
  );

  return (
    <div className="bg-white p-6 rounded-xl border shadow-sm">
      <h2 className="font-semibold text-lg mb-4">
        Quality Control During Loading
      </h2>

      <div className="grid md:grid-cols-4 gap-4">
        {renderInput("Cracked (Crates)", "crackedCrates", value.crackedCrates)}
        {renderInput("Cracked (Pieces)", "crackedPieces", value.crackedPieces)}
        {renderInput("Broken Eggs", "brokenEggs", value.brokenEggs)}
        {renderInput("Dirty Removed", "dirtyRemoved", value.dirtyRemoved)}
      </div>

      {/* Remove number input arrows */}
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