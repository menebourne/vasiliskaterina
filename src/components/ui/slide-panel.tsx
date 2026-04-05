"use client";

import { useEffect, useRef, ReactNode } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface SlidePanelProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  width?: string;
}

export function SlidePanel({ open, onClose, title, children, width = "max-w-md" }: SlidePanelProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    if (open) { document.addEventListener("keydown", handleEsc); document.body.style.overflow = "hidden"; }
    return () => { document.removeEventListener("keydown", handleEsc); document.body.style.overflow = ""; };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div ref={overlayRef} className="fixed inset-0 z-50" onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}>
      <div className="absolute inset-0 bg-black/20 animate-fade-in" />
      <div className={cn("absolute right-0 top-0 h-full bg-bg-elevated shadow-xl w-full animate-slide-in-right", width)}>
        {title && (
          <div className="flex items-center justify-between px-6 h-14">
            <h2 className="text-lg font-semibold tracking-tight text-label-primary">{title}</h2>
            <button onClick={onClose} className="p-1.5 -mr-1 rounded-full hover:bg-fill-quaternary text-label-tertiary hover:text-label-secondary transition-colors" aria-label="Close">
              <X size={18} strokeWidth={2} />
            </button>
          </div>
        )}
        <div className="px-6 pb-6 overflow-y-auto h-[calc(100%-3.5rem)]">{children}</div>
      </div>
    </div>
  );
}
