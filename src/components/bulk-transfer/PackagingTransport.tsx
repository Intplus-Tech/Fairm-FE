export default function PackagingTransport() {
  return (
    <div className="bg-white p-6 rounded-xl border shadow-sm space-y-4">

      <h2 className="font-semibold text-lg">
        Packaging and Transport
      </h2>

      <div className="grid md:grid-cols-4 gap-4">

        <div>
          <label className="text-sm">Crates Used</label>
          <input defaultValue="0" className="w-full border rounded-lg p-2 mt-1"/>
        </div>

        <div>
          <label className="text-sm">Sacks Used</label>
          <input defaultValue="0" className="w-full border rounded-lg p-2 mt-1"/>
        </div>

        <div>
          <label className="text-sm block mb-2">Palletized</label>

          <div className="flex gap-4">
            <label className="flex gap-2 items-center">
              <input type="radio" name="pallet"/>
              Yes
            </label>

            <label className="flex gap-2 items-center">
              <input type="radio" name="pallet"/>
              No
            </label>
          </div>

        </div>

        <div>
          <label className="text-sm block mb-2">Strapped</label>

          <div className="flex gap-4">
            <label className="flex gap-2 items-center">
              <input type="radio" name="strap"/>
              Yes
            </label>

            <label className="flex gap-2 items-center">
              <input type="radio" name="strap"/>
              No
            </label>
          </div>

        </div>

      </div>
    </div>
  )
}