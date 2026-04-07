"use client";

import { useRouter } from "next/navigation";

export default function Step2() {
  const router = useRouter();

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">
        Create Your Admin Account
      </h2>

      <div className="space-y-5">
        <Input label="Password" />
        <Input label="Confirm Password" />
     <button
          onClick={() => router.push("/auth/signup/success")}
          className="mt-6 px-6 py-4 rounded-xl text-white bg-gradient-to-r from-[#6C63FF] to-[#4A3AFF]"
        >
          Create My Business Account
        </button>
      </div>
    </div>
  );
}

function Input({ label }: { label: string }) {
  return (
    <div>
      <label className="text-sm font-medium">{label}</label>
      <input
        type="password"
        className="w-full mt-2 border rounded-lg px-4 py-3"
      />
      </div>
  );
}