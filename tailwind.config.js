/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      xs: "320px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1440px",
    },
    extend: {
      fontFamily: {
        raleway: ["Raleway", "sans-serif"],
      },
      colors: {
        "off-white": "#F3F3F3",
        "blue-cream": "#3A7CA5",
        "primary-grey": "#7C7C7C",
        "modern-primary": "#2D2D2A",
        "modern-secondary": "#FAF3E0",
        "modern-accent": "#E4572E",
      },
      boxShadow: {
        "custom-black": "0 0 50px 5px rgba(0, 0, 0, 0.05)",
      },
    },
  },
  plugins: [require("daisyui"), require("@tailwindcss/typography")],
};
