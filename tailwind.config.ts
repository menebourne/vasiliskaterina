import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "-apple-system", "BlinkMacSystemFont", "system-ui", "sans-serif"],
      },
      fontSize: {
        "2xs": ["0.6875rem", { lineHeight: "1.35" }],   // 11px — captions
        xs: ["0.75rem", { lineHeight: "1.4" }],          // 12px — footnote
        sm: ["0.8125rem", { lineHeight: "1.45" }],       // 13px — subhead
        base: ["0.9375rem", { lineHeight: "1.5" }],      // 15px — body
        lg: ["1.0625rem", { lineHeight: "1.45" }],       // 17px — headline
        xl: ["1.375rem", { lineHeight: "1.3" }],         // 22px — title2
        "2xl": ["1.75rem", { lineHeight: "1.2" }],       // 28px — title1
        "3xl": ["2.125rem", { lineHeight: "1.15" }],     // 34px — largeTitle
      },
      colors: {
        // Backgrounds — Apple warm grays
        bg: {
          DEFAULT: "#FFFFFF",
          secondary: "#F2F2F7",
          tertiary: "#E5E5EA",
          grouped: "#F2F2F7",
          elevated: "#FFFFFF",
        },
        // Text — Apple system gray scale
        label: {
          primary: "#000000",
          secondary: "#3C3C43",
          tertiary: "#3C3C4399",
          quaternary: "#3C3C434D",
        },
        // Fills
        fill: {
          primary: "rgba(120, 120, 128, 0.2)",
          secondary: "rgba(120, 120, 128, 0.16)",
          tertiary: "rgba(120, 120, 128, 0.12)",
          quaternary: "rgba(120, 120, 128, 0.08)",
        },
        // Separators
        separator: {
          DEFAULT: "rgba(60, 60, 67, 0.12)",
          opaque: "#C6C6C8",
        },
        // System colors
        accent: {
          DEFAULT: "#007AFF",
          hover: "#0066D6",
          active: "#0055B3",
          light: "rgba(0, 122, 255, 0.08)",
        },
        status: {
          healthy: "#34C759",
          warning: "#FF9500",
          critical: "#FF3B30",
          expired: "#8E8E93",
        },
        // Grouped background for inset content
        system: {
          gray: "#8E8E93",
          gray2: "#AEAEB2",
          gray3: "#C7C7CC",
          gray4: "#D1D1D6",
          gray5: "#E5E5EA",
          gray6: "#F2F2F7",
        },
      },
      borderRadius: {
        sm: "6px",
        DEFAULT: "10px",
        md: "12px",
        lg: "16px",
        xl: "20px",
        "2xl": "24px",
      },
      boxShadow: {
        // Apple-style layered shadows
        xs: "0 0.5px 1px rgba(0, 0, 0, 0.04)",
        sm: "0 1px 3px rgba(0, 0, 0, 0.06), 0 0.5px 1px rgba(0, 0, 0, 0.04)",
        DEFAULT: "0 2px 8px rgba(0, 0, 0, 0.06), 0 0.5px 2px rgba(0, 0, 0, 0.04)",
        md: "0 4px 16px rgba(0, 0, 0, 0.08), 0 1px 4px rgba(0, 0, 0, 0.04)",
        lg: "0 8px 32px rgba(0, 0, 0, 0.10), 0 2px 8px rgba(0, 0, 0, 0.04)",
        xl: "0 20px 60px rgba(0, 0, 0, 0.12), 0 4px 16px rgba(0, 0, 0, 0.06)",
      },
      spacing: {
        sidebar: "240px",
        "sidebar-collapsed": "68px",
      },
      animation: {
        "slide-in-right": "slideInRight 350ms cubic-bezier(0.32, 0.72, 0, 1)",
        "slide-in-up": "slideInUp 350ms cubic-bezier(0.32, 0.72, 0, 1)",
        "fade-in": "fadeIn 200ms ease-out",
        "scale-in": "scaleIn 250ms cubic-bezier(0.32, 0.72, 0, 1)",
      },
      keyframes: {
        slideInRight: {
          from: { transform: "translateX(100%)" },
          to: { transform: "translateX(0)" },
        },
        slideInUp: {
          from: { transform: "translateY(8px)", opacity: "0" },
          to: { transform: "translateY(0)", opacity: "1" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        scaleIn: {
          from: { opacity: "0", transform: "scale(0.97)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
      },
      letterSpacing: {
        tighter: "-0.03em",
        tight: "-0.02em",
        snug: "-0.01em",
      },
    },
  },
  plugins: [],
};
export default config;
