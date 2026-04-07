"use client";

import SignupLayout from "@/components/signup/signup-layout";
import Step1 from "./step1-form";

export default function Page() {
  return (
    <SignupLayout step={1}>
      <Step1 />
    </SignupLayout>
  );
}