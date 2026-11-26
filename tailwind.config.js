/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.tsx', './src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      // Design tokens: change a colour here and it updates everywhere.
      colors: {
        paper: '#F6F4EF', // app background (warm off-white)
        card: '#FFFFFF', // raised surfaces: AI bubbles, input, cards
        ink: '#17171A', // primary text
        line: '#E6E2D9', // borders and dividers
        muted: '#6B675F', // secondary text
        brand: {
          DEFAULT: '#2F5BFF', // user bubbles, send button, accents
          dark: '#2447D6',
          soft: '#E9EEFF',
        },
        danger: {
          DEFAULT: '#B42318',
          soft: '#FDEDEB',
          line: '#F6C9C4',
        },
      },
    },
  },
  plugins: [],
};
