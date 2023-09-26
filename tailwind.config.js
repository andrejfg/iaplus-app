/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{tsx,jsx}', './app/**/*.{tsx,jsx}'],
  theme: {
    extend: {
      colors: {
        light: {
          c10: '#000010',
          c10_alt: '#b2edff',
          c30: '#062863',
          c60: '#F0F8FF',
        },
        dark: {
          c10: '#b2edff',
          c10_alt: '#274973',
          c30: '#051752',
          c60: '#000010',
        },
      },
    },
  },
  plugins: [],
}
