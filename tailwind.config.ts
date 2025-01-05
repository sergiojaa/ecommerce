import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#374A67",
        secondary: '#A63446',
      },
      height: {
        'screen-minus-header': 'calc(100vh - 56px)',
      },
    },
  },
  plugins: [],
} satisfies Config;
