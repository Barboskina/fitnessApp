import React from 'react';

const Button = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  disabled = false,
  ...props 
}) => {
  const baseClasses = 'inline-flex items-center justify-center gap-2 px-4 py-3 font-semibold rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-pink-600 text-white hover:bg-pink-700 shadow-lg hover:shadow-xl',
    secondary: 'bg-gray-900 text-white hover:bg-gray-800 shadow-lg hover:shadow-xl',
    white: 'bg-white text-gray-900 hover:bg-gray-50 shadow-lg hover:shadow-xl',
    outline: 'border-2 border-white text-white hover:bg-white hover:text-pink-600',
    dark: 'bg-gray-800 text-white hover:bg-gray-700 shadow-lg hover:shadow-xl',
    disabled: 'bg-gray-300 text-gray-500 cursor-not-allowed'
  };

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;