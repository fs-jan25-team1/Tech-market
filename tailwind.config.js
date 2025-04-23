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
        mont: ['Montserrat', 'sans-serif'],
      },
      colors: {
        brand: '#905BFF',
        cardBg: '#edd6df',
      },
      fontFamily: {
        mont: ['Montserrat', 'sans-serif'],
      },
    },
    screens: {
      mobile: '320px',     // до 639px
      tablet: '640px',     // 640–1199px
      desktop: '1200px',   // 1200+
    },
  },
  plugins: [require('tw-animate-css')],
};
