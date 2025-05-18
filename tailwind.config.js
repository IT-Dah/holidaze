export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1D3557",
        accent: "#D2E4EB",
        background: "#FFFFFF",
        card: "#F3FBFA",
        cta: "#BA4F4F",
        tag: "#BFE2E4",
      },
      fontFamily: {
        heading: ["Montserrat", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
