import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "bg-primary": "#050507",
        "bg-secondary": "#0a0a0f",
        "bg-card": "#111118",
        "border-subtle": "rgba(255,255,255,0.04)",
        "border-glow": "rgba(99,102,241,0.2)",
        "text-primary": "#ffffff",
        "text-secondary": "#6b7280",
        "text-muted": "#374151",
        accent: "#6366f1",
        "accent-glow": "#818cf8",
        success: "#10b981",
        "success-glow": "#34d399",
        warning: "#f59e0b",
      },
      borderRadius: {
        "3xl": "24px",
      },
    },
  },
  plugins: [],
};
export default config;
