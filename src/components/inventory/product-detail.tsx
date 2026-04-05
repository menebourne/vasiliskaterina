"use client";

import { SlidePanel } from "@/components/ui/slide-panel";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { StatusDot } from "@/components/ui/status-dot";
import { useInventoryStore } from "@/stores/inventory-store";
import { getProduct, getLocation, getSupplier } from "@/lib/mock-data";
import { daysUntil, getExpirationStatus, getStockStatus, formatDate, formatCurrency, cn, statusTextColor } from "@/lib/utils";
import { CATEGORY_LABELS } from "@/lib/types";
import type { InventoryItem } from "@/lib/types";
import { Trash2 } from "lucide-react";

interface ProductDetailProps { item: InventoryItem | null; onClose: () => void; }

export function ProductDetail({ item, onClose }: ProductDetailProps) {
  const { inventory, deleteInventoryItem } = useInventoryStore();
  if (!item) return null;

  const product = getProduct(item.productId);
  const location = getLocation(item.locationId);
  const supplier = getSupplier(item.supplierId);
  const daysLeft = daysUntil(item.expirationDate);
  const expStatus = getExpirationStatus(daysLeft);
  const stockStatus = getStockStatus(item.quantity, item.reorderThreshold);
  const allStock = inventory.filter((i) => i.productId === item.productId).map((i) => ({ ...i, location: getLocation(i.locationId) }));
  const totalQty = allStock.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <SlidePanel open={!!item} onClose={onClose} title={product?.name ?? "Product"} width="max-w-md">
      <div className="space-y-6">
        {/* Badges */}
        {(stockStatus !== "healthy" || expStatus !== "healthy") && (
          <div className="flex items-center gap-2">
            {stockStatus !== "healthy" && <Badge variant={stockStatus === "warning" ? "warning" : "critical"}>{stockStatus === "warning" ? "Low Stock" : "Critical"}</Badge>}
            {expStatus !== "healthy" && <Badge variant={expStatus === "expired" ? "expired" : expStatus === "critical" ? "critical" : "warning"}>{expStatus === "expired" ? "Expired" : `${daysLeft}d left`}</Badge>}
          </div>
        )}

        {/* Details card */}
        <div className="card p-4 space-y-3">
          <Row label="Category" value={product ? CATEGORY_LABELS[product.category] : ""} />
          <Row label="Barcode" value={product?.barcode ?? ""} mono />
          <Row label="Supplier" value={supplier?.name ?? ""} />
          <Row label="Location" value={location?.name ?? ""} />
          <Row label="Lot" value={item.lotNumber} mono />
          <Row label="Expires" value={formatDate(item.expirationDate)} className={statusTextColor(expStatus)} />
          <Row label="Price" value={formatCurrency(item.lastPrice)} />
          <Row label="Added" value={`${formatDate(item.addedAt)} by ${item.addedBy}`} />
        </div>

        {/* Stock breakdown */}
        <div>
          <h4 className="section-title mb-2">Stock by Location</h4>
          <div className="card overflow-hidden">
            {allStock.map((s, i) => (
              <div key={s.id} className={cn("flex items-center justify-between px-4 py-2.5", i < allStock.length - 1 && "border-b border-[rgba(0,0,0,0.05)]")}>
                <div className="flex items-center gap-2.5">
                  <StatusDot status={getStockStatus(s.quantity, s.reorderThreshold)} />
                  <span className="text-sm text-[#1D1D1F]">{s.location?.name}</span>
                </div>
                <span className="text-sm font-semibold tabular-nums text-[#1D1D1F]">{s.quantity}</span>
              </div>
            ))}
            <div className="flex items-center justify-between px-4 py-2.5 bg-[#F5F5F7]">
              <span className="text-sm font-medium text-[#424245]">Total</span>
              <span className="text-sm font-bold tabular-nums text-[#1D1D1F]">{totalQty}</span>
            </div>
          </div>
        </div>

        <Button variant="danger" size="sm" onClick={() => { deleteInventoryItem(item.id); onClose(); }}>
          <Trash2 size={15} />Remove
        </Button>
      </div>
    </SlidePanel>
  );
}

function Row({ label, value, mono, className }: { label: string; value: string; mono?: boolean; className?: string }) {
  return (
    <div className="flex items-baseline justify-between">
      <span className="text-sm text-[#86868B]">{label}</span>
      <span className={cn("text-sm text-[#1D1D1F]", mono && "font-mono text-xs", className)}>{value}</span>
    </div>
  );
}
