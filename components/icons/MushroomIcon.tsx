
import React from 'react';

export const MushroomIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
    className={className} // Allows fill/stroke to be controlled by Tailwind text color
    fill="currentColor"
  >
    {/* Stem */}
    <rect x="40" y="50" width="20" height="40" rx="5" className="text-amber-300" />
    {/* Cap */}
    <path d="M10 55 Q15 20 50 20 T90 55 A40 30 0 0 1 10 55 Z" className="text-red-500" />
    {/* Spots */}
    <circle cx="30" cy="35" r="7" className="text-yellow-50" />
    <circle cx="50" cy="28" r="8" className="text-yellow-50" />
    <circle cx="70" cy="35" r="7" className="text-yellow-50" />
    <circle cx="40" cy="48" r="6" className="text-yellow-50" />
    <circle cx="60" cy="48" r="6" className="text-yellow-50" />
  </svg>
);
