"use client";

import { AlertTriangle, Package, Clock, RefreshCw, X } from "lucide-react";
import { cn, formatRelativeTime } from "@/lib/utils";
import { useInventoryStore } from "@/stores/inventory-store";
import type { Alert } from "@/lib/types";

const alertIcons: Record<Alert["type"], React.ReactNode> = {
  low_stock: <Package size={15} strokeWidth={1.8} />,
  expiring: <Clock size={15} strokeWidth={1.8} />,
  expired: <AlertTriangle size={15} strokeWidth={1.8} />,
  restock: <RefreshCw size={15} strokeWidth={1.8} />,
};

const severityColors: Record<Alert["severity"], string> = {
  critical: "text-[#FF3B30]",
  warning: "text-[#FF9500]",
  info: "text-[#86868B]",
};

export function AlertFeed() {
  const { alerts, dismissAlert, acknowledgeAlert } = useInventoryStore();
  const activeAlerts = alerts.filter((a) => !a.dismissed).slice(0, 8);

  return (
    <section className="flex flex-col">
      <h2 className="section-title">Alerts</h2>
      <div className="card flex-1 overflow-hidden">
        {activeAlerts.length === 0 ? (
          <div className="flex items-center justify-center h-full py-16">
            <p className="text-[15px] text-[#86868B]">All clear</p>
          </div>
        ) : (
          <div className="divide-y divide-[rgba(0,0,0,0.05)]">
            {activeAlerts.map((alert) => (
              <div key={alert.id} className="group flex items-start gap-3 px-4 py-3 hover-row">
                <div className={cn("mt-0.5 flex-shrink-0", severityColors[alert.severity])}>
                  {alertIcons[alert.type]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={cn(
                    "text-[14px] leading-[1.4]",
                    alert.acknowledged ? "text-[#6E6E73]" : "text-[#1D1D1F] font-medium"
                  )}>
                    {alert.message}
                  </p>
                  <p className="text-[12px] text-[#AEAEB2] mt-1">
                    {formatRelativeTime(alert.createdAt)}
                  </p>
                </div>
                <button
                  onClick={() => alert.acknowledged ? dismissAlert(alert.id) : acknowledgeAlert(alert.id)}
                  className="opacity-0 group-hover:opacity-100 p-1 rounded-full hover:bg-black/[0.04] text-[#C7C7CC] hover:text-[#86868B] transition-all"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
