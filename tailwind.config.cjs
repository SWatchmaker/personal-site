/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {
      colors: {
        'eva-purple': {
          light: '#8b3ba5',
          DEFAULT: '#652b78',
          dark: '#26102d',
          darker: '#1f0d25',
        },
        turquoise: '#43c59e',
      },
      animation: {
        'spin-slower': 'spin 8s linear infinite',
      },
      fontFamily: {
        code: ['Encode Sans', 'sans-serif'],
        bebas: ['Bebas Neue,cursive'],
      },
    },
  },
  plugins: [],
};
