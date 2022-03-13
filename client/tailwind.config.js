/* eslint-disable */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  plugins: [require("daisyui")],
  theme: {
    extend: {
      width: {
        "screen-xs": "480px",
        "screen-sm": "640px",
        "screen-md": "768px",
        "screen-lg": "1024px",
      },
    },
  },
};
