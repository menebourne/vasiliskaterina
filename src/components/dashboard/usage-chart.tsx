"use client";

import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { weeklyUsage } from "@/lib/mock-data";

export function UsageChart() {
  return (
    <div>
      <h3 className="text-xs font-semibold text-label-tertiary uppercase tracking-widest mb-3">
        Usage Trend
      </h3>
      <div className="h-[180px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={weeklyUsage} margin={{ top: 4, right: 0, bottom: 0, left: -24 }}>
            <defs>
              <linearGradient id="usageGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#5E5CE6" stopOpacity={0.1} />
                <stop offset="100%" stopColor="#5E5CE6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#AEAEB2" }} dy={6} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#AEAEB2" }} />
            <Tooltip
              contentStyle={{
                background: "#FFFFFF",
                border: "1px solid var(--separator)",
                borderRadius: "12px",
                fontSize: "12px",
                color: "#1C1C1E",
                boxShadow: "0 4px 12px var(--fill-secondary)",
              }}
              labelStyle={{ color: "#6E6E73", fontSize: "11px" }}
              cursor={{ stroke: "var(--separator)" }}
            />
            <Area type="monotone" dataKey="count" stroke="#5E5CE6" strokeWidth={1.5} fill="url(#usageGradient)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
