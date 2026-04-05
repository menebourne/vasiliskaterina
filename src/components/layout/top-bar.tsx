"use client";

import { usePathname } from "next/navigation";
import { Search } from "lucide-react";

const pageTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/inventory": "Inventory",
  "/scan": "Scan",
  "/products": "Products",
  "/locations": "Locations",
  "/invoices": "Invoices",
  "/settings": "Settings",
};

export function TopBar() {
  const pathname = usePathname();
  const title = pageTitles[pathname ?? ""] || "";

  const openSearch = () => {
    // Trigger the real keyboard shortcut so cmdk picks it up
    const event = new KeyboardEvent("keydown", {
      key: "k",
      metaKey: true,
      bubbles: true,
    });
    document.dispatchEvent(event);
  };

  return (
    <header className="h-16 flex items-center justify-between px-5 lg:px-10 sticky top-0 z-30 backdrop-blur-2xl" style={{ background: "rgba(245, 245, 247, 0.72)" }}>
      <h1 className="text-[22px] font-bold tracking-tight text-[#1D1D1F]">
        {title}
      </h1>

      <button
        onClick={openSearch}
        className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-[10px] bg-[#F5F5F7] hover:bg-[#E8E8ED] transition-colors text-[#86868B] hover:text-[#6E6E73]"
      >
        <Search size={14} strokeWidth={2} />
        <span className="text-[13px]">Search</span>
        <kbd className="ml-1 px-1.5 py-0.5 rounded-md bg-white text-[11px] font-medium text-[#AEAEB2] shadow-[0_0.5px_1px_rgba(0,0,0,0.06)]">⌘K</kbd>
      </button>
    </header>
  );
}
