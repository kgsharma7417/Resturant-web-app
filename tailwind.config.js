/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          gold: '#FF5722',         // Previously gold, now Electric Orange
          goldSemi: 'rgba(255, 87, 34, 0.2)',
          orange: '#FF5722',       // Alias for orange
          maroon: '#E64A19',       // Previously maroon, now darker orange
          dark: '#121212',         // Deep Charcoal
          darker: '#0a0a0a',       // Almost Black
          gray: '#2A2A2A',         // Border & surface
          textLight: '#E0E0E0',    // Soft white
          white: '#ffffff',
          black: '#000000'
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['"Inter"', '"Jost"', 'sans-serif'],
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        }
      },
      animation: {
        shimmer: 'shimmer 1.5s infinite linear',
      }
    },
  },
  plugins: [],
}
