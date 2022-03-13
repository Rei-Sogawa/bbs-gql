/* eslint-disable */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  plugins: [require("daisyui")],
  theme: {
    extend: {
      width: {
        xsm: "480px",
      },
    },
  },
};
