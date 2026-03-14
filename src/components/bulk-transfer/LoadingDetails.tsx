interface LoadingDetailsValue {
  loadingStart: Date;
  loadingEnd: Date;
  loadingTeam: string;
  supervisor: string;
}

interface LoadingDetailsProps {
  value: LoadingDetailsValue;
  onChange: (value: LoadingDetailsValue) => void;
}

const toTimeInputValue = (date: Date | string) => {
  const d = new Date(date);
  const hours = String(d.getHours()).padStart(2, "0");
  const minutes = String(d.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
};

const updateTime = (baseDate: Date | string, time: string) => {
  const d = new Date(baseDate);
  const [hours, minutes] = time.split(":").map(Number);
  d.setHours(hours || 0, minutes || 0, 0, 0);
  return d;
};

export default function LoadingDetails({
  value,
  onChange,
}: LoadingDetailsProps) {
  return (
    <div className="bg-white p-6 rounded-xl border shadow-sm space-y-4">

      <h2 className="font-semibold text-lg">Loading Details</h2>

      <div className="grid md:grid-cols-4 gap-4">

        <div>
          <label className="text-sm">Loading Starts</label>
          <input type="time"
            value={toTimeInputValue(value.loadingStart)}
            onChange={(e) =>
              onChange({
                ...value,
                loadingStart: updateTime(value.loadingStart, e.target.value),
              })
            } 
            className="w-full border rounded-lg p-2 mt-1"/>
        </div>

        <div>
          <label className="text-sm">Loading End</label>
          <input type="time"
            value={toTimeInputValue(value.loadingEnd)}
            onChange={(e) =>
              onChange({
                ...value,
                loadingEnd: updateTime(value.loadingEnd, e.target.value),
              })
            } 
            className="w-full border rounded-lg p-2 mt-1"/>
        </div>

        <div>
          <label className="text-sm">Loading Team</label>
          <input
            value={value.loadingTeam}
            onChange={(e) => onChange({ ...value, loadingTeam: e.target.value })}
            className="w-full border rounded-lg p-2 mt-1"
            placeholder="Enter loading team"
          />
        </div>

        <div>
          <label className="text-sm">Supervisor</label>
          <input
            value={value.supervisor}
            onChange={(e) => onChange({ ...value, supervisor: e.target.value })}
            className="w-full border rounded-lg p-2 mt-1"
            placeholder="Enter supervisor"
          />
        </div>

      </div>
    </div>
  )
}