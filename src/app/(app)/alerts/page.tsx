"use client";

import { useState } from "react";
import { Bell, Settings, AlertTriangle, Package, Clock, RefreshCw, Check, X } from "lucide-react";
import { useInventoryStore } from "@/stores/inventory-store";
import { getProduct } from "@/lib/mock-data";
import { formatRelativeTime, cn } from "@/lib/utils";
import type { Alert } from "@/lib/types";

const alertIcons: Record<Alert["type"], React.ReactNode> = {
  low_stock: <Package size={14} strokeWidth={1.5} />,
  expiring: <Clock size={14} strokeWidth={1.5} />,
  expired: <AlertTriangle size={14} strokeWidth={1.5} />,
  restock: <RefreshCw size={14} strokeWidth={1.5} />,
};

const severityColors: Record<Alert["severity"], string> = {
  critical: "text-[#FF3B30]",
  warning: "text-[#FF9500]",
  info: "text-[#86868B]",
};

export default function AlertsPage() {
  const { alerts, alertRules, acknowledgeAlert, dismissAlert, updateAlertRule } = useInventoryStore();
  const [tab, setTab] = useState<"history" | "rules">("history");
  const activeAlerts = alerts.filter((a) => !a.dismissed);
  const dismissedAlerts = alerts.filter((a) => a.dismissed);

  return (
    <div className="animate-fade-in max-w-4xl">
      {/* Tabs — Apple segmented control style */}
      <div className="inline-flex items-center bg-[#F5F5F7] rounded-[10px] p-0.5 mb-6">
        {(["history", "rules"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              "text-sm px-4 py-1.5 rounded-[8px] transition-all flex items-center gap-1.5 font-medium",
              tab === t ? "bg-white text-[#1D1D1F] shadow-sm" : "text-[#86868B] hover:text-[#424245]"
            )}
          >
            {t === "history" ? <><Bell size={13} />Alerts</> : <><Settings size={13} />Rules</>}
            {t === "history" && activeAlerts.filter((a) => !a.acknowledged).length > 0 && (
              <span className="w-4 h-4 rounded-full bg-[#FF3B30] text-white text-[9px] flex items-center justify-center font-medium">
                {activeAlerts.filter((a) => !a.acknowledged).length}
              </span>
            )}
          </button>
        ))}
      </div>

      {tab === "history" && (
        <div className="space-y-8">
          <div className="card overflow-hidden">
            {activeAlerts.map((alert, idx) => (
              <div key={alert.id} className={cn("group flex items-start gap-3 px-4 py-3 hover:bg-[#F5F5F7]", idx > 0 && "border-t border-[rgba(0,0,0,0.05)]")}>
                <div className={cn("mt-0.5", severityColors[alert.severity])}>{alertIcons[alert.type]}</div>
                <div className="flex-1">
                  <p className={cn("text-sm leading-snug", alert.acknowledged ? "text-[#424245]" : "text-[#1D1D1F]")}>{alert.message}</p>
                  <p className="text-xs text-[#86868B] mt-0.5">{formatRelativeTime(alert.createdAt)}</p>
                </div>
                <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  {!alert.acknowledged && (
                    <button onClick={() => acknowledgeAlert(alert.id)} className="p-1 rounded-[10px] hover:bg-[#E8E8ED] text-[#86868B] hover:text-[#424245]">
                      <Check size={13} />
                    </button>
                  )}
                  <button onClick={() => dismissAlert(alert.id)} className="p-1 rounded-[10px] hover:bg-[#E8E8ED] text-[#86868B] hover:text-[#424245]">
                    <X size={13} />
                  </button>
                </div>
              </div>
            ))}
            {activeAlerts.length === 0 && (
              <p className="py-12 text-center text-xs text-[#86868B]">No active alerts</p>
            )}
          </div>

          {dismissedAlerts.length > 0 && (
            <div>
              <h3 className="section-title mb-3">Dismissed</h3>
              <div className="opacity-40 card overflow-hidden">
                {dismissedAlerts.map((alert, idx) => (
                  <div key={alert.id} className={cn("flex items-start gap-3 px-4 py-2", idx > 0 && "border-t border-[rgba(0,0,0,0.05)]")}>
                    <div className="mt-0.5 text-[#86868B]">{alertIcons[alert.type]}</div>
                    <span className="text-xs text-[#86868B]">{alert.message}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {tab === "rules" && (
        <div>
          <p className="text-xs text-[#86868B] mb-4">Configure per-product alert thresholds</p>
          <div className="card overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="text-[11px] text-[#86868B]">
                  <th className="text-left px-4 py-3 font-medium">Product</th>
                  <th className="text-right px-4 py-3 font-medium">Low Stock</th>
                  <th className="text-right px-4 py-3 font-medium">Exp Warning (d)</th>
                  <th className="text-center px-4 py-3 font-medium">Email</th>
                  <th className="text-center px-4 py-3 font-medium">Push</th>
                  <th className="text-center px-4 py-3 font-medium">Digest</th>
                </tr>
              </thead>
              <tbody>
                {alertRules.map((rule) => (
                  <tr key={rule.id} className="hover:bg-[#F5F5F7] h-9 border-b border-[rgba(0,0,0,0.05)] last:border-b-0">
                    <td className="px-4 py-1 text-sm text-[#424245]">{getProduct(rule.productId)?.name}</td>
                    <td className="px-4 py-1 text-right">
                      <input type="number" value={rule.lowStockThreshold} onChange={(e) => updateAlertRule(rule.id, { lowStockThreshold: Number(e.target.value) })}
                        className="w-12 bg-[#F5F5F7] rounded-[10px] text-xs text-right text-[#1D1D1F] px-1.5 py-0.5 focus:outline-none focus:ring-[3px] focus:ring-[rgba(0,122,255,0.25)] tabular-nums" min={0} />
                    </td>
                    <td className="px-4 py-1 text-right">
                      <input type="number" value={rule.expirationWarningDays} onChange={(e) => updateAlertRule(rule.id, { expirationWarningDays: Number(e.target.value) })}
                        className="w-12 bg-[#F5F5F7] rounded-[10px] text-xs text-right text-[#1D1D1F] px-1.5 py-0.5 focus:outline-none focus:ring-[3px] focus:ring-[rgba(0,122,255,0.25)] tabular-nums" min={1} />
                    </td>
                    <td className="px-4 py-1 text-center">
                      <input type="checkbox" checked={rule.emailNotification} onChange={(e) => updateAlertRule(rule.id, { emailNotification: e.target.checked })}
                        className="rounded-[10px] border-[rgba(0,0,0,0.05)] bg-[#F5F5F7] text-[#007AFF] focus:ring-0 focus:ring-offset-0" />
                    </td>
                    <td className="px-4 py-1 text-center">
                      <input type="checkbox" checked={rule.pushNotification} onChange={(e) => updateAlertRule(rule.id, { pushNotification: e.target.checked })}
                        className="rounded-[10px] border-[rgba(0,0,0,0.05)] bg-[#F5F5F7] text-[#007AFF] focus:ring-0 focus:ring-offset-0" />
                    </td>
                    <td className="px-4 py-1 text-center">
                      <select value={rule.digestPreference} onChange={(e) => updateAlertRule(rule.id, { digestPreference: e.target.value as "realtime" | "daily" })}
                        className="bg-[#F5F5F7] rounded-[10px] text-xs text-[#86868B] px-1.5 py-0.5 focus:outline-none cursor-pointer">
                        <option value="realtime">Real-time</option>
                        <option value="daily">Daily</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
