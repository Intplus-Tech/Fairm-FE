"use client";

import { useRef } from "react";

interface PhotoEvidenceProps {
  value: string[];
  onUpload: (files: FileList | null) => void;
}

export default function PhotoEvidence({ value, onUpload }: PhotoEvidenceProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpload(e.target.files);
  };

  const buttons = [
    "📷 Sick Bird Photos",
    "🥚 Egg Sample Photos",
    "🥚 Cracked Eggs",
    "📊 Grading Setup",
  ];

  return (
    <div className="rounded-lg border p-4 space-y-2">
      <h3 className="font-semibold">Photos & Evidence</h3>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        hidden
        onChange={handleFilesChange}
      />

      <div className="flex gap-2 flex-wrap">
        {buttons.map((btn) => (
          <button
            key={btn}
            type="button"
            className="rounded-md border px-3 py-1 text-sm"
            onClick={handleButtonClick}
          >
            {btn}
          </button>
        ))}
      </div>

      {value.length > 0 && (
        <div className="mt-4">
          <p className="text-sm font-semibold text-green-600">
            {value.length} file(s) uploaded successfully
          </p>

          <div className="grid grid-cols-2 gap-2 mt-2">
            {value.map((url, index) => (
              <img
                key={index}
                src={url}
                alt="uploaded"
                className="h-24 w-full object-cover rounded-md border"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}