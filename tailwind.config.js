/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF6900',
        'primary-dark': '#E85D00',
        secondary: '#232F3E',
        accent: '#00A8CC',
        success: '#0FBE00',
        warning: '#f39c12',
        'bg-light': '#F7F9FA',
        'text-dark': '#0F1111',
        'text-gray': '#565959',
        'border-light': '#E3E6E8',
        // Dark mode specific colors
        'dark-bg': '#0f0f0f',
        'dark-surface': '#1a1a1a',
        'dark-surface-2': '#242424',
        'dark-border': '#2a2a2a',
        'dark-text': '#e0e0e0',
        'dark-text-secondary': '#a0a0a0',
      },
      boxShadow: {
        'card': '0 2px 5px rgba(0,0,0,0.08)',
        'card-hover': '0 8px 20px rgba(0,0,0,0.12)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'swipe-hint': 'swipeHint 2s ease-in-out infinite',
      },
      keyframes: {
        swipeHint: {
          '0%, 100%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(-10px)' },
        },
      },
    },
  },
  plugins: [],
}