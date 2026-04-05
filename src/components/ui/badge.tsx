import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "healthy" | "warning" | "critical" | "expired" | "accent";
  className?: string;
}

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium",
        {
          "bg-fill-quaternary text-label-secondary": variant === "default",
          "bg-status-healthy/10 text-status-healthy": variant === "healthy",
          "bg-status-warning/10 text-status-warning": variant === "warning",
          "bg-status-critical/10 text-status-critical": variant === "critical",
          "bg-system-gray5 text-system-gray": variant === "expired",
          "bg-accent/10 text-accent": variant === "accent",
        },
        className
      )}
    >
      {children}
    </span>
  );
}
