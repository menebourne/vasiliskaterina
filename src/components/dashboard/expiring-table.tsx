"use client";

import { useInventoryStore } from "@/stores/inventory-store";
import { getProduct } from "@/lib/mock-data";
import { daysUntil, cn } from "@/lib/utils";

export function ExpiringTable() {
  const { inventory } = useInventoryStore();

  const expiring = inventory
    .map((item) => ({
      ...item,
      product: getProduct(item.productId),
      daysRemaining: daysUntil(item.expirationDate),
    }))
    .filter((item) => item.daysRemaining <= 60 && item.daysRemaining > -30)
    .sort((a, b) => a.daysRemaining - b.daysRemaining)
    .slice(0, 10);

  if (expiring.length === 0) return null;

  return (
    <section className="flex flex-col">
      <h2 className="section-title">Expiring Soon</h2>
      <div className="card flex-1 overflow-hidden">
        <div className="divide-y divide-[rgba(0,0,0,0.05)]">
          {expiring.map((item) => {
            const isExpired = item.daysRemaining < 0;
            return (
              <div key={item.id} className="flex items-center gap-3 px-4 py-3 hover-row">
                <span className={cn("inline-block w-[7px] h-[7px] rounded-full flex-shrink-0", isExpired ? "bg-[#FF3B30]" : "bg-[#FF9500]")} />
                <div className="flex-1 min-w-0">
                  <p className="text-[14px] text-[#1D1D1F] font-medium truncate">
                    {item.product?.name ?? "Unknown"}
                  </p>
                  <p className="text-[12px] text-[#AEAEB2] mt-0.5">Lot {item.lotNumber}</p>
                </div>
                <span className={cn("text-[14px] tabular-nums font-semibold", isExpired ? "text-[#FF3B30]" : "text-[#FF9500]")}>
                  {isExpired ? `${Math.abs(item.daysRemaining)}d ago` : `${item.daysRemaining}d`}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
