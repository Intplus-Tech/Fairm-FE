// components/PhotosEvidence.tsx
interface PhotosEvidenceProps {
  value: string[];
  onUpload: (files: FileList | null) => void;
}

export default function PhotosEvidence({
  value,
  onUpload,
}: PhotosEvidenceProps) {
  const photos = ["Egg Sample Photos", "Cracked Eggs", "Grading Set Up"];
  return (
    <div className="mt-6">
      <p className="mb-2 font-semibold">Photos & Evidence</p>

      <label className="inline-flex items-center px-4 py-2 border border-dashed rounded-md text-gray-700 cursor-pointer">
        📷 Upload Photos
        <input
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => onUpload(e.target.files)}
        />
      </label>

      <div className="flex gap-3">
        {photos.map(photo => (
          <button key={photo} className="px-4 py-2 border border-dashed rounded-md text-gray-700">
            📷 {photo}
          </button>
        ))}

      {value.length > 0 && (
        <div className="mt-4 space-y-2">
          <p className="text-sm font-medium">Uploaded Photos</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {value.map((url, index) => (
              <div
                key={`${url}-${index}`}
                className="text-sm border rounded p-2 break-all bg-white"
              >
                {url}
              </div>
            ))}
          </div>
        </div>
      )}
      </div>
    </div>
  );
}