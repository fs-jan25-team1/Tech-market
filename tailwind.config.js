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
      screens: {
        xs: '480px',
        sm: '640px',
        md: '768px',
        lg: '1200px',
        xl: '1440px',
      },
    },
  },
  plugins: [require('tw-animate-css')],
};
