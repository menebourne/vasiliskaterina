"use client";

import { Download, LogOut, Mail, Lock, Trash2, ChevronRight } from "lucide-react";
import { useAuthStore } from "@/stores/auth-store";
import { useInventoryStore } from "@/stores/inventory-store";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
  const { logout } = useAuthStore();
  const { inventory, products } = useInventoryStore();
  const router = useRouter();

  const handleExportCSV = () => {
    const headers = ["Product", "Location", "Quantity", "Lot Number", "Expiration Date", "Last Price"];
    const rows = inventory.map((item) => {
      const product = products.find((p) => p.id === item.productId);
      return [product?.name ?? "", item.locationId, item.quantity, item.lotNumber, item.expirationDate, item.lastPrice];
    });
    const csv = [headers, ...rows].map((r) => r.map((c) => `"${c}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `instock-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="animate-fade-in max-w-lg space-y-8">
      {/* Account */}
      <section>
        <h3 className="section-title mb-2">Account</h3>
        <div className="card overflow-hidden">
          <SettingsRow
            icon={<Mail size={18} />}
            iconBg="bg-[#007AFF]"
            label="Change Email"
            onClick={() => {}}
          />
          <SettingsRow
            icon={<Lock size={18} />}
            iconBg="bg-[#34C759]"
            label="Change Password"
            onClick={() => {}}
            border
          />
        </div>
      </section>

      {/* Data */}
      <section>
        <h3 className="section-title mb-2">Data</h3>
        <div className="card overflow-hidden">
          <SettingsRow
            icon={<Download size={18} />}
            iconBg="bg-[#5856D6]"
            label="Export Inventory CSV"
            onClick={handleExportCSV}
          />
        </div>
      </section>

      {/* Sign out & delete */}
      <section>
        <div className="card overflow-hidden">
          <SettingsRow
            icon={<LogOut size={18} />}
            iconBg="bg-[#8E8E93]"
            label="Sign Out"
            onClick={() => { logout(); router.push("/login"); }}
          />
          <SettingsRow
            icon={<Trash2 size={18} />}
            iconBg="bg-[#FF3B30]"
            label="Delete Account"
            labelColor="text-[#FF3B30]"
            onClick={() => {}}
            border
          />
        </div>
      </section>
    </div>
  );
}

function SettingsRow({ icon, iconBg, label, labelColor, onClick, border }: {
  icon: React.ReactNode;
  iconBg: string;
  label: string;
  labelColor?: string;
  onClick: () => void;
  border?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-3.5 px-4 py-3 hover-row text-left transition-colors",
        border && "border-t border-[rgba(0,0,0,0.05)]"
      )}
    >
      <div className={cn("w-[30px] h-[30px] rounded-[7px] flex items-center justify-center flex-shrink-0 text-white", iconBg)}>
        {icon}
      </div>
      <span className={cn("text-[15px] flex-1", labelColor || "text-[#1D1D1F]")}>{label}</span>
      <ChevronRight size={16} className="text-[#C7C7CC]" />
    </button>
  );
}
