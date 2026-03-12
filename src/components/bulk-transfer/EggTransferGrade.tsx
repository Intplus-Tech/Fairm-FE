export default function EggTransferGrade() {
  const grades = ["Unsorted", "Medium", "Standard", "Pullet"]

  return (
    <div className="bg-white p-6 rounded-xl border shadow-sm">

      <h2 className="font-semibold text-lg mb-4">
        Egg Transfer by Grade
      </h2>

      <div className="grid md:grid-cols-4 gap-4">

        {grades.map((grade) => (
          <div key={grade}>
            <label className="text-sm">{grade}</label>

            <div className="flex border rounded-lg mt-1">
              <input
                defaultValue="0"
                className="flex-1 p-2 outline-none"
              />
              <span className="px-3 flex items-center text-gray-500 text-sm">
                Pieces
              </span>
            </div>

          </div>
        ))}

      </div>

    </div>
  )
}