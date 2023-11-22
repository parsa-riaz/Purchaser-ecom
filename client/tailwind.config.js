/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: "#072963",
        zinc: "#125966",
        blue: "#3D5375",
        cgreen: "#1D7889",
        sky: "#cce6e2",
        lightgrey: "#E1E2E6",
      },
      fontFamily: {
        lora: ["Lora", "sairf"],
        merri: ["Merriweather", "sarif"],
        playpan: ["Playpen+Sans", "sans sarif"],
        neon: ["Tilt Neon", "sans sarif"],
      },
    },
  },
  plugins: [],
};
