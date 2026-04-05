"use client";

import { useInventoryStore } from "@/stores/inventory-store";
import { getProduct, getLocation } from "@/lib/mock-data";

export function LowStockTable() {
  const { inventory } = useInventoryStore();

  const lowStock = inventory
    .filter((item) => item.quantity <= item.reorderThreshold)
    .map((item) => ({
      ...item,
      product: getProduct(item.productId),
      location: getLocation(item.locationId),
    }))
    .sort((a, b) => a.quantity - b.quantity)
    .slice(0, 10);

  if (lowStock.length === 0) return null;

  return (
    <section className="flex flex-col">
      <h2 className="section-title">Low Stock</h2>
      <div className="card flex-1 overflow-hidden">
        <div className="divide-y divide-[rgba(0,0,0,0.05)]">
          {lowStock.map((item) => (
            <div key={item.id} className="flex items-center gap-3 px-4 py-3 hover-row">
              <span className="inline-block w-[7px] h-[7px] rounded-full flex-shrink-0 bg-[#FF9500]" />
              <div className="flex-1 min-w-0">
                <p className="text-[14px] text-[#1D1D1F] font-medium truncate">
                  {item.product?.name ?? "Unknown"}
                </p>
                <p className="text-[12px] text-[#AEAEB2] mt-0.5">{item.location?.name}</p>
              </div>
              <span className="text-[14px] tabular-nums font-semibold text-[#FF9500]">
                {item.quantity}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
