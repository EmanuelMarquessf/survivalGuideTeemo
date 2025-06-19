
import React from 'react';
import { TeemoHatIcon } from './icons/TeemoHatIcon'; // Assuming TeemoHatIcon is created

const Header: React.FC = () => {
  return (
    <header className="bg-lime-700 text-amber-50 p-6 shadow-lg border-b-4 border-lime-900">
      <div className="container mx-auto flex items-center justify-center sm:justify-start space-x-4">
        <TeemoHatIcon className="h-12 w-12 text-red-500 hidden sm:block" />
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight" style={{ fontFamily: "'Comic Sans MS', 'Chalkboard SE', fantasy" }}>
            Guia de Sobrevivência
          </h1>
          <p className="text-lg sm:text-xl text-lime-300" style={{ fontFamily: "'Comic Sans MS', 'Chalkboard SE', fantasy" }}>
            do Escoteiro Teemo
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;
