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
        'table-blue': "#27213c",
        'soft-gray': '#D3D3D3',
        'off-white2': '#F5F5F5',
        'blush-pink': '#FFB6C1',
      },
    },
  },
  plugins: [
    require('daisyui')
  ],
}