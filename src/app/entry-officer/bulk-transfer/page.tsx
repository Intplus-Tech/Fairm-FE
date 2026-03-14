"use client";

import { useRouter } from "next/navigation";


import DestinationSection from "@/components/bulk-transfer/DestinationSection";
import Documentation from "@/components/bulk-transfer/Documentation";
import EggTransferGrade from "@/components/bulk-transfer/EggTransferGrade";
import LoadingDetails from "@/components/bulk-transfer/LoadingDetails";
import PackagingTransport from "@/components/bulk-transfer/PackagingTransport";
import QualityControl from "@/components/bulk-transfer/QualityControl";
import TransferActions from "@/components/bulk-transfer/TransferActions";
import TransferDetails from "@/components/bulk-transfer/TransferDetails";
import TransferHeader from "@/components/bulk-transfer/TransferHeader";
import { bulkTransferService } from "../../../../services/bulk-transfer.service";
import { BulkTransferRequest } from "@/types/bulk-transfer";
import { useEntryFlow } from "../../../../context/entry-flow-context";
import { useState } from "react";

export default function BulkTransferPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setFlow } = useEntryFlow();
  const router = useRouter();

  const [form, setForm] = useState<BulkTransferRequest>({
    destination: "",
    transferDetails: {
      vehicle: "",
      driverName: "",
      departureTime: new Date(),
      estimatedArrival: new Date(),
      contactPerson: "",
      phoneNumber: "",
    },
    eggTransferGrade: {
      unsorted: 0,
      medium: 0,
      standard: 0,
      pullet: 0,
    },
    loadingDetails: {
      loadingStart: new Date(),
      loadingEnd: new Date(),
      loadingTeam: "",
      supervisor: "",
    },
    qualityControlLoading: {
      crackedCrates: 0,
      crackedPieces: 0,
      brokenEggs: 0,
      dirtyRemoved: 0,
    },
    packagingTransport: {
      cratesUsed: 0,
      sacksUsed: 0,
      palletized: false,
      strapped: false,
    },
  });

  const handleSubmit = async () => {
    setError(null);

    try {
      setLoading(true);

      await bulkTransferService.create(form);

      alert("Bulk transfer saved successfully!");
      router.push("/entry-officer/medication");
    } catch (err: unknown) {
      const message =
          err instanceof Error ? err.message : "An unexpected error occurred";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

    const handleNext = () => {
    setFlow((prev: {lagos: boolean}) => ({
      ...prev,
      lagos: true,
    }));

    router.push("/entry-officer/medication");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      <div className="max-w-6xl mx-auto space-y-6">

      {error && (
        <p className="text-red-500 text-sm mb-2">
          {error}
        </p>
      )}

        <TransferHeader />

        <DestinationSection
          value={form.destination}
          onChange={(value) =>
            setForm((prev) => ({
              ...prev,
              destination: value,
            }))
          }
         />

        <TransferDetails
          value={form.transferDetails}
          onChange={(value) =>
            setForm((prev) => ({
              ...prev,
              transferDetails: value,
            }))
          }
         />

        <EggTransferGrade
          value={form.eggTransferGrade}
          onChange={(value) =>
            setForm((prev) => ({
              ...prev,
              eggTransferGrade: value,
            }))
          }
        />

        <LoadingDetails
          value={form.loadingDetails}
          onChange={(value) =>
            setForm((prev) => ({
              ...prev,
              loadingDetails: value,
            }))
          }
        />

        <QualityControl
          value={form.qualityControlLoading}
          onChange={(value) =>
            setForm((prev) => ({
              ...prev,
              qualityControlLoading: value,
            }))
          }
        />

        <PackagingTransport
          value={form.packagingTransport}
          onChange={(value) =>
            setForm((prev) => ({
              ...prev,
              packagingTransport: value,
            }))
          }
        />

        <Documentation />

        <TransferActions onSave={handleSubmit} loading={loading} />

        <div className="flex justify-end">
          <button
            onClick={handleNext}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg"
          >
            Next: Medication →
          </button>
        </div>

      </div>

    </div>
  );
}