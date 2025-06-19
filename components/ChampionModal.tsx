
import React, { useState, useEffect, useCallback } from 'react';
import { 
  ChampionFullData, 
  ChampionSpell, 
  ChampionPassive, 
  ChampionMatchupJSONData, 
  DicaGeral, 
  HabilidadeChave, 
  OpcaoRuna,
  AlternativeMatchupData,
  AlternativeRuneSet,
  TeemoRuneGuideData, 
  RunePage as TeemoRunePage 
} from '../types';
import { fetchChampionFullData } from '../services/lolService';
import { 
  getSpellImageUrl as getAbilitySpellImageUrl,
  getPassiveImageUrl,
  getChampionLoadingImageUrl,
  runeIconMap, 
  getRuneIconCdnUrl,
  getItemImageUrl,
  itemNameOrAbbreviationToIdMap,
  summonerSpellToIconFileMap,
  getSummonerSpellImageUrl
} from '../constants';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';
import { MushroomIcon } from './icons/MushroomIcon';
import { ScrollIcon, MagicSparkleIcon, LightbulbIcon } from './icons/SectionIcons';
import { 
  InfoIcon, 
  KeyIcon, 
  RuneIcon as SectionRuneIcon, 
  ArrowSequenceIcon, 
  ItemBagIcon,
  NotesIcon, 
  DifficultyIcon 
} from './icons/TeemoGuideIcons';
import { ShieldIcon, SwordIcon } from './icons/StatIcons';


interface ChampionModalProps {
  isOpen: boolean;
  onClose: () => void;
  championId: string;
  championName: string;
  championTitle: string;
  version: string;
  matchupData: ChampionMatchupJSONData | null;
  alternativeMatchupData: AlternativeMatchupData | null;
  teemoGuideData: TeemoRuneGuideData | null; 
  loadingTeemoGuide: boolean; // True if teemoGuideData is null and no errorTeemoGuide
  errorTeemoGuide: string | null; 
}

type ModalTab = 'details' | 'teemoGuideRunes' | 'advancedGuide';

interface EnhancedStrategyRenderOutput {
  content: React.ReactNode;
  skillOrderKeys: string[];
}

const extractBaseRuneName = (fullName: string): string => { // Renamed from extractBaseRuneNameLocal
  if (typeof fullName !== 'string') return '';
  let name = fullName.trim();
  const parenthesisIndex = name.indexOf(' ('); // Handles names like "Pressione o Ataque (Press The Attack)"
  if (parenthesisIndex !== -1) {
    name = name.substring(0, parenthesisIndex).trim();
  }
  // Do not remove colons or handle ' / ' here, as map keys like "Lenda: Espontaneidade" are used directly.
  return name;
};

