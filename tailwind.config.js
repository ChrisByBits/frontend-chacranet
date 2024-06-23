/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': {
          100: '#006241',
          200: '#006e3e'
        },
      },
      fontFamily:{
        'kumbh-sans': 'Kumbh Sans'
      }
    },
  },
  plugins: [],
}