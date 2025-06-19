
import React, { useState, useEffect } from 'react';
import { TeemoRuneGuideData, RunePage as TeemoRunePage } from '../types';
import { runeIconMap, getRuneIconCdnUrl } from '../constants';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';
import { TeemoHatIcon } from './icons/TeemoHatIcon'; 
import { RuneIcon as SectionRuneIcon } from './icons/TeemoGuideIcons';


type RuneLaneTab = 'TOP' | 'JUNGLE' | 'MID' | 'SUPPORT';

interface TeemoRuneGuideSectionProps {
  guideData: TeemoRuneGuideData | null;
  loading: boolean; // This will be true if guideData is null and no error
  error: string | null;
  onRetry: () => void; // Kept for consistency, but less relevant for inline data
}

const extractBaseRuneName = (fullName: string): string => {
    if (typeof fullName !== 'string') return '';
    let name = fullName.trim();
    const parenthesisIndex = name.indexOf(' (');
    if (parenthesisIndex !== -1) {
      name = name.substring(0, parenthesisIndex).trim();
    }
    return name;
  };

const TeemoRuneGuideSection: React.FC<TeemoRuneGuideSectionProps> = ({ guideData, loading, error, onRetry }) => {
  const [activeRuneLaneTab, setActiveRuneLaneTab] = useState<RuneLaneTab>('TOP');
  const [expandedRunePageName, setExpandedRunePageName] = useState<string | null>(null);

  useEffect(() => {
    setExpandedRunePageName(null); // Reset when lane tab changes
  }, [activeRuneLaneTab]);

  if (loading) {
    return <div className="my-8"><LoadingSpinner message="Processando guia de runas do Teemo..." /></div>;
  }
  if (error || !guideData) {
    return <div className="my-8"><ErrorMessage message={`Falha ao processar guia de runas do Teemo: ${error || 'Dados não disponíveis.'}`} onRetry={onRetry} /></div>;
  }

  const { autor, descricaoGeral, rotas } = guideData.guiaDeRunasTeemo;
  const currentLanePages = rotas.find(rota => rota.nomeRota === activeRuneLaneTab)?.paginasDeRunas || [];

  const renderRuneIconFromName = (runeName: string, size: 'small' | 'medium' | 'large' = 'medium') => {
    if (typeof runeName !== 'string' || !runeName.trim()) {
        const sizeClass = size === 'large' ? 'w-10 h-10' : size === 'medium' ? 'w-6 h-6' : 'w-5 h-5';
        return <div className={`${sizeClass} mr-1 rounded-sm bg-stone-300 border border-stone-400 flex-shrink-0`} title="Nome da runa inválido"></div>;
    }
    const originalTrimmedRuneName = runeName.trim();
    let actualIconPath: string | undefined = undefined;

    actualIconPath = runeIconMap[originalTrimmedRuneName];
    if (!actualIconPath) actualIconPath = runeIconMap[originalTrimmedRuneName.toLowerCase()];
    if (!actualIconPath) {
        const baseName = extractBaseRuneName(originalTrimmedRuneName); 
        actualIconPath = runeIconMap[baseName];
        if (!actualIconPath) actualIconPath = runeIconMap[baseName.toLowerCase()];
    }
    if (!actualIconPath) {
        const searchNameLower = originalTrimmedRuneName.toLowerCase();
        const baseSearchNameLower = extractBaseRuneName(originalTrimmedRuneName).toLowerCase();
        const foundKey = Object.keys(runeIconMap).find(keyInMap => {
            const keyInMapLower = keyInMap.toLowerCase();
            const baseKeyInMapLower = extractBaseRuneName(keyInMap).toLowerCase();
            return keyInMapLower === searchNameLower || baseKeyInMapLower === baseSearchNameLower;
        });
        if (foundKey) actualIconPath = runeIconMap[foundKey];
    }

    const imageUrl = actualIconPath ? getRuneIconCdnUrl(actualIconPath) : null;
    const sizeClasses = size === 'large' ? 'w-10 h-10' : size === 'medium' ? 'w-6 h-6' : 'w-5 h-5';
    
    return imageUrl 
      ? <img src={imageUrl} alt={originalTrimmedRuneName} className={`${sizeClasses} mr-1 rounded-sm shadow-sm flex-shrink-0`} loading="lazy"/>
      : <div className={`${sizeClasses} mr-1 rounded-sm bg-stone-300 border border-stone-400 flex-shrink-0`} title={`Ícone para ${originalTrimmedRuneName} não encontrado`}></div>;
  };

  const handleToggleRunePageCard = (pageName: string) => {
    setExpandedRunePageName(prev => prev === pageName ? null : pageName);
  };

  const renderTeemoRunePageDetail = (page: TeemoRunePage) => {
    return (
      <div className="p-4 bg-lime-50 rounded-lg">
        <p className="text-xs italic text-stone-600 mb-3 bg-amber-100 p-3 rounded-md border border-amber-300 shadow-sm">{page.dicaDoAutor}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-sm">
          <div>
            <h4 className="text-md font-semibold text-lime-700 mb-1 pb-1 border-b border-lime-200">{page.caminhoPrimario.nome} (Primária)</h4>
            {page.caminhoPrimario.runaPrincipal && (
              <div className="flex items-center mb-2 pl-2 py-1 bg-white rounded border border-amber-200 shadow-xs">
                {renderRuneIconFromName(page.caminhoPrimario.runaPrincipal.nome, 'medium')}
                <span className="font-medium text-lime-700">{page.caminhoPrimario.runaPrincipal.nome} <span className="text-stone-500 font-normal text-xs">(Principal)</span></span>
              </div>
            )}
            <ul className="space-y-1.5 pl-4">
              {page.caminhoPrimario.runas.map(rune => (
                <li key={rune.nome} className="flex items-center text-stone-700">
                  {renderRuneIconFromName(rune.nome, 'small')}
                  <span>{rune.nome}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-md font-semibold text-lime-700 mb-1 pb-1 border-b border-lime-200">{page.caminhoSecundario.nome} (Secundária)</h4>
            <ul className="space-y-1.5 pl-4">
              {page.caminhoSecundario.runas.map(rune => (
                <li key={rune.nome} className="flex items-center text-stone-700">
                  {renderRuneIconFromName(rune.nome, 'small')}
                  <span>{rune.nome}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-4 pt-2 border-t border-lime-200">
          <h4 className="text-md font-semibold text-lime-700 mb-1">Fragmentos:</h4>
          <ul className="list-disc list-inside space-y-0.5 pl-6 text-xs text-stone-700">
            {page.fragmentos.map((shard, idx) => <li key={`shard-${page.nomePagina}-${idx}`}>{shard}</li>)}
          </ul>
        </div>
      </div>
    );
  };

  const renderRunePageSummaryCard = (page: TeemoRunePage) => {
    const isExpanded = expandedRunePageName === page.nomePagina;
    const keystoneRune = page.caminhoPrimario.runaPrincipal;
    const primaryRunesPreview = page.caminhoPrimario.runas.slice(0, 2); // Show first 2 primary
    const secondaryRunesPreview = page.caminhoSecundario.runas.slice(0, 1); // Show first secondary

    return (
        <div key={page.nomePagina} className="bg-amber-100 border-2 border-amber-600 rounded-lg shadow-lg flex flex-col overflow-hidden transition-all duration-300 ease-in-out">
            <button
                onClick={() => handleToggleRunePageCard(page.nomePagina)}
                className="w-full p-3 text-left focus:outline-none hover:bg-amber-200 transition-colors duration-150 flex flex-col items-center"
                aria-expanded={isExpanded}
                aria-controls={`rune-details-${page.nomePagina.replace(/\s+/g, '-')}`}
            >
                <div className="flex justify-center mb-2">
                    {keystoneRune && renderRuneIconFromName(keystoneRune.nome, 'large')}
                </div>
                <h3 className="font-semibold text-lime-800 text-base text-center mb-2 truncate w-full px-1" title={page.nomePagina}>{page.nomePagina}</h3>
                <div className="flex justify-center items-center space-x-1 mb-2 opacity-80">
                    {primaryRunesPreview.map((r, idx) => <div key={`prim-prev-${page.nomePagina}-${idx}`} title={r.nome}>{renderRuneIconFromName(r.nome, 'small')}</div>)}
                    <span className="text-xs text-stone-400 mx-0.5">|</span>
                    {secondaryRunesPreview.map((r, idx) => <div key={`sec-prev-${page.nomePagina}-${idx}`} title={r.nome}>{renderRuneIconFromName(r.nome, 'small')}</div>)}
                </div>
                <span className={`text-lime-700 text-xl transform transition-transform duration-200 ${isExpanded ? 'rotate-90' : 'rotate-0'}`}>
                    ▶
                </span>
            </button>

            {isExpanded && (
                <div id={`rune-details-${page.nomePagina.replace(/\s+/g, '-')}`} className="bg-lime-50 border-t border-amber-400">
                    {renderTeemoRunePageDetail(page)}
                </div>
            )}
        </div>
    );
  };


  return (
    <section className="my-10 p-4 sm:p-6 bg-amber-100 rounded-xl shadow-xl border-2 border-amber-600">
      <div className="flex flex-col sm:flex-row items-center text-center sm:text-left mb-4 pb-3 border-b-2 border-amber-400">
        <TeemoHatIcon className="w-16 h-16 text-red-500 mb-3 sm:mb-0 sm:mr-4 flex-shrink-0" />
        <div>
          <h2 className="text-3xl font-bold text-lime-800" style={{ fontFamily: "'Comic Sans MS', 'Chalkboard SE', fantasy" }}>
            Guia de Runas do Teemo (Páginas Específicas)
          </h2>
          <p className="text-sm text-stone-600">Por: {autor}</p>
        </div>
      </div>
      <p className="text-sm italic text-stone-700 mb-6 bg-amber-50 p-3 rounded-md border border-amber-300 shadow-sm">{descricaoGeral}</p>
      
      <div className="sticky top-0 bg-amber-100 py-3 px-2 z-20 mb-6 border-y border-amber-300 rounded-md shadow-sm">
           <div className="flex space-x-1 sm:space-x-2 justify-center flex-wrap" role="tablist" aria-label="Seleção de Rota para Runas do Teemo">
              {(['TOP', 'JUNGLE', 'MID', 'SUPPORT'] as RuneLaneTab[]).map(lane => (
                  <button
                      key={lane}
                      onClick={() => setActiveRuneLaneTab(lane)}
                      className={`py-2 px-4 mb-1 rounded-md font-semibold text-xs sm:text-sm transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-lime-600 focus:ring-opacity-70 transform hover:scale-105
                          ${activeRuneLaneTab === lane 
                              ? 'bg-lime-700 text-white shadow-lg ring-2 ring-lime-500' 
                              : 'bg-amber-300 text-lime-900 hover:bg-amber-400 shadow-md'
                          }`}
                      aria-selected={activeRuneLaneTab === lane}
                      role="tab"
                  >
                      {lane}
                  </button>
              ))}
          </div>
      </div>
      
      <div role="tabpanel" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {currentLanePages.length > 0 ? (
            currentLanePages.map(page => renderRunePageSummaryCard(page))
        ) : (
            <p className="text-stone-500 text-center py-6 text-lg col-span-full">Nenhuma página de runa encontrada para a rota {activeRuneLaneTab}.</p>
        )}
      </div>
    </section>
  );
};

export default TeemoRuneGuideSection;
