"use client";

import { useState, useRef, useEffect } from "react";
import { ScanBarcode, Plus, Trash2, MapPin, Package, X } from "lucide-react";
import { useInventoryStore } from "@/stores/inventory-store";
import { getLocation } from "@/lib/mock-data";
import { cn, formatDate, formatCurrency, daysUntil } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Modal } from "@/components/ui/modal";
import { CATEGORY_LABELS } from "@/lib/types";
import type { Product } from "@/lib/types";

export default function ScanPage() {
  const { products, inventory, locations, suppliers, addProduct, addInventoryItem, updateInventoryItem, deleteInventoryItem } = useInventoryStore();
  const [barcodeInput, setBarcodeInput] = useState("");
  const [matchedProduct, setMatchedProduct] = useState<Product | null>(null);
  const [showNotFound, setShowNotFound] = useState(false);
  const [scannedBarcode, setScannedBarcode] = useState("");
  const [showAddStock, setShowAddStock] = useState(false);
  const [showNewProduct, setShowNewProduct] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { inputRef.current?.focus(); }, []);

  const handleScan = (barcode: string) => {
    if (!barcode.trim()) return;
    const trimmed = barcode.trim();
    setScannedBarcode(trimmed);
    setBarcodeInput("");

    const found = products.find((p) => p.barcode === trimmed);
    if (found) {
      setMatchedProduct(found);
      setShowNotFound(false);
    } else {
      setMatchedProduct(null);
      setShowNotFound(true);
    }
  };

  const handleClear = () => {
    setMatchedProduct(null);
    setShowNotFound(false);
    setScannedBarcode("");
    inputRef.current?.focus();
  };

  // Get all inventory entries for the matched product
  const productInventory = matchedProduct
    ? inventory.filter((i) => i.productId === matchedProduct.id)
    : [];

  const totalQty = productInventory.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <div className="animate-fade-in max-w-2xl mx-auto">
      {/* Scanner input */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-4 text-[#86868B]">
          <ScanBarcode size={18} />
          <span className="text-[13px]">Scan or type a barcode</span>
        </div>
        <div className="max-w-md mx-auto">
          <input
            ref={inputRef}
            type="text"
            value={barcodeInput}
            onChange={(e) => setBarcodeInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") handleScan(barcodeInput); }}
            placeholder="Barcode number..."
            className="w-full bg-[#F5F5F7] rounded-[12px] px-5 py-3.5 text-[17px] text-center text-[#1D1D1F] font-mono placeholder:text-[#C7C7CC] focus:outline-none focus:ring-[3px] focus:ring-[rgba(0,122,255,0.25)] transition-shadow"
            autoComplete="off"
          />
        </div>
      </div>

      {/* Product found */}
      {matchedProduct && (
        <div className="space-y-5 animate-fade-in">
          {/* Product header */}
          <div className="card p-5">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-[17px] font-semibold text-[#1D1D1F]">{matchedProduct.name}</h2>
                <p className="text-[13px] text-[#86868B] mt-0.5">
                  {matchedProduct.manufacturer} · {CATEGORY_LABELS[matchedProduct.category] || matchedProduct.category}
                </p>
              </div>
              <button onClick={handleClear} className="p-1.5 rounded-full hover:bg-[#F5F5F7] text-[#C7C7CC] hover:text-[#86868B] transition-colors">
                <X size={18} />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-[12px] text-[#86868B]">Total in stock</p>
                <p className={cn("text-[20px] font-bold tabular-nums", totalQty <= matchedProduct.lowStockThreshold ? "text-[#FF9500]" : "text-[#1D1D1F]")}>
                  {totalQty}
                </p>
              </div>
              <div>
                <p className="text-[12px] text-[#86868B]">Low stock at</p>
                <p className="text-[20px] font-bold tabular-nums text-[#1D1D1F]">{matchedProduct.lowStockThreshold}</p>
              </div>
              <div>
                <p className="text-[12px] text-[#86868B]">Price</p>
                <p className="text-[20px] font-bold tabular-nums text-[#1D1D1F]">{formatCurrency(matchedProduct.lastPrice)}</p>
              </div>
            </div>
          </div>

          {/* Stock by location */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="section-title">Stock by Location</h3>
              <Button size="sm" onClick={() => setShowAddStock(true)}>
                <Plus size={14} />
                Add Stock
              </Button>
            </div>

            {productInventory.length === 0 ? (
              <div className="card py-10 text-center">
                <Package size={24} className="mx-auto text-[#C7C7CC] mb-2" />
                <p className="text-[15px] text-[#86868B]">No stock entries yet</p>
                <button onClick={() => setShowAddStock(true)} className="text-[14px] font-medium text-[#007AFF] mt-1">
                  Add first stock entry
                </button>
              </div>
            ) : (
              <div className="card overflow-hidden">
                {productInventory.map((item, idx) => {
                  const location = getLocation(item.locationId);
                  const daysLeft = daysUntil(item.expirationDate);
                  const isExpired = daysLeft < 0;
                  const isLow = item.quantity <= item.reorderThreshold;

                  return (
                    <div key={item.id} className={cn("px-5 py-3.5", idx > 0 && "border-t border-[rgba(0,0,0,0.05)]")}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-[8px] bg-[#F5F5F7] flex items-center justify-center">
                            <MapPin size={14} className="text-[#86868B]" />
                          </div>
                          <div>
                            <p className="text-[14px] font-medium text-[#1D1D1F]">{location?.name ?? "Unknown"}</p>
                            <p className="text-[12px] text-[#AEAEB2] mt-0.5">
                              Lot {item.lotNumber} · Exp {formatDate(item.expirationDate)}
                              {isExpired && <span className="text-[#FF3B30] font-medium"> · Expired</span>}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          {/* Editable quantity */}
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateInventoryItem(item.id, { quantity: Math.max(0, item.quantity - 1) })}
                              className="w-7 h-7 rounded-lg bg-[#F5F5F7] hover:bg-[#E8E8ED] flex items-center justify-center text-[#6E6E73] text-[15px] font-medium transition-colors"
                            >
                              −
                            </button>
                            <span className={cn("text-[16px] font-semibold tabular-nums w-8 text-center", isLow ? "text-[#FF9500]" : isExpired ? "text-[#FF3B30]" : "text-[#1D1D1F]")}>
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateInventoryItem(item.id, { quantity: item.quantity + 1 })}
                              className="w-7 h-7 rounded-lg bg-[#F5F5F7] hover:bg-[#E8E8ED] flex items-center justify-center text-[#6E6E73] text-[15px] font-medium transition-colors"
                            >
                              +
                            </button>
                          </div>

                          {/* Location change */}
                          <select
                            value={item.locationId}
                            onChange={(e) => updateInventoryItem(item.id, { locationId: e.target.value })}
                            className="bg-[#F5F5F7] rounded-lg px-2 py-1 text-[12px] text-[#6E6E73] focus:outline-none cursor-pointer"
                          >
                            {locations.map((l) => (
                              <option key={l.id} value={l.id}>{l.name}</option>
                            ))}
                          </select>

                          {/* Delete */}
                          <button
                            onClick={() => deleteInventoryItem(item.id)}
                            className="p-1.5 rounded-lg hover:bg-[#F5F5F7] text-[#C7C7CC] hover:text-[#FF3B30] transition-colors"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Barcode info */}
          <div className="card p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[12px] text-[#86868B]">Barcode</p>
                <p className="text-[14px] font-mono text-[#1D1D1F]">{matchedProduct.barcode}</p>
              </div>
              <div>
                <p className="text-[12px] text-[#86868B]">Supplier</p>
                <p className="text-[14px] text-[#1D1D1F]">{suppliers.find(s => s.id === matchedProduct.defaultSupplierId)?.name}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Product not found */}
      {showNotFound && (
        <div className="card p-6 text-center animate-fade-in">
          <div className="w-12 h-12 rounded-2xl bg-[#FFF3E0] flex items-center justify-center mx-auto mb-3">
            <Package size={22} className="text-[#FF9500]" />
          </div>
          <h3 className="text-[17px] font-semibold text-[#1D1D1F] mb-1">Product not found</h3>
          <p className="text-[14px] text-[#86868B] mb-4">
            No product matches barcode <span className="font-mono font-medium">{scannedBarcode}</span>
          </p>
          <div className="flex items-center justify-center gap-3">
            <Button variant="ghost" onClick={handleClear}>Try another</Button>
            <Button onClick={() => setShowNewProduct(true)}>
              <Plus size={15} />
              Create Product
            </Button>
          </div>
        </div>
      )}

      {/* Add Stock Modal */}
      <AddStockModal
        open={showAddStock}
        onClose={() => setShowAddStock(false)}
        product={matchedProduct}
        locations={locations}
        onSubmit={(data) => {
          if (!matchedProduct) return;
          addInventoryItem({
            productId: matchedProduct.id,
            locationId: data.locationId,
            quantity: data.quantity,
            lotNumber: data.lotNumber,
            expirationDate: data.expirationDate,
            reorderThreshold: matchedProduct.lowStockThreshold,
            supplierId: matchedProduct.defaultSupplierId,
            lastPrice: matchedProduct.lastPrice,
            addedAt: new Date().toISOString(),
            addedBy: "Dr. Harper",
          });
          setShowAddStock(false);
        }}
      />

      {/* New Product Modal */}
      <NewProductModal
        open={showNewProduct}
        onClose={() => setShowNewProduct(false)}
        barcode={scannedBarcode}
        suppliers={suppliers}
        onSubmit={(product) => {
          addProduct(product);
          setShowNewProduct(false);
          // Find the newly created product and show it
          setTimeout(() => {
            const store = useInventoryStore.getState();
            const newProd = store.products[store.products.length - 1];
            if (newProd) {
              setMatchedProduct(newProd);
              setShowNotFound(false);
            }
          }, 0);
        }}
      />
    </div>
  );
}

function AddStockModal({ open, onClose, product, locations, onSubmit }: {
  open: boolean;
  onClose: () => void;
  product: Product | null;
  locations: { id: string; name: string }[];
  onSubmit: (data: { locationId: string; quantity: number; lotNumber: string; expirationDate: string }) => void;
}) {
  const [locationId, setLocationId] = useState(locations[0]?.id ?? "");
  const [quantity, setQuantity] = useState(1);
  const [lotNumber, setLotNumber] = useState("");
  const [expirationDate, setExpirationDate] = useState("");

  return (
    <Modal open={open} onClose={onClose} title={`Add Stock — ${product?.name ?? ""}`}>
      <form onSubmit={(e) => { e.preventDefault(); onSubmit({ locationId, quantity, lotNumber, expirationDate }); setQuantity(1); setLotNumber(""); setExpirationDate(""); }} className="space-y-4">
        <Select label="Location" value={locationId} onChange={(e) => setLocationId(e.target.value)} options={locations.map((l) => ({ value: l.id, label: l.name }))} />
        <div className="grid grid-cols-2 gap-3">
          <Input label="Quantity" type="number" value={quantity} onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))} min={1} />
          <Input label="Lot Number" value={lotNumber} onChange={(e) => setLotNumber(e.target.value)} placeholder="e.g. LOT-2026A" />
        </div>
        <Input label="Expiration Date" type="date" value={expirationDate} onChange={(e) => setExpirationDate(e.target.value)} />
        <div className="flex justify-end gap-2 pt-2">
          <Button variant="ghost" type="button" onClick={onClose}>Cancel</Button>
          <Button type="submit">Add Stock</Button>
        </div>
      </form>
    </Modal>
  );
}

function NewProductModal({ open, onClose, barcode, suppliers, onSubmit }: {
  open: boolean;
  onClose: () => void;
  barcode: string;
  suppliers: { id: string; name: string }[];
  onSubmit: (product: Omit<Product, "id" | "createdAt">) => void;
}) {
  const categories = useInventoryStore((s) => s.categories);
  const [name, setName] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [category, setCategory] = useState(categories[0] ?? "Miscellaneous");
  const [supplierId, setSupplierId] = useState(suppliers[0]?.id ?? "");
  const [lastPrice, setLastPrice] = useState(0);
  const [lowStockThreshold, setLowStockThreshold] = useState(3);

  return (
    <Modal open={open} onClose={onClose} title="New Product">
      <form onSubmit={(e) => {
        e.preventDefault();
        onSubmit({ name, manufacturer, sku: "", barcode, category, unitsPerPackage: 1, defaultSupplierId: supplierId, lastPrice, lowStockThreshold });
        setName(""); setManufacturer(""); setLastPrice(0);
      }} className="space-y-4">
        <Input label="Product Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <Input label="Manufacturer" value={manufacturer} onChange={(e) => setManufacturer(e.target.value)} />
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-[#6E6E73]">Barcode</label>
          <div className="bg-[#F5F5F7] rounded-lg px-3.5 py-2 text-[15px] text-[#1D1D1F] font-mono">{barcode}</div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Select label="Category" value={category} onChange={(e) => setCategory(e.target.value)} options={categories.map((c) => ({ value: c, label: c }))} />
          <Select label="Supplier" value={supplierId} onChange={(e) => setSupplierId(e.target.value)} options={suppliers.map((s) => ({ value: s.id, label: s.name }))} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Input label="Price (€)" type="number" step="0.01" value={lastPrice} onChange={(e) => setLastPrice(Number(e.target.value))} />
          <Input label="Low Stock Threshold" type="number" value={lowStockThreshold} onChange={(e) => setLowStockThreshold(Number(e.target.value))} min={0} />
        </div>
        <div className="flex justify-end gap-2 pt-2">
          <Button variant="ghost" type="button" onClick={onClose}>Cancel</Button>
          <Button type="submit">Create Product</Button>
        </div>
      </form>
    </Modal>
  );
}
