"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function Step2() {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleSubmit = () => {
    try {
      // Required validation
      if (!password || !confirm) {
        toast.error("Please fill all required fields");
        return;
      }

      // Password match validation
      if (password !== confirm) {
        toast.error("Passwords do not match");
        return;
      }

      // Save password
      localStorage.setItem("signup-step2", JSON.stringify({ password }));

      // Success toast
      toast.success("Account created successfully. Check your email for verification");

      // Navigate to verification
      router.push("/auth/signup/step3");

    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">
        Create Your Admin Account
      </h2>

      <div className="space-y-5">
        <Input label="Password" onChange={setPassword} />
        <Input label="Confirm Password" onChange={setConfirm} />

        <button
          onClick={handleSubmit}
          className="mt-6 px-6 py-4 rounded-xl text-white bg-gradient-to-r from-[#6C63FF] to-[#4A3AFF]"
        >
          Create My Business Account
        </button>
      </div>
    </div>
  );
}

function Input({ label, onChange }: { label: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="text-sm font-medium">{label}</label>
      <input
        type="password"
        onChange={(e) => onChange(e.target.value)}
        className="w-full mt-2 border rounded-lg px-4 py-3"
      />
    </div>
  );
}