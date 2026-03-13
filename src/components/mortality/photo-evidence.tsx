"use client";

interface PhotoEvidenceProps {
  photosEvidences: string[];
  setPhotosEvidences: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function PhotoEvidence({
  photosEvidences,
  setPhotosEvidences,
}: PhotoEvidenceProps) {
  const addPlaceholder = (type: string) => {
    const value = window.prompt(`Enter ${type} URL or file reference`);
    if (!value) return;

    setPhotosEvidences((prev) => [...prev, value]);
  };
  
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Photos & Evidence</h2>

      <div className="flex flex-wrap gap-4 mb-4">
        <button
          type="button"
          onClick={() => addPlaceholder("photo")}
          className="border border-dashed rounded-lg px-4 py-3 text-sm"
        >
          📷 Add Photos of sick bird
        </button>

        <button
          type="button"
          onClick={() => addPlaceholder("video")}
          className="border border-dashed rounded-lg px-4 py-3 text-sm"
        >
          🎥 Add Video
        </button>

        <button
          type="button"
          onClick={() => addPlaceholder("voice note")}
          className="border border-dashed rounded-lg px-4 py-3 text-sm"
        >
          🎤 Record Voice Note
        </button>
      </div>

      {photosEvidences.length > 0 && (
        <div className="space-y-2">
          {photosEvidences.map((item, index) => (
            <div
              key={`${item}-${index}`}
              className="flex items-center justify-between border rounded p-2 text-sm"
            >
              <span className="truncate">{item}</span>
              <button
                type="button"
                onClick={() =>
                  setPhotosEvidences((prev) =>
                    prev.filter((_, i) => i !== index)
                  )
                }
                className="text-red-500"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}