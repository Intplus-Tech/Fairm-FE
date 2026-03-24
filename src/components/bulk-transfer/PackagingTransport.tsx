import { ChangeEvent } from "react";

interface PackagingTransportValue {
  cratesUsed: number;
  sacksUsed: number;
  palletized: boolean;
  strapped: boolean;
}

interface PackagingTransportProps {
  value: PackagingTransportValue;
  onChange: (value: PackagingTransportValue) => void;
}

export default function PackagingTransport({
  value,
  onChange,
}: PackagingTransportProps) {
  const handleChange =
    (field: "cratesUsed" | "sacksUsed") =>
    (e: ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;

      onChange({
        ...value,
        [field]: val === "" ? 0 : Number(val),
      });
    };

  const renderNumberInput = (
    label: string,
    field: "cratesUsed" | "sacksUsed",
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
    <div className="bg-white p-6 rounded-xl border shadow-sm space-y-4">
      <h2 className="font-semibold text-lg">
        Packaging and Transport
      </h2>

      <div className="grid md:grid-cols-4 gap-4">
        {renderNumberInput("Crates Used", "cratesUsed", value.cratesUsed)}
        {renderNumberInput("Sacks Used", "sacksUsed", value.sacksUsed)}

        {/* Palletized */}
        <div>
          <label className="text-sm block mb-2">Palletized</label>

          <div className="flex gap-4">
            <label className="flex gap-2 items-center">
              <input
                type="radio"
                name="pallet"
                checked={value.palletized === true}
                onChange={() =>
                  onChange({ ...value, palletized: true })
                }
              />
              Yes
            </label>

            <label className="flex gap-2 items-center">
              <input
                type="radio"
                name="pallet"
                checked={value.palletized === false}
                onChange={() =>
                  onChange({ ...value, palletized: false })
                }
              />
              No
            </label>
          </div>
        </div>

        {/* Strapped */}
        <div>
          <label className="text-sm block mb-2">Strapped</label>

          <div className="flex gap-4">
            <label className="flex gap-2 items-center">
              <input
                type="radio"
                name="strap"
                checked={value.strapped === true}
                onChange={() =>
                  onChange({ ...value, strapped: true })
                }
              />
              Yes
            </label>

            <label className="flex gap-2 items-center">
              <input
                type="radio"
                name="strap"
                checked={value.strapped === false}
                onChange={() =>
                  onChange({ ...value, strapped: false })
                }
              />
              No
            </label>
          </div>
        </div>
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