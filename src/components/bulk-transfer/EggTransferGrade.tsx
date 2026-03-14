interface EggTransferGradeValue {
  unsorted: number;
  medium: number;
  standard: number;
  pullet: number;
}

interface EggTransferGradeProps {
  value: EggTransferGradeValue;
  onChange: (value: EggTransferGradeValue) => void;
}

export default function EggTransferGrade({
  value,
  onChange,
}: EggTransferGradeProps) {

  return (
    <div className="bg-white p-6 rounded-xl border shadow-sm">

      <h2 className="font-semibold text-lg mb-4">
        Egg Transfer by Grade
      </h2>

      <div className="grid md:grid-cols-4 gap-4">

        <div>
          <label className="text-sm">Unsorted</label>
          <div className="flex border rounded-lg mt-1">
            <input
              type="number"
              value={value.unsorted}
              onChange={(e) =>
                onChange({ ...value, unsorted: Number(e.target.value) || 0 })
              }
              className="flex-1 p-2 outline-none"
            />
            <span className="px-3 flex items-center text-gray-500 text-sm">
              Pieces
            </span>
          </div>
        </div>

        <div>
          <label className="text-sm">Medium</label>
          <div className="flex border rounded-lg mt-1">
            <input
              type="number"
              value={value.medium}
              onChange={(e) =>
                onChange({ ...value, medium: Number(e.target.value) || 0 })
              }
              className="flex-1 p-2 outline-none"
            />
            <span className="px-3 flex items-center text-gray-500 text-sm">
              Pieces
            </span>
          </div>
        </div>

        <div>
          <label className="text-sm">Standard</label>
          <div className="flex border rounded-lg mt-1">
            <input
              type="number"
              value={value.standard}
              onChange={(e) =>
                onChange({ ...value, standard: Number(e.target.value) || 0 })
              }
              className="flex-1 p-2 outline-none"
            />
            <span className="px-3 flex items-center text-gray-500 text-sm">
              Pieces
            </span>
          </div>
        </div>

        <div>
          <label className="text-sm">Pullet</label>
          <div className="flex border rounded-lg mt-1">
            <input
              type="number"
              value={value.pullet}
              onChange={(e) =>
                onChange({ ...value, pullet: Number(e.target.value) || 0 })
              }
              className="flex-1 p-2 outline-none"
            />
            <span className="px-3 flex items-center text-gray-500 text-sm">
              Pieces
            </span>
          </div>
        </div>

      </div>

    </div>
  )
}