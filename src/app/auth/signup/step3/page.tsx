"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function EmailVerification() {

const router = useRouter()
const [email,setEmail] = useState("")

useEffect(()=>{
const data = localStorage.getItem("signup-step1")
if(data){
const parsed = JSON.parse(data)
setEmail(parsed.email)
}
},[])

const verify = ()=>{
localStorage.setItem("verified","true")
router.push("/auth/signup/success")
}

  return (
    <div className="min-h-screen bg-[#F5F6FA] flex flex-col items-center justify-center px-4">
      
      <div className="mb-8">
        <Image
          src="/Fairmlogo.svg"
          alt="Fairm"
          width={95}
          height={30}
          className="mx-auto"
        />
      </div>

      <div className="w-full max-w-[560px] bg-[#EDEBFF] rounded-2xl shadow-[0px_20px_60px_rgba(0,0,0,0.08)] px-8 py-12 text-center">

        <h1 className="text-[26px] md:text-[28px] font-semibold text-[#1C1C1C] mb-2">
          Welcome To FAIRM
        </h1>

        <p className="text-[#6B6B6B] text-[15px] mb-8">
          One last step to get started...
        </p>

        <p className="text-[#6B6B6B] text-[14px] mb-2">
          We sent a verification link to:
        </p>

        <p className="text-[#1C1C1C] font-medium mb-6">
          {email}
        </p>

        <p className="text-[#6B6B6B] text-[14px] mb-10 leading-relaxed">
          Click the link in that email to <br />
          verify your account and continue to farm setup.
        </p>

        <button 
        onClick={verify}
        className="bg-gradient-to-r from-[#6B63FF] to-[#4C3EFF] text-white px-8 py-3 rounded-lg shadow-md hover:opacity-90 transition-all duration-200 font-medium">
          Resend Email
        </button>

        <p className="text-[#8C8C8C] text-[12px] mt-5">
          No email? Check spam folder.
        </p>

      </div>

    </div>
  );
}