/** @type {import('tailwindcss').Config} */
const purgecss = require("@fullhuman/postcss-purgecss");
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./node_modules/flowbite-react/**/*.js",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./public/**/*.{html,woff2}",
  ],
  darkMode: "class",
  theme: {
    extend: {},
    fontFamily: {
      hikou: ["Hikou", "sans-serif", "ui-sans-serif", "system-ui"],
      bebas: ["Bebas Neue", "sans-serif", "ui-sans-serif", "system-ui"],
      poppins: ["Poppins", "sans-serif", "ui-sans-serif", "system-ui"],
      sans: ["Inter", ...defaultTheme.fontFamily.sans],
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("flowbite/plugin"),
    purgecss({
      content: ["./**/*.html"],
    }),
  ],
};
