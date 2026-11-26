/** @type {import('tailwindcss').Config} */
module.exports = {
  // Every file that uses `className` must be listed, including shared components in src/.
  content: ['./App.tsx', './app/**/*.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      // Design tokens: change a colour in src/constants/colors.json and it updates
      // everywhere, including the tab bar (which needs raw colour values).
      //   paper   app background (warm off-white)
      //   card    raised surfaces: AI bubbles, input, cards
      //   ink     primary text
      //   line    borders and dividers
      //   muted   secondary text
      //   brand   user bubbles, send button, accents
      //   success positive trends, "connected" states
      //   danger  errors
      colors: require('./src/constants/colors.json'),
    },
  },
  plugins: [],
};
