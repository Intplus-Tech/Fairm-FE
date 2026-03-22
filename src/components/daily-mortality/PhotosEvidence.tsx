"use client";

import { useRef } from "react";

export default function PhotosEvidence({
  onUpload,
}: {
  onUpload: (files: FileList | null) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="rounded-lg border p-4 space-y-2">
      <h3 className="font-semibold">Photos & Evidence</h3>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        hidden
        onChange={(e) => onUpload(e.target.files)}
      />

      <div className="flex gap-2 flex-wrap">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="rounded-md border px-3 py-1 text-sm"
        >
          📷 Add Photos of sick bird
        </button>
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="rounded-md border px-3 py-1 text-sm"
        >
          🥚 Egg Sample Photos
        </button>
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="rounded-md border px-3 py-1 text-sm"
        >
          🥚 Cracked Eggs
        </button>
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="rounded-md border px-3 py-1 text-sm"
        >
          📊 Grading Setup
        </button>
      </div>
    </div>
  );
}