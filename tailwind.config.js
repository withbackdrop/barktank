 const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx,mdx}', './modules/**/*.{js,ts,jsx,tsx,mdx}', './app/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: 'class',
  safelist: [
    {
      pattern: /space-(x|y)-(0|1|2|3|4|6|10|16|24)/,
      variants: ['sm'],
    },
    {
      pattern: /flex-(row|col|row-reverse|col-reverse)/,
      variants: ['sm'],
    },
  ],
  theme: {
    extend: {
      fontSize: {
        xxs: ['0.65rem', '1rem'],
      },  
      maxWidth: {
        xxxs: '12rem',
        xxs: '16rem',
      }, 
      fontFamily: {
        sans: ['var(--font-satoshi)', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [
    /* eslint-disable global-require */ 
    require('@tailwindcss/forms'),
  ],
};
