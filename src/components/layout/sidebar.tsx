"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Package, ScanBarcode, Box, MapPin,
  FileText, Settings, PanelLeftClose, PanelLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/inventory", label: "Inventory", icon: Package },
  { href: "/scan", label: "Scan", icon: ScanBarcode },
  { href: "/products", label: "Products", icon: Box },
  { href: "/locations", label: "Locations", icon: MapPin },
  { href: "/invoices", label: "Invoices", icon: FileText },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "hidden lg:flex flex-col h-screen fixed left-0 top-0 z-40 backdrop-blur-2xl transition-[width] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]",
        collapsed ? "w-sidebar-collapsed" : "w-sidebar"
      )}
      style={{ background: "var(--sidebar-bg)" }}
    >
      {/* Logo */}
      <div className="flex items-center h-16 px-5">
        <Link href="/dashboard" className="flex items-center gap-3 min-w-0">
          <div className="w-8 h-8 rounded-[10px] bg-gradient-to-b from-[#0A84FF] to-[#0066CC] flex items-center justify-center flex-shrink-0 shadow-sm">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
              <path d="m3.3 7 8.7 5 8.7-5" />
              <path d="M12 22V12" />
            </svg>
          </div>
          {!collapsed && (
            <span className="text-[17px] font-semibold tracking-tight text-[#1D1D1F]">
              InStock
            </span>
          )}
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 pt-1 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname?.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-[7px] rounded-[10px] text-[15px] transition-all duration-150",
                isActive
                  ? "bg-white/70 shadow-[0_0.5px_2px_rgba(0,0,0,0.06),0_1px_4px_rgba(0,0,0,0.04)] text-[#1D1D1F] font-medium"
                  : "text-[#424245] hover:bg-black/[0.03]"
              )}
            >
              <item.icon
                size={18}
                strokeWidth={isActive ? 2 : 1.6}
                className={cn("flex-shrink-0", isActive ? "text-[#007AFF]" : "text-[#86868B]")}
              />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="px-3 pb-5 space-y-1">
        <Link
          href="/settings"
          className={cn(
            "flex items-center gap-3 px-3 py-[7px] rounded-[10px] text-[15px] transition-all duration-150",
            pathname === "/settings"
              ? "bg-white/70 shadow-[0_0.5px_2px_rgba(0,0,0,0.06),0_1px_4px_rgba(0,0,0,0.04)] text-[#1D1D1F] font-medium"
              : "text-[#424245] hover:bg-black/[0.03]"
          )}
        >
          <Settings size={18} strokeWidth={1.6} className="text-[#86868B]" />
          {!collapsed && <span>Settings</span>}
        </Link>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex items-center gap-3 px-3 py-[7px] rounded-[10px] text-[15px] text-[#86868B] hover:bg-black/[0.03] transition-all duration-150 w-full"
        >
          {collapsed ? <PanelLeft size={18} strokeWidth={1.6} /> : (
            <><PanelLeftClose size={18} strokeWidth={1.6} /><span>Collapse</span></>
          )}
        </button>
      </div>
    </aside>
  );
}
