"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight, Play, Plus } from "lucide-react";
import { useInventoryStore } from "@/stores/inventory-store";
import { getProduct, getLocation } from "@/lib/mock-data";
import { formatRelativeTime, cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Modal } from "@/components/ui/modal";
import { Select } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

export default function UsagePage() {
  const { procedureTemplates, usageRecords, locations, products, logProcedure, logUsage } = useInventoryStore();
  const [expandedTemplate, setExpandedTemplate] = useState<string | null>(null);
  const [showLogModal, setShowLogModal] = useState(false);
  const [showManualModal, setShowManualModal] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [tab, setTab] = useState<"templates" | "history">("templates");
  const [logLocation, setLogLocation] = useState(locations[0]?.id ?? "");
  const [manualProductId, setManualProductId] = useState("");
  const [manualQty, setManualQty] = useState(1);
  const [manualReason, setManualReason] = useState<"procedure" | "waste" | "expired" | "other">("procedure");
  const [manualLocation, setManualLocation] = useState(locations[0]?.id ?? "");

  const recentUsage = [...usageRecords].sort((a, b) => new Date(b.usedAt).getTime() - new Date(a.usedAt).getTime()).slice(0, 40);

  return (
    <div className="animate-fade-in max-w-4xl">
      {/* Tabs */}
      <div className="flex items-center gap-4 mb-6">
        {(["templates", "history"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              "text-sm transition-colors pb-1",
              tab === t ? "text-label-primary font-medium border-b border-label-primary" : "text-label-tertiary hover:text-label-secondary"
            )}
          >
            {t === "templates" ? "Procedures" : "History"}
          </button>
        ))}
        <div className="flex-1" />
        <Button size="sm" variant="ghost" onClick={() => setShowManualModal(true)}>
          <Plus size={13} />
          Manual
        </Button>
      </div>

      {tab === "templates" && (
        <div className="bg-bg-elevated rounded-xl shadow-sm overflow-hidden">
          {procedureTemplates.map((template, idx) => {
            const isExpanded = expandedTemplate === template.id;
            return (
              <div key={template.id} className={idx > 0 ? "border-t border-separator" : ""}>
                <div
                  className="flex items-center gap-3 py-3 px-4 cursor-pointer hover-row"
                  onClick={() => setExpandedTemplate(isExpanded ? null : template.id)}
                >
                  {isExpanded ? <ChevronDown size={13} className="text-label-tertiary" /> : <ChevronRight size={13} className="text-label-tertiary" />}
                  <div className="flex-1">
                    <span className="text-sm text-label-primary">{template.name}</span>
                    <span className="text-xs text-label-tertiary ml-2">{template.description}</span>
                  </div>
                  <span className="text-xs text-label-tertiary">{template.materials.length} items</span>
                  <Button size="sm" onClick={(e) => { e.stopPropagation(); setSelectedTemplate(template.id); setShowLogModal(true); }}>
                    <Play size={11} />
                    Log
                  </Button>
                </div>
                {isExpanded && (
                  <div className="pl-12 pb-3 px-4">
                    {template.materials.map((mat, i) => (
                      <div key={i} className="flex items-center justify-between py-1">
                        <span className="text-xs text-label-tertiary">{getProduct(mat.productId)?.name}</span>
                        <span className="text-xs text-label-tertiary tabular-nums">x{mat.quantity}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {tab === "history" && (
        <div className="bg-bg-elevated rounded-xl shadow-sm overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="text-[11px] text-label-tertiary">
                <th className="text-left px-4 py-3 font-medium">Product</th>
                <th className="text-right px-4 py-3 font-medium">Qty</th>
                <th className="text-left px-4 py-3 font-medium">Reason</th>
                <th className="text-left px-4 py-3 font-medium">Location</th>
                <th className="text-left px-4 py-3 font-medium">By</th>
                <th className="text-right px-4 py-3 font-medium">When</th>
              </tr>
            </thead>
            <tbody>
              {recentUsage.map((record) => (
                <tr key={record.id} className="hover-row h-8 border-b border-separator last:border-b-0">
                  <td className="px-4 py-1 text-sm text-label-primary">{getProduct(record.productId)?.name}</td>
                  <td className="px-4 py-1 text-xs text-right tabular-nums text-label-secondary">{record.quantity}</td>
                  <td className="px-4 py-1">
                    <Badge variant={record.reason === "procedure" ? "accent" : record.reason === "waste" ? "warning" : record.reason === "expired" ? "critical" : "default"}>
                      {record.reason}
                    </Badge>
                  </td>
                  <td className="px-4 py-1 text-xs text-label-tertiary">{getLocation(record.locationId)?.name}</td>
                  <td className="px-4 py-1 text-xs text-label-tertiary">{record.usedBy}</td>
                  <td className="px-4 py-1 text-xs text-label-tertiary text-right">{formatRelativeTime(record.usedAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Log Procedure Modal */}
      <Modal open={showLogModal} onClose={() => setShowLogModal(false)} title="Log Procedure">
        {selectedTemplate && (() => {
          const tmpl = procedureTemplates.find((t) => t.id === selectedTemplate);
          return (
            <div className="space-y-4">
              <p className="text-sm text-label-primary">{tmpl?.name}</p>
              <div className="space-y-1">
                {tmpl?.materials.map((m, i) => (
                  <div key={i} className="flex justify-between text-xs">
                    <span className="text-label-tertiary">{getProduct(m.productId)?.name}</span>
                    <span className="text-label-tertiary tabular-nums">x{m.quantity}</span>
                  </div>
                ))}
              </div>
              <Select label="Location" value={logLocation} onChange={(e) => setLogLocation(e.target.value)} options={locations.map((l) => ({ value: l.id, label: l.name }))} />
              <div className="flex justify-end gap-2">
                <Button variant="ghost" onClick={() => setShowLogModal(false)}>Cancel</Button>
                <Button onClick={() => { logProcedure(selectedTemplate, logLocation, "Dr. Harper"); setShowLogModal(false); }}>Confirm</Button>
              </div>
            </div>
          );
        })()}
      </Modal>

      {/* Manual Modal */}
      <Modal open={showManualModal} onClose={() => setShowManualModal(false)} title="Log Usage">
        <form onSubmit={(e) => { e.preventDefault(); if (manualProductId) { logUsage({ productId: manualProductId, quantity: manualQty, reason: manualReason, usedBy: "Dr. Harper", usedAt: new Date().toISOString(), locationId: manualLocation }); setShowManualModal(false); } }} className="space-y-3">
          <Select label="Product" value={manualProductId} onChange={(e) => setManualProductId(e.target.value)} options={products.map((p) => ({ value: p.id, label: p.name }))} placeholder="Select..." />
          <div className="grid grid-cols-2 gap-3">
            <Input label="Qty" type="number" value={manualQty} onChange={(e) => setManualQty(Number(e.target.value))} min={1} />
            <Select label="Reason" value={manualReason} onChange={(e) => setManualReason(e.target.value as typeof manualReason)} options={[{ value: "procedure", label: "Procedure" }, { value: "waste", label: "Waste" }, { value: "expired", label: "Disposed" }, { value: "other", label: "Other" }]} />
          </div>
          <Select label="Location" value={manualLocation} onChange={(e) => setManualLocation(e.target.value)} options={locations.map((l) => ({ value: l.id, label: l.name }))} />
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="ghost" type="button" onClick={() => setShowManualModal(false)}>Cancel</Button>
            <Button type="submit">Log</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
