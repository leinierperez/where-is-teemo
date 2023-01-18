/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#00A3CB',
          500: '#006680',
        },
        secondary: '#061C25',
      },
    },
  },
};
