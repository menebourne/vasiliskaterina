import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, formatDistanceToNow, differenceInDays, parseISO } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  }).format(amount);
}

export function formatDate(date: string | Date): string {
  const d = typeof date === "string" ? parseISO(date) : date;
  return format(d, "MMM d, yyyy");
}

export function formatDateShort(date: string | Date): string {
  const d = typeof date === "string" ? parseISO(date) : date;
  return format(d, "MMM d");
}

export function formatRelativeTime(date: string | Date): string {
  const d = typeof date === "string" ? parseISO(date) : date;
  return formatDistanceToNow(d, { addSuffix: true });
}

export function daysUntil(date: string | Date): number {
  const d = typeof date === "string" ? parseISO(date) : date;
  return differenceInDays(d, new Date());
}

// Green = all good, Red = needs attention (low stock, expiring, expired)
export type ItemStatus = "ok" | "bad";

export function getItemStatus(quantity: number, threshold: number, daysUntilExpiry: number): ItemStatus {
  if (daysUntilExpiry < 0) return "bad";
  if (daysUntilExpiry <= 60) return "bad";
  if (quantity <= threshold) return "bad";
  return "ok";
}

export function getExpirationStatus(daysRemaining: number): "healthy" | "warning" | "critical" | "expired" {
  if (daysRemaining < 0) return "expired";
  if (daysRemaining <= 60) return "warning";
  return "healthy";
}

export function getStockStatus(current: number, threshold: number): "healthy" | "warning" | "critical" {
  if (current <= threshold) return "warning";
  return "healthy";
}

export function statusDotColor(status: ItemStatus): string {
  return { ok: "bg-[#34C759]", bad: "bg-[#FF3B30]" }[status];
}

export function statusTextColor(status: "healthy" | "warning" | "critical" | "expired"): string {
  const colors = {
    healthy: "text-[#34C759]",
    warning: "text-[#FF9500]",
    critical: "text-[#FF3B30]",
    expired: "text-[#FF3B30]",
  };
  return colors[status];
}

export function statusColor(status: "healthy" | "warning" | "critical" | "expired"): string {
  const colors = {
    healthy: "bg-[#34C759]",
    warning: "bg-[#FF9500]",
    critical: "bg-[#FF3B30]",
    expired: "bg-[#FF3B30]",
  };
  return colors[status];
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 15);
}
