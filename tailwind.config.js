/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        body: ['Outfit', 'sans-serif'],
        accent: ['Italiana', 'serif'],
      },
      colors: {
        gold: '#c89010',
        'gold-hover': '#e0a820',
        ink: '#06040c',
        cream: '#f0e6d2',
        muted: '#6a5840',
      },
      transitionDuration: {
        '400': '400ms',
      },
    },
  },
  plugins: [],
}
