"use client";

import { useEffect, useState, useCallback } from "react";
import {
  X,
  AlertTriangle,
  ThermometerSnowflake,
  Skull,
  Wind,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  Clock,
  CheckCircle2,
  Loader2,
} from "lucide-react";
// import { alertsService } from "@/services/alerts.service";
import type { BranchAlert, BreachType, AlertSeverity } from "@/types/alerts.types";
import { alertsService } from "../../../services/alerts.service";

// ─────────────────────────────────────────────────────────────────────────────
//  Helpers
// ─────────────────────────────────────────────────────────────────────────────

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getBreachMeta(type: BreachType): {
  icon: React.ReactNode;
  label: string;
  bg: string;
  iconColor: string;
  badge: string;
  badgeText: string;
} {
  switch (type) {
    case "TEMPERATURE_LOW":
      return {
        icon: <ThermometerSnowflake size={16} />,
        label: "Low Temperature",
        bg: "bg-blue-50",
        iconColor: "text-blue-600",
        badge: "bg-blue-100 text-blue-700",
        badgeText: "Temp Low",
      };
    case "TEMPERATURE_HIGH":
      return {
        icon: <ThermometerSnowflake size={16} />,
        label: "High Temperature",
        bg: "bg-orange-50",
        iconColor: "text-orange-600",
        badge: "bg-orange-100 text-orange-700",
        badgeText: "Temp High",
      };
    case "MORTALITY_SPIKE":
      return {
        icon: <Skull size={16} />,
        label: "Mortality Spike",
        bg: "bg-red-50",
        iconColor: "text-red-600",
        badge: "bg-red-100 text-red-700",
        badgeText: "Mortality",
      };
    case "AMMONIA_HIGH":
      return {
        icon: <Wind size={16} />,
        label: "High Ammonia",
        bg: "bg-yellow-50",
        iconColor: "text-yellow-600",
        badge: "bg-yellow-100 text-yellow-700",
        badgeText: "Ammonia",
      };
    default:
      return {
        icon: <AlertTriangle size={16} />,
        label: type.replace(/_/g, " "),
        bg: "bg-gray-50",
        iconColor: "text-gray-600",
        badge: "bg-gray-100 text-gray-700",
        badgeText: type,
      };
  }
}

function getSeverityStyle(severity: AlertSeverity) {
  switch (severity) {
    case "CRITICAL":
      return "bg-red-100 text-red-600";
    case "WARNING":
      return "bg-yellow-100 text-yellow-700";
    default:
      return "bg-gray-100 text-gray-600";
  }
}

/**
 * Extract the first ~3 bullet lines from the AI recommendation markdown.
 * Returns them as plain strings.
 */
function extractAIBullets(raw: string): string[] {
  const lines = raw.split("\n");
  const bullets: string[] = [];

  for (const line of lines) {
    const trimmed = line.trim();
    // Match markdown bullet: *, -, •, or numbered list
    if (/^(\*|-|•|\d+\.)/.test(trimmed)) {
      // Strip leading marker, bold markers, extra spaces
      const clean = trimmed
        .replace(/^\*+|-|•|\d+\.\s*/, "")
        .replace(/\*\*/g, "")
        .trim();
      if (clean.length > 10) bullets.push(clean);
    }
    if (bullets.length >= 3) break;
  }

  return bullets;
}

// ─────────────────────────────────────────────────────────────────────────────
//  Alert Card
// ─────────────────────────────────────────────────────────────────────────────

