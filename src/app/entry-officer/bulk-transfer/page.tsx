

import DestinationSection from "@/components/bulk-transfer/DestinationSection";
import Documentation from "@/components/bulk-transfer/Documentation";
import EggTransferGrade from "@/components/bulk-transfer/EggTransferGrade";
import LoadingDetails from "@/components/bulk-transfer/LoadingDetails";
import PackagingTransport from "@/components/bulk-transfer/PackagingTransport";
import QualityControl from "@/components/bulk-transfer/QualityControl";
import TransferActions from "@/components/bulk-transfer/TransferActions";
import TransferDetails from "@/components/bulk-transfer/TransferDetails";
import TransferHeader from "@/components/bulk-transfer/TransferHeader";

export default function BulkTransferPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto space-y-6">

        <TransferHeader />

        <DestinationSection />

        <TransferDetails />

        <EggTransferGrade/>

        <LoadingDetails />

        <QualityControl />

        <PackagingTransport />

        <Documentation />

        <TransferActions />

      </div>
    </div>
  )
}