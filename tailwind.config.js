/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        lightGray: "#EAEAEA",
        orange: "#EA580B",
        darkorange: "#EA580B80",
        darkGray: "#3A3A3A",
        background: "hsl(20, 14.3%, 4.1%)",
        foreground: "hsl(60, 9.1%, 97.8%)",
        card: "hsl(20, 14.3%, 4.1%)",
        cardForeground: "hsl(60, 9.1%, 97.8%)",
        popover: "hsl(20, 14.3%, 4.1%)",
        popoverForeground: "hsl(60, 9.1%, 97.8%)",
        primary: "hsl(20.5, 90.2%, 48.2%)",
        primaryForeground: "hsl(60, 9.1%, 97.8%)",
        secondary: "hsl(12, 6.5%, 15.1%)",
        secondaryForeground: "hsl(60, 9.1%, 97.8%)",
        muted: "hsl(12, 6.5%, 15.1%)",
        mutedForeground: "hsl(24, 5.4%, 63.9%)",
        accent: "hsl(12, 6.5%, 15.1%)",
        accentForeground: "hsl(60, 9.1%, 97.8%)",
        destructive: "hsl(0, 72.2%, 50.6%)",
        destructiveForeground: "hsl(60, 9.1%, 97.8%)",
        border: "hsl(12, 6.5%, 15.1%)",
        input: "hsl(12, 6.5%, 15.1%)",
        ring: "hsl(20.5, 90.2%, 48.2%)",
        chart1: "hsl(220, 70%, 50%)",
        chart2: "hsl(160, 60%, 45%)",
        chart3: "hsl(30, 80%, 55%)",
        chart4: "hsl(280, 65%, 60%)",
        chart5: "hsl(340, 75%, 55%)",

        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))"
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))"
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))"
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))"
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))"
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))"
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))"
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))"
        }
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)"
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0"
          },
          to: {
            height: "var(--radix-accordion-content-height)"
          }
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)"
          },
          to: {
            height: "0"
          }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out"
      }
    }
  },
  plugins: [require("tailwindcss-animate")]
};
