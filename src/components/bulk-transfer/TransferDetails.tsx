interface TransferDetailsValue {
  vehicle: string;
  driverName: string;
  departureTime: Date;
  estimatedArrival: Date;
  contactPerson: string;
  phoneNumber: string;
}

interface TransferDetailsProps {
  value: TransferDetailsValue;
  onChange: (value: TransferDetailsValue) => void;
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

export default function TransferDetails({
  value,
  onChange,
}: TransferDetailsProps) {
  return (
    <div className="bg-white p-6 rounded-xl border shadow-sm space-y-4">

      <h2 className="font-semibold text-lg">Transfer Details</h2>

      <div className="grid md:grid-cols-3 gap-4">

        <div>
          <label className="text-sm">Vehicle</label>
          <input
            value={value.vehicle}
            onChange={(e) => onChange({ ...value, vehicle: e.target.value })}
            className="w-full border rounded-lg p-2 mt-1"
            placeholder="Enter vehicle"
          />
        </div>

        <div>
          <label className="text-sm">Driver&apos;s Name</label>
          <input
            value={value.driverName}
            onChange={(e) => onChange({ ...value, driverName: e.target.value })}
            className="w-full border rounded-lg p-2 mt-1"
            placeholder="Enter Driver's Name"
          />
        </div>

        <div>
          <label className="text-sm">Departure Time</label>
          <input             
            type="time"
            value={toTimeInputValue(value.departureTime)}
            onChange={(e) =>
              onChange({
                ...value,
                departureTime: updateTime(value.departureTime, e.target.value),
              })
            } className="w-full border rounded-lg p-2 mt-1"/>
        </div>

        <div>
          <label className="text-sm">Estimated Arrival</label>
          <input 
            type="time"
            value={toTimeInputValue(value.estimatedArrival)}
            onChange={(e) =>
              onChange({
                ...value,
                estimatedArrival: updateTime(
                  value.estimatedArrival,
                  e.target.value
                ),
              })
            }
          className="w-full border rounded-lg p-2 mt-1"/>
        </div>

        <div>
          <label className="text-sm">Contact Person</label>
          <input
            value={value.contactPerson}
            onChange={(e) =>
              onChange({ ...value, contactPerson: e.target.value })
            }
            className="w-full border rounded-lg p-2 mt-1"
            placeholder="Enter Contact Name"
          />
        </div>

        <div>
          <label className="text-sm">Phone Number</label>
          <input
            value={value.phoneNumber}
            onChange={(e) => onChange({ ...value, phoneNumber: e.target.value })}
            className="w-full border rounded-lg p-2 mt-1"
            placeholder="Enter Phone Number"
          />
        </div>

      </div>
    </div>
  )
}