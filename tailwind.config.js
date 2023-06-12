const forms = require('@tailwindcss/forms')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#087ea4',
        secondary: '#0d6d8c',
      }
    },
  },
  plugins: [
    forms({
      strategy: 'class',
    }),
  ],
}
