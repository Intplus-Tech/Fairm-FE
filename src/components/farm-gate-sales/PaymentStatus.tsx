interface Props {
  saleData: any;
  updateField: (field: string, value: any) => void;
}

export default function PaymentStatus({ saleData, updateField }: Props) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border space-y-4">

      <h2 className="font-semibold text-lg">
        Payment Status
      </h2>

      <div className="grid md:grid-cols-3 gap-4">

        <div>
          <label className="text-sm">Amount Received</label>
          <input
            value={saleData.amountReceived}
            onChange={(e)=>updateField("amountReceived", e.target.value)}
            className="border rounded-lg p-2 w-full mt-1"
          />
        </div>

        <div>
          <label className="text-sm">Balance Due</label>
          <input
            value={saleData.balanceDue}
            onChange={(e)=>updateField("balanceDue", e.target.value)}
            className="border rounded-lg p-2 w-full mt-1"
          />
        </div>

        <div>

          <label className="text-sm block mb-2">
            Receipt Issued
          </label>

          <div className="flex gap-4">

            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="receipt"
                onChange={()=>updateField("receiptIssued","yes")}
              />
              Yes
            </label>

            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="receipt"
                onChange={()=>updateField("receiptIssued","no")}
              />
              No
            </label>

          </div>

        </div>

      </div>

    </div>
  );
}