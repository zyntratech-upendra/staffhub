/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        theme: { primary: '#05367b', secondary: '#fb5c00' }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'skew-scroll': 'skewScroll 20s linear infinite',
      },
      keyframes: {
        skewScroll: {
          '0%': { transform: 'rotate(-5deg) translateY(0)' },
          '100%': { transform: 'rotate(-5deg) translateY(-1000px)' },
        }
      }
    },
  },
  plugins: [],
}
