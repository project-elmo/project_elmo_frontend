/** @type {import('tailwindcss').Config} */
export default {
  content: ['/index.html', './src/**/*.{ts,tsx}'],
  theme: {
    fontSize: {
      '3xl': '2rem',
      '4xl': '2.625rem',
      '5xl': '3.375rem',
    },
    colors: {
      primary: '#2d3648',
      secondary: '#edf0f7',
      border: '#d2d2d2',
      disabled: '#717d96',
    },
    extend: {},
  },
  plugins: [],
};
