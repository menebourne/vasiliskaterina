"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import { Search, MapPin, ArrowRight } from "lucide-react";
import { useInventoryStore } from "@/stores/inventory-store";
import { getLocation, getSupplier } from "@/lib/mock-data";
import { CATEGORY_LABELS } from "@/lib/types";
import { cn, daysUntil, getExpirationStatus, getStockStatus } from "@/lib/utils";
import { StatusDot } from "./status-dot";

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { inventory, products } = useInventoryStore();

  // ⌘K to open
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(true);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleSelect = useCallback((productId: string) => {
    setOpen(false);
    const name = products.find(p => p.id === productId)?.name ?? "";
    router.push(`/inventory?search=${encodeURIComponent(name)}`);
  }, [router, products]);

  // Aggregate inventory by product
  const productSummaries = products.map((product) => {
    const items = inventory.filter((i) => i.productId === product.id);
    const totalQty = items.reduce((sum, i) => sum + i.quantity, 0);
    const soonestExpiry = items.length > 0
      ? items.reduce((min, i) => i.expirationDate < min ? i.expirationDate : min, items[0].expirationDate)
      : null;
    const locations = Array.from(new Set(items.map((i) => getLocation(i.locationId)?.name).filter(Boolean)));
    const threshold = items.length > 0 ? Math.max(...items.map((i) => i.reorderThreshold)) : 0;
    const stockStatus = getStockStatus(totalQty, threshold);
    const expStatus = soonestExpiry ? getExpirationStatus(daysUntil(soonestExpiry)) : "healthy" as const;
    const overallStatus: "healthy" | "warning" | "critical" | "expired" = expStatus === "expired" ? "expired" : stockStatus === "critical" ? "critical" : stockStatus === "warning" ? "warning" : expStatus;

    return { product, totalQty, locations, overallStatus, supplier: getSupplier(product.defaultSupplierId) };
  });

  return (
    <Command.Dialog
      open={open}
      onOpenChange={setOpen}
      shouldFilter={true}
      overlayClassName="fixed inset-0 bg-black/20 z-[100]"
      contentClassName="fixed inset-0 z-[101] flex items-start justify-center pt-[min(20vh,180px)] px-4 pointer-events-none"
      className="w-full max-w-[560px] bg-white rounded-2xl shadow-xl overflow-hidden pointer-events-auto"
    >
      {/* Input */}
      <div className="flex items-center gap-3 px-4 border-b border-[rgba(0,0,0,0.06)]">
        <Search size={18} className="text-[#86868B] flex-shrink-0" />
        <Command.Input
          placeholder="Search inventory..."
          className="flex-1 py-3.5 text-[16px] text-[#1D1D1F] placeholder:text-[#C7C7CC] bg-transparent focus:outline-none"
          autoFocus
        />
        <button
          onClick={() => setOpen(false)}
          className="px-1.5 py-0.5 rounded-md bg-[#F5F5F7] hover:bg-[#E8E8ED] text-[11px] font-medium text-[#86868B] transition-colors cursor-pointer"
        >
          ESC
        </button>
      </div>

      {/* Results */}
      <Command.List className="max-h-[360px] overflow-y-auto p-2">
        <Command.Empty className="py-12 text-center text-[15px] text-[#86868B]">
          No products found
        </Command.Empty>

        <Command.Group heading={
          <span className="text-[11px] font-semibold text-[#86868B] uppercase tracking-[0.04em] px-2 py-1.5 block">
            Inventory
          </span>
        }>
          {productSummaries.map(({ product, totalQty, locations, overallStatus, supplier }) => (
            <Command.Item
              key={product.id}
              value={`${product.name} ${product.manufacturer} ${product.sku} ${product.barcode} ${CATEGORY_LABELS[product.category]} ${supplier?.name ?? ""}`}
              onSelect={() => handleSelect(product.id)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-[10px] cursor-pointer transition-colors data-[selected=true]:bg-[#007AFF] data-[selected=true]:text-white group"
            >
              <StatusDot
                status={overallStatus}
                className="group-data-[selected=true]:opacity-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[14px] font-medium truncate group-data-[selected=true]:text-white text-[#1D1D1F]">
                    {product.name}
                  </span>
                  <span className="text-[12px] group-data-[selected=true]:text-white/60 text-[#AEAEB2]">
                    {product.manufacturer}
                  </span>
                </div>
                <div className="flex items-center gap-3 mt-0.5">
                  <span className="text-[12px] group-data-[selected=true]:text-white/60 text-[#86868B]">
                    {CATEGORY_LABELS[product.category]}
                  </span>
                  {locations.length > 0 && (
                    <span className="text-[12px] group-data-[selected=true]:text-white/60 text-[#AEAEB2] flex items-center gap-1">
                      <MapPin size={10} />
                      {locations.slice(0, 2).join(", ")}
                      {locations.length > 2 && ` +${locations.length - 2}`}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <span className={cn(
                  "text-[14px] font-semibold tabular-nums",
                  "group-data-[selected=true]:text-white",
                  overallStatus === "critical" ? "text-[#FF3B30]" :
                  overallStatus === "warning" ? "text-[#FF9500]" :
                  "text-[#1D1D1F]"
                )}>
                  {totalQty}
                </span>
                <ArrowRight size={14} className="opacity-0 group-data-[selected=true]:opacity-60 text-white" />
              </div>
            </Command.Item>
          ))}
        </Command.Group>
      </Command.List>

      {/* Footer */}
      <div className="flex items-center justify-between px-4 py-2.5 border-t border-[rgba(0,0,0,0.06)] bg-[#FAFAFA]">
        <div className="flex items-center gap-3 text-[11px] text-[#AEAEB2]">
          <span className="flex items-center gap-1"><kbd className="px-1 py-0.5 rounded bg-[#E8E8ED] text-[10px] font-medium text-[#6E6E73]">↑↓</kbd> navigate</span>
          <span className="flex items-center gap-1"><kbd className="px-1 py-0.5 rounded bg-[#E8E8ED] text-[10px] font-medium text-[#6E6E73]">↵</kbd> open</span>
          <span className="flex items-center gap-1"><kbd className="px-1 py-0.5 rounded bg-[#E8E8ED] text-[10px] font-medium text-[#6E6E73]">esc</kbd> close</span>
        </div>
        <span className="text-[11px] text-[#AEAEB2]">{products.length} products</span>
      </div>
    </Command.Dialog>
  );
}
