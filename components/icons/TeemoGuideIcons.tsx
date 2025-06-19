
import React from 'react';

export const InfoIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
  </svg>
);

export const KeyIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l4.257-4.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 2 2 0 012 2 1 1 0 102 0 4 4 0 00-4-4z" clipRule="evenodd" />
  </svg>
);

export const RuneIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
    <path d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zm0 2h10v10H5V5z" />
    <path d="M7 7h2v2H7V7zm0 4h2v2H7v-2zm4-4h2v2h-2V7zm0 4h2v2h-2v-2z" />
  </svg>
);

export const ArrowSequenceIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a1 1 0 001 1h1.586l.293.293A1 1 0 007 15h6a1 1 0 00.707-.293l.293-.293H15a1 1 0 001-1V5a1 1 0 100-2H3zm7 4a1 1 0 011.707.707l-1.5 1.5a1 1 0 01-1.414 0l-1.5-1.5A1 1 0 018 7h2zm2 4a1 1 0 01.707 1.707l-1.5 1.5a1 1 0 01-1.414 0l-1.5-1.5A1 1 0 118 11h4z" clipRule="evenodd" />
  </svg>
);

export const ItemBagIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h12v1a1 1 0 01-1 1h-2a1 1 0 01-1-1H9a1 1 0 01-1 1H6a1 1 0 01-1-1zm4-5a1 1 0 100 2h4a1 1 0 100-2H8z" clipRule="evenodd" />
  </svg>
);

export const NotesIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
    <path d="M2.5 2A1.5 1.5 0 001 3.5V14h11V3.5A1.5 1.5 0 0010.5 2h-8zm0 1h8A.5.5 0 0111 3.5V13H2V3.5A.5.5 0 012.5 3z"/>
    <path d="M13 3.5A1.5 1.5 0 0114.5 2H18v10.5a1.5 1.5 0 01-1.5 1.5h-8A1.5 1.5 0 017 13V2.5a.5.5 0 01.5-.5H9V13a2 2 0 002 2h1.5a.5.5 0 00.5-.5V3.5z"/>
  </svg>
);

export const DifficultyIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M11.293 2.293a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L10 3.414l-5.293 5.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l1.586 1.586L12 4.586l1.293-1.293zM4.707 9.293a1 1 0 010-1.414L9.414 3a1 1 0 011.414 0L16 7.586V10a1 1 0 01-.293.707L10 16.414l-5.293-5.293A1 1 0 014 10V8.414l.707.707z" clipRule="evenodd" />
    <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12z"/>
  </svg>
);

export const BackpackIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
      <path fillRule="evenodd" d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm0 2h10a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V7a1 1 0 011-1zM4 14a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1z" clipRule="evenodd" />
      <path d="M8 5a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
    </svg>
);
