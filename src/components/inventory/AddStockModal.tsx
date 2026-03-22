"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { inventoriesService } from "../../../services/inventory.service";
import { InventoryRequest } from "@/types/inventory";
import { categories, units } from "../../../constants/inventory.constants";
import toast, { Toaster } from "react-hot-toast";

export default function AddStockModal({
  onClose,
}: {
  onClose: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState<InventoryRequest>({
    name: "",
    category: "feed",
    description: "",
    unitOfMeasurement: "bags",
    supplier: "",
    expiryDate: new Date(),
  });

  const handleChange = (field: keyof InventoryRequest, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: field === "expiryDate" ? new Date(value) : value,
    }));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError(null);

      await inventoriesService.create(form);

      // ✅ show success toast
      toast.success("Stock item added successfully!");

      // Delay closing modal to let toast show
      setTimeout(() => {
        onClose();
      }, 3000); // 300ms delay is enough

    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to create inventory item";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster /> {/* keep this here for now, but ideally move to _app.tsx */}

      <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
        <div className="bg-white w-full max-w-2xl rounded-2xl p-6 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Add/Edit Inventory Item</h2>
            <button onClick={onClose}>✕</button>
          </div>

          <div className="space-y-3">
            <div>
              <Label>Category</Label>
              <select
                className="w-full border rounded-md p-2"
                value={form.category}
                onChange={(e) => handleChange("category", e.target.value)}
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <Label>Batch/Lot Number</Label>
              <Input disabled value="76890" />
            </div>

            <div>
              <Label>Item Name</Label>
              <Input
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
              />
            </div>

            <div>
              <Label>Description</Label>
              <Input
                value={form.description}
                onChange={(e) => handleChange("description", e.target.value)}
              />
            </div>

            <div>
              <Label>Supplier</Label>
              <Input
                value={form.supplier}
                onChange={(e) => handleChange("supplier", e.target.value)}
              />
            </div>

            <div>
              <Label>Unit Of Measurement</Label>
              <select
                className="w-full border rounded-md p-2"
                value={form.unitOfMeasurement}
                onChange={(e) =>
                  handleChange("unitOfMeasurement", e.target.value)
                }
              >
                {units.map((unit) => (
                  <option key={unit} value={unit}>
                    {unit}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <Label>Expiry Date</Label>
              <Input
                type="date"
                onChange={(e) => handleChange("expiryDate", e.target.value)}
              />
            </div>
          </div>

          {error && (
            <p className="text-red-500 text-sm mb-2">{error}</p>
          )}

          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={loading}
              className="bg-[#5B5AF7]"
            >
              {loading ? "Adding..." : "Add Stock"}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}