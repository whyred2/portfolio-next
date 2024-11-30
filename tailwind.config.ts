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
      padding: "2rem",
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        accent: "var(--accent-color)",
        accentHover: "var(--accent-color-hover)",

        secondary: "var(--secondary-color)",
        secondaryHover: "var(--secondary-color-hover)",
        
        active: "var(--active-color)",

        linkColor: "var(--link-color)",
        linkColorHover: "var(--link-color-hover)",

        background1: "var(--background-1)",
        background2: "var(--background-2)",
        background3: "var(--background-3)",

        foreground: "var(--text)",

        textSpan: "var(--text-span)",

        errorColor: "var(--error-color)",
      },

      fontSize: {
        size1: "14px",
        size2: "16px",
        size3: "18px",
        size4: "20px",
      },

      borderRadius: {
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [],
} satisfies Config;
