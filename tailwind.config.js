/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#204fad", //#e0501b
        secondary: "#e98e00",
        "primary-50": "#e4f4ff",
        "primary-100": "#cfe9ff",
        "primary-200": "#a8d4ff",
        "primary-300": "#74b6ff",
        "primary-600": "#1f4589",
        "primary-800": "#182b53",
      },
    },
  },
  plugins: [],
};
