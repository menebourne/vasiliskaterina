"use client";

import { getProduct, getLocation } from "@/lib/mock-data";
import { daysUntil, getExpirationStatus, getStockStatus, formatDateShort, cn, statusTextColor } from "@/lib/utils";
import { StatusDot } from "@/components/ui/status-dot";
import { CATEGORY_LABELS } from "@/lib/types";
import type { InventoryItem } from "@/lib/types";

interface InventoryGridProps {
  items: InventoryItem[];
  onItemClick: (item: InventoryItem) => void;
}

export function InventoryGrid({ items, onItemClick }: InventoryGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-px bg-fill-quaternary rounded-xl overflow-hidden">
      {items.map((item) => {
        const product = getProduct(item.productId);
        const location = getLocation(item.locationId);
        const daysLeft = daysUntil(item.expirationDate);
        const expStatus = getExpirationStatus(daysLeft);
        const stockStatus = getStockStatus(item.quantity, item.reorderThreshold);

        return (
          <button
            key={item.id}
            onClick={() => onItemClick(item)}
            className="bg-bg-elevated px-4 py-3 text-left hover-bg transition-colors"
          >
            <div className="flex items-center gap-2 mb-2">
              <StatusDot status={stockStatus === "critical" ? "critical" : expStatus} />
              <span className="text-xs text-label-tertiary">
                {product ? CATEGORY_LABELS[product.category] : ""}
              </span>
            </div>
            <p className="text-sm text-label-primary truncate mb-0.5">
              {product?.name ?? "Unknown"}
            </p>
            <p className="text-xs text-label-tertiary mb-3">{location?.name}</p>
            <div className="flex items-center justify-between">
              <span className={cn("text-sm tabular-nums font-medium", stockStatus !== "healthy" ? "text-status-critical" : "text-label-primary")}>
                {item.quantity}
              </span>
              <span className={cn("text-xs", statusTextColor(expStatus))}>
                {daysLeft < 0 ? "Expired" : formatDateShort(item.expirationDate)}
              </span>
            </div>
          </button>
        );
      })}
      {items.length === 0 && (
        <div className="col-span-full bg-bg-elevated py-16 text-center text-xs text-label-tertiary">
          No items match your filters
        </div>
      )}
    </div>
  );
}
