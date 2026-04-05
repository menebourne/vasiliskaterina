"use client";

import { useState, useMemo } from "react";
import { FileText, Plus, ChevronRight, Trash2 } from "lucide-react";
import { useInventoryStore } from "@/stores/inventory-store";
import { getSupplier, getProduct } from "@/lib/mock-data";
import { formatCurrency, formatDate, cn, generateId } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Modal } from "@/components/ui/modal";
import { SlidePanel } from "@/components/ui/slide-panel";
import type { Invoice, InvoiceLineItem, Product } from "@/lib/types";

const NEW_PRODUCT_VALUE = "__new__";

export default function InvoicesPage() {
  const { invoices, suppliers, products, addInvoice, addProduct } = useInventoryStore();
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const sortedInvoices = useMemo(() => [...invoices].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()), [invoices]);

  return (
    <div className="animate-fade-in max-w-3xl">
      <div className="flex items-center justify-between mb-5">
        <div />
        <Button size="sm" onClick={() => setShowAddModal(true)}>
          <Plus size={15} />
          New Invoice
        </Button>
      </div>

      <h2 className="section-title">Invoices</h2>
      <div className="card overflow-hidden">
        {sortedInvoices.length === 0 ? (
          <div className="py-16 text-center text-[15px] text-[#86868B]">
            No invoices yet
          </div>
        ) : sortedInvoices.map((invoice, idx) => {
          const supplier = getSupplier(invoice.supplierId);
          return (
            <button
              key={invoice.id}
              onClick={() => setSelectedInvoice(invoice)}
              className={cn(
                "w-full flex items-center gap-4 px-5 py-3.5 hover-row text-left transition-colors",
                idx > 0 && "border-t border-[rgba(0,0,0,0.05)]"
              )}
            >
              <div className="w-9 h-9 rounded-[10px] bg-[#F5F5F7] flex items-center justify-center flex-shrink-0">
                <FileText size={16} className="text-[#86868B]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[15px] text-[#1D1D1F] font-medium">{invoice.invoiceNumber}</p>
                <p className="text-[13px] text-[#86868B] mt-0.5">
                  {supplier?.name} · {formatDate(invoice.date)} · {invoice.lineItems.length} items
                </p>
              </div>
              <Badge variant={invoice.status === "paid" ? "healthy" : invoice.status === "processed" ? "accent" : "warning"}>
                {invoice.status}
              </Badge>
              <span className="text-[15px] font-semibold text-[#1D1D1F] tabular-nums">{formatCurrency(invoice.totalAmount)}</span>
              <ChevronRight size={16} className="text-[#C7C7CC]" />
            </button>
          );
        })}
      </div>

      <AddInvoiceModal
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
        suppliers={suppliers}
        products={products}
        onAddProduct={addProduct}
        onSubmit={(invoice) => { addInvoice(invoice); setShowAddModal(false); }}
      />

      <SlidePanel open={!!selectedInvoice} onClose={() => setSelectedInvoice(null)} title={selectedInvoice?.invoiceNumber ?? ""} width="max-w-md">
        {selectedInvoice && (
          <div className="space-y-6">
            <div className="card p-4 space-y-3">
              <DetailRow label="Supplier" value={getSupplier(selectedInvoice.supplierId)?.name ?? ""} />
              <DetailRow label="Date" value={formatDate(selectedInvoice.date)} />
              <DetailRow label="Total" value={formatCurrency(selectedInvoice.totalAmount)} bold />
            </div>
            <div>
              <h4 className="section-title">Line Items</h4>
              <div className="card overflow-hidden">
                {selectedInvoice.lineItems.map((li, idx) => (
                  <div key={li.id} className={cn("flex items-center justify-between px-4 py-3", idx > 0 && "border-t border-[rgba(0,0,0,0.05)]")}>
                    <div>
                      <p className="text-[14px] text-[#1D1D1F]">{getProduct(li.productId)?.name}</p>
                      <p className="text-[12px] text-[#AEAEB2] mt-0.5">{li.quantity} × {formatCurrency(li.unitPrice)}</p>
                    </div>
                    <span className="text-[14px] font-semibold text-[#1D1D1F] tabular-nums">{formatCurrency(li.totalPrice)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </SlidePanel>
    </div>
  );
}

function AddInvoiceModal({
  open, onClose, suppliers, products, onAddProduct, onSubmit,
}: {
  open: boolean;
  onClose: () => void;
  suppliers: { id: string; name: string }[];
  products: { id: string; name: string; lastPrice: number }[];
  onAddProduct: (product: Omit<Product, "id" | "createdAt">) => void;
  onSubmit: (invoice: Omit<Invoice, "id" | "createdAt">) => void;
}) {
  const [supplierId, setSupplierId] = useState(suppliers[0]?.id ?? "");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [lineItems, setLineItems] = useState<InvoiceLineItem[]>([]);
  const [newItemName, setNewItemName] = useState("");
  const [showNewItemInput, setShowNewItemInput] = useState<string | null>(null); // line item id

  const addLineItem = () => {
    setLineItems([...lineItems, {
      id: generateId(),
      productId: products[0]?.id ?? "",
      quantity: 1,
      unitPrice: products[0]?.lastPrice ?? 0,
      totalPrice: products[0]?.lastPrice ?? 0,
    }]);
  };

  const updateLineItem = (id: string, updates: Partial<InvoiceLineItem>) => {
    setLineItems(lineItems.map((li) => {
      if (li.id !== id) return li;
      const updated = { ...li, ...updates };
      if (updates.productId && updates.productId !== NEW_PRODUCT_VALUE) {
        const prod = products.find(p => p.id === updates.productId);
        updated.unitPrice = prod?.lastPrice ?? 0;
      }
      updated.totalPrice = updated.quantity * updated.unitPrice;
      return updated;
    }));
  };

  const handleProductChange = (lineItemId: string, value: string) => {
    if (value === NEW_PRODUCT_VALUE) {
      setShowNewItemInput(lineItemId);
      setNewItemName("");
    } else {
      setShowNewItemInput(null);
      updateLineItem(lineItemId, { productId: value });
    }
  };

  const handleCreateProduct = (lineItemId: string) => {
    if (!newItemName.trim()) return;
    onAddProduct({
      name: newItemName.trim(),
      manufacturer: "",
      sku: "",
      barcode: "",
      category: "Miscellaneous",
      unitsPerPackage: 1,
      defaultSupplierId: supplierId,
      lastPrice: 0,
      lowStockThreshold: 3,
    });
    // The new product is now the last in the store — find it
    // We need to defer to next render, so set a temp flag
    setShowNewItemInput(null);
    setNewItemName("");
    // Update line item to use the newest product (will be added by store)
    // Since we can't get the ID synchronously, we'll update after a tick
    setTimeout(() => {
      const store = useInventoryStore.getState();
      const newProd = store.products[store.products.length - 1];
      if (newProd) {
        updateLineItem(lineItemId, { productId: newProd.id, unitPrice: 0 });
      }
    }, 0);
  };

  const removeLineItem = (id: string) => {
    setLineItems(lineItems.filter((li) => li.id !== id));
    if (showNewItemInput === id) setShowNewItemInput(null);
  };

  const totalAmount = lineItems.reduce((sum, li) => sum + li.totalPrice, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!invoiceNumber || lineItems.length === 0) return;
    onSubmit({ supplierId, invoiceNumber, date, totalAmount, lineItems, status: "pending" });
    setInvoiceNumber("");
    setLineItems([]);
  };

  // Get live products from store for the dropdown
  const liveProducts = useInventoryStore((s) => s.products);

  return (
    <Modal open={open} onClose={onClose} title="New Invoice" className="max-w-lg">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-2 gap-3">
          <Input
            label="Invoice Number"
            value={invoiceNumber}
            onChange={(e) => setInvoiceNumber(e.target.value)}
            placeholder="INV-2026-001"
            required
          />
          <Input
            label="Date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <Select
          label="Supplier"
          value={supplierId}
          onChange={(e) => setSupplierId(e.target.value)}
          options={suppliers.map((s) => ({ value: s.id, label: s.name }))}
        />

        {/* Line items */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[13px] font-semibold text-[#86868B] uppercase tracking-[0.02em]">Line Items</span>
            <button
              type="button"
              onClick={addLineItem}
              className="text-[13px] font-medium text-[#007AFF] hover:text-[#0066CC] transition-colors flex items-center gap-1"
            >
              <Plus size={14} />
              Add Item
            </button>
          </div>

          {lineItems.length === 0 ? (
            <div className="rounded-xl bg-[#F5F5F7] py-8 text-center">
              <p className="text-[14px] text-[#86868B]">No items yet</p>
              <button type="button" onClick={addLineItem} className="text-[14px] font-medium text-[#007AFF] mt-1">
                Add your first item
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              {lineItems.map((li) => (
                <div key={li.id} className="p-3 rounded-xl bg-[#F5F5F7]">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 min-w-0">
                      {showNewItemInput === li.id ? (
                        <div className="flex gap-2">
                          <input
                            value={newItemName}
                            onChange={(e) => setNewItemName(e.target.value)}
                            placeholder="New product name..."
                            className="flex-1 bg-white rounded-lg px-2.5 py-1.5 text-[13px] text-[#1D1D1F] focus:outline-none focus:ring-[3px] focus:ring-[rgba(0,122,255,0.25)]"
                            autoFocus
                            onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); handleCreateProduct(li.id); } }}
                          />
                          <button
                            type="button"
                            onClick={() => handleCreateProduct(li.id)}
                            className="px-2.5 py-1.5 bg-[#007AFF] text-white text-[12px] font-medium rounded-lg hover:bg-[#0066CC] transition-colors"
                          >
                            Create
                          </button>
                        </div>
                      ) : (
                        <select
                          value={li.productId}
                          onChange={(e) => handleProductChange(li.id, e.target.value)}
                          className="w-full bg-white rounded-lg px-2.5 py-1.5 text-[13px] text-[#1D1D1F] focus:outline-none focus:ring-[3px] focus:ring-[rgba(0,122,255,0.25)]"
                        >
                          {liveProducts.map((p) => (
                            <option key={p.id} value={p.id}>{p.name}</option>
                          ))}
                          <option value={NEW_PRODUCT_VALUE}>+ New custom item...</option>
                        </select>
                      )}
                    </div>
                    <input
                      type="number"
                      value={li.quantity}
                      onChange={(e) => updateLineItem(li.id, { quantity: Math.max(1, Number(e.target.value)) })}
                      min={1}
                      className="w-[56px] bg-white rounded-lg px-2 py-1.5 text-[13px] text-[#1D1D1F] text-center focus:outline-none focus:ring-[3px] focus:ring-[rgba(0,122,255,0.25)]"
                    />
                    <input
                      type="number"
                      step="0.01"
                      value={li.unitPrice}
                      onChange={(e) => updateLineItem(li.id, { unitPrice: Number(e.target.value) })}
                      className="w-[72px] bg-white rounded-lg px-2 py-1.5 text-[13px] text-[#1D1D1F] text-right focus:outline-none focus:ring-[3px] focus:ring-[rgba(0,122,255,0.25)]"
                    />
                    <span className="text-[13px] font-semibold text-[#1D1D1F] tabular-nums w-[64px] text-right">
                      {formatCurrency(li.totalPrice)}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeLineItem(li.id)}
                      className="p-1.5 rounded-lg hover:bg-white text-[#C7C7CC] hover:text-[#FF3B30] transition-colors flex-shrink-0"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}

              <div className="flex items-center justify-end gap-3 pt-2 pr-1">
                <span className="text-[13px] text-[#86868B]">Total</span>
                <span className="text-[16px] font-bold text-[#1D1D1F] tabular-nums">{formatCurrency(totalAmount)}</span>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <Button variant="ghost" type="button" onClick={onClose}>Cancel</Button>
          <Button type="submit" disabled={!invoiceNumber || lineItems.length === 0}>Create Invoice</Button>
        </div>
      </form>
    </Modal>
  );
}

function DetailRow({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className="flex items-baseline justify-between">
      <span className="text-[13px] text-[#86868B]">{label}</span>
      <span className={cn("text-[14px] text-[#1D1D1F]", bold && "font-semibold")}>{value}</span>
    </div>
  );
}
