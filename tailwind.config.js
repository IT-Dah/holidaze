/** @type {import('tailwindcss').Config} */
export default {
  content: [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
],

  theme: {
    extend: {
      colors: {
        primary: '#1D3557',
        accent: '#D2E4EB',
        background: '#F1FAEE',
        cta: '#FF6B6B',
      },
      fontFamily: {
        heading: ['Montserrat', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
