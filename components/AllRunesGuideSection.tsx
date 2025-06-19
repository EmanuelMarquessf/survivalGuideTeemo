import React, { useState } from 'react';
import { AllRunesData, RuneDetailFromJSON, RuneTreeCategoryFromJSON, RuneShardData, RuneShardOption } from '../types';
import { TeemoHatIcon } from './icons/TeemoHatIcon'; 
// import { MagicSparkleIcon } from './icons/SectionIcons'; 

interface AllRunesGuideSectionProps {
  allRunesData: AllRunesData;
}

const rowTranslations: Record<keyof Omit<RuneTreeCategoryFromJSON, 'keystones' | 'name'>, string> = {
    row_one: 'Fileira 1',
    row_two: 'Fileira 2',
    row_three: 'Fileira 3',
};

const shardRowTranslations: Record<keyof RuneShardData['options_by_row'], string> = {
    row_1_offense: 'Ofensiva',
    row_2_flex: 'Flexível',
    row_3_defense: 'Defensiva',
};

const AllRunesGuideSection: React.FC<AllRunesGuideSectionProps> = ({ allRunesData }) => {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
  const [openRunes, setOpenRunes] = useState<Record<string, boolean>>({});

  const toggleSection = (sectionKey: string) => {
    setOpenSections(prev => ({
      ...prev,
      [sectionKey]: !prev[sectionKey]
    }));
  };

  const toggleRune = (runeKey: string) => {
    setOpenRunes(prev => ({
      ...prev,
      [runeKey]: !prev[runeKey]
    }));
  };
  
  const renderRuneStatus = (status: RuneDetailFromJSON['status']) => {
    if (status === 'recommended') {
      return <span className="ml-2 px-2 py-0.5 text-xs font-semibold bg-green-100 text-green-700 rounded-full shadow-sm border border-green-300">Recomendada</span>;
    }
    if (status === 'not_recommended') {
      return <span className="ml-2 px-2 py-0.5 text-xs font-semibold bg-red-100 text-red-700 rounded-full shadow-sm border border-red-300">Não Recomendada</span>;
    }
    return null;
  };

  const renderRuneDetail = (rune: RuneDetailFromJSON, treeKey: string, rowIndex: string, index: number) => {
    const runeKey = `${treeKey}-${rowIndex}-${rune.name.replace(/\s+/g, '-')}-${index}`;
    const isRuneOpen = !!openRunes[runeKey];

    return (
      <div key={runeKey} className="mb-4 p-3 bg-lime-50 rounded-lg border border-lime-200 shadow-md hover:shadow-lg transition-shadow duration-200 flex flex-col">
        <button
          type="button"
          onClick={() => toggleRune(runeKey)}
          className="w-full text-left flex items-start mb-1 focus:outline-none rounded-md p-1 hover:bg-lime-100 transition-colors"
          aria-expanded={isRuneOpen}
          aria-controls={`rune-description-${runeKey}`}
        >
          <img src={rune.icon} alt={rune.name} className="w-10 h-10 mr-3 rounded-md border-2 border-amber-500 shadow-sm flex-shrink-0" loading="lazy"/>
          <div className="flex-grow">
            <h5 className="text-lg font-semibold text-lime-700">{rune.name}</h5>
            {renderRuneStatus(rune.status)}
          </div>
          <span className="text-lime-600 text-xl ml-auto transform transition-transform duration-200 self-center" style={{ transform: isRuneOpen ? 'rotate(90deg)' : 'rotate(0deg)' }}>▶</span>
        </button>
        {isRuneOpen && (
          <div id={`rune-description-${runeKey}`} className="mt-1 pl-1 transition-all duration-300 ease-in-out overflow-hidden">
            <p className="text-sm text-stone-700 leading-relaxed whitespace-pre-line flex-grow">
              {rune.description}
            </p>
          </div>
        )}
      </div>
    );
  };

  const renderRuneCategory = (runes: RuneDetailFromJSON[] | undefined, title: string, treeKey: string, rowIndex: string) => {
    if (!runes || runes.length === 0) {
        return null; 
    }
    return (
      <div className="mb-6 mt-4">
        <h4 className="text-xl font-bold text-lime-800 mb-4 pb-2 border-b-2 border-lime-400 bg-lime-100 p-2 rounded-t-md shadow-sm">{title}</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {runes.map((rune, index) => renderRuneDetail(rune, treeKey, rowIndex, index))}
        </div>
      </div>
    );
  };

  const renderRuneShardOption = (option: RuneShardOption, index: number) => (
    <div key={`${option.name}-${index}`} className="flex items-center p-2 bg-white rounded-md border border-amber-300 shadow-sm">
        <img src={option.icon} alt={option.name} className="w-6 h-6 mr-2 rounded-sm" loading="lazy"/>
        <span className="text-xs text-stone-700">{option.name}</span>
    </div>
  );

  const renderRuneShards = (shardData: RuneShardData | undefined) => {
    if (!shardData) return null;
    const sectionKey = 'rune_shards';
    const isOpen = !!openSections[sectionKey];
    
    return (
      <div className="mt-10 mb-6 p-5 bg-amber-50 rounded-xl shadow-2xl border-2 border-amber-400">
        <button
          type="button"
          onClick={() => toggleSection(sectionKey)}
          className="w-full text-left flex items-center justify-between text-2xl sm:text-3xl font-extrabold text-lime-700 mb-2 py-3 bg-lime-200 rounded-lg border-b-4 border-lime-600 shadow-lg tracking-wide hover:bg-lime-300 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-opacity-75 transition-colors duration-150"
          aria-expanded={isOpen}
          aria-controls={`section-content-${sectionKey}`}
        >
          <div className="flex items-center" style={{ fontFamily: "'Comic Sans MS', 'Chalkboard SE', fantasy"}}>
            {/* <MagicSparkleIcon className="w-7 h-7 inline-block mr-2 align-middle" /> */}
            {shardData.name}
          </div>
          <span className="text-xl mr-3 transform transition-transform duration-200" style={{ transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)' }}>▶</span>
        </button>
        {isOpen && (
          <div id={`section-content-${sectionKey}`} className="mt-4">
            <p className="text-sm italic text-stone-600 mb-6 bg-lime-100 p-3 rounded-md border border-lime-300 shadow-sm">{shardData.description}</p>
            
            {(Object.keys(shardData.options_by_row) as Array<keyof RuneShardData['options_by_row']>).map(rowKey => {
              const rowOptions = shardData.options_by_row[rowKey];
              if (!rowOptions || rowOptions.length === 0) return null;
              return (
                <div key={rowKey} className="mb-5">
                  <h4 className="text-md font-semibold text-lime-800 mb-2 pb-1 border-b border-lime-300">{shardRowTranslations[rowKey] || rowKey.replace('row_', 'Fileira ').replace('_', ' ')}:</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {rowOptions.map(renderRuneShardOption)}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  const treeKeys = (Object.keys(allRunesData) as Array<keyof AllRunesData>).filter(
    key => key !== 'rune_shards'
  ) as Array<Exclude<keyof AllRunesData, 'rune_shards'>>;


  return (
    <section className="my-10 p-4 sm:p-6 bg-amber-100 rounded-xl shadow-xl border-2 border-amber-600">
      <div className="flex flex-col sm:flex-row items-center text-center sm:text-left mb-8 pb-4 border-b-2 border-amber-500">
        <TeemoHatIcon className="w-20 h-20 text-red-500 mb-3 sm:mb-0 sm:mr-5 flex-shrink-0" />
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold text-lime-800" style={{ fontFamily: "'Comic Sans MS', 'Chalkboard SE', fantasy" }}>
            Guia Detalhado de Todas as Runas
          </h2>
          <p className="text-md text-stone-700 italic">Quando e por que usar cada runa, segundo especialistas.</p>
        </div>
      </div>

      {treeKeys.map(treeKey => {
        const treeData = allRunesData[treeKey];
        if (!treeData || typeof treeData !== 'object' || !('keystones' in treeData)) return null; 

        const hasKeystones = treeData.keystones && treeData.keystones.length > 0;
        const hasRowOne = treeData.row_one && treeData.row_one.length > 0;
        const hasRowTwo = treeData.row_two && treeData.row_two.length > 0;
        const hasRowThree = treeData.row_three && treeData.row_three.length > 0;
        
        if (!hasKeystones && !hasRowOne && !hasRowTwo && !hasRowThree) {
            return null; 
        }

        const isOpen = !!openSections[treeKey];

        return (
          <div key={treeKey} className="mb-12 p-5 bg-amber-50 rounded-xl shadow-2xl border-2 border-amber-400">
            <button
              type="button"
              onClick={() => toggleSection(treeKey)}
              className="w-full text-left flex items-center justify-between text-2xl sm:text-3xl font-extrabold text-lime-700 mb-1 py-3 bg-lime-200 rounded-lg border-b-4 border-lime-600 shadow-lg tracking-wide hover:bg-lime-300 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-opacity-75 transition-colors duration-150"
              aria-expanded={isOpen}
              aria-controls={`section-content-${treeKey}`}
            >
              <span style={{ fontFamily: "'Comic Sans MS', 'Chalkboard SE', fantasy"}}>
                Árvore de {treeData.name || treeKey.charAt(0).toUpperCase() + treeKey.slice(1)}
              </span>
              <span className="text-xl mr-3 transform transition-transform duration-200" style={{ transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)' }}>▶</span>
            </button>
            {isOpen && (
              <div id={`section-content-${treeKey}`} className="mt-4">
                {renderRuneCategory(treeData.keystones, 'Runas Principais (Keystones)', treeKey, 'keystones')}
                {renderRuneCategory(treeData.row_one, `Runas da ${rowTranslations.row_one}`, treeKey, 'row_one')}
                {renderRuneCategory(treeData.row_two, `Runas da ${rowTranslations.row_two}`, treeKey, 'row_two')}
                {renderRuneCategory(treeData.row_three, `Runas da ${rowTranslations.row_three}`, treeKey, 'row_three')}
              </div>
            )}
          </div>
        );
      })}
      {renderRuneShards(allRunesData.rune_shards)}
    </section>
  );
};

export default AllRunesGuideSection;