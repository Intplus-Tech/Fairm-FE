interface Props {
  saleData: any
  updateField: (field: string, value: any) => void
}

export default function EggSalesTable({ saleData, updateField }: Props) {

  const rows = [
    { grade: "Pullet (Grade A)", qty: 85, price: 5500, total: 467500, note: "Best Grade" },
    { grade: "Medium (Grade B)" },
    { grade: "Small (Grade C)" },
    { grade: "Cracked (Discount)" },
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border">

      <h2 className="font-semibold text-lg mb-4">
        Egg Sales by Grade
      </h2>

      <table className="w-full text-sm">

        <thead className="text-left text-gray-500">
          <tr>
            <th>Grade</th>
            <th>Quantity (Crates)</th>
            <th>Price/Crate</th>
            <th>Total</th>
            <th>Notes</th>
          </tr>
        </thead>

        <tbody className="divide-y">

          {rows.map((row, i) => (
            <tr key={i} className="h-14">

              <td>{row.grade}</td>

              <td>
                <input
                  defaultValue={row.qty}
                  className="border rounded p-1 w-24"
                />
              </td>

              <td>
                <input
                  defaultValue={row.price ? `₦ ${row.price}` : ""}
                  className="border rounded p-1 w-28"
                />
              </td>

              <td>
                <input
                  defaultValue={row.total ? `₦ ${row.total.toLocaleString()}` : ""}
                  className="border rounded p-1 w-32"
                />
              </td>

              <td>
                <input
                  defaultValue={row.note}
                  placeholder="Type here..."
                  className="border rounded p-1 w-full"
                />
              </td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}