"use client";

import type { VaccinationMethod, VaccinationType } from "@/types/medication";

type Props = {
  vaccineTypes: VaccinationType[];
  setVaccineTypes: React.Dispatch<React.SetStateAction<VaccinationType[]>>;
  otherVaccine: string;
  setOtherVaccine: (value: string) => void;
  vaccineDosage: number | "";
  setVaccineDosage: (value: number | "") => void;
  vaccineMethod: VaccinationMethod;
  setVaccineMethod: (value: VaccinationMethod) => void;
};

const vaccineOptions: { label: string; value: VaccinationType }[] = [
  { label: "ND Vaccine", value: "nd_vaccine" },
  { label: "IB Vaccine", value: "ib_vaccine" },
  { label: "Gumboro Vaccine", value: "gumboro_vaccine" },
  { label: "Coryza Vaccine", value: "coryza_vaccine" },
  { label: "Blood Spots", value: "blood_spots" },
  { label: "Fowl Pox", value: "fowl_pox" },
];

export default function VaccinationSchedule({
  vaccineTypes,
  setVaccineTypes,
  otherVaccine,
  setOtherVaccine,
  vaccineDosage,
  setVaccineDosage,
  vaccineMethod,
  setVaccineMethod,
}: Props) {
  const toggleVaccine = (value: VaccinationType) => {
    setVaccineTypes((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const toggleOther = () => {
    setVaccineTypes((prev) =>
      prev.includes("other")
        ? prev.filter((item) => item !== "other")
        : [...prev, "other"]
    );
  };

  return (
    <div className="bg-white p-6 rounded-xl border shadow-sm space-y-4">

      <h2 className="font-semibold text-lg">
        Vaccination Schedule (If applicable)
      </h2>

      <div className="flex flex-wrap gap-4">

        {vaccineOptions.map((vac) => (
          <label
            key={vac.value}
            className="flex items-center gap-2 border rounded-lg px-3 py-2"
          >
            <input
              type="checkbox"
              checked={vaccineTypes.includes(vac.value)}
              onChange={() => toggleVaccine(vac.value)}
            />
            {vac.label}
          </label>
        ))}

        <div className="flex items-center gap-2 border rounded-lg px-3 py-2">
          <input type="radio" name="vaccine"             
          checked={vaccineTypes.includes("other")}
            onChange={toggleOther}/>
          Other:
          <input
            placeholder="Enter Vaccine"
            className="border rounded p-1 text-sm"
            value={otherVaccine}
            onChange={(e) => setOtherVaccine(e.target.value)}
          />
        </div>

      </div>

      <div className="grid md:grid-cols-2 gap-4">

        <div>
          <label className="text-sm">Dosage</label>

          <div className="flex border rounded-lg mt-1">
            <input
              value={vaccineDosage}
              onChange={(e) =>
                setVaccineDosage(e.target.value === "" ? "" : Number(e.target.value))
              }
              className="flex-1 p-2 outline-none"
              type="number"
            />
            <span className="px-3 flex items-center text-sm text-gray-500">
              ml/bird
            </span>
          </div>
        </div>

        <div>

          <label className="text-sm block mb-2">Method</label>

          <div className="flex gap-4">

            <label className="flex gap-2 items-center">
              <input
                type="radio"
                name="method"
                checked={vaccineMethod === "water"}
                onChange={() => setVaccineMethod("water")}
              />
              Water
            </label>

            <label className="flex gap-2 items-center">
              <input
                type="radio"
                name="method"
                checked={vaccineMethod === "spray"}
                onChange={() => setVaccineMethod("spray")}
              />
              Spray
            </label>

            <label className="flex gap-2 items-center">
              <input
                type="radio"
                name="method"
                checked={vaccineMethod === "injection"}
                onChange={() => setVaccineMethod("injection")}
              />
              Injection
            </label>

          </div>

        </div>

      </div>

    </div>
  )
}