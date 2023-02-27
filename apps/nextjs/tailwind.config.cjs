/** @type {import("tailwindcss").Config} */
module.exports = {
  presets: [require("@acme/tailwind-config")],
  theme: {
    fontFamily: {
      'orbitron': ['"Orbitron"', "'sans-serif'"],
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ]
};
