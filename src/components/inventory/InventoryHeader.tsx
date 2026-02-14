"use client";


import { Button } from "@/components/ui/button";


export default function InventoryHeader({
  onAddStock,
}: {
  onAddStock: () => void;
}) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-semibold">Inventory</h1>
        <p className="text-sm text-muted-foreground">
          Track and manage feed, vaccines, and products
        </p>
      </div>


      <Button
        onClick={onAddStock}
        className="rounded-xl px-6 py-2 bg-[#5B5AF7] hover:bg-[#4A49E5]"
      >
        + New Stock
      </Button>
    </div>
  );
}