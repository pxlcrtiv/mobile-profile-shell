import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          glow: "hsl(var(--primary-glow))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
          glow: "hsl(var(--accent-glow))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        // Mobile OS Colors
        warning: "hsl(var(--warning))",
        success: "hsl(var(--success))",
        "app-background": "hsl(var(--app-background))",
        "status-bar": "hsl(var(--status-bar))",
        "dock-background": "hsl(var(--dock-background))",
        "glass-effect": "hsl(var(--glass-effect))",
        // Aurora palette extras
        "aurora-indigo": "hsl(250 89% 67%)",
        "aurora-violet": "hsl(270 91% 65%)",
        "aurora-cyan": "hsl(174 72% 56%)",
        "aurora-pink": "hsl(322 100% 65%)",
      },
      backgroundImage: {
        "gradient-primary": "var(--gradient-primary)",
        "gradient-accent": "var(--gradient-accent)",
        "gradient-background": "var(--gradient-background)",
        "gradient-glass": "var(--gradient-glass)",
        "aurora-radial": "radial-gradient(ellipse 80% 50% at 20% 40%, hsl(250 89% 67% / 0.15) 0%, transparent 70%), radial-gradient(ellipse 60% 40% at 80% 20%, hsl(270 91% 65% / 0.12) 0%, transparent 60%), radial-gradient(ellipse 70% 50% at 50% 80%, hsl(174 72% 56% / 0.08) 0%, transparent 70%)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in-up": {
          from: { transform: "translateY(16px)", opacity: "0" },
          to: { transform: "translateY(0)", opacity: "1" },
        },
        "scale-in": {
          from: { transform: "scale(0.92)", opacity: "0" },
          to: { transform: "scale(1)", opacity: "1" },
        },
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 20px hsl(var(--primary) / 0.2)" },
          "50%": { boxShadow: "0 0 40px hsl(var(--primary) / 0.4)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in-up": "fade-in-up 0.5s ease-out forwards",
        "scale-in": "scale-in 0.4s ease-out forwards",
        "glow-pulse": "glow-pulse 3s ease-in-out infinite",
        shimmer: "shimmer 2s linear infinite",
      },
      boxShadow: {
        "aurora": "0 0 30px hsl(250 89% 67% / 0.2), 0 0 60px hsl(270 91% 65% / 0.1)",
        "aurora-lg": "0 0 40px hsl(250 89% 67% / 0.3), 0 0 80px hsl(270 91% 65% / 0.15), 0 0 120px hsl(174 72% 56% / 0.05)",
        "glass": "0 8px 32px hsl(230 30% 2% / 0.4), inset 0 1px 0 hsl(0 0% 100% / 0.05)",
        "glass-hover": "0 12px 40px hsl(230 30% 2% / 0.5), inset 0 1px 0 hsl(0 0% 100% / 0.08)",
        "dock": "0 8px 32px hsl(var(--primary) / 0.15), 0 2px 8px hsl(var(--background) / 0.8)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
