/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    colors: {
      // darkBlue: "#011638",
      // electricBlue: "#0D21A1",
      white: "#f6f2f2",
      black: "#121212",
      parrotGreen: "#97fb57",
      gray: "#909090",
      red: "#FF0000",
      // saffron: "#EEC643",
    },
  },
  plugins: [],
};
