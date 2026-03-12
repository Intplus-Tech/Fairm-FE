export default function Documentation() {
  return (
    <div className="bg-white p-6 rounded-xl border shadow-sm space-y-4">

      <h2 className="font-semibold text-lg">Documentation</h2>

      <div className="grid md:grid-cols-3 gap-4">

        <div>
          <label className="text-sm">Waybill #</label>
          <input
            defaultValue="WB-789012"
            className="w-full border rounded-lg p-2 mt-1"
          />
        </div>

        <div>
          <label className="text-sm">Delivery Note</label>
          <input
            defaultValue="DN-456789"
            className="w-full border rounded-lg p-2 mt-1"
          />
        </div>

        <div>
          <label className="text-sm">Invoice</label>
          <input
            defaultValue="INV-2026-0015-LAG"
            className="w-full border rounded-lg p-2 mt-1"
          />
        </div>

      </div>
    </div>
  )
}