import React from 'react';

export const ShieldIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
  </svg>
);

export const SwordIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
    <path d="M19.28 7.63l-8.02-8.02a1 1 0 00-1.41 0L2.28 7.18a1 1 0 000 1.41l.06.06L.71 10.29a1 1 0 000 1.41l5.66 5.66a1 1 0 001.41 0l1.64-1.64L10 17.27V20h2.73L14 15.03l1.64 1.64a1 1 0 001.41 0l5.66-5.66a1 1 0 000-1.41l-1.64-1.64L19.28 7.63zm-8.41 7.08L5.21 9.05l5.66-5.66 5.66 5.66-5.66 5.66zM13 18.73V16h1.73L13 18.73z" />
  </svg>
);