const withMT = require("@material-tailwind/react/utils/withMT");
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'lobster': ['Lobster', 'cursive']
      },
      colors:{
        'purple': '#8E3E45',
        'purplelite':{
          600:'#99575d'
        },
        "yellow" : "#DBA11A",
        'gray-custom': '#9C9C9C',
        'cherry-Red': '#CC313D',
        'off-White': '#FCF6F5',
        'table-blue': "#27213c"
      },
    },
  },
  plugins: [
    require('daisyui')
  ],
}