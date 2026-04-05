"use client";

import { useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { format, parseISO } from "date-fns";
import type { Invoice } from "@/lib/types";

interface SpendChartProps {
  invoices: Invoice[];
}

export function SpendChart({ invoices }: SpendChartProps) {
  const monthlyData = useMemo(() => {
    const map = new Map<string, number>();
    invoices.forEach((inv) => {
      const month = format(parseISO(inv.date), "MMM");
      map.set(month, (map.get(month) ?? 0) + inv.totalAmount);
    });
    return Array.from(map.entries()).map(([month, amount]) => ({ month, amount }));
  }, [invoices]);

  return (
    <div>
      <h3 className="text-xs font-semibold text-label-tertiary uppercase tracking-widest mb-3">Monthly Spend</h3>
      <div className="h-[160px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={monthlyData} margin={{ top: 4, right: 0, bottom: 0, left: -24 }}>
            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#AEAEB2" }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#AEAEB2" }} tickFormatter={(v) => `€${(v / 1000).toFixed(0)}k`} />
            <Tooltip
              contentStyle={{ background: "#FFFFFF", border: "1px solid var(--separator)", borderRadius: "12px", fontSize: "12px", color: "#1A1A1A", boxShadow: "0 4px 12px var(--fill-secondary)" }}
              formatter={(value: number) => [`€${value.toFixed(0)}`, "Spend"]}
              cursor={{ fill: "var(--fill-quaternary)" }}
            />
            <Bar dataKey="amount" fill="rgba(94,92,230,0.3)" radius={[4, 4, 0, 0]} barSize={28} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
