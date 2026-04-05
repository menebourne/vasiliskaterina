"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { CheckCircle2, AlertTriangle, XCircle, Info, X } from "lucide-react";

type ToastType = "success" | "warning" | "error" | "info";

interface Toast { id: string; message: string; type: ToastType; action?: { label: string; onClick: () => void }; }
interface ToastContextValue { toast: (message: string, type?: ToastType, action?: Toast["action"]) => void; }

const ToastContext = createContext<ToastContextValue>({ toast: () => {} });

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((message: string, type: ToastType = "info", action?: Toast["action"]) => {
    const id = Math.random().toString(36).slice(2);
    setToasts((prev) => [...prev, { id, message, type, action }]);
    setTimeout(() => { setToasts((prev) => prev.filter((t) => t.id !== id)); }, 4000);
  }, []);

  const removeToast = useCallback((id: string) => { setToasts((prev) => prev.filter((t) => t.id !== id)); }, []);

  const icons = { success: CheckCircle2, warning: AlertTriangle, error: XCircle, info: Info };
  const colors = { success: "text-status-healthy", warning: "text-status-warning", error: "text-status-critical", info: "text-accent" };

  return (
    <ToastContext.Provider value={{ toast: addToast }}>
      {children}
      <div className="fixed bottom-20 lg:bottom-6 right-4 lg:right-6 z-[60] space-y-2">
        {toasts.map((t) => {
          const Icon = icons[t.type];
          return (
            <div key={t.id} className="flex items-center gap-3 px-4 py-3 bg-bg-elevated rounded-xl shadow-lg animate-slide-in-up min-w-[280px] max-w-sm">
              <Icon size={18} className={colors[t.type]} />
              <span className="text-sm text-label-primary flex-1">{t.message}</span>
              {t.action && <button onClick={t.action.onClick} className="text-sm font-medium text-accent">{t.action.label}</button>}
              <button onClick={() => removeToast(t.id)} className="text-label-quaternary hover:text-label-tertiary transition-colors"><X size={16} /></button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);
