module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'rotate 8s linear infinite',
      },
      keyframes: {
        rotate: {
          '100%': { transform: 'rotate(360deg)' }
        }
      },
      transformOrigin: {
        'top-left-1/2-1/2': '50% 50%',
      }
    },
  },
  plugins: [],
}