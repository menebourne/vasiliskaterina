"use client";

import { useState, useMemo } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import { cn, daysUntil, getItemStatus, statusDotColor, formatDateShort, formatCurrency } from "@/lib/utils";
import { getProduct, getLocation, getSupplier } from "@/lib/mock-data";
import { CATEGORY_LABELS } from "@/lib/types";
import type { InventoryItem, SortDirection } from "@/lib/types";

interface InventoryTableProps {
  items: InventoryItem[];
  onRowClick: (item: InventoryItem) => void;
}

type SortField = "name" | "category" | "location" | "quantity" | "expiration" | "supplier" | "price";

export function InventoryTable({ items, onRowClick }: InventoryTableProps) {
  const [sortField, setSortField] = useState<SortField>("name");
  const [sortDir, setSortDir] = useState<SortDirection>("asc");

  const handleSort = (field: SortField) => {
    if (sortField === field) setSortDir(sortDir === "asc" ? "desc" : "asc");
    else { setSortField(field); setSortDir("asc"); }
  };

  const sorted = useMemo(() => {
    return [...items].sort((a, b) => {
      const dir = sortDir === "asc" ? 1 : -1;
      const prodA = getProduct(a.productId), prodB = getProduct(b.productId);
      switch (sortField) {
        case "name": return dir * (prodA?.name ?? "").localeCompare(prodB?.name ?? "");
        case "category": return dir * (prodA?.category ?? "").localeCompare(prodB?.category ?? "");
        case "location": return dir * (getLocation(a.locationId)?.name ?? "").localeCompare(getLocation(b.locationId)?.name ?? "");
        case "quantity": return dir * (a.quantity - b.quantity);
        case "expiration": return dir * (new Date(a.expirationDate).getTime() - new Date(b.expirationDate).getTime());
        case "supplier": return dir * (getSupplier(a.supplierId)?.name ?? "").localeCompare(getSupplier(b.supplierId)?.name ?? "");
        case "price": return dir * (a.lastPrice - b.lastPrice);
        default: return 0;
      }
    });
  }, [items, sortField, sortDir]);

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return null;
    return sortDir === "asc" ? <ChevronUp size={12} /> : <ChevronDown size={12} />;
  };

  const columns: { field: SortField; label: string; align?: string }[] = [
    { field: "name", label: "Product" },
    { field: "category", label: "Category" },
    { field: "location", label: "Location" },
    { field: "quantity", label: "Qty", align: "text-right" },
    { field: "expiration", label: "Expires" },
    { field: "supplier", label: "Supplier" },
    { field: "price", label: "Price", align: "text-right" },
  ];

  return (
    <div className="card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-[#FAFAFA]">
              <th className="w-10 pl-5 pr-1 py-3" />
              {columns.map((col) => (
                <th key={col.field} onClick={() => handleSort(col.field)}
                  className={cn("px-3 py-3 text-[11px] font-semibold text-[#86868B] cursor-pointer hover:text-[#6E6E73] transition-colors select-none uppercase tracking-[0.04em]", col.align || "text-left")}>
                  <div className={cn("flex items-center gap-1", col.align === "text-right" && "justify-end")}>
                    {col.label}<SortIcon field={col.field} />
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.map((item, i) => {
              const product = getProduct(item.productId);
              const location = getLocation(item.locationId);
              const supplier = getSupplier(item.supplierId);
              const daysLeft = daysUntil(item.expirationDate);
              const status = getItemStatus(item.quantity, item.reorderThreshold, daysLeft);

              return (
                <tr key={item.id} onClick={() => onRowClick(item)}
                  className={cn("hover-row cursor-pointer", i > 0 && "border-t border-[rgba(0,0,0,0.04)]")}>
                  <td className="pl-5 pr-1 py-3"><span className={cn("inline-block w-[7px] h-[7px] rounded-full", statusDotColor(status))} /></td>
                  <td className="px-3 py-3 text-[14px] text-[#1D1D1F] font-medium">{product?.name ?? "Unknown"}</td>
                  <td className="px-3 py-3 text-[13px] text-[#86868B]">{product ? (CATEGORY_LABELS[product.category] || product.category) : ""}</td>
                  <td className="px-3 py-3 text-[13px] text-[#86868B]">{location?.name}</td>
                  <td className={cn("px-3 py-3 text-[14px] text-right tabular-nums font-semibold", status === "bad" ? "text-[#FF3B30]" : "text-[#1D1D1F]")}>{item.quantity}</td>
                  <td className={cn("px-3 py-3 text-[13px]", daysLeft <= 60 ? "text-[#FF3B30]" : "text-[#86868B]")}>{formatDateShort(item.expirationDate)}</td>
                  <td className="px-3 py-3 text-[13px] text-[#86868B]">{supplier?.name}</td>
                  <td className="px-3 py-3 text-[13px] text-right text-[#86868B] tabular-nums">{formatCurrency(item.lastPrice)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {sorted.length === 0 && <div className="py-20 text-center text-[15px] text-[#86868B]">No items match your filters</div>}
    </div>
  );
}
