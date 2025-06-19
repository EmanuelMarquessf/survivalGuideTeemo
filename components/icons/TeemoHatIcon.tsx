
import React from 'react';

export const TeemoHatIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
    className={className}
    fill="currentColor" // Will be overridden by text-red-500 from parent
  >
    {/* Hat base (green) */}
    <path d="M10 50 Q15 30 50 30 T90 50 L85 60 Q50 55 15 60 Z" className="text-lime-600" />
    {/* Red top part */}
    <ellipse cx="50" cy="32" rx="20" ry="10" className="text-red-500" />
    {/* Goggles (simplified) - outline */}
    <circle cx="35" cy="45" r="10" fill="none" stroke="#2c5282" strokeWidth="3" /> {/* Tailwind blue-700 */}
    <circle cx="65" cy="45" r="10" fill="none" stroke="#2c5282" strokeWidth="3" />
    {/* Goggles lenses */}
    <circle cx="35" cy="45" r="7" className="text-blue-300" />
    <circle cx="65" cy="45" r="7" className="text-blue-300" />
    {/* Feather (simplified) */}
    <path d="M75 25 Q80 15 85 25 T80 40 Z" className="text-yellow-400" />
  </svg>
);
