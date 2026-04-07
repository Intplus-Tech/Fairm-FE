"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Step1() {
  const router = useRouter();

  const [form, setForm] = useState({
    businessName: "",
    fullName: "",
    email: "",
    phone: "",
    country: "",
    farmSize: "",
  });
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Setup Your Account</h2>

      <div className="space-y-5">
        <Input label="Business Name" />

        <div className="grid md:grid-cols-2 gap-4">
          <Input label="Full name" />
          <Input label="Email" />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <Input label="Phone number" />
          <Input label="Country" />
        </div>
        <Input label="Farm Size" />

        <button
          onClick={() => router.push("/auth/signup/step2")}
          className="w-full mt-6 py-4 text-white rounded-xl bg-gradient-to-r from-[#6C63FF] to-[#4A3AFF]"
        >
          Next
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
        className="w-full mt-2 border rounded-lg px-4 py-3"
      />
    </div>
  );
}