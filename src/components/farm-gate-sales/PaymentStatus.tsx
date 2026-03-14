import { FarmGateSaleRequest } from "@/types/farm-gate-sales";

interface Props {
  saleData: FarmGateSaleRequest;
  updateField: <K extends keyof FarmGateSaleRequest>(
    field: K,
    value: FarmGateSaleRequest[K]
  ) => void;
}


export default function PaymentStatus({ saleData, updateField }: Props) {
  const handlePaymentChange = (
    field: keyof FarmGateSaleRequest["paymentStatus"],
    value: string | boolean
  ) => {
    updateField("paymentStatus", {
      ...saleData.paymentStatus,
      [field]: value,
    });
  };


  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border space-y-4">

      <h2 className="font-semibold text-lg">
        Payment Status
      </h2>

      <div className="grid md:grid-cols-3 gap-4">

        <div>
          <label className="text-sm">Amount Received</label>
          <input
            value={saleData.paymentStatus.amountReceived}
            onChange={(e) =>
              handlePaymentChange("amountReceived", e.target.value)
            }
            className="border rounded-lg p-2 w-full mt-1"
          />
        </div>

        <div>
          <label className="text-sm">Balance Due</label>
          <input
            value={saleData.paymentStatus.balanceDue}
            onChange={(e)=>handlePaymentChange("balanceDue", e.target.value)}
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
                checked={saleData.paymentStatus.receipt === true}
                onChange={() => handlePaymentChange("receipt", true)}
              />
              Yes
            </label>

            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="receipt"
                checked={saleData.paymentStatus.receipt === false}
                onChange={() => handlePaymentChange("receipt", false)}
              />
              No
            </label>

          </div>

        </div>

      </div>

    </div>
  );
}