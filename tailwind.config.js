/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        base: {
          light: "#e2e2e2",
          dark: "#262626",
          back: {
            light: "#d6d6d6",
            dark: "#1a1a1a",
          },
          fore: {
            light: "#f4f4f4",
            dark: "#313131",
          },
        },
        content: {
          light: "#040404",
          dark: "#fff",
        },
      },
    },
  },
  plugins: [],
};
