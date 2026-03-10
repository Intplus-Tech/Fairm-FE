"use client";

import EggSalesTable from "@/components/farm-gate-sales/EggSalesTable";
import PackagingDetails from "@/components/farm-gate-sales/PackagingDetails";
import PaymentStatus from "@/components/farm-gate-sales/PaymentStatus";
import SaleDetails from "@/components/farm-gate-sales/SaleDetails";
import SaleHeader from "@/components/farm-gate-sales/SaleHeader";
import { useState } from "react";

// import SaleHeader from "@/components/farm-gate-sales/SaleHeader";
// import SaleDetails from "@/components/farm-gate-sales/SaleDetails";
// import EggSalesTable from "@/components/farm-gate-sales/EggSalesTable";
// import PackagingDetails from "@/components/farm-gate-sales/PackagingDetails";
// import PaymentStatus from "@/components/farm-gate-sales/PaymentStatus";
// import ActionButtons from "@/components/farm-gate-sales/ActionButtons";

export default function FarmGateSalesPage() {

  const [saleData, setSaleData] = useState({
    customerName: "",
    contact: "",
    paymentMethod: "cash",
    grades: [],
    cratesUsed: 0,
    sacksUsed: 0,
    vehicle: "",
    loadingTime: "",
    loadedBy: "",
    verifiedBy: "",
    amountReceived: 0,
    balanceDue: 0,
  });

  function updateField(field: string, value: any) {
    setSaleData((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  function handleSave() {
    console.log("Farm Sale Saved:", saleData);
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto space-y-6">

        <SaleHeader/>


         <SaleDetails saleData={saleData}
          updateField={updateField}/>

        
        <EggSalesTable saleData={saleData}
          updateField={updateField}/>
       
         <PackagingDetails saleData={saleData}
          updateField={updateField}/>

        

        <PaymentStatus
          saleData={saleData}
          updateField={updateField}
        />

        <ActionButtons onSave={handleSave} />

      </div>
    </div>
  );
}