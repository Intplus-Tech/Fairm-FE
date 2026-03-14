import { FarmGateSaleRequest } from "@/types/farm-gate-sales";

interface Props {
  saleData: FarmGateSaleRequest;
  updateField: <K extends keyof FarmGateSaleRequest>(
    field: K,
    value: FarmGateSaleRequest[K]
  ) => void;
}

export default function EggSalesTable({ saleData, updateField }: Props) {
  const rows = [
    { label: "Pullet (Grade A)", key: "pulletGradeA" },
    { label: "Medium (Grade B)", key: "mediumGradeB" },
    { label: "Small (Grade C)", key: "smallGradeC" },
    { label: "Cracked (Discount)", key: "crackedDiscount" },
  ] as const;

  const handleGradeChange = (
    gradeKey: keyof FarmGateSaleRequest["eggSalesGrade"],
    field: "quantity" | "price" | "total" | "notes",
    value: string
  ) => {
    updateField("eggSalesGrade", {
      ...saleData.eggSalesGrade,
      [gradeKey]: {
        ...saleData.eggSalesGrade[gradeKey],
         [field]: field === "notes" ? value : Number(value) || 0,
      },
    });
  };

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
          {rows.map((row) => {
            const grade = saleData.eggSalesGrade[row.key];

            return (
              <tr key={row.key} className="h-14">
                <td>{row.label}</td>

                <td>
                  <input
                    type="number"
                    value={grade.quantity}
                    onChange={(e) =>
                      handleGradeChange(row.key, "quantity", e.target.value)
                    }
                    className="border rounded p-1 w-24"
                  />
                </td>

                <td>
                  <input
                    value={grade.price}
                    onChange={(e) =>
                      handleGradeChange(row.key, "price", e.target.value)
                    }
                    className="border rounded p-1 w-28"
                    placeholder="5500"
                  />
                </td>

                <td>
                  <input
                    value={grade.total}
                    onChange={(e) =>
                      handleGradeChange(row.key, "total", e.target.value)
                    }
                    className="border rounded p-1 w-32"
                    placeholder="467500"
                  />
                </td>

                <td>
                  <input
                    value={grade.notes}
                    onChange={(e) =>
                      handleGradeChange(row.key, "notes", e.target.value)
                    }
                    placeholder="Type here..."
                    className="border rounded p-1 w-full"
                  />
                </td>
              </tr>
            );
          })}
        </tbody>

      </table>

    </div>
  );
}