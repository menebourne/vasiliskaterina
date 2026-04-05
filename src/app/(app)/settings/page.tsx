"use client";

import { useState } from "react";
import { Download, LogOut } from "lucide-react";
import { useAuthStore } from "@/stores/auth-store";
import { useInventoryStore } from "@/stores/inventory-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
  const { user, logout } = useAuthStore();
  const { inventory, products } = useInventoryStore();
  const router = useRouter();
  const [practiceName, setPracticeName] = useState("Smile Dental Care");
  const [practiceAddress, setPracticeAddress] = useState("123 Main St, Suite 200, Austin, TX 78701");

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

  const mockTeam = [
    { name: "Dr. Harper", email: "dr.harper@smiledental.com", role: "Admin" },
    { name: "Maria Rodriguez", email: "maria@smiledental.com", role: "Hygienist" },
    { name: "James Chen", email: "james@smiledental.com", role: "Assistant" },
    { name: "Sarah Kim", email: "sarah@smiledental.com", role: "Office Manager" },
  ];

  return (
    <div className="animate-fade-in max-w-lg space-y-10">
      {/* Profile */}
      <section>
        <h3 className="section-title mb-3">Profile</h3>
        <div className="card overflow-hidden">
          <Row label="Name" value={user?.name ?? ""} />
          <Row label="Email" value={user?.email ?? ""} border />
          <Row label="Role" value={user?.role ?? ""} border />
        </div>
      </section>

      {/* Practice */}
      <section>
        <h3 className="section-title mb-3">Practice</h3>
        <div className="card p-4 space-y-3">
          <Input label="Name" value={practiceName} onChange={(e) => setPracticeName(e.target.value)} />
          <Input label="Address" value={practiceAddress} onChange={(e) => setPracticeAddress(e.target.value)} />
          <Button size="sm">Save</Button>
        </div>
      </section>

      {/* Export */}
      <section>
        <h3 className="section-title mb-3">Data</h3>
        <Button variant="secondary" size="sm" onClick={handleExportCSV}>
          <Download size={13} />
          Export CSV
        </Button>
      </section>

      {/* Team */}
      <section>
        <h3 className="section-title mb-3">Team</h3>
        <div className="card overflow-hidden">
          {mockTeam.map((member, idx) => (
            <div key={member.email} className={cn("flex items-center justify-between px-4 py-3", idx > 0 && "border-t border-[rgba(0,0,0,0.05)]")}>
              <div>
                <p className="text-sm text-[#1D1D1F]">{member.name}</p>
                <p className="text-xs text-[#86868B]">{member.email}</p>
              </div>
              <span className="text-xs text-[#86868B]">{member.role}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Sign out */}
      <button
        onClick={() => { logout(); router.push("/login"); }}
        className="text-sm font-medium text-[#FF3B30] hover:text-[#FF3B30]/80 transition-colors flex items-center gap-1.5"
      >
        <LogOut size={13} />
        Sign out
      </button>
    </div>
  );
}

function Row({ label, value, border }: { label: string; value: string; border?: boolean }) {
  return (
    <div className={cn("flex items-baseline justify-between px-4 py-3", border && "border-t border-[rgba(0,0,0,0.05)]")}>
      <span className="text-xs text-[#86868B]">{label}</span>
      <span className="text-sm text-[#424245] capitalize">{value}</span>
    </div>
  );
}
