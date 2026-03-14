"use client";

import { useRouter } from "next/navigation";
// import { useEntryFlow } from "@/context/entry-flow-context";

import ActionButtons from "@/components/farm-gate-sales/ActionButtons";
import EggSalesTable from "@/components/farm-gate-sales/EggSalesTable";
import PackagingDetails from "@/components/farm-gate-sales/PackagingDetails";
import PaymentStatus from "@/components/farm-gate-sales/PaymentStatus";
import SaleDetails from "@/components/farm-gate-sales/SaleDetails";
import SaleHeader from "@/components/farm-gate-sales/SaleHeader";
import { FarmGateSaleRequest } from "@/types/farm-gate-sales";
import { useEffect, useState } from "react";
import { farmGateSaleService } from "../../../../services/farm-gate-sales.service";

import { useEntryFlow } from "../../../../context/entry-flow-context";
import { usersService } from "../../../../services/user.service";
import { User } from "@/types/user";

export default function FarmGateSalesPage() {
  const [loading, setLoading] = useState(false);
  const { setFlow } =useEntryFlow();
  const router = useRouter();
  const [users, setEmployees] = useState<User[]>([])
    const [error, setError] = useState<string | null>(null);

  const [saleData, setSaleData] = useState<FarmGateSaleRequest>({
    customerType: "manager",
    customerName: "",
    contact: "",
    paymentMethod: "cash",
    eggSalesGrade: {
      pulletGradeA: {
        quantity: Number(0),
        price: Number(0),
        total: Number(0),
        notes: "",
      },
      mediumGradeB: {
        quantity: Number(0),
        price: Number(0),
        total: Number(0),
        notes: "",
      },
      smallGradeC: {
        quantity: Number(0),
        price: Number(0),
        total: Number(0),
        notes: "",
      },
      crackedDiscount: {
        quantity: Number(0),
        price: Number(0),
        total: Number(0),
        notes: "",
      },
    },
    packingDetails: {
      cratesUsed: Number(0),
      sacksUsed: Number(0),
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
  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await usersService.list();
        setEmployees(res);
      } catch (err) {
        console.error(err);
      }
    };
  
    fetchUsers();
  }, []);

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

      console.log(saleData)

      const createdSale = await farmGateSaleService.create(saleData);

      console.log("Farm Sale Saved:", createdSale);
      alert("Farm gate sale created successfully");
      router.push("/entry-officer/lagos-transfer");
    } catch (error) {
      console.error("Failed to save farm gate sale:", error);
      alert("Failed to save farm gate sale");
      setError("Failed to load pens");
    } finally {
      setLoading(false);
    }
  };

  function handleNext() {
    setFlow((prev: {farm: boolean}) => ({
      ...prev,
      farm: true,
    }));

    router.push("/entry-officer/bulk-transfer");
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto space-y-6">

      {error && (
        <p className="text-red-500 text-sm mb-2">
          {error}
        </p>
      )}

        <SaleHeader />

      <SaleDetails saleData={saleData} updateField={updateField} />

      <EggSalesTable saleData={saleData} updateField={updateField} />

      <PackagingDetails saleData={saleData} updateField={updateField} users={users} />

      <PaymentStatus saleData={saleData} updateField={updateField} />

      <ActionButtons onSave={handleSave} loading={loading} />

        <div className="flex justify-end">
          <button
            onClick={handleNext}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg"
          >
            Next: Bulk Transfer →
          </button>
        </div>

      </div>
    </div>
  );
}