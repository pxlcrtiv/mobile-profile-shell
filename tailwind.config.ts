import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: { center: true, padding: "2rem", screens: { "2xl": "1400px" } },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: { DEFAULT: "hsl(var(--primary))", foreground: "hsl(var(--primary-foreground))", glow: "hsl(var(--primary-glow))" },
        secondary: { DEFAULT: "hsl(var(--secondary))", foreground: "hsl(var(--secondary-foreground))" },
        destructive: { DEFAULT: "hsl(var(--destructive))", foreground: "hsl(var(--destructive-foreground))" },
        muted: { DEFAULT: "hsl(var(--muted))", foreground: "hsl(var(--muted-foreground))" },
        accent: { DEFAULT: "hsl(var(--accent))", foreground: "hsl(var(--accent-foreground))", glow: "hsl(var(--accent-glow))" },
        popover: { DEFAULT: "hsl(var(--popover))", foreground: "hsl(var(--popover-foreground))" },
        card: { DEFAULT: "hsl(var(--card))", foreground: "hsl(var(--card-foreground))" },
        warning: "hsl(var(--warning))",
        success: "hsl(var(--success))",
        "app-background": "hsl(var(--app-background))",
        "status-bar": "hsl(var(--status-bar))",
        "dock-background": "hsl(var(--dock-background))",
        "glass-effect": "hsl(var(--glass-effect))",
      },
      fontFamily: {
        display: ['"JetBrains Mono"', 'monospace'],
        body: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        "gradient-primary": "var(--gradient-primary)",
        "gradient-accent": "var(--gradient-accent)",
        "gradient-background": "var(--gradient-background)",
        "gradient-card": "var(--gradient-card)",
      },
      borderRadius: { lg: "var(--radius)", md: "calc(var(--radius) - 2px)", sm: "calc(var(--radius) - 4px)" },
      keyframes: {
        "fade-up": { from: { transform: "translateY(12px)", opacity: "0" }, to: { transform: "translateY(0)", opacity: "1" } },
        "scale-in": { from: { transform: "scale(0.92)", opacity: "0" }, to: { transform: "scale(1)", opacity: "1" } },
        "glow-pulse": { "0%, 100%": { boxShadow: "0 0 20px hsl(var(--primary) / 0.15)" }, "50%": { boxShadow: "0 0 40px hsl(var(--primary) / 0.3)" } },
      },
      animation: {
        "fade-up": "fade-up 0.4s ease-out forwards",
        "scale-in": "scale-in 0.35s ease-out forwards",
        "glow-pulse": "glow-pulse 3s ease-in-out infinite",
      },
      boxShadow: {
        "card": "0 4px 24px hsl(0 0% 0% / 0.4)",
        "card-hover": "0 8px 32px hsl(0 0% 0% / 0.5)",
        "glow": "0 0 30px hsl(var(--primary) / 0.3)",
        "glow-accent": "0 0 30px hsl(var(--accent) / 0.3)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
