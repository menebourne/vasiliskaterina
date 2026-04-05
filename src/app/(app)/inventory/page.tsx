"use client";

import { useState, useMemo } from "react";
import { useInventoryStore } from "@/stores/inventory-store";
import { InventoryFilters } from "@/components/inventory/inventory-filters";
import { InventoryTable } from "@/components/inventory/inventory-table";
import { ProductDetail } from "@/components/inventory/product-detail";
import { getProduct } from "@/lib/mock-data";
import { daysUntil } from "@/lib/utils";
import { CATEGORY_LABELS } from "@/lib/types";
import type { InventoryItem } from "@/lib/types";

type StockFilter = "all" | "in_stock" | "low" | "expired";

export default function InventoryPage() {
  const { inventory } = useInventoryStore();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [stockFilter, setStockFilter] = useState<StockFilter>("all");
  const [supplierFilter, setSupplierFilter] = useState("");
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);

  const filtered = useMemo(() => {
    return inventory.filter((item) => {
      const product = getProduct(item.productId);
      if (!product) return false;

      if (search) {
        const q = search.toLowerCase();
        if (!product.name.toLowerCase().includes(q) && !product.sku.toLowerCase().includes(q) && !product.barcode.includes(q) && !item.lotNumber.toLowerCase().includes(q)) return false;
      }
      if (category) {
        const label = CATEGORY_LABELS[product.category] || product.category;
        if (product.category !== category && label !== category) return false;
      }
      if (locationFilter && item.locationId !== locationFilter) return false;
      if (supplierFilter && item.supplierId !== supplierFilter) return false;

      if (stockFilter !== "all") {
        const days = daysUntil(item.expirationDate);
        switch (stockFilter) {
          case "in_stock": if (item.quantity <= item.reorderThreshold || days < 0) return false; break;
          case "low": if (item.quantity > item.reorderThreshold) return false; break;
          case "expired": if (days >= 0) return false; break;
        }
      }
      return true;
    });
  }, [inventory, search, category, locationFilter, stockFilter, supplierFilter]);

  return (
    <div className="animate-fade-in">
      <InventoryFilters
        search={search}
        onSearchChange={setSearch}
        category={category}
        onCategoryChange={setCategory}
        locationFilter={locationFilter}
        onLocationChange={setLocationFilter}
        stockFilter={stockFilter}
        onStockFilterChange={setStockFilter}
        supplierFilter={supplierFilter}
        onSupplierChange={setSupplierFilter}
      />

      <p className="text-[12px] text-[#AEAEB2] mt-3 mb-2 px-1">
        {filtered.length} {filtered.length === 1 ? "item" : "items"}
      </p>

      <InventoryTable items={filtered} onRowClick={setSelectedItem} />
      <ProductDetail item={selectedItem} onClose={() => setSelectedItem(null)} />
    </div>
  );
}
