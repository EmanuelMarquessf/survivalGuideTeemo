
import React from 'react';
import { MushroomIcon } from './icons/MushroomIcon';

interface LoadingSpinnerProps {
  message?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ message = "Carregando..." }) => {
  return (
    <div className="flex flex-col items-center justify-center py-10 text-center">
      <MushroomIcon className="w-16 h-16 text-lime-600 animate-bounce mb-4" />
      <div className="w-20 h-20 border-4 border-t-4 border-lime-700 border-t-transparent rounded-full animate-spin mb-3"></div>
      <p className="text-xl font-semibold text-lime-700">{message}</p>
      <p className="text-stone-600">Um momento, o Teemo está plantando cogumelos...</p>
    </div>
  );
};

export default LoadingSpinner;
