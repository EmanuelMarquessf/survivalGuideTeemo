
import React, { useState } from 'react';
import { ItemExplanationData, ItemExplanation, ItemExplanationCategories } from '../types';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';
import { TeemoHatIcon } from './icons/TeemoHatIcon';
import { MagicSparkleIcon } from './icons/SectionIcons';

interface TeemoItemExplanationSectionProps {
  explanationData: ItemExplanationData | null;
  loading: boolean; // This will be true if explanationData is null and no error
  error: string | null;
  onRetry: () => void; // Kept for consistency
}

type ItemCategoryKey = keyof ItemExplanationCategories;

const categoryTranslations: Record<ItemCategoryKey, string> = {
  itens_iniciais: "Itens Iniciais e Dicas",
  escolhas_de_botas: "Escolhas de Botas",
  itens_principais_e_situacionais: "Itens Principais e Situacionais",
};

const TeemoItemExplanationSection: React.FC<TeemoItemExplanationSectionProps> = ({
  explanationData,
  loading,
  error,
  onRetry,
}) => {
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({});

  const toggleCategory = (categoryKey: string) => {
    setOpenCategories(prev => ({
      ...prev,
      [categoryKey]: !prev[categoryKey],
    }));
  };

  if (loading) {
    return <div className="my-8"><LoadingSpinner message="Processando explicações dos itens do Teemo..." /></div>;
  }
  if (error || !explanationData) {
    return <div className="my-8"><ErrorMessage message={`Falha ao processar explicações dos itens: ${error || 'Dados não disponíveis.'}`} onRetry={onRetry} /></div>;
  }

  const { guia_de_itens } = explanationData;

  const renderItemExplanation = (item: ItemExplanation) => (
    <div key={item.nome} className="mb-4 p-4 bg-lime-50 rounded-lg border border-lime-200 shadow-md hover:shadow-lg transition-shadow duration-200 flex flex-col sm:flex-row items-start">
      <img src={item.icon} alt={item.nome} className="w-12 h-12 mr-4 rounded-md border-2 border-amber-500 shadow-sm flex-shrink-0 mb-2 sm:mb-0" loading="lazy" />
      <div className="flex-grow">
        <h5 className="text-lg font-semibold text-lime-700 mb-1">{item.nome}</h5>
        <p className="text-sm text-stone-700 leading-relaxed whitespace-pre-line">{item.descricao}</p>
      </div>
    </div>
  );

  const renderCategorySection = (categoryKey: ItemCategoryKey, items: ItemExplanation[]) => {
    if (!items || items.length === 0) return null;
    const isOpen = !!openCategories[categoryKey];
    const categoryTitle = categoryTranslations[categoryKey] || categoryKey;

    return (
      <div key={categoryKey} className="mb-8 p-4 bg-amber-50 rounded-xl shadow-xl border-2 border-amber-400">
        <button
          type="button"
          onClick={() => toggleCategory(categoryKey)}
          className="w-full text-left flex items-center justify-between text-xl font-bold text-lime-800 mb-3 py-2 bg-lime-200 rounded-lg border-b-2 border-lime-500 shadow-md hover:bg-lime-300 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-opacity-75 transition-colors duration-150 px-3"
          aria-expanded={isOpen}
          aria-controls={`item-explanation-category-${categoryKey}`}
          style={{ fontFamily: "'Baloo 2', cursive" }}
        >
          <div className="flex items-center">
            <MagicSparkleIcon className="w-6 h-6 mr-2 text-lime-700 flex-shrink-0" />
            {categoryTitle}
          </div>
          <span className="text-xl text-lime-700 transform transition-transform duration-200" style={{ transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)' }}>
            ▶
          </span>
        </button>
        {isOpen && (
          <div id={`item-explanation-category-${categoryKey}`} className="mt-4 space-y-4">
            {items.map(renderItemExplanation)}
          </div>
        )}
      </div>
    );
  };

  return (
    <section className="my-10 p-4 sm:p-6 bg-amber-100 rounded-xl shadow-xl border-2 border-amber-600">
      <div className="flex flex-col sm:flex-row items-center text-center sm:text-left mb-8 pb-4 border-b-2 border-amber-500">
        <TeemoHatIcon className="w-16 h-16 text-red-500 mb-3 sm:mb-0 sm:mr-4 flex-shrink-0" />
        <div>
          <h2 className="text-3xl font-bold text-lime-800" style={{ fontFamily: "'Comic Sans MS', 'Chalkboard SE', fantasy" }}>
            Explicações Detalhadas dos Itens do Teemo
          </h2>
          <p className="text-md text-stone-700 italic">Entenda cada item e sua utilidade para o Teemo.</p>
        </div>
      </div>
      {(Object.keys(guia_de_itens) as ItemCategoryKey[]).map(key => 
        renderCategorySection(key, guia_de_itens[key])
      )}
    </section>
  );
};

export default TeemoItemExplanationSection;
