/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * Supabase Placeholder Functions
 *
 * These stubs will be replaced with actual Supabase client calls.
 * Each function documents the expected table structure.
 */

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
} from "./types";
import {
  products,
  inventoryItems,
  locations,
  suppliers,
  usageRecords,
  procedureTemplates,
  invoices,
  alerts,
  alertRules,
} from "./mock-data";

// ── Auth ──
// Table: auth.users (managed by Supabase Auth)

export const signIn = async (_email: string, _password: string) => {
  // const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  return { user: { id: "usr_1", email: "dr.harper@smiledental.com" } };
};

export const signOut = async () => {
  // await supabase.auth.signOut()
};

// ── Products ──
// Table: products (id uuid PK, name text, manufacturer text, sku text, barcode text, category text, units_per_package int, default_supplier_id uuid FK, last_price decimal, image_url text, description text, created_at timestamptz, practice_id uuid FK)

export const fetchProducts = async (): Promise<Product[]> => {
  // const { data } = await supabase.from('products').select('*').eq('practice_id', practiceId)
  return products;
};

export const addProduct = async (product: Omit<Product, "id" | "createdAt">): Promise<Product> => {
  // const { data } = await supabase.from('products').insert(product).select().single()
  return { ...product, id: "new_prod", createdAt: new Date().toISOString() };
};

export const updateProduct = async (id: string, updates: Partial<Product>): Promise<Product> => {
  // const { data } = await supabase.from('products').update(updates).eq('id', id).select().single()
  const existing = products.find((p) => p.id === id)!;
  return { ...existing, ...updates };
};

export const deleteProduct = async (_id: string): Promise<void> => {
  // await supabase.from('products').delete().eq('id', id)
};

// ── Inventory ──
// Table: inventory_items (id uuid PK, product_id uuid FK, location_id uuid FK, quantity int, lot_number text, expiration_date date, reorder_threshold int, supplier_id uuid FK, last_price decimal, added_at timestamptz, added_by uuid FK, practice_id uuid FK)

export const fetchInventory = async (): Promise<InventoryItem[]> => {
  // const { data } = await supabase.from('inventory_items').select('*, products(*), locations(*), suppliers(*)').eq('practice_id', practiceId)
  return inventoryItems;
};

export const addInventoryItem = async (item: Omit<InventoryItem, "id">): Promise<InventoryItem> => {
  // const { data } = await supabase.from('inventory_items').insert(item).select().single()
  return { ...item, id: "new_inv" };
};

export const updateInventoryItem = async (id: string, updates: Partial<InventoryItem>): Promise<InventoryItem> => {
  // const { data } = await supabase.from('inventory_items').update(updates).eq('id', id).select().single()
  const existing = inventoryItems.find((i) => i.id === id)!;
  return { ...existing, ...updates };
};

// ── Locations ──
// Table: locations (id uuid PK, name text, description text, practice_id uuid FK)

export const fetchLocations = async (): Promise<Location[]> => {
  // const { data } = await supabase.from('locations').select('*').eq('practice_id', practiceId)
  return locations;
};

// ── Suppliers ──
// Table: suppliers (id uuid PK, name text, contact_email text, phone text, website text, account_number text, practice_id uuid FK)

export const fetchSuppliers = async (): Promise<Supplier[]> => {
  // const { data } = await supabase.from('suppliers').select('*').eq('practice_id', practiceId)
  return suppliers;
};

// ── Usage Records ──
// Table: usage_records (id uuid PK, product_id uuid FK, quantity int, reason text, procedure_template_id uuid FK nullable, notes text, used_by uuid FK, used_at timestamptz, location_id uuid FK, practice_id uuid FK)

export const fetchUsageRecords = async (): Promise<UsageRecord[]> => {
  // const { data } = await supabase.from('usage_records').select('*, products(*), procedure_templates(*)').eq('practice_id', practiceId)
  return usageRecords;
};

export const logUsage = async (record: Omit<UsageRecord, "id">): Promise<UsageRecord> => {
  // const { data } = await supabase.from('usage_records').insert(record).select().single()
  // Also update inventory quantity via RPC or trigger
  return { ...record, id: "new_use" };
};

// ── Procedure Templates ──
// Table: procedure_templates (id uuid PK, name text, description text, practice_id uuid FK)
// Table: procedure_materials (id uuid PK, template_id uuid FK, product_id uuid FK, quantity int)

export const fetchProcedureTemplates = async (): Promise<ProcedureTemplate[]> => {
  // const { data } = await supabase.from('procedure_templates').select('*, procedure_materials(*, products(*))').eq('practice_id', practiceId)
  return procedureTemplates;
};

// ── Invoices ──
// Table: invoices (id uuid PK, supplier_id uuid FK, invoice_number text, date date, total_amount decimal, pdf_url text, status text, created_at timestamptz, practice_id uuid FK)
// Table: invoice_line_items (id uuid PK, invoice_id uuid FK, product_id uuid FK, quantity int, unit_price decimal, total_price decimal)

export const fetchInvoices = async (): Promise<Invoice[]> => {
  // const { data } = await supabase.from('invoices').select('*, invoice_line_items(*, products(*)), suppliers(*)').eq('practice_id', practiceId)
  return invoices;
};

// ── Alerts ──
// Table: alerts (id uuid PK, type text, severity text, product_id uuid FK, message text, created_at timestamptz, acknowledged bool, dismissed bool, practice_id uuid FK)
// Table: alert_rules (id uuid PK, product_id uuid FK, low_stock_threshold int, expiration_warning_days int, email_notification bool, push_notification bool, digest_preference text, practice_id uuid FK)

export const fetchAlerts = async (): Promise<Alert[]> => {
  // const { data } = await supabase.from('alerts').select('*, products(*)').eq('practice_id', practiceId).eq('dismissed', false).order('created_at', { ascending: false })
  return alerts;
};

export const fetchAlertRules = async (): Promise<AlertRule[]> => {
  // const { data } = await supabase.from('alert_rules').select('*, products(*)').eq('practice_id', practiceId)
  return alertRules;
};

// ── Storage ──
// Bucket: invoices (for PDF uploads)
// Bucket: product-images

export const uploadInvoicePdf = async (_file: File): Promise<string> => {
  // const { data } = await supabase.storage.from('invoices').upload(`${practiceId}/${file.name}`, file)
  // return supabase.storage.from('invoices').getPublicUrl(data.path).data.publicUrl
  return "https://example.com/invoice.pdf";
};

export const uploadProductImage = async (_file: File): Promise<string> => {
  // const { data } = await supabase.storage.from('product-images').upload(`${practiceId}/${file.name}`, file)
  return "https://example.com/product.jpg";
};
