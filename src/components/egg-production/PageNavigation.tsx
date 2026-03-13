// components/PageNavigation.tsx
interface PageNavigationProps {
  onSave: () => void;
  loading?: boolean;
}

export default function PageNavigation({
  onSave,
  loading = false,
}: PageNavigationProps) {
  return (
    <div className="mt-8 flex justify-between">
      <button className="px-6 py-2 border rounded-md text-gray-700">← Back</button>
      <div className="flex gap-3">
        <button
          type="button"
          onClick={onSave}
          disabled={loading}
          className="px-6 py-2 border rounded-md text-gray-700">
          {loading ? "Saving..." : "Save Egg Data"}
         </button>
        <button className="px-6 py-2 bg-purple-500 text-white rounded-md">Next: Gate Sales and Transfer →</button>
      </div>
    </div>
  );
}