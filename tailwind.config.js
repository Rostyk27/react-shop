/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'color-primary': 'var(--color-primary)',
        'color-secondary': 'var(--color-secondary)',
        'color-tertiary': 'var(--color-tertiary)',
        'color-text': 'var(--color-text)',
        'color-bg': 'var(--color-bg)',
      },
      fontFamily: {
        'family-montserrat': 'var(--family-montserrat)',
      },
      fontSize: {
        'size-base': 'var(--size-base)',
      },
    },
    screens: {
      sm: '481px', // 640px default
      md: '768px',
      lg: '1025px', // 1024px default
      xl: '1280px',
      '2xl': '1600px', // 1536px default
    },
  },
  corePlugins: {
    container: false,
  },
  plugins: [],
};
