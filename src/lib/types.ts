export interface User {
  id: string;
  email: string;
  name: string;
  role: "admin" | "dentist" | "hygienist" | "assistant" | "office_manager";
  avatarUrl?: string;
}

export interface Product {
  id: string;
  name: string;
  manufacturer: string;
  sku: string;
  barcode: string;
  category: ProductCategory;
  unitsPerPackage: number;
  defaultSupplierId: string;
  lastPrice: number;
  lowStockThreshold: number;
  imageUrl?: string;
  description?: string;
  createdAt: string;
}

// Categories are now dynamic strings managed in the store
export type ProductCategory = string;

export const DEFAULT_CATEGORIES: string[] = [
  "Composites",
  "Cements",
  "Impression Materials",
  "Anesthetics",
  "Burs & Rotary",
  "Endo Files",
  "Bonding Agents",
  "PPE",
  "Sterilization",
  "Preventive",
  "Surgical",
  "Orthodontics",
  "Miscellaneous",
];

// Keep CATEGORY_LABELS as a pass-through for backward compat with existing mock data keys
export const CATEGORY_LABELS: Record<string, string> = {
  composites: "Composites",
  cements: "Cements",
  impression_materials: "Impression Materials",
  anesthetics: "Anesthetics",
  burs: "Burs & Rotary",
  endo_files: "Endo Files",
  bonding_agents: "Bonding Agents",
  ppe: "PPE",
  sterilization: "Sterilization",
  preventive: "Preventive",
  surgical: "Surgical",
  orthodontics: "Orthodontics",
  miscellaneous: "Miscellaneous",
};

export interface Supplier {
  id: string;
  name: string;
  contactEmail: string;
  phone: string;
  website: string;
  accountNumber?: string;
}

export interface Location {
  id: string;
  name: string;
  description?: string;
  itemCount?: number;
}

export interface InventoryItem {
  id: string;
  productId: string;
  locationId: string;
  quantity: number;
  lotNumber: string;
  expirationDate: string;
  reorderThreshold: number;
  supplierId: string;
  lastPrice: number;
  addedAt: string;
  addedBy: string;
}

export interface InventoryItemWithDetails extends InventoryItem {
  product: Product;
  location: Location;
  supplier: Supplier;
}

export interface UsageRecord {
  id: string;
  productId: string;
  quantity: number;
  reason: "procedure" | "waste" | "expired" | "other";
  procedureTemplateId?: string;
  notes?: string;
  usedBy: string;
  usedAt: string;
  locationId: string;
}

export interface ProcedureTemplate {
  id: string;
  name: string;
  description: string;
  materials: ProcedureMaterial[];
}

export interface ProcedureMaterial {
  productId: string;
  quantity: number;
}

export interface Invoice {
  id: string;
  supplierId: string;
  invoiceNumber: string;
  date: string;
  totalAmount: number;
  lineItems: InvoiceLineItem[];
  pdfUrl?: string;
  status: "pending" | "processed" | "paid";
  createdAt: string;
}

export interface InvoiceLineItem {
  id: string;
  productId: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface Alert {
  id: string;
  type: "low_stock" | "expiring" | "expired" | "restock";
  severity: "info" | "warning" | "critical";
  productId: string;
  message: string;
  createdAt: string;
  acknowledged: boolean;
  dismissed: boolean;
}

export interface AlertRule {
  id: string;
  productId: string;
  lowStockThreshold: number;
  expirationWarningDays: number;
  emailNotification: boolean;
  pushNotification: boolean;
  digestPreference: "realtime" | "daily";
}

export interface WeeklyUsage {
  week: string;
  count: number;
}

export type SortDirection = "asc" | "desc";

export interface Practice {
  name: string;
  address: string;
  phone: string;
  email: string;
}
