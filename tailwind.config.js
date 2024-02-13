/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'neon-pink': '#F23CA6', 
        'dark-orange': '#FF9535',
        'neon-green': '#4BFF36',
        'cyan': '#02FEE4',
        'blue-lotus': '#5E57FF',
        'dark': '#000212',
        'purple-primary': '#BC0EEF',
        'voilet-primary': '#443061',
        'neon-purple': '#FC1FF9',
      }
    }
  },
  plugins: [],
}

