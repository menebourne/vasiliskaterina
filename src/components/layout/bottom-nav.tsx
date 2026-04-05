"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, ScanBarcode, FileText, Ellipsis } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Home", icon: LayoutDashboard },
  { href: "/inventory", label: "Inventory", icon: Package },
  { href: "/scan", label: "Scan", icon: ScanBarcode, isScan: true },
  { href: "/invoices", label: "Invoices", icon: FileText },
  { href: "/settings", label: "More", icon: Ellipsis },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-xl border-t border-[rgba(0,0,0,0.05)] pb-[env(safe-area-inset-bottom)]">
      <div className="flex items-center justify-around h-16 px-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname?.startsWith(item.href + "/");

          if (item.isScan) {
            return (
              <Link key={item.href} href={item.href} className="flex flex-col items-center -mt-4">
                <div className={cn(
                  "w-12 h-12 rounded-2xl flex items-center justify-center shadow-md transition-transform active:scale-95",
                  "bg-[#007AFF]"
                )}>
                  <item.icon size={22} strokeWidth={1.8} className="text-white" />
                </div>
              </Link>
            );
          }

          return (
            <Link key={item.href} href={item.href} className="flex flex-col items-center gap-0.5 py-1 min-w-[48px]">
              <item.icon size={22} strokeWidth={1.8} className={cn("transition-colors", isActive ? "text-[#007AFF]" : "text-[#8E8E93]")} />
              <span className={cn("text-[10px] font-medium", isActive ? "text-[#007AFF]" : "text-[#8E8E93]")}>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
