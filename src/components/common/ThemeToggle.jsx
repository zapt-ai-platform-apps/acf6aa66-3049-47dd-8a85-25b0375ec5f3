import React, { useEffect } from 'react';
import { FiSun, FiMoon } from 'react-icons/fi';
import { useThemeStore, applyTheme } from '@/modules/core/theme';

const ThemeToggle = () => {
  const { darkMode, toggleDarkMode } = useThemeStore();
  
  useEffect(() => {
    applyTheme(darkMode);
  }, [darkMode]);
  
  return (
    <button 
      onClick={toggleDarkMode}
      className="p-2 rounded-md text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
      aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
    </button>
  );
};

export default ThemeToggle;