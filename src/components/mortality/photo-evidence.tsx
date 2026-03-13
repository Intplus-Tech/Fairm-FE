"use client";

export default function PhotoEvidence() {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Photos & Evidence</h2>

      <div className="flex flex-wrap gap-4">
        <button className="border border-dashed rounded-lg px-4 py-3 text-sm">
          📷 Add Photos of sick bird
        </button>

        <button className="border border-dashed rounded-lg px-4 py-3 text-sm">
          🎥 Add Video
        </button>

        <button className="border border-dashed rounded-lg px-4 py-3 text-sm">
          🎤 Record Voice Note
        </button>
      </div>
    </div>
  );
}