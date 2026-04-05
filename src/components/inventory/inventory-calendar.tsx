"use client";

import { useState, useMemo } from "react";
import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  format,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
  startOfWeek,
  endOfWeek,
} from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { getProduct } from "@/lib/mock-data";
import type { InventoryItem } from "@/lib/types";

interface InventoryCalendarProps {
  items: InventoryItem[];
  onDayClick?: (date: Date, items: InventoryItem[]) => void;
}

export function InventoryCalendar({ items, onDayClick }: InventoryCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);
  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

  const expirationMap = useMemo(() => {
    const map = new Map<string, InventoryItem[]>();
    items.forEach((item) => {
      const key = item.expirationDate.split("T")[0];
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(item);
    });
    return map;
  }, [items]);

  const selectedItems = selectedDate
    ? expirationMap.get(format(selectedDate, "yyyy-MM-dd")) || []
    : [];

  return (
    <div className="space-y-4">
      {/* Month nav */}
      <div className="flex items-center justify-between mb-2">
        <button onClick={() => setCurrentMonth(subMonths(currentMonth, 1))} className="p-1 hover-bg rounded-lg text-label-tertiary">
          <ChevronLeft size={15} />
        </button>
        <span className="text-sm font-medium text-label-primary">
          {format(currentMonth, "MMMM yyyy")}
        </span>
        <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))} className="p-1 hover-bg rounded-lg text-label-tertiary">
          <ChevronRight size={15} />
        </button>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 mb-1">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
          <div key={d} className="text-center py-1 text-[11px] text-label-tertiary">{d}</div>
        ))}
      </div>

      {/* Days */}
      <div className="grid grid-cols-7 gap-px">
        {days.map((day) => {
          const key = format(day, "yyyy-MM-dd");
          const dayItems = expirationMap.get(key) || [];
          const isCurrentMonth = isSameMonth(day, currentMonth);
          const isSelected = selectedDate ? isSameDay(day, selectedDate) : false;
          const isToday = isSameDay(day, new Date());

          return (
            <button
              key={key}
              onClick={() => { setSelectedDate(day); onDayClick?.(day, dayItems); }}
              className={cn(
                "relative h-14 lg:h-16 p-1.5 text-left rounded-lg transition-colors",
                !isCurrentMonth && "opacity-20",
                isSelected && "bg-fill-quaternary",
                !isSelected && "hover:bg-fill-quaternary"
              )}
            >
              <span className={cn("text-[11px]", isToday ? "text-accent" : "text-label-tertiary")}>
                {format(day, "d")}
              </span>
              {dayItems.length > 0 && (
                <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 flex gap-0.5">
                  {dayItems.slice(0, 3).map((_, i) => (
                    <div key={i} className={cn("w-1 h-1 rounded-full", dayItems.length >= 3 ? "bg-status-critical/70" : "bg-accent/50")} />
                  ))}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Selected day */}
      {selectedDate && selectedItems.length > 0 && (
        <div className="pt-3 border-t border-separator">
          <p className="text-xs text-label-tertiary mb-2">{format(selectedDate, "MMM d, yyyy")}</p>
          {selectedItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between py-1.5">
              <span className="text-sm text-label-secondary">{getProduct(item.productId)?.name}</span>
              <span className="text-xs text-label-tertiary">{item.lotNumber}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
