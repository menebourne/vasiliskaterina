"use client";

// Theme provider is no longer needed — light mode only.
// Kept as a no-op for any imports that may still reference it.

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export function useTheme() {
  return { theme: "light" as const, toggleTheme: () => {}, setTheme: () => {} };
}
