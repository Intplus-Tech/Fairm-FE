// components/PageNavigation.tsx
export default function PageNavigation() {
  return (
    <div className="mt-8 flex justify-between">
      <button className="px-6 py-2 border rounded-md text-gray-700">← Back</button>
      <div className="flex gap-3">
        <button className="px-6 py-2 border rounded-md text-gray-700">Save Egg Data</button>
        <button className="px-6 py-2 bg-purple-500 text-white rounded-md">Next: Gate Sales and Transfer →</button>
      </div>
    </div>
  );
}