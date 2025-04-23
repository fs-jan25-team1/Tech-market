// tailwind.config.js
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './src/styles/index.css',
  ],
  theme: {
    extend: {
      fontFamily: {
        mont: ['Mont', 'sans-serif'],
        montBold: ['MontBold', 'sans-serif'],
        montSemiBold: ['MontSemiBold', 'sans-serif'],
      },
      colors: {
        brand: '#905BFF',
      },
    },
  },
  plugins: [require('tw-animate-css')],
};