function AlertCard({ alert }: { alert: BranchAlert }) {
  const [expanded, setExpanded] = useState(false);
  const meta = getBreachMeta(alert.breachType);
  const bullets = extractAIBullets(alert.aiRecommendation);

  const changeDir = alert.currentValue > alert.previousValue ? "↑" : "↓";
  const changeLabel = `${Math.abs(alert.changePercent).toFixed(1)}% ${changeDir}`;

  return (
    <div
      className={`rounded-xl border border-gray-100 overflow-hidden transition-all duration-200 ${
        expanded ? "shadow-md" : "shadow-sm hover:shadow-md"
      }`}
    >
      {/* ── Card Header ── */}
      <div
        className={`p-4 ${meta.bg} cursor-pointer`}
        onClick={() => setExpanded((v) => !v)}
      >
        <div className="flex items-start justify-between gap-3">
          {/* Left */}
          <div className="flex gap-3 items-start min-w-0">
            <div
              className={`mt-0.5 flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-white shadow-sm ${meta.iconColor}`}
            >
              {meta.icon}
            </div>

            <div className="min-w-0">
              <p className="font-semibold text-[#23214D] text-sm leading-tight">
                {meta.label} — Pen&nbsp;
                <span className="font-mono text-xs text-gray-500">
                  {alert.penId.slice(-6)}
                </span>
              </p>

              <div className="flex items-center gap-2 mt-1 flex-wrap">
                <span
                  className={`text-xs px-2 py-0.5 rounded-full font-medium ${meta.badge}`}
                >
                  {meta.badgeText}
                </span>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full font-medium ${getSeverityStyle(
                    alert.severity
                  )}`}
                >
                  {alert.severity}
                </span>
                <span className="text-xs text-gray-400 font-mono">
                  {changeLabel}
                </span>
              </div>
            </div>
          </div>

          {/* Right */}
          <button className="text-gray-400 flex-shrink-0 mt-1">
            {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>

        {/* Timestamp */}
        <div className="flex items-center gap-1.5 mt-3 text-xs text-gray-400">
          <Clock size={12} />
          {formatDate(alert.createdAt)}
        </div>
      </div>

      {/* ── Expandable Body ── */}
      {expanded && (
        <div className="px-4 pb-4 pt-3 bg-white space-y-3 border-t border-gray-100">
          {/* Value snapshot */}
          <div className="flex gap-3">
            <div className="flex-1 bg-gray-50 rounded-lg p-3 text-center">
              <p className="text-xs text-gray-400 mb-0.5">Previous</p>
              <p className="text-lg font-bold text-gray-600">
                {alert.previousValue}
              </p>
            </div>
            <div className="flex-1 bg-red-50 rounded-lg p-3 text-center">
              <p className="text-xs text-red-400 mb-0.5">Current</p>
              <p className="text-lg font-bold text-red-600">
                {alert.currentValue}
              </p>
            </div>
          </div>

          {/* AI bullets */}
          {bullets.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-[#23214D] mb-1.5">
                AI Recommendations
              </p>
              <ul className="space-y-1">
                {bullets.map((b, i) => (
                  <li key={i} className="flex gap-2 text-xs text-gray-600">
                    <span className="text-[#4A3AFF] font-bold mt-px">→</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Acknowledged badge */}
          {alert.acknowledged && (
            <div className="flex items-center gap-1.5 text-xs text-green-600">
              <CheckCircle2 size={12} />
              Acknowledged
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  Summary Bar
// ─────────────────────────────────────────────────────────────────────────────

function SummaryBar({ alerts }: { alerts: BranchAlert[] }) {
  const critical = alerts.filter((a) => a.severity === "CRITICAL").length;
  const warning = alerts.filter((a) => a.severity === "WARNING").length;
  const unacked = alerts.filter((a) => !a.acknowledged).length;

  return (
    <div className="bg-[#F3F4F8] rounded-xl p-4">
      <h3 className="font-semibold text-[#23214D] text-sm mb-3">
        Farm Insights Summary
      </h3>

      <div className="grid grid-cols-3 gap-2 mb-3">
        <div className="bg-white rounded-lg p-2.5 text-center shadow-sm">
          <p className="text-xl font-bold text-red-500">{critical}</p>
          <p className="text-xs text-gray-400 mt-0.5">Critical</p>
        </div>
        <div className="bg-white rounded-lg p-2.5 text-center shadow-sm">
          <p className="text-xl font-bold text-yellow-500">{warning}</p>
          <p className="text-xs text-gray-400 mt-0.5">Warnings</p>
        </div>
        <div className="bg-white rounded-lg p-2.5 text-center shadow-sm">
          <p className="text-xl font-bold text-[#4A3AFF]">{unacked}</p>
          <p className="text-xs text-gray-400 mt-0.5">Unreviewed</p>
        </div>
      </div>

      <p className="text-xs text-gray-500 leading-relaxed">
        {critical > 0
          ? `⚠️ You have ${critical} critical alert${critical > 1 ? "s" : ""} requiring immediate attention.`
          : "✅ No critical alerts at this time. Farm is running normally."}
      </p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  Main Panel
// ─────────────────────────────────────────────────────────────────────────────

type Props = {
  onClose: () => void;
};

export default function FairmAIPanel({ onClose }: Props) {
  const [alerts, setAlerts] = useState<BranchAlert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastRefreshed, setLastRefreshed] = useState<Date | null>(null);

  const fetchAlerts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await alertsService.getAll({ page: 1, limit: 10 });
      setAlerts(res.data.data);
      setLastRefreshed(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load alerts.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAlerts();
  }, [fetchAlerts]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-[9998]">
      <div className="w-[520px] max-h-[85vh] bg-white rounded-2xl shadow-2xl flex flex-col">

        {/* ── Header ── */}
        <div className="flex justify-between items-start px-5 py-4 border-b border-gray-100">
          <div>
            <h2 className="text-base font-semibold text-[#23214D]">
              Digital Farm Assistant
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">
              Real-time insights and alerts from your farm operations
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={fetchAlerts}
              disabled={loading}
              title="Refresh alerts"
              className="text-gray-400 hover:text-[#4A3AFF] transition-colors disabled:opacity-40"
            >
              <RefreshCw
                size={15}
                className={loading ? "animate-spin" : ""}
              />
            </button>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-700 transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* ── Body ── */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 scrollbar-hide">

          {/* Loading */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-16 gap-3 text-gray-400">
              <Loader2 size={28} className="animate-spin text-[#4A3AFF]" />
              <p className="text-sm">Fetching farm alerts…</p>
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <div className="bg-red-50 border border-red-100 rounded-xl p-4 text-sm text-red-600 text-center">
              {error}
              <br />
              <button
                onClick={fetchAlerts}
                className="mt-2 text-xs underline text-red-500"
              >
                Try again
              </button>
            </div>
          )}

          {/* Data */}
          {!loading && !error && (
            <>
              <SummaryBar alerts={alerts} />

              {alerts.length === 0 ? (
                <div className="text-center py-10 text-sm text-gray-400">
                  No alerts found. Your farm is all clear! 🌱
                </div>
              ) : (
                <div className="space-y-3">
                  {alerts.map((alert) => (
                    <AlertCard key={alert._id} alert={alert} />
                  ))}
                </div>
              )}

              {lastRefreshed && (
                <p className="text-center text-xs text-gray-300 pt-1">
                  Last refreshed at{" "}
                  {lastRefreshed.toLocaleTimeString("en-GB", {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  })}
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}