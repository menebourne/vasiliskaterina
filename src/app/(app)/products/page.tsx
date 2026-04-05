"use client";

import { useState, useMemo, useEffect } from "react";
import { Search, Plus, Edit2, Trash2, X } from "lucide-react";
import { useInventoryStore } from "@/stores/inventory-store";
import { getSupplier } from "@/lib/mock-data";
import { formatCurrency, cn } from "@/lib/utils";
import { CATEGORY_LABELS, type Product } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

export default function ProductsPage() {
  const { products, suppliers, categories, addProduct, updateProduct, deleteProduct, addCategory, removeCategory } = useInventoryStore();
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showCategoryManager, setShowCategoryManager] = useState(false);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (search) {
        const q = search.toLowerCase();
        if (!p.name.toLowerCase().includes(q) && !p.manufacturer.toLowerCase().includes(q) && !p.barcode.includes(q)) return false;
      }
      if (categoryFilter) {
        const label = CATEGORY_LABELS[p.category] || p.category;
        if (p.category !== categoryFilter && label !== categoryFilter) return false;
      }
      return true;
    });
  }, [products, search, categoryFilter]);

  return (
    <div className="animate-fade-in">
      <div className="flex items-center gap-3 mb-4">
        <div className="relative flex-1 max-w-sm">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#86868B]" />
          <input
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#F5F5F7] rounded-[10px] pl-10 pr-4 py-[9px] text-[15px] text-[#1D1D1F] placeholder:text-[#C7C7CC] focus:outline-none focus:ring-[3px] focus:ring-[rgba(0,122,255,0.25)] transition-shadow"
          />
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="bg-[#F5F5F7] rounded-[10px] px-3 py-[7px] text-[13px] text-[#6E6E73] font-medium focus:outline-none cursor-pointer"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
        </select>
        <Button size="sm" variant="ghost" onClick={() => setShowCategoryManager(true)}>
          Categories
        </Button>
        <Button size="sm" onClick={() => setShowAddModal(true)}>
          <Plus size={15} />
          Add
        </Button>
      </div>

      <h3 className="section-title mb-2">{filtered.length} products</h3>

      <div className="card overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="text-[11px] text-[#86868B] uppercase tracking-[0.04em] bg-[#FAFAFA]">
              <th className="text-left px-4 py-3 font-semibold">Product</th>
              <th className="text-left px-4 py-3 font-semibold">Manufacturer</th>
              <th className="text-left px-4 py-3 font-semibold">Category</th>
              <th className="text-left px-4 py-3 font-semibold">Supplier</th>
              <th className="text-right px-4 py-3 font-semibold">Low Stock</th>
              <th className="text-right px-4 py-3 font-semibold">Price</th>
              <th className="w-16 px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {filtered.map((product, idx) => (
              <tr key={product.id} className={cn("hover-row group", idx > 0 && "border-t border-[rgba(0,0,0,0.04)]")}>
                <td className="px-4 py-3">
                  <span className="text-[14px] text-[#1D1D1F] font-medium">{product.name}</span>
                </td>
                <td className="px-4 py-3 text-[13px] text-[#86868B]">{product.manufacturer}</td>
                <td className="px-4 py-3 text-[13px] text-[#86868B]">{CATEGORY_LABELS[product.category] || product.category}</td>
                <td className="px-4 py-3 text-[13px] text-[#86868B]">{getSupplier(product.defaultSupplierId)?.name}</td>
                <td className="px-4 py-3 text-[13px] text-right text-[#86868B] tabular-nums">{product.lowStockThreshold}</td>
                <td className="px-4 py-3 text-[13px] text-right text-[#86868B] tabular-nums">{formatCurrency(product.lastPrice)}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-0.5 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => setEditingProduct(product)} className="p-1.5 rounded-lg hover:bg-[#F5F5F7] text-[#C7C7CC] hover:text-[#86868B] transition-colors">
                      <Edit2 size={13} />
                    </button>
                    <button onClick={() => deleteProduct(product.id)} className="p-1.5 rounded-lg hover:bg-[#F5F5F7] text-[#C7C7CC] hover:text-[#FF3B30] transition-colors">
                      <Trash2 size={13} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Product form */}
      <ProductFormModal
        open={showAddModal || !!editingProduct}
        onClose={() => { setShowAddModal(false); setEditingProduct(null); }}
        product={editingProduct}
        suppliers={suppliers}
        categories={categories}
        onAddCategory={addCategory}
        onSubmit={(data) => {
          if (editingProduct) updateProduct(editingProduct.id, data);
          else addProduct(data as Omit<Product, "id" | "createdAt">);
          setShowAddModal(false);
          setEditingProduct(null);
        }}
      />

      {/* Category manager */}
      <CategoryManagerModal
        open={showCategoryManager}
        onClose={() => setShowCategoryManager(false)}
        categories={categories}
        onAdd={addCategory}
        onRemove={removeCategory}
      />
    </div>
  );
}

