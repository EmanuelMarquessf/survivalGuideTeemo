
import React, { useState, useEffect } from 'react';
import { TeemoItemGuideData, ItemBuildCategory, ItemSet, ItemDetail, LaneItemBuilds } from '../types';
import { getItemImageUrl, itemNameOrAbbreviationToIdMap } from '../constants';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';
import { TeemoHatIcon } from './icons/TeemoHatIcon';
import { BackpackIcon } from './icons/TeemoGuideIcons';

type ItemLaneTab = 'TOP' | 'JUNGLE' | 'MID' | 'SUPPORT';

interface TeemoItemGuideSectionProps {
  guideData: TeemoItemGuideData | null;
  loading: boolean; // This will be true if guideData is null and no error
  error: string | null;
  onRetry: () => void; // Kept for consistency
  version: string | null; 
}

const TeemoItemGuideSection: React.FC<TeemoItemGuideSectionProps> = ({ 
  guideData, 
  loading, 
  error, 
  onRetry,
  version 
}) => {
  const [activeItemLaneTab, setActiveItemLaneTab] = useState<ItemLaneTab>('TOP');
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setOpenCategories({}); // Reset open categories when lane tab changes
  }, [activeItemLaneTab]);

  const toggleCategory = (categoryName: string) => {
    setOpenCategories(prev => ({
      ...prev,
      [categoryName]: !prev[categoryName]
    }));
  };

  if (loading) {
    return <div className="my-8"><LoadingSpinner message="Processando guia de itens do Teemo..." /></div>;
  }
  if (error || !guideData) {
    return <div className="my-8"><ErrorMessage message={`Falha ao processar guia de itens do Teemo: ${error || 'Dados não disponíveis.'}`} onRetry={onRetry} /></div>;
  }
  if (!version) {
    return <div className="my-8"><ErrorMessage message="Versão do jogo não disponível para carregar imagens dos itens." onRetry={onRetry} /></div>;
  }

  const { autor, descricaoGeral, rotas } = guideData.guiaDeItensTeemo;
  const currentLaneBuilds: LaneItemBuilds | undefined = rotas.find(rota => rota.nomeRota === activeItemLaneTab);

  const renderItemWithIcon = (item: string | ItemDetail, index: number) => {
    const itemName = typeof item === 'string' ? item : item.nome;
    const quantity = typeof item === 'string' ? undefined : item.quantidade;

    let normalizedItemName = itemName.replace(/\s*\+\s*\d+\s*Poções?/i, '').trim();
    normalizedItemName = normalizedItemName.replace(/\s*\(componente\)/i, '').trim();
    
    const itemId = itemNameOrAbbreviationToIdMap[normalizedItemName] || 
                   itemNameOrAbbreviationToIdMap[normalizedItemName.toLowerCase()] ||
                   itemNameOrAbbreviationToIdMap[itemName.trim()];

    const iconUrl = itemId ? getItemImageUrl(version, itemId) : null;

    return (
      <div key={`${itemName}-${index}`} className="flex items-center bg-white p-2 rounded border border-amber-300 shadow-sm text-xs text-stone-700 min-w-[150px] max-w-[200px]">
        {iconUrl ? (
          <img src={iconUrl} alt={itemName} className="w-8 h-8 mr-2 rounded" loading="lazy" />
        ) : (
          <div className="w-8 h-8 mr-2 bg-stone-200 rounded flex items-center justify-center text-stone-400 text-sm flex-shrink-0" title="Ícone não encontrado">?</div>
        )}
        <span className="truncate" title={itemName}>
          {itemName} {quantity && `(x${quantity})`}
        </span>
      </div>
    );
  };

  const renderItemSet = (set: ItemSet, categoryIndex: number, setIndex: number) => (
    <div key={`${categoryIndex}-${setIndex}`} className="mb-4 p-3 bg-lime-50 rounded-md border border-lime-200 shadow">
      <h4 className="text-md font-semibold text-lime-700 mb-1">{set.nomeConjunto}</h4>
      {set.dicaDoAutor && <p className="text-xs italic text-stone-600 mb-2 bg-amber-50 p-1.5 rounded border border-amber-200 text-justify">{set.dicaDoAutor}</p>}
      <div className="flex flex-wrap gap-2">
        {set.itens.map((item, itemIndex) => renderItemWithIcon(item, itemIndex))}
      </div>
    </div>
  );

  const renderItemCategory = (category: ItemBuildCategory, categoryIndex: number) => {
    const isCategoryOpen = !!openCategories[category.categoria];
    return (
      <div key={categoryIndex} className="mb-6 bg-amber-50 rounded-lg shadow-md border border-amber-300 overflow-hidden">
        <button
          type="button"
          onClick={() => toggleCategory(category.categoria)}
          className="w-full text-left flex items-center justify-between p-3 bg-lime-200 hover:bg-lime-300 transition-colors duration-150 focus:outline-none"
          aria-expanded={isCategoryOpen}
          aria-controls={`item-category-content-${categoryIndex}`}
        >
          <h3 className="text-lg font-bold text-lime-800">{category.categoria}</h3>
          <span className="text-xl text-lime-700 transform transition-transform duration-200" style={{ transform: isCategoryOpen ? 'rotate(90deg)' : 'rotate(0deg)' }}>
            ▶
          </span>
        </button>
        {isCategoryOpen && (
          <div id={`item-category-content-${categoryIndex}`} className="p-4 border-t border-lime-300">
            {category.conjuntos.map((set, setIndex) => renderItemSet(set, categoryIndex, setIndex))}
          </div>
        )}
      </div>
    );
  };

  return (
    <section className="my-10 p-4 sm:p-6 bg-amber-100 rounded-xl shadow-xl border-2 border-amber-600">
      <div className="flex flex-col sm:flex-row items-center text-center sm:text-left mb-4 pb-3 border-b-2 border-amber-400">
        <BackpackIcon className="w-12 h-12 text-lime-700 mb-3 sm:mb-0 sm:mr-4 flex-shrink-0" />
        <div>
          <h2 className="text-3xl font-bold text-lime-800" style={{ fontFamily: "'Comic Sans MS', 'Chalkboard SE', fantasy" }}>
            Guia de Itens do Teemo
          </h2>
          <p className="text-sm text-stone-600">Por: {autor}</p>
        </div>
      </div>
      <p className="text-sm italic text-stone-700 mb-6 bg-amber-50 p-3 rounded-md border border-amber-300 shadow-sm">{descricaoGeral}</p>
      
      <div className="sticky top-0 bg-amber-100 py-3 px-2 z-20 mb-6 border-y border-amber-300 rounded-md shadow-sm">
        <div className="flex space-x-1 sm:space-x-2 justify-center flex-wrap" role="tablist" aria-label="Seleção de Rota para Itens do Teemo">
          {(['TOP', 'JUNGLE', 'MID', 'SUPPORT'] as ItemLaneTab[]).map(lane => (
            <button
              key={lane}
              onClick={() => setActiveItemLaneTab(lane)}
              className={`py-2 px-4 mb-1 rounded-md font-semibold text-xs sm:text-sm transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-lime-600 focus:ring-opacity-70 transform hover:scale-105
                ${activeItemLaneTab === lane 
                  ? 'bg-lime-700 text-white shadow-lg ring-2 ring-lime-500' 
                  : 'bg-amber-300 text-lime-900 hover:bg-amber-400 shadow-md'
                }`}
              aria-selected={activeItemLaneTab === lane}
              role="tab"
            >
              {lane}
            </button>
          ))}
        </div>
      </div>
      
      <div role="tabpanel">
        {currentLaneBuilds && currentLaneBuilds.buildsDeItens.length > 0 ? (
          currentLaneBuilds.buildsDeItens.map((category, index) => renderItemCategory(category, index))
        ) : (
          <p className="text-stone-500 text-center py-6 text-lg">Nenhuma build de itens encontrada para a rota {activeItemLaneTab}.</p>
        )}
      </div>
    </section>
  );
};

export default TeemoItemGuideSection;
