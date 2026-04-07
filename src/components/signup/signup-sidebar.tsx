"use client";

import Image from "next/image";

export default function SignupSidebar({ step }: { step: number }) {
  return (
    <div className="hidden lg:flex w-[320px] bg-[#F1F0FF] p-8 flex-col justify-between">
      <div>
        <Image
          src="/Fairmlogo.svg"
          alt="Fairm"
          width={120}
          height={40}
        />

        <div className="mt-12 space-y-10">
          <Step
            number={1}
            title="Farm Setup"
             description="Tell us who you are to get started."
            active={step === 1}
          />

          <Step
            number={2}
            title="Create Your Admin Account"
            description="Create your admin account."
            active={step === 2}
          />
        </div>
      </div>

      <div>
        <p className="text-sm font-medium">Need a help?</p>
        <p className="text-xs text-gray-500">chat with live support</p>
      </div>
       </div>
  );
}

function Step({
  number,
  title,
  description,
  active,
}: {
  number: number;
  title: string;
  description: string;
  active: boolean;
}) {
  return (
    <div className="flex gap-4">
      <div
      className={`w-10 h-10 rounded-lg flex items-center justify-center font-semibold
        ${
          active
            ? "bg-gradient-to-r from-[#6C63FF] to-[#4A3AFF] text-white"
            : "bg-white text-gray-500"
        }`}
      >
        {number}
      </div>

      <div>
        <p className="font-medium">{title}</p>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </div>
  );
}