/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        lightGray: '#EAEAEA',
        orange: '#EA580B',
        darkorange: '#EA580B80',
        darkGray: '#3A3A3A',
        background: 'hsl(20, 14.3%, 4.1%)',
        foreground: 'hsl(60, 9.1%, 97.8%)',
        card: 'hsl(20, 14.3%, 4.1%)',
        cardForeground: 'hsl(60, 9.1%, 97.8%)',
        popover: 'hsl(20, 14.3%, 4.1%)',
        popoverForeground: 'hsl(60, 9.1%, 97.8%)',
        primary: 'hsl(20.5, 90.2%, 48.2%)',
        primaryForeground: 'hsl(60, 9.1%, 97.8%)',
        secondary: 'hsl(12, 6.5%, 15.1%)',
        secondaryForeground: 'hsl(60, 9.1%, 97.8%)',
        muted: 'hsl(12, 6.5%, 15.1%)',
        mutedForeground: 'hsl(24, 5.4%, 63.9%)',
        accent: 'hsl(12, 6.5%, 15.1%)',
        accentForeground: 'hsl(60, 9.1%, 97.8%)',
        destructive: 'hsl(0, 72.2%, 50.6%)',
        destructiveForeground: 'hsl(60, 9.1%, 97.8%)',
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          1: 'hsl(var(--chart-1))',
          2: 'hsl(var(--chart-2))',
          3: 'hsl(var(--chart-3))',
          4: 'hsl(var(--chart-4))',
          5: 'hsl(var(--chart-5))'
        }
      },
      fontFamily: {
        gajra: ['var(--font-gajra)', 'sans-serif'],
        rubik: ['var(--font-rubik)', 'sans-serif'],
        russo: ['var(--font-russo)', 'sans-serif'],
        titan: ['var(--font-titan)', 'sans-serif']
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0'
          },
          to: {
            height: 'var(--radix-accordion-content-height)'
          }
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)'
          },
          to: {
            height: '0'
          }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      }
    }
  },
  plugins: [require('tailwindcss-animate')]
}
