"use client";

import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  alert?: boolean;
  className?: string;
}

export function StatCard({ title, value, subtitle, alert, className }: StatCardProps) {
  return (
    <div className={cn("py-1", className)}>
      <p className="text-xs text-text-tertiary mb-1">{title}</p>
      <p
        className={cn(
          "text-xl font-semibold tracking-heading tabular-nums",
          alert ? "text-status-critical" : "text-text-primary"
        )}
      >
        {value}
      </p>
      {subtitle && (
        <p className="text-2xs text-text-tertiary mt-0.5">{subtitle}</p>
      )}
    </div>
  );
}
