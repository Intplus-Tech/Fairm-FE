"use client";


import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";


export default function AddStockModal({
  onClose,
}: {
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-2xl rounded-2xl p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Add/Edit Inventory Item</h2>
          <button onClick={onClose}>✕</button>
        </div>


        <div className="space-y-3">
          <div>
            <Label>Category</Label>
            <Input placeholder="Feed" />
          </div>


          <div>
            <Label>Batch/Lot Number</Label>
            <Input disabled value="76890" />
          </div>


          <div>
            <Label>Item Name</Label>
            <Input />
          </div>


          <div>
            <Label>Description</Label>
            <Input />
          </div>


          <div>
            <Label>Supplier</Label>
            <Input />
          </div>


          <div>
            <Label>Expiry Date</Label>
            <Input type="date" />
          </div>
        </div>


        <div className="flex justify-end gap-3 pt-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button className="bg-[#5B5AF7]">Add Stock</Button>
        </div>
      </div>
    </div>
  );
}