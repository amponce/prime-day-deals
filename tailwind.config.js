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
        primary: '#e74c3c',
        secondary: '#3498db',
        accent: '#8e44ad',
        success: '#27ae60',
        warning: '#f39c12',
        dark: '#2c3e50',
        // Dark mode specific colors
        'dark-bg': '#0f0f0f',
        'dark-surface': '#1a1a1a',
        'dark-surface-2': '#242424',
        'dark-border': '#2a2a2a',
        'dark-text': '#e0e0e0',
        'dark-text-secondary': '#a0a0a0',
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