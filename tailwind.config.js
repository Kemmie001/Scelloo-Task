// /** @type {import('tailwindcss').Config} */

module.exports = {
  purge: [ './src/**/*.html', './src/**/*.vue', './src/**/*.jsx', ],
  theme: {
    fontFamily: {
      'inter': ['Inter', 'sans-serif'],
    },
    extend: {
      colors: {
        primary: '#6E6893',
        secondary: '#D9D5EC',
        light: '#6D5BD0',
        dark: '#25213B',
        'dark-light': '#F4F2FF',
        'success': '#007F00',
        error: '#D30000',
        'medium-dark':  '#F2F0F9',
      },
      
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
