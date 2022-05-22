module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: 'humanst521_ubd_btultra_bold, Arial, sans-serif',
        heading: 'bikobold, Arial, sans-serif',
        body: 'bikoregular, Arial, sans-serif'
      },
      colors: {
        fade: "#F7F5F2",
        "brand-red": "#ed1c24",
        "brand-purple": "#d9bce2",
        vibrant: "#E50001",
        mauve: "#DCC9E8",
        cream: "#F5F4F0"
        
      }
    },
  },
  plugins: [],
}
