import React from 'react';

interface LogoProps {
  className?: string;
}

export const Logo = ({ className = "w-8 h-8 text-emerald-600" }: LogoProps) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M5 18h14a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1z" />
    <path d="M9 18v-2h6v2" />
    <path d="M12 16l4-10a2 2 0 0 1 3 3l-7 7" />
    <path d="M16 6l-1.5 3.5" />
    <path d="M17.5 7.5l-1.5 3.5" />
  </svg>
);