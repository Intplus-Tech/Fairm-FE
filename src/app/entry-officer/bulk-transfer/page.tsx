"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

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
import AddAnotherSales from "@/components/brand/AddAnotherSales";

const defaultForm: BulkTransferRequest = {
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
};

export default function BulkTransferPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { setFlow } = useEntryFlow();
  const router = useRouter();

  // ✅ Dynamic Forms
  const [forms, setForms] = useState<BulkTransferRequest[]>([defaultForm]);

  const handleAddSales = () => {
    setForms((prev) => [...prev, defaultForm]);
  };

  const updateForm = (
    index: number,
    field: keyof BulkTransferRequest,
    value: any
  ) => {
    setForms((prev) =>
      prev.map((form, i) =>
        i === index ? { ...form, [field]: value } : form
      )
    );
  };

  const handleSubmit = async () => {
    setError(null);

    try {
      setLoading(true);

      for (const form of forms) {
        await bulkTransferService.create(form);
      }

      alert("Bulk transfer saved successfully!");
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : "An unexpected error occurred";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    setFlow((prev: { lagos: boolean }) => ({
      ...prev,
      lagos: true,
    }));

    router.push("/entry-officer/medication");
  };

  return (
    <div className="min-h-screen p-6">
      <div className=" mx-auto">
        {error && (
          <p className="text-red-500 text-sm mb-2">
            {error}
          </p>
        )}

        <TransferHeader />

        <div className="bg-white p-6 rounded-b-md space-y-6">

          {forms.map((form, index) => (
            <div key={index} className="space-y-6">

              <DestinationSection
                value={form.destination}
                onChange={(value) =>
                  updateForm(index, "destination", value)
                }
              />

              <TransferDetails
                value={form.transferDetails}
                onChange={(value) =>
                  updateForm(index, "transferDetails", value)
                }
              />

              <EggTransferGrade
                value={form.eggTransferGrade}
                onChange={(value) =>
                  updateForm(index, "eggTransferGrade", value)
                }
              />

              <LoadingDetails
                value={form.loadingDetails}
                onChange={(value) =>
                  updateForm(index, "loadingDetails", value)
                }
              />

              <QualityControl
                value={form.qualityControlLoading}
                onChange={(value) =>
                  updateForm(index, "qualityControlLoading", value)
                }
              />

              <PackagingTransport
                value={form.packagingTransport}
                onChange={(value) =>
                  updateForm(index, "packagingTransport", value)
                }
              />

              <Documentation />

            </div>
          ))}

          <div className=" flex items-center justify-center">
            <AddAnotherSales onClick={handleAddSales}/>
          </div>

          <TransferActions
            onSave={handleSubmit}
            onNext={handleNext}
            loading={loading}
          />

        </div>
      </div>
    </div>
  );
}