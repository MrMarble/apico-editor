const defaultTheme = require("tailwindcss/defaultTheme");
const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Pixeloid", ...defaultTheme.fontFamily.sans],
        apico: ["Apico", "Pixeloid", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        base: "#564457",
        white: "#fffffe",
        light: "#765b69",
        hilight: "#95757e",
        dark: "#3e3245",
        "select-dark": "#d89741",
        "select-hilight": "#e8c98d",
        "select-light": "#dfb162",
        "alt-base": "#324a62",
        "alt-light": "#426f80",
        "alt-dark": "#203550",
        "alt-hilight": "#598696",
      },
      size: {
        19: "72px",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    plugin(function ({ theme, matchUtilities }) {
      const utilities = {
        pix: (value) => ({
          "--pixel-t": value,
          "--pixel-r": value,
          "--pixel-b": value,
          "--pixel-l": value,
        }),
      };

      for (const direction of ["t", "r", "b", "l"]) {
        utilities[`pix-${direction}`] = (value) => ({
          [`--pixel-${direction}`]: value,
        });
      }

      matchUtilities(utilities, { values: theme("colors") });
    }),
  ],
};
