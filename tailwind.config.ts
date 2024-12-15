import type { Config } from "tailwindcss";

export default {
  darkMode: 'class',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./ui/**/*.{ts,tsx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        "2xl": "1300px",
      },
    },
    backgroundImage: {
      'bgXmas': "var(--background-xmas)",
      'grid': "var(--background-grid)",
      'gradient': 'linear-gradient(45deg, #3b82f6, #d2224d)',
    },
    extend: {
      colors: {
        background: "var(--background)",
        headerBg: "var(--header-background)",
        text: "var(--text)",
        textSubtitle: "var(--text-subtitle)",

        border: "var(--border-color)",
        input: "var(--input-color)",
        inputBorder: "var(--input-border-color)",

        accent: "var(--accent-color)",
        accentHover: "var(--accent-color-hover)",
        secondary: "var(--secondary-color)",
        secondaryHover: "var(--secondary-color-hover)",

        linkColor: "var(--link-color)",
        linkColorHover: "var(--link-color-hover)",

        active: "var(--active-color)",
        success: "var(--succes-color)",
        error: "var(--error-color)",
        warning: "var(--warning-color)",
        info: "var(--info-color)",
      },

      fontSize: {
        size1: "14px",
        size2: "16px",
        size3: "18px",
        size4: "20px",
        size5: "22px",
        size6: "24px",
        size7: "26px",
        size8: "28px",

        h1: "48px",
        h2: "30px",
      },

      borderRadius: {
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 4px)`,
        sm: "calc(var(--radius) - 8px)",
      },

      transitionProperty: {
        'bg': 'background-color',
      },

      animation: {
        gradient: 'gradient 8s ease infinite',
      },

      keyframes: {
        gradient: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': {backgroundPosition: '100% 50%' },
          '100%': {backgroundPosition: '0% 50%' },
        }
      }
    },
  },
  plugins: [],
} satisfies Config;
