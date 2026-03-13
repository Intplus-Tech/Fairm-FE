interface QualityControlValue {
  crackedCrates: number;
  crackedPieces: number;
  brokenEggs: number;
  dirtyRemoved: number;
}

interface QualityControlProps {
  value: QualityControlValue;
  onChange: (value: QualityControlValue) => void;
}

export default function QualityControl({
  value,
  onChange,
}: QualityControlProps) {
  return (
    <div className="bg-white p-6 rounded-xl border shadow-sm">

      <h2 className="font-semibold text-lg mb-4">
        Quality Control During Loading
      </h2>

      <div className="grid md:grid-cols-4 gap-4">

        <div>
          <label className="text-sm">Cracked (Crates)</label>
          <input
            type="number"
            value={value.crackedCrates}
            onChange={(e) =>
              onChange({
                ...value,
                crackedCrates: Number(e.target.value) || 0,
              })
            }
            className="w-full border rounded-lg p-2 mt-1"
          />
        </div>

        <div>
          <label className="text-sm">Cracked (Pieces)</label>
          <input
            type="number"
            value={value.crackedPieces}
            onChange={(e) =>
              onChange({
                ...value,
                crackedPieces: Number(e.target.value) || 0,
              })
            }
            className="w-full border rounded-lg p-2 mt-1"
          />
        </div>

        <div>
          <label className="text-sm">Broken Eggs</label>
          <input
            type="number"
            value={value.brokenEggs}
            onChange={(e) =>
              onChange({
                ...value,
                brokenEggs: Number(e.target.value) || 0,
              })
            }
            className="w-full border rounded-lg p-2 mt-1"
          />
        </div>

        <div>
          <label className="text-sm">Dirty Removed</label>
          <input
            type="number"
            value={value.dirtyRemoved}
            onChange={(e) =>
              onChange({
                ...value,
                dirtyRemoved: Number(e.target.value) || 0,
              })
            }
            className="w-full border rounded-lg p-2 mt-1"
          />
        </div>

      </div>
    </div>
  )
}