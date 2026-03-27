"use client";

import { useRef } from "react";

interface PhotosEvidenceProps {
  value: string[];
  onUpload: (files: FileList | null) => void;
}

export default function PhotosEvidence({ value, onUpload }: PhotosEvidenceProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpload(e.target.files);
  };

  const photos = ["Egg Sample Photos", "Cracked Eggs", "Grading Set Up"];

  return (
    <div className="mt-6 rounded-md border p-4">
      <p className="mb-2 font-semibold">Photos & Evidence</p>

      <input
        type="file"
        multiple
        accept="image/*"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFilesChange}
      />

      <div className="flex gap-3">
        {photos.map((photo) => (
          <button
            key={photo}
            type="button"
            className="px-4 py-2 border border-dashed rounded-md text-gray-700"
            onClick={handleButtonClick}
          >
            📷 {photo}
          </button>
        ))}
      </div>

      {/* ✅ SUCCESS UI */}
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