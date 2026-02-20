"use client";

import { CheckCircle } from "lucide-react";
import { useEffect } from "react";

interface Props {
  onClose: () => void;
}

export default function PasswordSuccessToast({ onClose }: Props) {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="absolute right-4 top-4 z-50 w-[90%] max-w-sm rounded-xl border bg-white p-4 shadow-lg sm:right-6 sm:top-6">
      <div className="flex items-start gap-3">
        <CheckCircle className="mt-0.5 text-green-600" size={22} />
        <div>
          <p className="font-medium">Password Updated</p>
          <p className="text-sm text-muted-foreground">
            Your password has been changed successfully
          </p>
        </div>
      </div>
    </div>
  );
}
