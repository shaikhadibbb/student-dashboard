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
        background: "var(--bg-primary)",
        foreground: "var(--text-primary)",
        'bg-primary': "var(--bg-primary)",
        'bg-secondary': "var(--bg-secondary)",
        'bg-card': "var(--bg-card)",
        'border-subtle': "var(--border-subtle)",
        'border-glow': "var(--border-glow)",
        'text-primary': "var(--text-primary)",
        'text-secondary': "var(--text-secondary)",
        accent: "var(--accent)",
        'accent-glow': "var(--accent-glow)",
      },
    },
  },
  plugins: [],
};
export default config;
