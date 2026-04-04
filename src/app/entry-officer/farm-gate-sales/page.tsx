"use client";

import { useRouter } from "next/navigation";

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
import AddAnotherSales from "@/components/brand/AddAnotherSales";

const defaultSale: FarmGateSaleRequest = {
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
};

export default function FarmGateSalesPage() {
  const [loading, setLoading] = useState(false);
  const { setFlow } = useEntryFlow();
  const router = useRouter();

  const [users, setEmployees] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);

  // ✅ Dynamic Sales
  const [sales, setSales] = useState<FarmGateSaleRequest[]>([defaultSale]);

  const handleAddSales = () => {
    setSales((prev) => [...prev, defaultSale]);
  };

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

  const updateField = (
    index: number,
    field: keyof FarmGateSaleRequest,
    value: any
  ) => {
    setSales((prev) =>
      prev.map((sale, i) =>
        i === index ? { ...sale, [field]: value } : sale
      )
    );
  };

  const handleSave = async () => {
    try {
      setLoading(true);

      for (const sale of sales) {
        await farmGateSaleService.create(sale);
      }

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
    setFlow((prev: { farm: boolean }) => ({
      ...prev,
      farm: true,
    }));

    router.push("/entry-officer/bulk-transfer");
  }

  return (
    <div className="min-h-screen px-3 sm:px-4 md:px-6 py-4 sm:py-6">
    <div className="bg-white p-3 sm:p-6 rounded-b-xl shadow-sm border space-y-6">

        {error && (
          <p className="text-red-500 text-sm mb-2">
            {error}
          </p>
        )}

        <SaleHeader />

        <div className="bg-white p-6 rounded-b-xl shadow-sm border space-y-6">

          {sales.map((saleData, index) => (
            <div key={index} className="space-y-6">

              <SaleDetails
                saleData={saleData}
                updateField={(field, value) =>
                  updateField(index, field, value)
                }
              />

              <EggSalesTable
                saleData={saleData}
                updateField={(field, value) =>
                  updateField(index, field, value)
                }
              />

              <PackagingDetails
                saleData={saleData}
                updateField={(field, value) =>
                  updateField(index, field, value)
                }
                users={users}
              />

              <PaymentStatus
                saleData={saleData}
                updateField={(field, value) =>
                  updateField(index, field, value)
                }
              />

            </div>
          ))}

          <div className="flex items-center justify-center">
            <AddAnotherSales onClick={handleAddSales} />
          </div>

          <ActionButtons
            onSave={handleSave}
            onNext={handleNext}
            loading={loading}
          />

        </div>
      </div>
    </div>
  );
}