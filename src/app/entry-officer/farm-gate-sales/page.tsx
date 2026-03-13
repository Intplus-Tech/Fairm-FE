"use client";

import ActionButtons from "@/components/farm-gate-sales/ActionButtons";
import EggSalesTable from "@/components/farm-gate-sales/EggSalesTable";
import PackagingDetails from "@/components/farm-gate-sales/PackagingDetails";
import PaymentStatus from "@/components/farm-gate-sales/PaymentStatus";
import SaleDetails from "@/components/farm-gate-sales/SaleDetails";
import SaleHeader from "@/components/farm-gate-sales/SaleHeader";
import { FarmGateSaleRequest } from "@/types/farm-gate-sales";
import { useState } from "react";
import { farmGateSaleService } from "../../../../services/farm-gate-sales.service";


export default function FarmGateSalesPage() {
  const [loading, setLoading] = useState(false);

  const [saleData, setSaleData] = useState<FarmGateSaleRequest>({
    customerType: "manager",
    customerName: "",
    contact: "",
    paymentMethod: "cash",
    eggSalesGrade: {
      pulletGradeA: {
        quantity: 0,
        price: "",
        total: "",
        notes: "",
      },
      mediumGradeB: {
        quantity: 0,
        price: "",
        total: "",
        notes: "",
      },
      smallGradeC: {
        quantity: 0,
        price: "",
        total: "",
        notes: "",
      },
      crackedDiscount: {
        quantity: 0,
        price: "",
        total: "",
        notes: "",
      },
    },
    packingDetails: {
      cratesUsed: 0,
      sacksUsed: 0,
      vehicle: "",
      loadedAt: new Date(),
      loadedBy: "",
      verifiedBy: "",
    },
    paymentStatus: {
      amountReceived: "",
      balanceDue: "",
      receipt: false,
    },
  });

  const updateField = <K extends keyof FarmGateSaleRequest>(
    field: K,
    value: FarmGateSaleRequest[K]
  ) => {
    setSaleData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    try {
      setLoading(true);

      const createdSale = await farmGateSaleService.create(saleData);

      console.log("Farm Sale Saved:", createdSale);
      alert("Farm gate sale created successfully");
    } catch (error) {
      console.error("Failed to save farm gate sale:", error);
      alert("Failed to save farm gate sale");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto space-y-6">

       <SaleHeader/>

      <SaleDetails saleData={saleData} updateField={updateField} />

      <EggSalesTable saleData={saleData} updateField={updateField} />

      <PackagingDetails saleData={saleData} updateField={updateField} />

      <PaymentStatus saleData={saleData} updateField={updateField} />

      <ActionButtons onSave={handleSave} loading={loading} />

      </div>
    </div>
  );
}