const ChampionModal: React.FC<ChampionModalProps> = ({ 
  isOpen, 
  onClose, 
  championId, 
  championName,
  championTitle,
  version,
  matchupData,
  alternativeMatchupData,
  teemoGuideData, 
  loadingTeemoGuide, 
  errorTeemoGuide 
}) => {
  const [championFullDetails, setChampionFullDetails] = useState<ChampionFullData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [teemoChampionDetails, setTeemoChampionDetails] = useState<ChampionFullData | null>(null);
  const [teemoLoading, setTeemoLoading] = useState<boolean>(false);
  const [teemoError, setTeemoError] = useState<string | null>(null);
  
  const [activeModalTab, setActiveModalTab] = useState<ModalTab>('details');
  const [expandedSuggestedPage, setExpandedSuggestedPage] = useState<string | null>(null);


  const loadOpponentDetails = useCallback(async () => {
    if (!championId || !version) return;
    setLoading(true);
    setError(null);
    try {
      const details = await fetchChampionFullData(version, 'pt_BR', championId);
      setChampionFullDetails(details);
    } catch (err) {
      if (err instanceof Error) {
        setError(`Falha ao carregar detalhes do campeão: ${err.message}`);
      } else {
        setError('Erro desconhecido ao carregar detalhes do campeão.');
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [championId, version]);

  const loadTeemoData = useCallback(async () => {
    if (!version) return;
    setTeemoLoading(true);
    setTeemoError(null);
    try {
      const details = await fetchChampionFullData(version, 'pt_BR', 'Teemo');
      setTeemoChampionDetails(details);
    } catch (err) {
      if (err instanceof Error) {
        setTeemoError(`Falha ao carregar dados do Teemo: ${err.message}`);
      } else {
        setTeemoError('Erro desconhecido ao carregar dados do Teemo.');
      }
      console.error("Teemo data fetch error:", err);
    } finally {
      setTeemoLoading(false);
    }
  }, [version]);


  useEffect(() => {
    if (isOpen) {
      setActiveModalTab('details'); 
      setExpandedSuggestedPage(null); // Reset expanded suggested page when modal opens/champion changes
      if (championId && version && championId !== 'Teemo') {
        loadOpponentDetails();
      }
      if (version) {
          loadTeemoData();
      }
      document.body.style.overflow = 'hidden'; 
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto'; 
    };
  }, [isOpen, championId, version, loadOpponentDetails, loadTeemoData]); 

  useEffect(() => {
    if (!isOpen) {
        setChampionFullDetails(null);
        setError(null);
        setLoading(false);
        setTeemoChampionDetails(null);
        setTeemoError(null);
        setTeemoLoading(false);
        setExpandedSuggestedPage(null);
    }
  }, [isOpen]);


  if (!isOpen) return null;

  const renderSectionTitle = (title: string, subTitle?: string, Icon?: React.FC<{className?: string}>) => (
    <div className="mb-3 mt-5 border-b-2 border-lime-300 pb-2 flex items-center space-x-3">
      {Icon && <Icon className="w-7 h-7 text-lime-600" />}
      <div>
        <h4 className="text-xl font-semibold text-lime-700">{title}</h4>
        {subTitle && <p className="text-sm text-stone-600 italic">{subTitle}</p>}
      </div>
    </div>
  );
  
  const renderSubSectionTitle = (title: string, Icon?: React.FC<{className?: string}>) => (
    <div className="flex items-center space-x-2 my-3">
      {Icon && <Icon className="w-5 h-5 text-lime-700" />}
      <h5 className="text-md font-semibold text-lime-800">{title}</h5>
    </div>
  );

  const renderLore = (lore: string | undefined | null) => {
    if (!lore) return null;
    const sanitizedLore = lore.replace(/<br\s*\/?>/gi, '</p><p class="mb-2 text-sm text-stone-700 leading-relaxed">');
    return (
      <div className="mb-4 p-3 bg-amber-50 rounded-md border border-amber-300 shadow-sm">
        {renderSectionTitle("Lore do Campeão", undefined, ScrollIcon)}
        <div className="text-sm text-stone-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: `<p class="mb-2 text-sm text-stone-700 leading-relaxed">${sanitizedLore}</p>` }} />
      </div>
    );
  };
  
  const getAbilityKey = (spell: ChampionSpell, index: number): string => {
    const keys = ['Q', 'W', 'E', 'R'];
    return keys[index] || spell.id.slice(-1).toUpperCase() ; 
  }

  const renderAbility = (ability: ChampionPassive | ChampionSpell, type: 'passive' | 'spell', spellKey?: string) => {
    const imageUrl = type === 'passive' 
      ? getPassiveImageUrl(version, (ability as ChampionPassive).image.full)
      : getAbilitySpellImageUrl(version, (ability as ChampionSpell).image.full);

    return (
      <div key={ability.name} className="flex items-start space-x-3 mb-3 p-2 bg-amber-50 rounded border border-amber-200">
        <img src={imageUrl} alt={ability.name} className="w-12 h-12 rounded border border-amber-600 shadow-sm flex-shrink-0" loading="lazy" />
        <div>
          <h5 className="font-semibold text-lime-800">
            {spellKey && <span className="text-xs bg-lime-600 text-white px-1.5 py-0.5 rounded-sm mr-2">{spellKey}</span>}
            {ability.name}
            {type === 'passive' && <span className="text-xs text-stone-500 ml-2">(Passiva)</span>}
          </h5>
          <div 
            className="text-xs text-stone-600 leading-snug" 
            dangerouslySetInnerHTML={{ __html: ability.description.replace(/<br\s*\/?>/gi, ' ') }}
          />
        </div>
      </div>
    );
  }

  const renderTips = (tips: string[] | undefined | null, title: string) => {
    if (!tips || tips.length === 0) return null;
    return (
      <div className="mb-4 p-3 bg-amber-50 rounded-md border border-amber-300 shadow-sm">
        {renderSectionTitle(title, undefined, LightbulbIcon)}
        <ul className="list-disc list-inside text-sm text-stone-700 space-y-1 pl-2">
          {tips.map((tip, index) => (
            <li key={index} dangerouslySetInnerHTML={{ __html: tip }} />
          ))}
        </ul>
      </div>
    );
  }

  const renderTeemoMatchupTipSection = (title: string, Icon: React.FC<{className?: string}>, content: React.ReactNode, subTitle?: string) => (
    <div className="mb-3 p-2.5 bg-lime-50 rounded-md border border-lime-200 shadow-sm">
      <div className="flex items-center space-x-2 mb-1.5">
        <Icon className="w-5 h-5 text-lime-700 flex-shrink-0" />
        <div>
          <h5 className="text-md font-semibold text-lime-700">{title}</h5>
          {subTitle && <p className="text-xs text-stone-500 italic">{subTitle}</p>}
        </div>
      </div>
      {content}
    </div>
  );
  
  const getThreatLevelColor = (level: string | null | undefined) => {
    switch (level?.toLowerCase()) {
      case 'extreme': return 'text-red-700';
      case 'major': return 'text-red-500';
      case 'even': return 'text-yellow-600';
      case 'minor': return 'text-green-600';
      default: return 'text-stone-700';
    }
  };

  const renderEnhancedAbilityOrderStrategy = useCallback((
    strategyText: string,
    currentVersion: string,
    currentTeemoChampionDetails: ChampionFullData | null,
    currentOpponentChampionDetails: ChampionFullData | null
  ): EnhancedStrategyRenderOutput => {
    if (typeof strategyText !== 'string' || !strategyText) {
      return { content: strategyText || '', skillOrderKeys: [] };
    }
    if (teemoLoading && !currentTeemoChampionDetails) { 
      return { content: <p className="text-xs text-stone-500">Carregando ícones de habilidade do Teemo...</p>, skillOrderKeys: [] };
    }
    if (!currentTeemoChampionDetails || !currentTeemoChampionDetails.spells) {
       if(teemoError) console.warn("Teemo details error for ability icon rendering.");
       else if(!teemoLoading) console.warn("Teemo details not available post-load for ability icon rendering.");
    }

    const teemoSpells = currentTeemoChampionDetails?.spells;
    const opponentSpells = currentOpponentChampionDetails?.spells;

    const renderedElements: React.ReactNode[] = [];
    const skillMentionRegex = /\(([QWER])\)(?:\s*'([^']*)')?/g;
    let lastIndex = 0;
    let match;
    let keyCounter = 0; 

    while ((match = skillMentionRegex.exec(strategyText)) !== null) {
      if (match.index > lastIndex) {
        renderedElements.push(
          <React.Fragment key={`text-${keyCounter++}`}>
            {strategyText.substring(lastIndex, match.index)}
          </React.Fragment>
        );
      }

      const key = match[1] as 'Q' | 'W' | 'E' | 'R';
      const potentialOpponentAbilityName = match[2]; 
      const originalMention = match[0];

      let spellToRender: ChampionSpell | undefined;
      let ownerName = 'Teemo'; 

      if (potentialOpponentAbilityName && opponentSpells && currentOpponentChampionDetails) {
        const matchedOpponentSpell = opponentSpells.find(spell => spell.name === potentialOpponentAbilityName);
        if (matchedOpponentSpell) {
          const opponentSpellIndex = opponentSpells.findIndex(s => s.id === matchedOpponentSpell.id);
          if (opponentSpellIndex !== -1) {
            const opponentKeyForThisSpell = ['Q', 'W', 'E', 'R'][opponentSpellIndex];
            if (opponentKeyForThisSpell === key) {
              spellToRender = matchedOpponentSpell;
              ownerName = currentOpponentChampionDetails.name;
            }
          }
        }
      }
      
      if (!spellToRender && teemoSpells) {
        const teemoSpellKeyIndex = ['Q', 'W', 'E', 'R'].indexOf(key);
        if (teemoSpellKeyIndex !== -1 && teemoSpells.length > teemoSpellKeyIndex && teemoSpells[teemoSpellKeyIndex]) {
          spellToRender = teemoSpells[teemoSpellKeyIndex];
          ownerName = 'Teemo';
        }
      }

      if (spellToRender && spellToRender.image && typeof spellToRender.image.full === 'string' && spellToRender.image.full.trim() !== '') {
        const imageUrl = getAbilitySpellImageUrl(currentVersion, spellToRender.image.full);
        renderedElements.push(
          <img
            key={`skill-icon-${ownerName}-${key}-${keyCounter++}`}
            src={imageUrl}
            alt={`Ícone ${spellToRender.name} (${key} de ${ownerName})`}
            title={`${spellToRender.name} (${key} de ${ownerName})`}
            className="w-5 h-5 inline-block mx-0.5 align-middle rounded-sm border border-amber-500 shadow-sm"
            loading="lazy"
          />
        );
      } else {
        if (spellToRender && !(spellToRender.image && typeof spellToRender.image.full === 'string' && spellToRender.image.full.trim() !== '')) {
            console.warn(`Ícone da habilidade ${spellToRender.name} não pôde ser renderizado devido à ausência de image.full. Retornando ao texto.`);
        }
        renderedElements.push(
          <React.Fragment key={`key-text-${key}-${keyCounter++}`}>
            {originalMention} 
          </React.Fragment>
        );
      }
      lastIndex = skillMentionRegex.lastIndex;
    }

    if (lastIndex < strategyText.length) {
      renderedElements.push(
        <React.Fragment key={`text-final-${keyCounter++}`}>
          {strategyText.substring(lastIndex)}
        </React.Fragment>
      );
    }
    
    const teemoSkillOrderForPriorityDisplay: string[] = [];
    const teemoMaxOrderPattern = /(?:maximizar|priorizar)\s+(?:seu\s+)?\(\s*([QWER])\s*\)(?:\s*(?:e|ou|,|depois(?: de)?|then|and then|em seguida|seguido por)\s*(?:seu\s+)?\(\s*([QWER])\s*\))?(?:\s*(?:e|ou|,|depois(?: de)?|then|and then|em seguida|seguido por)\s*(?:seu\s+)?\(\s*([QWER])\s*\))?/gi;

    let skillOrderMatch;
    while ((skillOrderMatch = teemoMaxOrderPattern.exec(strategyText)) !== null) {
        if (skillOrderMatch[1]) teemoSkillOrderForPriorityDisplay.push(skillOrderMatch[1]);
        if (skillOrderMatch[2]) teemoSkillOrderForPriorityDisplay.push(skillOrderMatch[2]);
        if (skillOrderMatch[3]) teemoSkillOrderForPriorityDisplay.push(skillOrderMatch[3]);
    }

    if (teemoSkillOrderForPriorityDisplay.length === 0) {
        const simplerPattern = /(?:maximizar|priorizar)\s+.*?\(s*([QWER])\s*\)/gi;
        let simpleMatch;
        while((simpleMatch = simplerPattern.exec(strategyText)) !== null) {
            if (simpleMatch[1] && !teemoSkillOrderForPriorityDisplay.includes(simpleMatch[1])) {
              teemoSkillOrderForPriorityDisplay.push(simpleMatch[1]);
            }
        }
    }

    const finalSkillOrder = [...new Set(teemoSkillOrderForPriorityDisplay)].filter(k => ['Q', 'W', 'E'].includes(k));

    return {
        content: <>{renderedElements}</>,
        skillOrderKeys: finalSkillOrder
    };

  }, [version, teemoChampionDetails, teemoLoading, teemoError, championFullDetails, championName]);

  const renderRuneSetDisplay = (runeSet: AlternativeRuneSet | null, buildType: 'AP' | 'On-Hit') => {
    if (!runeSet) return <p className="text-xs text-stone-500 my-3">Runas não especificadas para build {buildType}.</p>;
  
    const getRuneIconPath = (runeName: string): string | undefined => {
      const originalTrimmedRuneName = runeName.trim();
      let path: string | undefined = runeIconMap[originalTrimmedRuneName];
      if (!path) path = runeIconMap[originalTrimmedRuneName.toLowerCase()];
      if (!path) {
        const baseName = extractBaseRuneName(originalTrimmedRuneName);
        path = runeIconMap[baseName];
        if (!path) path = runeIconMap[baseName.toLowerCase()];
      }
      if (!path) {
        const searchNameLower = originalTrimmedRuneName.toLowerCase();
        const baseSearchNameLower = extractBaseRuneName(originalTrimmedRuneName).toLowerCase();
        const foundKey = Object.keys(runeIconMap).find(keyInMap => {
            const keyInMapLower = keyInMap.toLowerCase();
            const baseKeyInMapLower = extractBaseRuneName(keyInMap).toLowerCase();
            return keyInMapLower === searchNameLower || baseKeyInMapLower === baseSearchNameLower;
        });
        if (foundKey) path = runeIconMap[foundKey];
      }
      return path;
    };
    
    const keystoneIconActualPath = getRuneIconPath(runeSet.keystone);
    
    const renderRuneList = (runes: string[], type: 'Primária' | 'Secundária') => {
        const elements: React.ReactNode[] = [];
        let currentOptionGroup: React.ReactNode[] = [];
    
        const flushOptionGroup = () => {
            if (currentOptionGroup.length > 0) {
                elements.push(
                    <div key={`option-group-${elements.length}-${Math.random()}`} className="flex flex-col space-y-0.5">
                        {currentOptionGroup}
                    </div>
                );
            }
            currentOptionGroup = [];
        };
    
        runes.forEach((runeText, index) => {
            if (runeText.toLowerCase() === "ou" || runeText.toLowerCase() === "or") {
                flushOptionGroup();
                elements.push(
                    <div key={`separator-${index}-${Math.random()}`} className="text-center font-semibold text-xs my-1 text-stone-500">
                        ou
                    </div>
                );
            } else {
                const trimmedRuneText = runeText.trim();
                const iconActualPath = getRuneIconPath(trimmedRuneText);
                const imageUrl = iconActualPath ? getRuneIconCdnUrl(iconActualPath) : null;
                currentOptionGroup.push(
                    <div key={`${type}-${trimmedRuneText}-${index}-${Math.random()}`} className="flex items-center">
                        {imageUrl ? (
                            <img src={imageUrl} alt={trimmedRuneText} className="w-4 h-4 mr-2 rounded-sm flex-shrink-0" loading="lazy"/>
                        ) : (
                             <div className="w-4 h-4 mr-2 rounded-sm bg-stone-200 flex-shrink-0" title={`Ícone não encontrado para ${trimmedRuneText}`}></div>
                        )}
                        <span>{trimmedRuneText}</span>
                    </div>
                );
            }
        });
        flushOptionGroup(); 
        return elements;
    };

    return (
      <div className="space-y-2 text-xs text-stone-700 mt-2">
        <div>
          <p className="font-medium text-lime-700 text-sm">Árvore Primária: <span className="font-normal text-stone-700">{runeSet.primary_tree}</span></p>
          <div className="ml-4 mt-1 space-y-1">
            <div className="flex items-center font-semibold">
              {keystoneIconActualPath && (
                <img src={getRuneIconCdnUrl(keystoneIconActualPath)} alt={runeSet.keystone} className="w-5 h-5 mr-2 rounded-sm" loading="lazy"/>
              )}
              {runeSet.keystone} <span className="ml-1 text-stone-500 font-normal text-xs">(Principal)</span>
            </div>
            {renderRuneList(runeSet.primary_runes, 'Primária')}
          </div>
        </div>
  
        <div>
          <p className="font-medium text-lime-700 text-sm mt-2">Árvore Secundária: <span className="font-normal text-stone-700">{runeSet.secondary_tree}</span></p>
          <div className="ml-4 mt-1 space-y-1">
            {renderRuneList(runeSet.secondary_runes, 'Secundária')}
          </div>
        </div>
  
        {runeSet.shards && runeSet.shards.length > 0 && (
          <div className="mt-2">
            <p className="font-medium text-lime-700 text-sm">Fragmentos:</p>
            <ul className="list-disc list-inside ml-8 space-y-0.5">
              {runeSet.shards.map((s, i) => <li key={`shard-${buildType}-${i}`}>{s}</li>)}
            </ul>
          </div>
        )}
      </div>
    );
  };
  
  const renderSummonerSpellsDisplay = (spells: string[] | null) => {
    if (!spells || spells.length === 0) return <p className="text-xs text-stone-500 my-2">Feitiços não especificados.</p>;
    
    return (
      <div className="my-2">
        {renderSubSectionTitle("Feitiços de Invocador")}
        <div className="flex flex-wrap gap-3 items-center mt-1">
          {spells.map((spellName, index) => {
            const iconFile = summonerSpellToIconFileMap[spellName];
            const iconUrl = iconFile ? getSummonerSpellImageUrl(version, iconFile) : null;
            return (
              <div key={`spell-${index}`} className="flex items-center space-x-2 bg-white p-1.5 rounded border border-amber-300 shadow-sm">
                {iconUrl ? (
                  <img src={iconUrl} alt={spellName} className="w-6 h-6 rounded" loading="lazy"/>
                ) : (
                  <div className="w-6 h-6 bg-stone-200 rounded flex items-center justify-center text-stone-400 text-sm">?</div>
                )}
                <span className="text-xs text-stone-700">{spellName}</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderItemsWithIconsFromArray = (items: string[] | null) => {
    if (!items || items.length === 0) {
      return <p className="text-xs text-stone-500 my-2">Itens não especificados.</p>;
    }
  
    const itemElements: JSX.Element[] = [];
  
    items.forEach((fullItemString, index) => {
      const options = fullItemString.split(/\s+ou\s+|\s+or\s+/i);
  
      options.forEach((itemNameOption, optionIndex) => {
        let normalizedItemName = itemNameOption.replace(/\s*\+\s*\d+\s*Poções?/i, '').trim();
        normalizedItemName = normalizedItemName.replace(/\s*\(componente\)/i, '').trim();
        
        const itemId = itemNameOrAbbreviationToIdMap[normalizedItemName] || 
                       itemNameOrAbbreviationToIdMap[normalizedItemName.toLowerCase()] ||
                       itemNameOrAbbreviationToIdMap[itemNameOption.trim()]; 
  
        const iconUrl = itemId ? getItemImageUrl(version, itemId) : null;
        
        itemElements.push(
          <div key={`${fullItemString}-${index}-${optionIndex}`} className="flex items-center bg-white p-1.5 rounded border border-amber-300 shadow-sm text-xs text-stone-600 min-w-[130px] max-w-[180px]">
            {iconUrl ? (
              <img src={iconUrl} alt={itemNameOption.trim()} className="w-7 h-7 mr-2 rounded" loading="lazy" />
            ) : (
              <div className="w-7 h-7 mr-2 bg-stone-200 rounded flex items-center justify-center text-stone-400 text-sm flex-shrink-0">?</div>
            )}
            <span className="truncate" title={itemNameOption.trim()}>{itemNameOption.trim()}</span>
          </div>
        );
  
        if (optionIndex < options.length - 1) {
          itemElements.push(
            <span key={`or-${fullItemString}-${index}-${optionIndex}`} className="text-xs text-stone-600 font-semibold self-center mx-1.5">ou</span>
          );
        }
      });
    });
  
    return (
      <div className="my-2">
        {renderSubSectionTitle("Itens Recomendados")}
        <div className="flex flex-wrap gap-2 items-center mt-1">
          {itemElements}
        </div>
      </div>
    );
  };

  const renderRuneIconFromName = (runeName: string, size: 'small' | 'medium' | 'large' = 'medium') => {
    if (typeof runeName !== 'string' || !runeName.trim()) {
        const sizeClass = size === 'large' ? 'w-8 h-8' : size === 'medium' ? 'w-5 h-5' : 'w-4 h-4';
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
    const sizeClasses = size === 'large' ? 'w-8 h-8' : size === 'medium' ? 'w-5 h-5' : 'w-4 h-4';
    
    return imageUrl 
      ? <img src={imageUrl} alt={originalTrimmedRuneName} className={`${sizeClasses} mr-1 rounded-sm shadow-sm flex-shrink-0`} loading="lazy"/>
      : <div className={`${sizeClasses} mr-1 rounded-sm bg-stone-300 border border-stone-400 flex-shrink-0`} title={`Ícone para ${originalTrimmedRuneName} não encontrado`}></div>;
  };

  const renderFullRunePageDisplay = (page: TeemoRunePage, currentVersion: string) => {
    return (
      <div className="p-3 bg-lime-50"> {/* Removed rounded-lg to fit within parent */}
        <p className="text-xs italic text-stone-600 mb-3 bg-amber-100 p-2.5 rounded-md border border-amber-300 shadow-sm">{page.dicaDoAutor}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-3 text-sm">
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

        <div className="mt-3 pt-2 border-t border-lime-200">
          <h4 className="text-md font-semibold text-lime-700 mb-1">Fragmentos:</h4>
          <ul className="list-disc list-inside space-y-0.5 pl-5 text-xs text-stone-700">
            {page.fragmentos.map((shard, idx) => <li key={`shard-${page.nomePagina}-${idx}`}>{shard}</li>)}
          </ul>
        </div>
      </div>
    );
  };
  
  const handleToggleSuggestedPage = (pageName: string) => {
    setExpandedSuggestedPage(prev => prev === pageName ? null : pageName);
  };

  const renderSuggestedRunePageSummaryCard = (page: TeemoRunePage, suggestedName: string) => {
    const isExpanded = expandedSuggestedPage === page.nomePagina;
    const keystoneRune = page.caminhoPrimario.runaPrincipal;
    const primaryRunesPreview = page.caminhoPrimario.runas.slice(0, 2);
    const secondaryRunesPreview = page.caminhoSecundario.runas.slice(0, 1);

    return (
        <div className="bg-amber-100 border border-amber-400 rounded-lg shadow-md flex flex-col overflow-hidden transition-all duration-300 ease-in-out my-2">
            <button
                onClick={() => handleToggleSuggestedPage(page.nomePagina)}
                className="w-full p-3 text-left focus:outline-none hover:bg-amber-200 transition-colors duration-150 flex items-center"
                aria-expanded={isExpanded}
                aria-controls={`suggested-rune-details-${page.nomePagina.replace(/\s+/g, '-')}`}
            >
                <div className="mr-3 flex-shrink-0">
                    {keystoneRune && renderRuneIconFromName(keystoneRune.nome, 'large')}
                </div>
                <div className="flex-grow">
                    <h5 className="font-semibold text-lime-800 text-md truncate" title={page.nomePagina}>
                        {page.nomePagina}
                        <span className="text-xs text-stone-500 font-normal ml-1">(Sugerida como: {suggestedName})</span>
                    </h5>
                    <div className="flex items-center space-x-1 mt-1 opacity-80">
                        {primaryRunesPreview.map((r, idx) => <div key={`sugg-prim-prev-${page.nomePagina}-${idx}`} title={r.nome}>{renderRuneIconFromName(r.nome, 'small')}</div>)}
                        <span className="text-xs text-stone-400 mx-0.5">|</span>
                        {secondaryRunesPreview.map((r, idx) => <div key={`sugg-sec-prev-${page.nomePagina}-${idx}`} title={r.nome}>{renderRuneIconFromName(r.nome, 'small')}</div>)}
                    </div>
                </div>
                <span className={`text-lime-700 text-xl ml-auto transform transition-transform duration-200 ${isExpanded ? 'rotate-90' : 'rotate-0'}`}>
                    ▶
                </span>
            </button>
        </div>
    );
};


  const renderTeemoGuideRunesContent = () => {
    if (!matchupData) return <p className="text-stone-500 text-center py-8">Nenhuma informação de confronto do Teemo disponível para este campeão.</p>;

    return (
      <div className="my-2 p-1"> 
        {renderSectionTitle("Guia do Teemo vs " + matchupData.campeao, "Estratégias do Escoteiro!", MushroomIcon)}
        <p className="text-xs text-stone-600 italic mb-3 px-2">{matchupData.observacao}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 mb-3 px-2">
          <p className="text-sm text-stone-700 mb-1 flex items-center">
            <ShieldIcon className={`w-4 h-4 mr-1.5 ${getThreatLevelColor(matchupData.nivel_de_ameaca)}`} />
            <strong className="text-lime-800 mr-1">Nível de Ameaça:</strong> 
            <span className={`font-semibold ${getThreatLevelColor(matchupData.nivel_de_ameaca)}`}>
              {matchupData.nivel_de_ameaca}
            </span>
          </p>
          <p className="text-sm text-stone-700 mb-1 flex items-center">
            {matchupData.tipo_de_dano.toLowerCase().includes("físico") && <SwordIcon className="w-4 h-4 mr-1.5 text-orange-600" />}
            {matchupData.tipo_de_dano.toLowerCase().includes("mágico") && <MagicSparkleIcon className="w-4 h-4 mr-1.5 text-blue-600" />}
            <strong className="text-lime-800 mr-1">Tipo de Dano:</strong> {matchupData.tipo_de_dano}
          </p>
        </div>

        {matchupData.dicas_gerais && matchupData.dicas_gerais.length > 0 && (
          renderTeemoMatchupTipSection("Dicas Gerais", InfoIcon,
            <ul className="space-y-2">
              {matchupData.dicas_gerais.map((dica: DicaGeral, index: number) => (
                <li key={index} className="text-xs text-stone-600 bg-white p-2 rounded border border-lime-200">
                  <strong className="text-lime-700 block text-sm">{dica.titulo}</strong>
                  {dica.descricao}
                </li>
              ))}
            </ul>
          )
        )}

        {matchupData.habilidades_chave && matchupData.habilidades_chave.length > 0 && (
          renderTeemoMatchupTipSection("Habilidades Chave do Oponente", KeyIcon, 
            <ul className="space-y-2">
              {matchupData.habilidades_chave.map((hab: HabilidadeChave, index: number) => (
                 <li key={index} className="text-xs text-stone-600 bg-white p-2 rounded border border-lime-200">
                  <strong className="text-lime-700 block text-sm">{hab.nome}</strong>
                  {hab.descricao}
                </li>
              ))}
            </ul>
          )
        )}
        
        {matchupData.ordem_de_habilidades_para_enfrenta_lo && (() => {
          let mainStrategyContent: React.ReactNode;
          let skillPriorityDisplay: React.ReactNode = null;
          let orderedSkillKeys: string[] = [];

          if (loading || teemoLoading) {
             mainStrategyContent = <p className="text-xs text-stone-500">Carregando dados das habilidades...</p>;
          } else if (error && championId !== 'Teemo') { 
             mainStrategyContent = matchupData.ordem_de_habilidades_para_enfrenta_lo.estrategia;
             console.warn("Erro ao carregar dados do oponente para estratégia de habilidades.");
          } else if (teemoError && !teemoChampionDetails) {
             mainStrategyContent = matchupData.ordem_de_habilidades_para_enfrenta_lo.estrategia;
             console.warn("Erro ao carregar dados do Teemo para estratégia de habilidades.");
          }
          else {
            const strategyRenderResult = renderEnhancedAbilityOrderStrategy(
              matchupData.ordem_de_habilidades_para_enfrenta_lo.estrategia,
              version,
              teemoChampionDetails,
              championFullDetails 
            );
            mainStrategyContent = strategyRenderResult.content;
            orderedSkillKeys = strategyRenderResult.skillOrderKeys;
          }
            
          if (orderedSkillKeys.length > 0 && teemoChampionDetails && teemoChampionDetails.spells.length >= 3) { 
            const teemoSpellsForPriority = teemoChampionDetails.spells;
            const abilityKeyMapForPriority: Record<string, ChampionSpell | undefined> = {
                'Q': teemoSpellsForPriority[0], 'W': teemoSpellsForPriority[1], 'E': teemoSpellsForPriority[2],
            };

            skillPriorityDisplay = (
              <div className="mt-3 flex items-center justify-center space-x-1 p-2 bg-amber-50 rounded-md border border-amber-300 shadow-inner">
                <span className="text-sm font-semibold text-lime-700 mr-2">Foco de Habilidade (Teemo):</span>
                {orderedSkillKeys.map((key, index) => {
                  const teemoSpellData = abilityKeyMapForPriority[key];
                  if (teemoSpellData && teemoSpellData.image && teemoSpellData.image.full) {
                    const imageUrl = getAbilitySpellImageUrl(version, teemoSpellData.image.full);
                    return (
                      <React.Fragment key={`priority-skill-${key}-${index}`}>
                        <div className="relative inline-flex items-center justify-center w-10 h-10">
                          <img
                            src={imageUrl}
                            alt={`Ícone ${teemoSpellData.name} (${key} de Teemo)`}
                            title={`${teemoSpellData.name} (${key} de Teemo)`}
                            className="w-full h-full object-cover rounded-md border-2 border-amber-700 shadow-md"
                            loading="lazy"
                          />
                          <span
                            className="absolute text-white font-black text-lg pointer-events-none"
                            style={{ textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000' }}
                          >
                            {key}
                          </span>
                        </div>
                        {index < (orderedSkillKeys.length - 1) && (
                          <span className="text-lime-700 font-bold text-xl mx-1.5">&gt;</span>
                        )}
                      </React.Fragment>
                    );
                  }
                  return null;
                })}
              </div>
            );
          }
          
          return renderTeemoMatchupTipSection("Ordem de Habilidades (Teemo)", ArrowSequenceIcon,
            <>
              <div className="text-xs text-stone-600 bg-white p-2 rounded border border-lime-200 leading-relaxed">
                {mainStrategyContent}
              </div>
              {skillPriorityDisplay}
            </>
          );
        })()}

        {matchupData.runas_sugeridas_contra && (
          renderTeemoMatchupTipSection("Runas Sugeridas Contra", SectionRuneIcon,
            <>
              <ul className="space-y-2">
                {matchupData.runas_sugeridas_contra.opcoes.map((runa: OpcaoRuna, index: number) => {
                  return (
                    <li key={index} className="text-xs text-stone-600 bg-white p-2 rounded border border-lime-200">
                      <div className="flex items-center mb-1">
                        {renderRuneIconFromName(runa.nome, 'small')}
                        <strong className="text-lime-700 text-sm">{runa.nome}</strong>
                      </div>
                      <p className="ml-1">{runa.descricao}</p>
                    </li>
                  );
                })}
              </ul>
            </>,
            matchupData.runas_sugeridas_contra.observacao
          )
        )}
         
         {matchupData.runas_sugeridas_contra && teemoGuideData && !loadingTeemoGuide && (
            <div className="mt-6">
                {renderSectionTitle("Páginas de Runas Completas Sugeridas", "Detalhes do Guia Geral", SectionRuneIcon)}
                {matchupData.runas_sugeridas_contra.opcoes.map((opcaoRuna: OpcaoRuna, index: number) => {
                    const baseSuggestedRuneNamePT = extractBaseRuneName(opcaoRuna.nome); 
                    const searchKeyPT = baseSuggestedRuneNamePT.replace(/\s+/g, '').toLowerCase();
                    
                    let foundPage: TeemoRunePage | null = null;

                    if (searchKeyPT && teemoGuideData?.guiaDeRunasTeemo?.rotas) {
                        for (const lane of teemoGuideData.guiaDeRunasTeemo.rotas) {
                            const page = lane.paginasDeRunas.find(p => 
                                p.nomePagina.replace(/\s+/g, '').toLowerCase() === searchKeyPT
                            );
                            if (page) {
                                foundPage = page;
                                break;
                            }
                        }
                    }

                    if (foundPage) {
                        const isExpanded = expandedSuggestedPage === foundPage.nomePagina;
                        return (
                            <div key={`suggested-full-rune-page-${index}`} className="mt-3">
                                {renderSuggestedRunePageSummaryCard(foundPage, opcaoRuna.nome)}
                                {isExpanded && (
                                     <div className="bg-lime-50 rounded-b-lg border-x border-b border-lime-300 shadow-inner">
                                        {renderFullRunePageDisplay(foundPage, version)}
                                    </div>
                                )}
                            </div>
                        );
                    } else {
                        return (
                            <p key={`full-rune-not-found-${index}`} className="text-xs text-stone-500 mt-3 p-2 bg-amber-50 rounded border border-amber-200">
                                Não foi possível encontrar a página de runa completa para "{opcaoRuna.nome}" no guia geral do Teemo. (Tentativa de busca por: "{baseSuggestedRuneNamePT}" normalizado como "{searchKeyPT}")
                            </p>
                        );
                    }
                })}
            </div>
        )}
        {loadingTeemoGuide && <div className="mt-4"><LoadingSpinner message="Carregando guia de runas do Teemo para detalhes..."/></div>}
        {errorTeemoGuide && <div className="mt-4"><ErrorMessage message={`Erro ao carregar guia de runas do Teemo: ${errorTeemoGuide}`} onRetry={() => { /* No direct retry if parsing fails */}} /></div>}
        
        {matchupData.estrategia_de_itens && (
          renderTeemoMatchupTipSection("Estratégia de Itens (Teemo)", ItemBagIcon,
            <p className="text-xs text-stone-600 bg-white p-2 rounded border border-lime-200">{matchupData.estrategia_de_itens.descricao}</p>
          )
        )}
      </div>
    );
  };
  
  const renderAdvancedStrategiesContent = () => {
    if (!alternativeMatchupData) return <p className="text-stone-500 text-center py-8">Nenhuma estratégia avançada disponível para este campeão.</p>;

    return (
      <div className="my-2 p-1">
        {renderSectionTitle("Estratégias Avançadas (Builds Alternativas) vs " + alternativeMatchupData.champion, "Dicas do Mestre iPAV!", SectionRuneIcon)}

        <div className="mb-6 p-4 bg-amber-50 rounded-lg border border-amber-400 shadow-md">
          {renderSubSectionTitle("Informações da Partida", InfoIcon)}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm">
            <p className="text-stone-700 flex items-center">
              <DifficultyIcon className="w-5 h-5 mr-2 text-lime-700 flex-shrink-0" />
              <strong className="text-lime-800 mr-1">Dificuldade:</strong> {alternativeMatchupData.difficulty || "N/A"}
            </p>
            <p className="text-stone-700 flex items-start">
              <NotesIcon className="w-5 h-5 mr-2 text-lime-700 flex-shrink-0 mt-0.5" />
              <span><strong className="text-lime-800 mr-1">Dicas/Experiências:</strong> {alternativeMatchupData.experiences || "N/A"}</span>
            </p>
          </div>
        </div>
        
        { (alternativeMatchupData.ap_runes || alternativeMatchupData.ap_ss || alternativeMatchupData.ap_items) &&
          <div className="mb-6 p-4 bg-lime-50 rounded-lg border border-lime-300 shadow-md">
            <div className="flex items-center space-x-2 mb-3">
              <MagicSparkleIcon className="w-6 h-6 text-blue-600" />
              <h5 className="text-lg font-bold text-lime-800">Build AP</h5>
            </div>
            {renderRuneSetDisplay(alternativeMatchupData.ap_runes, 'AP')}
            <hr className="my-3 border-lime-200" />
            {renderSummonerSpellsDisplay(alternativeMatchupData.ap_ss)}
            <hr className="my-3 border-lime-200" />
            {renderItemsWithIconsFromArray(alternativeMatchupData.ap_items)}
          </div>
        }

        { (alternativeMatchupData.on_hit_runes || alternativeMatchupData.on_hit_ss || alternativeMatchupData.on_hit_items) &&
           <div className="mb-4 p-4 bg-orange-50 rounded-lg border border-orange-300 shadow-md">
            <div className="flex items-center space-x-2 mb-3">
              <SwordIcon className="w-6 h-6 text-orange-600" />
              <h5 className="text-lg font-bold text-lime-800">Build On-Hit (Dano por Acerto)</h5>
            </div>
            {renderRuneSetDisplay(alternativeMatchupData.on_hit_runes, 'On-Hit')}
            <hr className="my-3 border-orange-200" />
            {renderSummonerSpellsDisplay(alternativeMatchupData.on_hit_ss)}
            <hr className="my-3 border-orange-200" />
            {renderItemsWithIconsFromArray(alternativeMatchupData.on_hit_items)}
          </div>
        }
      </div>
    );
  };

  const renderChampionDetailsContent = () => {
    if (loading && championId !== 'Teemo') return <LoadingSpinner message={`Carregando detalhes de ${championName}...`} />;
    if (error && championId !== 'Teemo') return <ErrorMessage message={error} onRetry={loadOpponentDetails} />;
    if (!championFullDetails && championId !== 'Teemo') return <p className="text-stone-500 text-center py-8">Detalhes do campeão não encontrados.</p>;
    
    const detailsToDisplay = championId === 'Teemo' ? teemoChampionDetails : championFullDetails;

    if (!detailsToDisplay) {
        if (championId === 'Teemo' && teemoLoading) return <LoadingSpinner message="Carregando detalhes do Teemo..." />;
        if (championId === 'Teemo' && teemoError) return <ErrorMessage message={teemoError} />;
        return <p className="text-stone-500 text-center py-8">Detalhes do campeão não disponíveis.</p>;
    }

    return (
      <div className="mt-1"> 
        {renderSectionTitle(`Informações Gerais de ${detailsToDisplay.name}`)}
        {renderLore(detailsToDisplay.lore)}

        <div className="my-4 p-3 bg-amber-50 rounded-md border border-amber-300 shadow-sm">
          {renderSectionTitle("Habilidades Oficiais", undefined, MagicSparkleIcon)}
          {detailsToDisplay.passive && renderAbility(detailsToDisplay.passive, 'passive')}
          {detailsToDisplay.spells.map((spell, index) => renderAbility(spell, 'spell', getAbilityKey(spell, index)))}
        </div>
        
        {renderTips(detailsToDisplay.allytips, "Dicas para Aliados (Oficial)")}
        {renderTips(detailsToDisplay.enemytips, "Dicas para Inimigos (Oficial)")}
      </div>
    );
  };
    
  const renderModalTabButton = (tab: ModalTab, label: string) => (
    <button
      onClick={() => setActiveModalTab(tab)}
      className={`py-2 px-3 rounded-t-md font-medium text-sm transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-opacity-75 shadow-sm
        ${activeModalTab === tab 
          ? 'bg-lime-600 text-white font-semibold border-b-2 border-lime-700' 
          : 'bg-amber-200 text-lime-800 hover:bg-amber-300 border-b-2 border-amber-300'
        }`}
      aria-selected={activeModalTab === tab}
      role="tab"
    >
      {label}
    </button>
  );

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-2 sm:p-4 z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="champion-modal-title"
      onClick={onClose} 
    >
      <div 
        className="bg-amber-100 text-stone-800 rounded-lg shadow-2xl max-w-3xl w-full max-h-[95vh] sm:max-h-[90vh] flex flex-col border-4 border-amber-700"
        onClick={(e) => e.stopPropagation()} 
      >
        <div className="relative">
          <img 
            src={getChampionLoadingImageUrl(championId)} 
            alt={`${championName} splash art`} 
            className="w-full h-36 sm:h-48 object-cover rounded-t-sm opacity-80"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-amber-100 via-amber-100/80 to-transparent p-3 sm:p-4 flex flex-col justify-end">
             <h2 id="champion-modal-title" className="text-2xl sm:text-3xl font-bold text-lime-800 shadow-sm" style={{ fontFamily: "'Comic Sans MS', 'Chalkboard SE', fantasy" }}>
                {championName} <span className="text-lg sm:text-xl text-lime-700 capitalize block sm:inline">- {championTitle}</span>
             </h2>
          </div>
          <button
            onClick={onClose}
            className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-red-600 hover:bg-red-700 text-white font-bold p-1.5 sm:p-2 rounded-full shadow-md transition-colors focus:outline-none focus:ring-2 focus:ring-red-400"
            aria-label="Fechar modal"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>
        
        <div className="px-4 pt-3 border-b-2 border-amber-400 bg-amber-100 sticky top-0 z-10" role="tablist">
          <nav className="flex space-x-1 overflow-x-auto pb-1">
            {renderModalTabButton('details', 'Detalhes Campeão')}
            {matchupData && renderModalTabButton('teemoGuideRunes', 'Teemo vs ' + matchupData.campeao.split(" ")[0])}
            {alternativeMatchupData && renderModalTabButton('advancedGuide', 'Estratégias Avançadas')}
          </nav>
        </div>

        <div className="overflow-y-auto p-4 sm:p-6 scrollbar scrollbar-thumb-amber-800 scrollbar-track-amber-200 flex-grow">
          {activeModalTab === 'details' && renderChampionDetailsContent()}
          {activeModalTab === 'teemoGuideRunes' && matchupData && renderTeemoGuideRunesContent()}
          {activeModalTab === 'advancedGuide' && alternativeMatchupData && renderAdvancedStrategiesContent()}
          
          {activeModalTab !== 'details' && loading && championId !== 'Teemo' && <LoadingSpinner message={'Carregando guia...'} />}
          {activeModalTab !== 'details' && error && championId !== 'Teemo' && <ErrorMessage message={error} onRetry={loadOpponentDetails} />}

        </div>
      </div>
    </div>
  );
};

export default ChampionModal;
