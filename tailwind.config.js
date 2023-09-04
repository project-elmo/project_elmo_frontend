/*eslint-env node*/
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['/index.html', './src/**/*.{ts,tsx}'],
  mode: 'jit',
  theme: {
    extend: {
      colors: {
        primary: '#2d3648',
        secondary: '#edf0f7',
        line: '#d2d2d2',
        disabled: '#717d96',
      },
      fontSize: {
        '3xl': '2rem',
        '4xl': '2.625rem',
        '5xl': '3.375rem',
      },
    },
  },
  plugins: [require('tailwindcss-radix')],
};
