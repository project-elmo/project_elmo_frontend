/** @type {import('tailwindcss').Config} */
export default {
  content: ['/index.html', './src/**/*.{ts,tsx}'],
  theme: {
    colors: {
      primary: '#2d3648',
      secondary: '#edf0f7',
      line: '#d2d2d2',
      disabled: '#717d96',
    },
    extend: {
      fontSize: {
        '3xl': '2rem',
        '4xl': '2.625rem',
        '5xl': '3.375rem',
      },
    },
  },
  plugins: [],
};
