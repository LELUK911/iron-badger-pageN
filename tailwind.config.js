/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'iron-Pact': "linear-gradient(90deg, rgba(30,90,94,1) 0%, rgba(0,64,129,0.9864146342130602) 54%)",
        'iron-forge': "linear-gradient(90deg, rgba(20,60,60,1) 0%, rgba(15,90,15,1) 100%)",
        
        'iron-rise' : 'linear-gradient(to right top, #05053d, #141546, #232350, #303059, #3e3e62)',
        'iron-fall' : "linear-gradient(180deg, rgba(30, 0, 0, 1) 0%, rgba(94, 0, 0, 1) 100%)",
      },
    },
  },
  plugins: [],
}

