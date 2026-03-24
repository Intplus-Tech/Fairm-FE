"use client";

type Row = {
  pen: string;
  feed: string;
  opening: number | "";
  fed: number | "";
  closing: number | "";
};

type Props = {
  rows: Row[];
  setRows: React.Dispatch<React.SetStateAction<Row[]>>;
};

export default function FeedConsumptionTable({ rows, setRows }: Props) {
  const handleChange = (
    index: number,
    key: keyof Row,
    value: string
  ) => {
    const updated = [...rows];
    updated[index] = {
      ...updated[index],
      [key]:
        key === "pen" || key === "feed"
          ? value
          : value === ""
          ? ""
          : Number(value),
    };
    setRows(updated);
  };

  return (
    <div className="bg-[#FFFFFF] rounded-2xl border border-gray-100 p-6 text-white">
      {/* TITLE */}
      <h2 className="font-semibold mb-4 text-indigo-400">
        Feed Consumption By Pen
      </h2>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          {/* HEADER */}
          <thead className="bg-gray-100 text-[#1C155F]">
            <tr>
              <th className="px-4 py-3 text-left">Pen</th>
              <th className="px-4 py-3 text-left">Feed Type</th>
              <th className="px-4 py-3 text-center">Opening (Bags)</th>
              <th className="px-4 py-3 text-center">Fed Today (Bags)</th>
              <th className="px-4 py-3 text-center">Closing (Bags)</th>
              <th className="px-4 py-3 text-center">Consumed (Bags)</th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody>
            {rows.map((row, i) => {
              const consumed =
                Number(row.opening || 0) +
                Number(row.fed || 0) -
                Number(row.closing || 0);

              return (
                <tr
                  key={i}
                  className="border-b  text-center"
                >
                  {/* PEN */}
                  <td className="px-4 py-4 text-left text-indigo-400">
                    {row.pen}
                  </td>

                  {/* FEED TYPE */}
                  <td className="px-4 py-4">
                    <select
                      className="text-[#170F49] border border-gray-400 rounded px-3 py-1  outline-none"
                      value={row.feed}
                      onChange={(e) =>
                        handleChange(i, "feed", e.target.value)
                      }
                    >
                      <option value="">Select</option>
                      <option value="LM">LM</option>
                      <option value="Starter">Starter</option>
                    </select>
                  </td>

                  {/* OPENING */}
                  <td className="px-4 py-4">
                    <input
                      type="number"
                      className="bg-gray-300 text-black rounded px-2 py-1 w-20 text-center"
                      value={row.opening}
                      onChange={(e) =>
                        handleChange(i, "opening", e.target.value)
                      }
                    />
                  </td>

                  {/* FED TODAY */}
                  <td className="px-4 py-4">
                    <div className="flex flex-col items-center gap-1">
                      <input
                        type="number"
                        className="bg-gray-300 text-black rounded px-2 py-1 w-16 text-center"
                        value={row.fed}
                        onChange={(e) =>
                          handleChange(i, "fed", e.target.value)
                        }
                      />

                      {/* TIME (UI ONLY like screenshot) */}
                      <select className="bg-gray-300 text-black text-xs rounded px-2 py-1">
                        <option>00:00</option>
                        <option>7:30</option>
                      </select>
                    </div>
                  </td>

                  {/* CLOSING */}
                  <td className="px-4 py-4">
                    <input
                      type="number"
                      className="bg-gray-300 text-black rounded px-2 py-1 w-20 text-center"
                      value={row.closing}
                      onChange={(e) =>
                        handleChange(i, "closing", e.target.value)
                      }
                    />
                  </td>

                  {/* CONSUMED */}
                  <td className="px-4 py-4">
                    <div className="flex flex-col items-center gap-1">
                      <div className="bg-gray-300 text-black rounded px-3 py-1 w-16 text-center">
                        {consumed}
                      </div>

                      {/* SMALL TEXT (UI ONLY) */}
                      <span className="text-[10px] text-indigo-400">
                        {consumed > 0
                          ? `${(consumed * 20).toFixed(2)}g/bird`
                          : ""}
                      </span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}