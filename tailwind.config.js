const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {

    variants: {
      gridAutoColumns: ["responsive"],
    },
  },
  plugins: [
    plugin(function ({ addBase, theme }) {
      addBase({
        h1: { fontSize: theme("fontSize.2xl"), marginBottom: '.5rem', marginTop: '1.5rem' },
        h2: { fontSize: theme("fontSize.xl"), marginBottom: '.5rem', marginTop: '1.5rem' },
        h3: { fontSize: theme("fontSize.lg") },
        p: {
          marginBottom: '1rem'
        },
      });
    }),
  ],
};
