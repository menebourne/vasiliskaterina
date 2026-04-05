"use client";

import { useState } from "react";
import { Check, Clock, Package } from "lucide-react";
import { useInventoryStore } from "@/stores/inventory-store";
import { getProduct, getLocation } from "@/lib/mock-data";
import { daysUntil, cn } from "@/lib/utils";

export default function DashboardPage() {
  const { inventory } = useInventoryStore();
  const [dismissedLow, setDismissedLow] = useState<Set<string>>(new Set());
  const [dismissedExp, setDismissedExp] = useState<Set<string>>(new Set());

  // Low stock / out of stock items
  const lowStockItems = inventory
    .filter((item) => item.quantity <= item.reorderThreshold && !dismissedLow.has(item.id))
    .map((item) => ({
      ...item,
      product: getProduct(item.productId),
      location: getLocation(item.locationId),
    }))
    .sort((a, b) => a.quantity - b.quantity);

  // Expiring / expired items
  const expiringItems = inventory
    .filter((item) => {
      const days = daysUntil(item.expirationDate);
      return days <= 60 && days > -30 && !dismissedExp.has(item.id);
    })
    .map((item) => ({
      ...item,
      product: getProduct(item.productId),
      location: getLocation(item.locationId),
      daysLeft: daysUntil(item.expirationDate),
    }))
    .sort((a, b) => a.daysLeft - b.daysLeft);

  return (
    <div className="animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:items-start">
        {/* Low Stock column */}
        <section>
          <div className="flex items-center justify-between mb-2">
            <h2 className="section-title flex items-center gap-2">
              <Package size={14} />
              Low Stock
              {lowStockItems.length > 0 && (
                <span>({lowStockItems.length})</span>
              )}
            </h2>
            {dismissedLow.size > 0 && (
              <button onClick={() => setDismissedLow(new Set())} className="text-[12px] text-[#007AFF] font-medium">
                Show all
              </button>
            )}
          </div>
          <div className="card overflow-hidden max-h-[calc(100vh-200px)] overflow-y-auto">
            {lowStockItems.length === 0 ? (
              <div className="py-12 text-center">
                <p className="text-[15px] text-[#86868B]">All stocked up</p>
              </div>
            ) : (
              <div className="divide-y divide-[rgba(0,0,0,0.05)]">
                {lowStockItems.map((item) => (
                  <div key={item.id} className="group flex items-center gap-3.5 px-4 py-3 hover-row">
                    <span className={cn(
                      "inline-block w-[7px] h-[7px] rounded-full flex-shrink-0",
                      item.quantity === 0 ? "bg-[#FF3B30]" : "bg-[#FF3B30]"
                    )} />
                    <div className="flex-1 min-w-0">
                      <p className="text-[14px] text-[#1D1D1F] font-medium truncate">
                        {item.product?.name ?? "Unknown"}
                      </p>
                      <p className="text-[12px] text-[#AEAEB2] mt-0.5">
                        {item.location?.name}
                      </p>
                    </div>
                    <span className={cn(
                      "text-[14px] font-semibold tabular-nums flex-shrink-0",
                      item.quantity === 0 ? "text-[#FF3B30]" : "text-[#FF3B30]"
                    )}>
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => setDismissedLow((prev) => new Set(prev).add(item.id))}
                      className="opacity-0 group-hover:opacity-100 p-1 rounded-lg hover:bg-[#F5F5F7] text-[#C7C7CC] hover:text-[#34C759] transition-all flex-shrink-0"
                    >
                      <Check size={15} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Expiring column */}
        <section>
          <div className="flex items-center justify-between mb-2">
            <h2 className="section-title flex items-center gap-2">
              <Clock size={14} />
              Expiring
              {expiringItems.length > 0 && (
                <span>({expiringItems.length})</span>
              )}
            </h2>
            {dismissedExp.size > 0 && (
              <button onClick={() => setDismissedExp(new Set())} className="text-[12px] text-[#007AFF] font-medium">
                Show all
              </button>
            )}
          </div>
          <div className="card overflow-hidden max-h-[calc(100vh-200px)] overflow-y-auto">
            {expiringItems.length === 0 ? (
              <div className="py-12 text-center">
                <p className="text-[15px] text-[#86868B]">Nothing expiring soon</p>
              </div>
            ) : (
              <div className="divide-y divide-[rgba(0,0,0,0.05)]">
                {expiringItems.map((item) => {
                  const isExpired = item.daysLeft < 0;
                  return (
                    <div key={item.id} className="group flex items-center gap-3.5 px-4 py-3 hover-row">
                      <span className={cn(
                        "inline-block w-[7px] h-[7px] rounded-full flex-shrink-0",
                        isExpired ? "bg-[#FF3B30]" : "bg-[#FF3B30]"
                      )} />
                      <div className="flex-1 min-w-0">
                        <p className="text-[14px] text-[#1D1D1F] font-medium truncate">
                          {item.product?.name ?? "Unknown"}
                        </p>
                        <p className="text-[12px] text-[#AEAEB2] mt-0.5">
                          Lot {item.lotNumber} · {item.location?.name}
                        </p>
                      </div>
                      <span className={cn(
                        "text-[14px] font-semibold tabular-nums flex-shrink-0",
                        isExpired ? "text-[#FF3B30]" : "text-[#FF3B30]"
                      )}>
                        {isExpired ? `${Math.abs(item.daysLeft)}d ago` : `${item.daysLeft}d`}
                      </span>
                      <button
                        onClick={() => setDismissedExp((prev) => new Set(prev).add(item.id))}
                        className="opacity-0 group-hover:opacity-100 p-1 rounded-lg hover:bg-[#F5F5F7] text-[#C7C7CC] hover:text-[#34C759] transition-all flex-shrink-0"
                      >
                        <Check size={15} />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
