import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],

  theme: {
    extend: {
      colors: {
        primary: "#ef9451",
        dark: {
          950: "#1d1d1d",
          900: "#262626",
        },
      },
    },
  },

  plugins: [],
} as Config;
