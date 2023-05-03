/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    ripple: theme => ({
      colors: theme('colors'),
      darken: 0.1,

    }),
  },
  plugins: [
    require('tailwindcss-ripple')()
  ],
  extend: {},
}

