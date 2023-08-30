/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors:{
      'purple': '#8E3E45',
      "white" : "white",
      "yellow" : "#DBA11A"
    },
    extend: {
      fontFamily: {
        'lobster': ['Lobster', 'cursive']
      }
    },
  },
  plugins: [
    require('daisyui')
  ],
}