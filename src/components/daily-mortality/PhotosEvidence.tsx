"use client";

export default function PhotosEvidence() {
  return (
    <div className="rounded-lg border p-4 space-y-2">
      <h3 className="font-semibold">Photos & Evidence</h3>
      <div className="flex gap-2 flex-wrap">
        <button className="rounded-md border px-3 py-1 text-sm flex items-center gap-1">
          📷 Add Photos of sick bird
        </button>
        <button className="rounded-md border px-3 py-1 text-sm flex items-center gap-1">
          🎥 Add Video
        </button>
        <button className="rounded-md border px-3 py-1 text-sm flex items-center gap-1">
          🎙 Record Voice Note
        </button>
      </div>
    </div>
  );
}