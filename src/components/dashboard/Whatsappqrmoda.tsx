"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import {
  X,
  CheckCircle2,
  Loader2,
  WifiOff,
  RefreshCw,
  
} from "lucide-react";
import {
  whatsAppService,
  pollWhatsAppStatus,
} from "../../../services/alerts.service";
import type { WhatsAppStatusValue } from "@/types/alerts.types";
import { FaWhatsapp } from "react-icons/fa";


type Props = {
  onClose: () => void;
};

export default function WhatsAppQRModal({ onClose }: Props) {
  const [status, setStatus] = useState<WhatsAppStatusValue>("loading");
  const [qrSrc, setQrSrc] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const stopPollingRef = useRef<(() => void) | null>(null);

  const loadQR = useCallback(async () => {
    try {
      setError(null);
      const { qr } = await whatsAppService.getQR();
      setQrSrc(qr);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Could not load QR code."
      );
    }
  }, []);

  useEffect(() => {
    stopPollingRef.current = pollWhatsAppStatus((newStatus) => {
      setStatus(newStatus);

      if (newStatus === "qr_ready" && !qrSrc) {
        loadQR();
      }

      return newStatus !== "connected" && newStatus !== "disconnected";
    }, 4_000);

    return () => stopPollingRef.current?.();
  }, [loadQR, qrSrc]);

  const handleRefresh = useCallback(async () => {
    setQrSrc(null);
    setError(null);
    setStatus("loading");
    stopPollingRef.current?.();

    stopPollingRef.current = pollWhatsAppStatus((newStatus) => {
      setStatus(newStatus);
      if (newStatus === "qr_ready") loadQR();
      return newStatus !== "connected" && newStatus !== "disconnected";
    }, 4_000);
  }, [loadQR]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-[9999]">
      <div className="w-[420px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden">

        {/* Header */}
        <div className="flex justify-between items-center px-5 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2.5">
            <div className="bg-[#25D366]/10 p-2 rounded-full">
             <FaWhatsapp size={24} className="text-green-500" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-[#23214D]">
                Connect WhatsApp
              </h2>
              <p className="text-xs text-gray-400">
                Scan QR to link your farm number
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 flex flex-col items-center gap-5">

          <StatusBadge status={status} />

          <div className="w-full flex flex-col items-center">

            {status === "connected" && (
              <div className="flex flex-col items-center gap-3 py-6">
                <div className="bg-green-100 p-4 rounded-full">
                  <CheckCircle2 size={36} className="text-green-500" />
                </div>
                <p className="text-sm font-medium text-gray-700">
                  WhatsApp is connected!
                </p>
                <p className="text-xs text-gray-400 text-center">
                  Your farm will receive real-time alerts via WhatsApp.
                </p>
              </div>
            )}

            {status === "disconnected" && (
              <div className="flex flex-col items-center gap-3 py-6">
                <div className="bg-red-100 p-4 rounded-full">
                  <WifiOff size={36} className="text-red-400" />
                </div>
                <p className="text-sm font-medium text-gray-700">
                  Disconnected
                </p>
                <button
                  onClick={handleRefresh}
                  className="text-xs text-[#4A3AFF] underline"
                >
                  Retry connection
                </button>
              </div>
            )}

            {status === "loading" && !qrSrc && (
              <div className="flex flex-col items-center gap-3 py-10">
                <Loader2 size={28} className="animate-spin text-[#4A3AFF]" />
                <p className="text-xs text-gray-400">Fetching QR code…</p>
              </div>
            )}

            {error && (
              <div className="text-xs text-red-500 text-center py-4">
                {error}
              </div>
            )}

            {status === "qr_ready" && qrSrc && !error && (
              <>
                <div className="p-3 rounded-2xl border-2 border-[#25D366]/30 shadow-sm bg-white">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={qrSrc}
                    alt="WhatsApp QR Code"
                    width={220}
                    height={220}
                    className="rounded-lg"
                  />
                </div>
                <p className="text-xs text-gray-400 mt-3 text-center leading-relaxed">
                  Open WhatsApp → Linked Devices → Link a Device
                  <br />
                  then scan the code above.
                </p>
              </>
            )}
          </div>

          {status === "qr_ready" && (
            <button
              onClick={handleRefresh}
              className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-[#4A3AFF] transition-colors"
            >
              <RefreshCw size={12} />
              Regenerate QR Code
            </button>
          )}

        </div>
      </div>
    </div>
  );
}

// ── Status Badge ──────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: WhatsAppStatusValue }) {
  const map: Record<
    WhatsAppStatusValue,
    { label: string; dot: string; bg: string; text: string }
  > = {
    qr_ready: {
      label: "Waiting for scan",
      dot: "bg-yellow-400",
      bg: "bg-yellow-50",
      text: "text-yellow-700",
    },
    connected: {
      label: "Connected",
      dot: "bg-green-400",
      bg: "bg-green-50",
      text: "text-green-700",
    },
    disconnected: {
      label: "Disconnected",
      dot: "bg-red-400",
      bg: "bg-red-50",
      text: "text-red-700",
    },
    loading: {
      label: "Connecting…",
      dot: "bg-gray-400",
      bg: "bg-gray-50",
      text: "text-gray-600",
    },
  };

  const s = map[status];

  return (
    <div
      className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium ${s.bg} ${s.text}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${s.dot}`} />
      {s.label}
    </div>
  );
}