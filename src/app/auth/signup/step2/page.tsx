"use client";

import SignupLayout from "@/components/signup/signup-layout";
import Step2 from "./step2-form";

export default function Page() {
  return (
    <SignupLayout step={2}>
      <Step2 />
    </SignupLayout>
  );
}