// src/components/layout/Header.js
import React from 'react';
import { RefreshCw, Sun, Moon } from 'lucide-react';

const Header = ({ darkMode, onToggleDarkMode, onRefresh }) => {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-sm border-b dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Trading Dashboard
          </h1>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={onRefresh}
              className="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
              title="Refresh Data"
            >
              <RefreshCw size={20} />
            </button>
            
            <button
              onClick={onToggleDarkMode}
              className="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
              title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;