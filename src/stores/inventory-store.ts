import { create } from "zustand";
import type {
  Product,
  InventoryItem,
  Location,
  Supplier,
  UsageRecord,
  ProcedureTemplate,
  Invoice,
  Alert,
  AlertRule,
} from "@/lib/types";
import { DEFAULT_CATEGORIES } from "@/lib/types";
import {
  products as mockProducts,
  inventoryItems as mockInventory,
  locations as mockLocations,
  suppliers as mockSuppliers,
  usageRecords as mockUsage,
  procedureTemplates as mockTemplates,
  invoices as mockInvoices,
  alerts as mockAlerts,
  alertRules as mockRules,
} from "@/lib/mock-data";
import { generateId } from "@/lib/utils";

interface InventoryState {
  // Data
  products: Product[];
  inventory: InventoryItem[];
  locations: Location[];
  suppliers: Supplier[];
  usageRecords: UsageRecord[];
  procedureTemplates: ProcedureTemplate[];
  invoices: Invoice[];
  alerts: Alert[];
  alertRules: AlertRule[];
  categories: string[];

  // Categories
  addCategory: (name: string) => void;
  removeCategory: (name: string) => void;

  // Products
  addProduct: (product: Omit<Product, "id" | "createdAt">) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;

  // Inventory
  addInventoryItem: (item: Omit<InventoryItem, "id">) => void;
  updateInventoryItem: (id: string, updates: Partial<InventoryItem>) => void;
  deleteInventoryItem: (id: string) => void;

  // Locations
  addLocation: (location: Omit<Location, "id">) => void;
  updateLocation: (id: string, updates: Partial<Location>) => void;
  deleteLocation: (id: string) => void;

  // Usage
  logUsage: (record: Omit<UsageRecord, "id">) => void;
  logProcedure: (templateId: string, locationId: string, usedBy: string) => void;

  // Invoices
  addInvoice: (invoice: Omit<Invoice, "id" | "createdAt">) => void;

  // Alerts
  acknowledgeAlert: (id: string) => void;
  dismissAlert: (id: string) => void;
  updateAlertRule: (id: string, updates: Partial<AlertRule>) => void;

  // Suppliers
  addSupplier: (supplier: Omit<Supplier, "id">) => void;
}

export const useInventoryStore = create<InventoryState>((set, get) => ({
  products: mockProducts,
  inventory: mockInventory,
  locations: mockLocations,
  suppliers: mockSuppliers,
  usageRecords: mockUsage,
  procedureTemplates: mockTemplates,
  invoices: mockInvoices,
  alerts: mockAlerts,
  alertRules: mockRules,
  categories: [...DEFAULT_CATEGORIES],

  // Categories
  addCategory: (name) =>
    set((s) => ({
      categories: s.categories.includes(name) ? s.categories : [...s.categories, name],
    })),
  removeCategory: (name) =>
    set((s) => ({
      categories: s.categories.filter((c) => c !== name),
    })),

  // Products
  addProduct: (product) =>
    set((s) => ({
      products: [...s.products, { ...product, id: `prod_${generateId()}`, createdAt: new Date().toISOString() }],
    })),
  updateProduct: (id, updates) =>
    set((s) => ({
      products: s.products.map((p) => (p.id === id ? { ...p, ...updates } : p)),
    })),
  deleteProduct: (id) =>
    set((s) => ({ products: s.products.filter((p) => p.id !== id) })),

  // Inventory
  addInventoryItem: (item) =>
    set((s) => ({
      inventory: [...s.inventory, { ...item, id: `inv_${generateId()}` }],
    })),
  updateInventoryItem: (id, updates) =>
    set((s) => ({
      inventory: s.inventory.map((i) => (i.id === id ? { ...i, ...updates } : i)),
    })),
  deleteInventoryItem: (id) =>
    set((s) => ({ inventory: s.inventory.filter((i) => i.id !== id) })),

  // Locations
  addLocation: (location) =>
    set((s) => ({
      locations: [...s.locations, { ...location, id: `loc_${generateId()}` }],
    })),
  updateLocation: (id, updates) =>
    set((s) => ({
      locations: s.locations.map((l) => (l.id === id ? { ...l, ...updates } : l)),
    })),
  deleteLocation: (id) =>
    set((s) => ({ locations: s.locations.filter((l) => l.id !== id) })),

  // Usage
  logUsage: (record) =>
    set((s) => {
      const inv = s.inventory.find(
        (i) => i.productId === record.productId && i.locationId === record.locationId
      );
      return {
        usageRecords: [...s.usageRecords, { ...record, id: `use_${generateId()}` }],
        inventory: inv
          ? s.inventory.map((i) =>
              i.id === inv.id ? { ...i, quantity: Math.max(0, i.quantity - record.quantity) } : i
            )
          : s.inventory,
      };
    }),

  logProcedure: (templateId, locationId, usedBy) => {
    const template = get().procedureTemplates.find((t) => t.id === templateId);
    if (!template) return;
    const now = new Date().toISOString();
    template.materials.forEach((m) => {
      get().logUsage({
        productId: m.productId,
        quantity: m.quantity,
        reason: "procedure",
        procedureTemplateId: templateId,
        usedBy,
        usedAt: now,
        locationId,
      });
    });
  },

  // Invoices
  addInvoice: (invoice) =>
    set((s) => ({
      invoices: [...s.invoices, { ...invoice, id: `inv_doc_${generateId()}`, createdAt: new Date().toISOString() }],
    })),

  // Alerts
  acknowledgeAlert: (id) =>
    set((s) => ({
      alerts: s.alerts.map((a) => (a.id === id ? { ...a, acknowledged: true } : a)),
    })),
  dismissAlert: (id) =>
    set((s) => ({
      alerts: s.alerts.map((a) => (a.id === id ? { ...a, dismissed: true } : a)),
    })),
  updateAlertRule: (id, updates) =>
    set((s) => ({
      alertRules: s.alertRules.map((r) => (r.id === id ? { ...r, ...updates } : r)),
    })),

  // Suppliers
  addSupplier: (supplier) =>
    set((s) => ({
      suppliers: [...s.suppliers, { ...supplier, id: `sup_${generateId()}` }],
    })),
}));
