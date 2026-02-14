"use client";


import { useState } from "react";

import DailyStockOutReport from "@/components/inventory/DailyStockOutReport";
import InventoryHeader from "@/components/inventory/InventoryHeader";
import StockReport from "@/components/inventory/StockReport";
import AddStockModal from "@/components/inventory/AddStockModal";
// import Pagination from "@/components/birds/broiler/Pagination";


export default function InventoryPage() {
  const [page, setPage] = useState(1);
  const [openAddStock, setOpenAddStock] = useState(false);


  return (
    <section className="space-y-8">
      <InventoryHeader onAddStock={() => setOpenAddStock(true)} />


      <StockReport />


      <DailyStockOutReport />


      {openAddStock && (
        <AddStockModal onClose={() => setOpenAddStock(false)} />
      )}
      {/* <Pagination page={page} totalPages={5} onChange={setPage} /> */}
    </section>
  );
}