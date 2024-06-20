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
          100: '#cfffdd',
          200: '#b4dec1',
          300: '#5c5863',
          400: '#a85163',
          500: '#ff1f4c'
        },
      },
      fontFamily:{
        'kumbh-sans': 'Kumbh Sans'
      }
    },
  },
  plugins: [],
}