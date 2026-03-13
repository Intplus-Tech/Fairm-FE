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
import { useEntryFlow } from "../../../../context/entry-flow-context";

export default function BulkTransferPage() {

  const { setFlow } = useEntryFlow();
  const router = useRouter();

  const handleNext = () => {
    setFlow((prev: any) => ({
      ...prev,
      lagos: true,
    }));

    router.push("/entry-officer/medication");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      <div className="max-w-6xl mx-auto space-y-6">

        <TransferHeader />

        <DestinationSection />

        <TransferDetails />

        <EggTransferGrade />

        <LoadingDetails />

        <QualityControl />

        <PackagingTransport />

        <Documentation />

        <TransferActions />

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