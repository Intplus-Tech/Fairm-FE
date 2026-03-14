interface DestinationSectionProps {
  value: string;
  onChange: (value: string) => void;
}

export default function DestinationSection({
  value,
  onChange,
}: DestinationSectionProps) {
  return (
    <div className="bg-white p-6 rounded-xl border shadow-sm">
      <div>
        <label className="text-sm">Destination</label>
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full border rounded-lg p-2 mt-1"
          placeholder="Enter destination (e.g. Lagos)"
        />
      </div>

    </div>
  )
}