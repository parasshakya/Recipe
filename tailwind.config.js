/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'custom-md': '994px',
       
        // Add more custom screen widths as needed
      },

    },
  },
  plugins: [],
}

