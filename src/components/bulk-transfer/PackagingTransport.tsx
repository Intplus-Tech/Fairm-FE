interface PackagingTransportValue {
  cratesUsed: number;
  sacksUsed: number;
  palletized: boolean;
  strapped: boolean;
}

interface PackagingTransportProps {
  value: PackagingTransportValue;
  onChange: (value: PackagingTransportValue) => void;
}

export default function PackagingTransport({
  value,
  onChange,
}: PackagingTransportProps) {
  return (
    <div className="bg-white p-6 rounded-xl border shadow-sm space-y-4">

      <h2 className="font-semibold text-lg">
        Packaging and Transport
      </h2>

      <div className="grid md:grid-cols-4 gap-4">

        <div>
          <label className="text-sm">Crates Used</label>
          <input defaultValue="0"
            type="number"
            value={value.cratesUsed}
            onChange={(e) =>
              onChange({ ...value, cratesUsed: Number(e.target.value) || 0 })
            }
            className="w-full border rounded-lg p-2 mt-1"
          />
        </div>

        <div>
          <label className="text-sm">Sacks Used</label>
          <input defaultValue="0"
            type="number"
            value={value.sacksUsed}
            onChange={(e) =>
              onChange({ ...value, sacksUsed: Number(e.target.value) || 0 })
            } 
            className="w-full border rounded-lg p-2 mt-1"/>
        </div>

        <div>
          <label className="text-sm block mb-2">Palletized</label>

          <div className="flex gap-4">
            <label className="flex gap-2 items-center">
              <input type="radio" name="pallet"
                checked={value.palletized === true}
                onChange={() => onChange({ ...value, palletized: true })}
                />
              Yes
            </label>

            <label className="flex gap-2 items-center">
              <input type="radio" name="pallet"
                checked={value.palletized === false}
                onChange={() => onChange({ ...value, palletized: false })}
                />
              No
            </label>
          </div>

        </div>

        <div>
          <label className="text-sm block mb-2">Strapped</label>

          <div className="flex gap-4">
            <label className="flex gap-2 items-center">
              <input type="radio" name="strap"
                checked={value.strapped === true}
                onChange={() => onChange({ ...value, strapped: true })}
                />
              Yes
            </label>

            <label className="flex gap-2 items-center">
              <input type="radio" name="strap"
                checked={value.strapped === false}
                onChange={() => onChange({ ...value, strapped: false })}/>
              No
            </label>
          </div>

        </div>

      </div>
    </div>
  )
}