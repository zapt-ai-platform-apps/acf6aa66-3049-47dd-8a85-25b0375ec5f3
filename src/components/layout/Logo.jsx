import React from 'react';

const Logo = ({ className = '' }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
        ALESCAI
      </span>
      <span className="ml-2 text-xs text-gray-500 dark:text-gray-400 hidden sm:inline-block">
        AI-Enhanced Learning & Smart Content Analysis Interface
      </span>
    </div>
  );
};

export default Logo;