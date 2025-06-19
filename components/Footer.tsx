
import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-lime-800 text-lime-300 p-6 text-center border-t-2 border-lime-900">
      <p className="text-sm">
        Guia de Sobrevivência do Escoteiro Teemo &copy; {currentYear}.
      </p>
      <p className="text-xs mt-1">
        League of Legends e todos os dados relacionados são propriedade da Riot Games, Inc. Este site não é afiliado à Riot Games.
      </p>
    </footer>
  );
};

export default Footer;
