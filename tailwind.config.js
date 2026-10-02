/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          900: '#0A1A3A',
          800: '#0E234D',
          700: '#14305F',
          600: '#193D78',
          500: '#1E4A8C',
          400: '#2A63B8',
        },
        yellow: {
          400: '#FFC83D',
          300: '#FFD966',
          200: '#FFE599',
        },
        amber: {
          500: '#F5A100',
          600: '#D98200',
        },
        cream: {
          DEFAULT: '#FFF8E7',
          50: '#FFFCF5',
          100: '#FFF8E7',
          200: '#FEEDCC',
        },
      },
      fontFamily: {
        display: ['"Bebas Neue"', 'Anton', 'sans-serif'],
        script: ['Caveat', 'Pacifico', 'cursive'],
        body: ['Inter', '"DM Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glow-yellow': '0 0 35px -5px rgba(255, 200, 61, 0.45)',
        'glow-lg': '0 0 60px -10px rgba(255, 200, 61, 0.55)',
        'card-navy': '0 20px 40px -15px rgba(10, 26, 58, 0.7)',
      },
      animation: {
        'spin-slow': 'spin 30s linear infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-14px) rotate(2deg)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.08)' },
        },
      },
    },
  },
  plugins: [],
}
