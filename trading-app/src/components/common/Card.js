// src/components/common/Card.js
import React from 'react';

const Card = ({ 
  children, 
  className = '', 
  padding = 'p-6',
  shadow = 'shadow-lg',
  hover = false 
}) => {
  const hoverEffect = hover ? 'hover:shadow-xl transition-shadow' : '';
  
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-xl ${shadow} ${padding} ${hoverEffect} ${className}`}>
      {children}
    </div>
  );
};

export default Card;