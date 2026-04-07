"use client";

import { useRouter } from "next/navigation";

export default function Success() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-[#F1F0FF] p-10 rounded-2xl text-center max-w-lg">
        <div className="w-20 h-20 bg-green-500 rounded-full mx-auto" />

        <h2 className="text-2xl font-semibold mt-6">
          Email Verified
        </h2>

        <button
          onClick={() => router.push("/dashboard")}
          className="mt-6 px-6 py-4 text-white rounded-xl bg-gradient-to-r from-[#6C63FF] to-[#4A3AFF]"
        >
          Continue to Farm Setup
        </button>
      </div>
    </div>
  );
}