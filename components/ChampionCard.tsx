import React from 'react';
import { Champion } from '../types';
import { getChampionSquareImageUrl } from '../constants';

interface ChampionCardProps {
  champion: Champion;
  version: string;
  onClick: (champion: Champion) => void;
}

const ChampionCard: React.FC<ChampionCardProps> = ({ champion, version, onClick }) => {
  const imageUrl = getChampionSquareImageUrl(version, champion.image.full);

  return (
    <div 
      className="bg-amber-100 border-2 border-amber-700 rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300 ease-in-out flex flex-col items-center p-4 h-full group cursor-pointer"
      onClick={() => onClick(champion)}
      onKeyPress={(e) => e.key === 'Enter' && onClick(champion)}
      role="button"
      tabIndex={0}
      aria-label={`Ver detalhes de ${champion.name}`}
    >
      <img
        src={imageUrl}
        alt={`Imagem de ${champion.name}`}
        className="w-32 h-32 rounded-full border-4 border-amber-600 object-cover mb-4 shadow-md group-hover:border-lime-600 transition-colors"
        loading="lazy"
      />
      <div className="text-center">
        <h3 className="text-xl font-bold text-lime-800 group-hover:text-lime-600 transition-colors">{champion.name}</h3>
        <p className="text-sm text-stone-600 capitalize italic">{champion.title}</p>
        <div className="mt-2 flex flex-wrap justify-center gap-2">
          {champion.tags.map(tag => (
            <span key={tag} className="bg-lime-600 text-white text-xs px-2 py-1 rounded-full shadow">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChampionCard;
