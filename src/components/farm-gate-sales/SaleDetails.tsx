interface Props {
  saleData: any;
  updateField: (field: string, value: any) => void;
}

export default function SaleDetails({ saleData, updateField }: Props) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border space-y-4">

      <h2 className="font-semibold text-lg">Sale Details</h2>

      <div className="grid md:grid-cols-2 gap-4">

        <div>
          <label className="text-sm">Customer Name</label>
          <input
            value={saleData.customerName}
            onChange={(e) =>
              updateField("customerName", e.target.value)
            }
            className="w-full border rounded-lg p-2 mt-1"
            placeholder="Exp: John Doe"
          />
        </div>

        <div>
          <label className="text-sm">Contact</label>
          <input
            value={saleData.contact}
            onChange={(e) =>
              updateField("contact", e.target.value)
            }
            className="w-full border rounded-lg p-2 mt-1"
            placeholder="Enter Phone Number"
          />
        </div>

      </div>

      <div>
        <label className="text-sm block mb-2">Payment Method</label>

        <div className="flex gap-4">

          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="payment"
              checked={saleData.paymentMethod === "cash"}
              onChange={() => updateField("paymentMethod", "cash")}
            />
            Cash
          </label>

          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="payment"
              checked={saleData.paymentMethod === "bank"}
              onChange={() => updateField("paymentMethod", "bank")}
            />
            Bank Transfer
          </label>

        </div>
      </div>

    </div>
  );
}