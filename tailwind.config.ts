import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // Include all JavaScript and TypeScript files in src
    "./public/**/*.html", // Optional: Include public HTML files
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
        mono: ["var(--font-roboto-mono)"],
      },
      fontSize: {
        xxs: "0.65rem",
        sm: "0.8rem",
      },
    },
  },
  plugins: [],
} satisfies Config;
