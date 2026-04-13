"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Success() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#F5F6FA] flex flex-col items-center justify-center px-4">

      {/* Logo */}
      <div className="mb-8">
        <Image
          src="/Fairmlogo.svg"
          alt="Fairm"
          width={95}
          height={30}
          className="mx-auto"
        />
      </div>

      {/* Card */}
      <div className="w-full max-w-[560px] bg-[#EDEBFF] rounded-2xl shadow-[0px_20px_60px_rgba(0,0,0,0.08)] px-8 py-12">

        <div className="text-center">

          {/* Success Icon */}
          <div className="w-20 h-20 bg-[#22C55E] rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-10 h-10 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          {/* Title */}
          <h2 className="text-[24px] font-semibold text-[#1C1C1C] mb-2">
            Email Verified
          </h2>

          {/* Subtitle */}
          <p className="text-[#6B6B6B] text-[14px] leading-relaxed mb-6">
            Your Email has been successfully verified
            <br />
            and your account is now active.
          </p>

          {/* Verified Box */}
          <div className="bg-white rounded-lg px-4 py-4 flex items-center gap-3 mb-8 shadow-sm border border-[#E6E6E6]">

            <div className="w-6 h-6 bg-[#22C55E] rounded-full flex items-center justify-center">
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            <div className="text-left">
              <p className="text-[14px] font-medium text-[#1C1C1C]">
                Account Security Verified
              </p>
              <p className="text-[12px] text-[#6B6B6B]">
                name@email.com
              </p>
            </div>

          </div>

        </div>

        {/* What's Next */}
        <div className="mb-8">

          <p className="text-[14px] font-medium text-[#1C1C1C] mb-3">
            What's Next?
          </p>

          <div className="space-y-2 text-[14px] text-[#6B6B6B]">

            <p className="flex items-center gap-2">
              <span className="text-[#6C63FF]">→</span>
              Complete your farm set up
            </p>

            <p className="flex items-center gap-2">
              <span className="text-[#6C63FF]">→</span>
              Invite team members
            </p>

          </div>

        </div>

        {/* Button */}
        <div className="text-center">
          <button
            onClick={() => router.push("/dashboard")}
            className="px-8 py-3 rounded-lg text-white bg-gradient-to-r from-[#6C63FF] to-[#4A3AFF] shadow-lg hover:opacity-90 transition-all duration-200 font-medium"
          >
            Continue to Farm Setup →
          </button>
        </div>

      </div>

    </div>
  );
}