function ProductFormModal({
  open, onClose, product, suppliers, categories, onAddCategory, onSubmit,
}: {
  open: boolean; onClose: () => void; product: Product | null;
  suppliers: { id: string; name: string }[];
  categories: string[];
  onAddCategory: (name: string) => void;
  onSubmit: (data: Partial<Product>) => void;
}) {
  const [name, setName] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [barcode, setBarcode] = useState("");
  const [category, setCategory] = useState(categories[0] ?? "");
  const [unitsPerPackage, setUnitsPerPackage] = useState(1);
  const [supplierId, setSupplierId] = useState(suppliers[0]?.id ?? "");
  const [lastPrice, setLastPrice] = useState(0);
  const [lowStockThreshold, setLowStockThreshold] = useState(3);
  const [newCategory, setNewCategory] = useState("");
  const [showNewCategory, setShowNewCategory] = useState(false);

  useEffect(() => {
    if (product) {
      setName(product.name);
      setManufacturer(product.manufacturer);
      setBarcode(product.barcode);
      setCategory(CATEGORY_LABELS[product.category] || product.category);
      setUnitsPerPackage(product.unitsPerPackage);
      setSupplierId(product.defaultSupplierId);
      setLastPrice(product.lastPrice);
      setLowStockThreshold(product.lowStockThreshold);
    } else {
      setName("");
      setManufacturer("");
      setBarcode("");
      setCategory(categories[0] ?? "");
      setUnitsPerPackage(1);
      setSupplierId(suppliers[0]?.id ?? "");
      setLastPrice(0);
      setLowStockThreshold(3);
    }
    setShowNewCategory(false);
    setNewCategory("");
  }, [product, categories, suppliers]);

  const handleCategoryChange = (value: string) => {
    if (value === "__new__") {
      setShowNewCategory(true);
      setNewCategory("");
    } else {
      setCategory(value);
      setShowNewCategory(false);
    }
  };

  const handleCreateCategory = () => {
    if (!newCategory.trim()) return;
    onAddCategory(newCategory.trim());
    setCategory(newCategory.trim());
    setShowNewCategory(false);
    setNewCategory("");
  };

  return (
    <Modal open={open} onClose={onClose} title={product ? "Edit Product" : "New Product"}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit({ name, manufacturer, sku: "", barcode, category, unitsPerPackage, defaultSupplierId: supplierId, lastPrice, lowStockThreshold });
        }}
        className="space-y-3"
      >
        <Input label="Product Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <Input label="Manufacturer" value={manufacturer} onChange={(e) => setManufacturer(e.target.value)} required />
        <Input label="Barcode" value={barcode} onChange={(e) => setBarcode(e.target.value)} />

        {/* Category */}
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-[#6E6E73]">Category</label>
          {showNewCategory ? (
            <div className="flex gap-2">
              <input
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="New category name..."
                className="flex-1 bg-[rgba(120,120,128,0.08)] rounded-lg px-3.5 py-2 text-[15px] text-[#1D1D1F] focus:outline-none focus:ring-[3px] focus:ring-[rgba(0,122,255,0.25)]"
                autoFocus
                onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); handleCreateCategory(); } }}
              />
              <button type="button" onClick={handleCreateCategory} className="px-3 py-2 bg-[#007AFF] text-white text-[13px] font-medium rounded-lg">
                Add
              </button>
              <button type="button" onClick={() => setShowNewCategory(false)} className="px-2 py-2 text-[#86868B] hover:text-[#1D1D1F]">
                <X size={16} />
              </button>
            </div>
          ) : (
            <select
              value={category}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="w-full bg-[rgba(120,120,128,0.08)] rounded-lg px-3.5 py-2 text-[15px] text-[#1D1D1F] focus:outline-none focus:ring-[3px] focus:ring-[rgba(0,122,255,0.25)]"
            >
              {categories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
              <option value="__new__">+ New category...</option>
            </select>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Input label="Units/Pkg" type="number" value={unitsPerPackage} onChange={(e) => setUnitsPerPackage(Number(e.target.value))} min={1} />
          <Input label="Low Stock Threshold" type="number" value={lowStockThreshold} onChange={(e) => setLowStockThreshold(Number(e.target.value))} min={0} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Select label="Supplier" value={supplierId} onChange={(e) => setSupplierId(e.target.value)} options={suppliers.map((s) => ({ value: s.id, label: s.name }))} />
          <Input label="Price (€)" type="number" step="0.01" value={lastPrice} onChange={(e) => setLastPrice(Number(e.target.value))} />
        </div>
        <div className="flex justify-end gap-2 pt-3">
          <Button variant="ghost" type="button" onClick={onClose}>Cancel</Button>
          <Button type="submit">{product ? "Save" : "Add Product"}</Button>
        </div>
      </form>
    </Modal>
  );
}

function CategoryManagerModal({
  open, onClose, categories, onAdd, onRemove,
}: {
  open: boolean; onClose: () => void;
  categories: string[];
  onAdd: (name: string) => void;
  onRemove: (name: string) => void;
}) {
  const [newName, setNewName] = useState("");

  const handleAdd = () => {
    if (!newName.trim() || categories.includes(newName.trim())) return;
    onAdd(newName.trim());
    setNewName("");
  };

  return (
    <Modal open={open} onClose={onClose} title="Manage Categories">
      <div className="space-y-4">
        {/* Add new */}
        <div className="flex gap-2">
          <input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="New category..."
            className="flex-1 bg-[rgba(120,120,128,0.08)] rounded-lg px-3.5 py-2 text-[15px] text-[#1D1D1F] placeholder:text-[#C7C7CC] focus:outline-none focus:ring-[3px] focus:ring-[rgba(0,122,255,0.25)]"
            onKeyDown={(e) => { if (e.key === "Enter") handleAdd(); }}
          />
          <Button size="sm" onClick={handleAdd} disabled={!newName.trim()}>Add</Button>
        </div>

        {/* List */}
        <div className="card overflow-hidden">
          {categories.map((cat, idx) => (
            <div key={cat} className={cn("flex items-center justify-between px-4 py-2.5", idx > 0 && "border-t border-[rgba(0,0,0,0.05)]")}>
              <span className="text-[14px] text-[#1D1D1F]">{cat}</span>
              <button
                onClick={() => onRemove(cat)}
                className="p-1 rounded-lg hover:bg-[#F5F5F7] text-[#C7C7CC] hover:text-[#FF3B30] transition-colors"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
}
