"use client";

import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { useInventoryStore } from "@/stores/inventory-store";

type StockFilter = "all" | "in_stock" | "low" | "expired";

interface InventoryFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  category: string;
  onCategoryChange: (value: string) => void;
  locationFilter: string;
  onLocationChange: (value: string) => void;
  stockFilter: StockFilter;
  onStockFilterChange: (value: StockFilter) => void;
  supplierFilter: string;
  onSupplierChange: (value: string) => void;
}

const stockFilters: { value: StockFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "in_stock", label: "In Stock" },
  { value: "low", label: "Low" },
  { value: "expired", label: "Expired" },
];

export function InventoryFilters({
  search, onSearchChange, category, onCategoryChange, locationFilter, onLocationChange,
  stockFilter, onStockFilterChange, supplierFilter, onSupplierChange,
}: InventoryFiltersProps) {
  const { locations, suppliers, categories } = useInventoryStore();

  return (
    <div className="space-y-3">
      <div className="relative max-w-sm">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#86868B]" />
        <input
          placeholder="Search inventory..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full bg-[#F5F5F7] rounded-[10px] pl-10 pr-4 py-[9px] text-[15px] text-[#1D1D1F] placeholder:text-[#C7C7CC] focus:outline-none focus:ring-[3px] focus:ring-[rgba(0,122,255,0.25)] transition-shadow"
        />
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        <div className="flex items-center bg-[#E8E8ED] rounded-[10px] p-[3px]">
          {stockFilters.map((f) => (
            <button
              key={f.value}
              onClick={() => onStockFilterChange(f.value)}
              className={cn(
                "px-3 py-[5px] rounded-[8px] text-[13px] font-medium transition-all duration-200",
                stockFilter === f.value
                  ? "bg-white text-[#1D1D1F] shadow-[0_0.5px_1px_rgba(0,0,0,0.04),0_1px_3px_rgba(0,0,0,0.06)]"
                  : "text-[#6E6E73] hover:text-[#424245]"
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        <select value={category} onChange={(e) => onCategoryChange(e.target.value)}
          className="bg-[#F5F5F7] rounded-[10px] px-3 py-[7px] text-[13px] text-[#6E6E73] font-medium focus:outline-none cursor-pointer appearance-none pr-7 bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23AEAEB2%22%20stroke-width%3D%222.5%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_8px_center]">
          <option value="">Category</option>
          {categories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
        </select>

        <select value={locationFilter} onChange={(e) => onLocationChange(e.target.value)}
          className="bg-[#F5F5F7] rounded-[10px] px-3 py-[7px] text-[13px] text-[#6E6E73] font-medium focus:outline-none cursor-pointer appearance-none pr-7 bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23AEAEB2%22%20stroke-width%3D%222.5%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_8px_center]">
          <option value="">Location</option>
          {locations.map((l) => <option key={l.id} value={l.id}>{l.name}</option>)}
        </select>

        <select value={supplierFilter} onChange={(e) => onSupplierChange(e.target.value)}
          className="bg-[#F5F5F7] rounded-[10px] px-3 py-[7px] text-[13px] text-[#6E6E73] font-medium focus:outline-none cursor-pointer appearance-none pr-7 bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23AEAEB2%22%20stroke-width%3D%222.5%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_8px_center]">
          <option value="">Supplier</option>
          {suppliers.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
        </select>
      </div>
    </div>
  );
}
