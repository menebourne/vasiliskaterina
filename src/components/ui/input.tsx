import { forwardRef, InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, icon, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="space-y-1.5">
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium text-label-secondary">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-label-tertiary">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              "w-full bg-fill-quaternary rounded-lg px-3.5 py-2 text-base text-label-primary",
              "placeholder:text-label-quaternary",
              "focus:outline-none focus:ring-2 focus:ring-accent/30",
              "transition-all duration-150",
              icon && "pl-10",
              error && "ring-2 ring-status-critical/30",
              className
            )}
            {...props}
          />
        </div>
        {error && <p className="text-sm text-status-critical">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
