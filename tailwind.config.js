module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ["Graphik", "sans-serif"],
      serif: ["Merriweather", "serif"],
    },
    colors: {
      disabled: "var(--color-disabled)",
      primary: "#304FFE",
      dark: "#263238",
      light: "#FFFFFF",
      "dark-light": "var(--color-dark-light)",
    },
    extend: {
      borderRadius: { 0.75: "3px" },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
