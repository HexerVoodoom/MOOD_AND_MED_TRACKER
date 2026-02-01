import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  fullWidth?: boolean;
  size?: 'small' | 'medium' | 'large';
}

export function Button({ 
  children, 
  onClick, 
  variant = 'primary', 
  fullWidth = false,
  size = 'medium' 
}: ButtonProps) {
  const baseClasses = 'rounded-xl transition-colors duration-200 flex items-center justify-center gap-2';
  
  const variantClasses = {
    primary: 'bg-[rgb(var(--color-primary))] text-black hover:bg-[rgb(var(--color-primary-dark))]',
    secondary: 'bg-[rgb(var(--color-gray-100))] text-[rgb(var(--color-text))] hover:bg-[rgb(var(--color-gray-200))]',
    ghost: 'bg-transparent text-[rgb(var(--color-primary))] hover:bg-[rgb(var(--color-gray-100))]'
  };
  
  const sizeClasses = {
    small: 'px-4 py-2 min-h-[36px]',
    medium: 'px-6 py-3 min-h-[48px]',
    large: 'px-8 py-4 min-h-[56px]'
  };
  
  const widthClass = fullWidth ? 'w-full' : '';
  
  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass}`}
    >
      {children}
    </button>
  );
}
