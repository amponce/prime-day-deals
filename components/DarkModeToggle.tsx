'use client';

import { useDarkMode } from './DarkModeContext';

export default function DarkModeToggle() {
  const { darkMode, toggleDarkMode } = useDarkMode();

  return (
    <button
      onClick={toggleDarkMode}
      className="fixed top-4 right-4 md:top-6 md:right-6 z-50 p-3 rounded-full bg-gray-200 dark:bg-dark-surface-2 shadow-lg hover:shadow-xl transition-all duration-300 group"
      aria-label="Toggle dark mode"
    >
      <div className="relative w-6 h-6">
        {/* Sun icon */}
        <svg
          className={`absolute inset-0 transform transition-all duration-300 ${
            darkMode ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
        
        {/* Moon icon */}
        <svg
          className={`absolute inset-0 transform transition-all duration-300 ${
            darkMode ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0'
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      </div>
    </button>
  );
}