import { cn } from "@/lib/utils";

const colors = {
  healthy: "bg-[#34C759]",
  warning: "bg-[#FF9500]",
  critical: "bg-[#FF3B30]",
  expired: "bg-[#8E8E93]",
};

interface StatusDotProps {
  status: "healthy" | "warning" | "critical" | "expired";
  className?: string;
}

export function StatusDot({ status, className }: StatusDotProps) {
  return (
    <span className={cn("inline-block w-[7px] h-[7px] rounded-full flex-shrink-0", colors[status], className)} />
  );
}
