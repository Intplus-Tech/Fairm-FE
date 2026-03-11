"use client";

import { useState } from "react";
import { pensService } from "@/../services/pen.service";
import type {
  BirdType,
  HouseType,
  FeederType,
  SensorType,
  BreedType,
} from "@/types/pen";
import { BIRD_TYPES, BREED_TYPES, FEEDER_TYPES, HOUSE_TYPES, SENSOR_TYPES } from "../../../constants/pen.constants";
import { formatLabel } from "@/utils";

export default function AddPenForm({
  onNext,
}: {
  onNext: (farmId: string) => void;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

    // Form state
  const [name, setName] = useState("");
  const [maxCapacity, setMaxCapacity] = useState<number>(0);
  const [houseType, setHouseType] =
    useState<HouseType>("deep_litter");
  const [feeder, setFeeder] =
    useState<FeederType>("auto_feeders");
  const [sensors, setSensors] = useState<SensorType[]>([]);
  const [birdType, setBirdType] =
    useState<BirdType>("broiler");
  const [breed, setBreed] =
    useState<BreedType>("cobb_500");
  const [noOfBirds, setNoOfBirds] = useState<number>(0);
  const [ageInWeeks, setAgeInWeeks] = useState<number>(0);
  const [startDate, setStartDate] = useState("");

    const handleSubmit = async () => {
    setError(null);

    if (!name || !maxCapacity || !noOfBirds || !ageInWeeks || !startDate) {
      setError("Please fill all required fields.");
      return;
    }

    try {
      setLoading(true);

      const createdPen = await pensService.create({
        name,
        maxCapacity,
        houseType,
        feeder,
        sensors: sensors as [SensorType],
        birdType,
        breed,
        noOfBirds,
        ageInWeeks,
        startDate: new Date(startDate),
      });

      onNext(createdPen.farmId);
    } catch (err: unknown) {
      const message =
          err instanceof Error ? err.message : "An unexpected error occurred";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col max-h-[85vh] rounded-lg bg-transparent border-2 border-[#EFF0F6] p-6">
      {/* HEADER */}
      <h2 className="text-lg font-semibold mb-4">
        Add Your First House/Shed/Pen
      </h2>

      {/* SCROLLABLE BODY */}
      <div className="flex-1 overflow-y-auto scrollbar-hide pr-1">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-6">
          {/* House Name */}
          <div>
            <label className="text-sm font-medium">
              House/Shed/Pen Name <span className="text-red-500">*</span>
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full mt-1 rounded-lg border px-3 py-2 text-sm"
            />
          </div>

          {/* Max Capacity */}
          <div>
            <label className="text-sm font-medium">
              Max Capacity <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              value={maxCapacity}
              onChange={(e) =>
                setMaxCapacity(Number(e.target.value))
              }
              className="w-full mt-1 rounded-lg border px-3 py-2 text-sm"
            />
          </div>

          {/* House Type */}
          <div>
            <label className="text-sm font-medium">
              House Type <span className="text-red-500">*</span>
            </label>
            <select
              value={houseType}
              onChange={(e) =>
                setHouseType(e.target.value as HouseType)
              }
             className="w-full mt-1 rounded-lg border px-3 py-2 text-sm">
                {HOUSE_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {formatLabel(type)}
                  </option>
                ))}
            </select>
          </div>

          {/* Feeder */}
          <div>
            <label className="text-sm font-medium">
              Feeder <span className="text-red-500">*</span>
            </label>
            <select 
              value={feeder}
              onChange={(e) =>
                setFeeder(e.target.value as FeederType)
              }
            className="w-full mt-1 rounded-lg border px-3 py-2 text-sm">
                {FEEDER_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {formatLabel(type)}
                  </option>
                ))}
            </select>
          </div>

          {/* Sensors */}
          <div>
            <label className="text-sm font-medium">Sensors</label>
            <select 
                multiple
                value={sensors}
                onChange={(e) =>
                  setSensors(
                    Array.from(e.target.selectedOptions, (opt) =>
                      opt.value as SensorType
                    )
                  )
                }
            className="w-full mt-1 rounded-lg border px-3 py-2 text-sm">
              {SENSOR_TYPES.map((type) => (
                <option key={type} value={type}>
                  {formatLabel(type)}
                </option>
              ))}
            </select>
          </div>

          {/* Bird Type */}
          <div>
            <label className="text-sm font-medium">
              Bird Type <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center gap-4 mt-2 text-sm">
              {BIRD_TYPES.map((type) => (
                  <label key={type}>
                    <input
                      type="radio"
                      checked={birdType === type}
                      onChange={() => setBirdType(type)}
                    />
                    {formatLabel(type)}
                  </label>
                ))}
            </div>
          </div>

          {/* Batch No */}
          <div>
            <label className="text-sm font-medium">
              Batch No <span className="text-red-500">*</span>
            </label>
            <input
              placeholder="Spring batch 2024"
              className="w-full mt-1 rounded-lg border px-3 py-2 text-sm"
            />
          </div>

          {/* Breed */}
          <div>
            <label className="text-sm font-medium">
              Breed <span className="text-red-500">*</span>
            </label>
            <select   value={breed}
              onChange={(e) =>
                setBreed(e.target.value as BreedType)
              }
              className="w-full mt-1 rounded-lg border px-3 py-2 text-sm">
                {BREED_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {formatLabel(type)}
                  </option>
                ))}
            </select>
          </div>

          {/* No of Birds */}
          <div>
            <label className="text-sm font-medium">
              No of Birds <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              value={noOfBirds}
              onChange={(e) =>
                setNoOfBirds(Number(e.target.value))
              }
              className="w-full mt-1 rounded-lg border px-3 py-2 text-sm"
            />
          </div>

          {/* Age */}
          <div>
            <label className="text-sm font-medium">
              Age <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              value={ageInWeeks}
              onChange={(e) =>
                setAgeInWeeks(Number(e.target.value))
              }
              className="w-full mt-1 rounded-lg border px-3 py-2 text-sm"
            />
          </div>

          {/* Start Date */}
          <div>
            <label className="text-sm font-medium">
              Start Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) =>
                setStartDate(e.target.value)
              }
                className="w-full mt-1 rounded-lg border px-3 py-2 text-sm"
            />
          </div>
        </div>
      </div>

      {error && (
        <p className="text-red-500 text-sm mb-2">
          {error}
        </p>
      )}

      {/* FOOTER (STATIC) */}
      <div className="flex justify-between items-center border-t pt-4">
        <button className="border rounded-lg px-4 py-2 text-sm">
          + Add another House/Pen/Shed
        </button>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-[#4A3AFF] text-white px-6 py-2 rounded-lg"
        >
          {loading ? "Creating..." : "Next: Configure Alerts →"}
        </button>
      </div>
    </div>
  );
}
