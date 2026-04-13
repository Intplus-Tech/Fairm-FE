"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

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

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNext = () => {
    const { businessName, fullName, email, phone, country, farmSize } = form;

    if (
      !businessName ||
      !fullName ||
      !email ||
      !phone ||
      !country ||
      !farmSize
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    router.push("/auth/signup/step2");
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Setup Your Account</h2>

      <div className="space-y-5">
        <Input
          label="Business Name"
          value={form.businessName}
          onChange={(e) => handleChange("businessName", e.target.value)}
        />

        <div className="grid md:grid-cols-2 gap-4">
          <Input
            label="Full name"
            value={form.fullName}
            onChange={(e) => handleChange("fullName", e.target.value)}
          />
          <Input
            label="Email"
            value={form.email}
            onChange={(e) => handleChange("email", e.target.value)}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <Input
            label="Phone number"
            value={form.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
          />
          <Input
            label="Country"
            value={form.country}
            onChange={(e) => handleChange("country", e.target.value)}
          />
        </div>

        <Input
          label="Farm Size"
          value={form.farmSize}
          onChange={(e) => handleChange("farmSize", e.target.value)}
        />

        <button
          onClick={handleNext}
          className="w-full mt-6 py-4 text-white rounded-xl bg-gradient-to-r from-[#6C63FF] to-[#4A3AFF]"
        >
          Next
        </button>
      </div>
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div>
      <label className="text-sm font-medium">{label}</label>
      <input
        value={value}
        onChange={onChange}
        className="w-full mt-2 border rounded-lg px-4 py-3"
      />
    </div>
  );
}