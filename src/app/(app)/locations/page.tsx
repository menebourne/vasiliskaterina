"use client";

import { useState } from "react";
import { MapPin, Plus, Edit2, Trash2 } from "lucide-react";
import { useInventoryStore } from "@/stores/inventory-store";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { getStockStatus, cn } from "@/lib/utils";
import { StatusDot } from "@/components/ui/status-dot";
import { getProduct } from "@/lib/mock-data";
import type { Location } from "@/lib/types";

export default function LocationsPage() {
  const { locations, inventory, addLocation, updateLocation, deleteLocation } = useInventoryStore();
  const [editingLocation, setEditingLocation] = useState<Location | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

  const locationStats = locations.map((loc) => {
    const items = inventory.filter((i) => i.locationId === loc.id);
    const totalQty = items.reduce((sum, i) => sum + i.quantity, 0);
    const lowCount = items.filter((i) => getStockStatus(i.quantity, i.reorderThreshold) !== "healthy").length;
    const uniqueProducts = new Set(items.map((i) => i.productId)).size;
    return { ...loc, items, totalQty, lowCount, uniqueProducts };
  });

  const selectedItems = selectedLocation
    ? inventory.filter((i) => i.locationId === selectedLocation)
    : [];

  return (
    <div className="animate-fade-in max-w-4xl">
      <div className="flex items-center justify-between mb-4">
        <h3 className="section-title">{locations.length} locations</h3>
        <Button size="sm" onClick={() => setShowAdd(true)}>
          <Plus size={13} />
          Add
        </Button>
      </div>

      <div className="card overflow-hidden">
        {locationStats.map((loc, idx) => (
          <div key={loc.id}>
            <button
              onClick={() => setSelectedLocation(selectedLocation === loc.id ? null : loc.id)}
              className={cn(
                "w-full flex items-center gap-4 px-4 py-3 text-left transition-colors",
                idx > 0 && "border-t border-[rgba(0,0,0,0.05)]",
                selectedLocation === loc.id ? "bg-[#E8E8ED]" : "hover:bg-[#F5F5F7]"
              )}
            >
              <MapPin size={15} className="text-[#86868B] flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <span className="text-sm text-[#1D1D1F] font-medium">{loc.name}</span>
                {loc.description && (
                  <span className="text-xs text-[#86868B] ml-2">{loc.description}</span>
                )}
              </div>
              <span className="text-xs text-[#86868B] tabular-nums">{loc.uniqueProducts} products</span>
              <span className="text-xs text-[#86868B] tabular-nums w-16 text-right">{loc.totalQty} units</span>
              {loc.lowCount > 0 && (
                <span className="text-xs text-[#FF9500] tabular-nums">{loc.lowCount} low</span>
              )}
              <div className="flex items-center gap-0.5" onClick={(e) => e.stopPropagation()}>
                <button onClick={() => setEditingLocation(loc)} className="p-1 rounded-[10px] hover:bg-[#E8E8ED] text-[#86868B] hover:text-[#424245]">
                  <Edit2 size={12} />
                </button>
                <button onClick={() => deleteLocation(loc.id)} className="p-1 rounded-[10px] hover:bg-[#E8E8ED] text-[#86868B] hover:text-[#FF3B30]">
                  <Trash2 size={12} />
                </button>
              </div>
            </button>

            {selectedLocation === loc.id && selectedItems.length > 0 && (
              <div className="pl-10 pb-3 px-4">
                {selectedItems.map((item) => {
                  const product = getProduct(item.productId);
                  const status = getStockStatus(item.quantity, item.reorderThreshold);
                  return (
                    <div key={item.id} className="flex items-center gap-3 py-1.5">
                      <StatusDot status={status} />
                      <span className="text-sm text-[#424245] flex-1">{product?.name}</span>
                      <span className="text-xs text-[#86868B] tabular-nums">{item.quantity}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>

      <Modal
        open={showAdd || !!editingLocation}
        onClose={() => { setShowAdd(false); setEditingLocation(null); }}
        title={editingLocation ? "Edit Location" : "New Location"}
      >
        <LocationForm
          location={editingLocation}
          onSubmit={(data) => {
            if (editingLocation) updateLocation(editingLocation.id, data);
            else addLocation(data as Omit<Location, "id">);
            setShowAdd(false); setEditingLocation(null);
          }}
          onCancel={() => { setShowAdd(false); setEditingLocation(null); }}
        />
      </Modal>
    </div>
  );
}

function LocationForm({ location, onSubmit, onCancel }: {
  location: Location | null;
  onSubmit: (data: Partial<Location>) => void;
  onCancel: () => void;
}) {
  const [name, setName] = useState(location?.name ?? "");
  const [description, setDescription] = useState(location?.description ?? "");

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit({ name, description }); }} className="space-y-3">
      <Input label="Name" value={name} onChange={(e) => setName(e.target.value)} required placeholder="e.g. Operatory 5" />
      <Input label="Description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Optional" />
      <div className="flex justify-end gap-2 pt-2">
        <Button variant="ghost" type="button" onClick={onCancel}>Cancel</Button>
        <Button type="submit">{location ? "Save" : "Add"}</Button>
      </div>
    </form>
  );
}
