/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
        },
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-up': 'floatUp 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        floatUp: {
          '0%': { transform: 'translateY(100vh) rotate(0deg)', opacity: '0' },
          '10%, 90%': { opacity: '0.5' },
          '100%': { transform: 'translateY(-20vh) rotate(360deg)', opacity: '0' },
        }
      }
    },
  },
  plugins: [],
}
