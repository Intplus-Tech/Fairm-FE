// components/PhotosEvidence.tsx
export default function PhotosEvidence() {
  const photos = ["Egg Sample Photos", "Cracked Eggs", "Grading Set Up"];
  return (
    <div className="mt-6">
      <p className="mb-2 font-semibold">Photos & Evidence</p>
      <div className="flex gap-3">
        {photos.map(photo => (
          <button key={photo} className="px-4 py-2 border border-dashed rounded-md text-gray-700">
            📷 {photo}
          </button>
        ))}
      </div>
    </div>
  );
}