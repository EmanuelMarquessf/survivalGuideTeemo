
export const DDRAGON_BASE_URL = "https://ddragon.leagueoflegends.com";
export const DDRAGON_API_VERSIONS_URL = `${DDRAGON_BASE_URL}/api/versions.json`;

export const getChampionDataUrl = (version: string, language: string): string => 
  `${DDRAGON_BASE_URL}/cdn/${version}/data/${language}/champion.json`;

export const getChampionFullDataUrl = (version: string, language: string, championId: string): string =>
  `${DDRAGON_BASE_URL}/cdn/${version}/data/${language}/champion/${championId}.json`;

export const getChampionSquareImageUrl = (version: string, championImageFull: string): string => 
  `${DDRAGON_BASE_URL}/cdn/${version}/img/champion/${championImageFull}`;
  
export const getChampionLoadingImageUrl = (championId: string, skinNum: number = 0): string =>
  `${DDRAGON_BASE_URL}/cdn/img/champion/loading/${championId}_${skinNum}.jpg`;

export const getItemImageUrl = (version: string, itemId: string): string =>
  `${DDRAGON_BASE_URL}/cdn/${version}/img/item/${itemId}.png`;

export const getSpellImageUrl = (version: string, spellImageFull: string): string =>
  `${DDRAGON_BASE_URL}/cdn/${version}/img/spell/${spellImageFull}`;

export const getPassiveImageUrl = (version: string, passiveImageFull: string): string =>
  `${DDRAGON_BASE_URL}/cdn/${version}/img/passive/${passiveImageFull}`;

export const DEFAULT_LANGUAGE = "pt_BR";

// Função de normalização robusta para nomes de campeões
export const normalizeChampionNameForMapKey = (name: string): string => {
  if (typeof name !== 'string') return '';
  return name
    .toLowerCase()
    .replace(/['.]/g, '') // Remove apostrophes and periods (e.g., K'Sante -> ksante, Dr. Mundo -> drmundo)
    .replace(/\s+/g, '')   // Remove all spaces (e.g., Master Yi -> masteryi)
    .replace(/\?$/, '');   // Remove trailing question mark only (e.g. Camille? -> camille)
};


// Mapeamento de nomes de runas para seus caminhos de ícone do Data Dragon
export const runeIconMap: Record<string, string> = {
  // Precision Tree (Primárias)
  "Pressione o Ataque": "perk-images/Styles/Precision/PressTheAttack/PressTheAttack.png",
  "Press the Attack": "perk-images/Styles/Precision/PressTheAttack/PressTheAttack.png",
  "PTA": "perk-images/Styles/Precision/PressTheAttack/PressTheAttack.png",
  
  "Agilidade nos Pés": "perk-images/Styles/Precision/FleetFootwork/FleetFootwork.png",
  "Fleet Footwork": "perk-images/Styles/Precision/FleetFootwork/FleetFootwork.png",
  "FF": "perk-images/Styles/Precision/FleetFootwork/FleetFootwork.png",

  "Conquistador": "perk-images/Styles/Precision/Conqueror/Conqueror.png", 
  "Conqueror": "perk-images/Styles/Precision/Conqueror/Conqueror.png",
  "Conq": "perk-images/Styles/Precision/Conqueror/Conqueror.png",

  "Ritmo Fatal": "perk-images/Styles/Precision/LethalTempo/LethalTempoTemp.png", 
  "Lethal Tempo": "perk-images/Styles/Precision/LethalTempo/LethalTempoTemp.png",
  "LT": "perk-images/Styles/Precision/LethalTempo/LethalTempoTemp.png",
  
  // Domination Tree (Primárias)
  "Eletrocutar": "perk-images/Styles/Domination/Electrocute/Electrocute.png",
  "Electrocute": "perk-images/Styles/Domination/Electrocute/Electrocute.png",
  "Elec": "perk-images/Styles/Domination/Electrocute/Electrocute.png",


  "Predador": "perk-images/Styles/Domination/Predator/Predator.png", 
  "Predator": "perk-images/Styles/Domination/Predator/Predator.png",

  "Colheita Sombria": "perk-images/Styles/Domination/DarkHarvest/DarkHarvest.png",
  "Dark Harvest": "perk-images/Styles/Domination/DarkHarvest/DarkHarvest.png",
  "DH": "perk-images/Styles/Domination/DarkHarvest/DarkHarvest.png",

  "Chuva de Lâminas": "perk-images/Styles/Domination/HailOfBlades/HailOfBlades.png", 
  "Hail of Blades": "perk-images/Styles/Domination/HailOfBlades/HailOfBlades.png",
  "HoB": "perk-images/Styles/Domination/HailOfBlades/HailOfBlades.png",

  // Sorcery Tree (Primárias)
  "Invocar Aery": "perk-images/Styles/Sorcery/SummonAery/SummonAery.png",
  "Summon Aery": "perk-images/Styles/Sorcery/SummonAery/SummonAery.png",
  "Aery": "perk-images/Styles/Sorcery/SummonAery/SummonAery.png",

  "Cometa Arcano": "perk-images/Styles/Sorcery/ArcaneComet/ArcaneComet.png",
  "Arcane Comet": "perk-images/Styles/Sorcery/ArcaneComet/ArcaneComet.png",

  "Ímpeto Gradual": "perk-images/Styles/Sorcery/PhaseRush/PhaseRush.png",
  "Phase Rush": "perk-images/Styles/Sorcery/PhaseRush/PhaseRush.png",
  "PR": "perk-images/Styles/Sorcery/PhaseRush/PhaseRush.png",

  // Resolve Tree (Primárias)
  "Aperto dos Mortos-Vivos": "perk-images/Styles/Resolve/GraspOfTheUndying/GraspOfTheUndying.png",
  "Grasp of the Undying": "perk-images/Styles/Resolve/GraspOfTheUndying/GraspOfTheUndying.png",
  "GoU": "perk-images/Styles/Resolve/GraspOfTheUndying/GraspOfTheUndying.png",
  "Grasp": "perk-images/Styles/Resolve/GraspOfTheUndying/GraspOfTheUndying.png",

  "Pós-choque": "perk-images/Styles/Resolve/VeteranAftershock/VeteranAftershock.png", 
  "Aftershock": "perk-images/Styles/Resolve/VeteranAftershock/VeteranAftershock.png",

  "Guardião": "perk-images/Styles/Resolve/Guardian/Guardian.png", 
  "Guardian": "perk-images/Styles/Resolve/Guardian/Guardian.png",

  // Inspiration Tree (Primárias)
  "Aprimoramento Glacial": "perk-images/Styles/Inspiration/GlacialAugment/GlacialAugment.png", 
  "Glacial Augment": "perk-images/Styles/Inspiration/GlacialAugment/GlacialAugment.png",
  "Glacial": "perk-images/Styles/Inspiration/GlacialAugment/GlacialAugment.png",

  "Livro de Feitiços Deslacrado": "perk-images/Styles/Inspiration/UnsealedSpellbook/UnsealedSpellbook.png", 
  "Unsealed Spellbook": "perk-images/Styles/Inspiration/UnsealedSpellbook/UnsealedSpellbook.png",
  
  "Primeiro Ataque": "perk-images/Styles/Inspiration/FirstStrike/FirstStrike.png", 
  "First Strike": "perk-images/Styles/Inspiration/FirstStrike/FirstStrike.png",

  // Secundárias - Precision
  "Triunfo": "perk-images/Styles/Precision/Triumph.png",
  "Triumph": "perk-images/Styles/Precision/Triumph/Triumph.png",
  "Trium": "perk-images/Styles/Precision/Triumph/Triumph.png",
  "Presença de Espírito": "perk-images/Styles/Precision/PresenceOfMind/PresenceOfMind.png",
  "Presence of Mind": "perk-images/Styles/Precision/PresenceOfMind/PresenceOfMind.png",
  "POM": "perk-images/Styles/Precision/PresenceOfMind/PresenceOfMind.png",
  "Lenda: Espontaneidade": "perk-images/Styles/Precision/LegendAlacrity/LegendAlacrity.png",
  "Legend: Alacrity": "perk-images/Styles/Precision/LegendAlacrity/LegendAlacrity.png",
  "Alac": "perk-images/Styles/Precision/LegendAlacrity/LegendAlacrity.png",
  "Lenda: Tenacidade": "perk-images/Styles/Precision/LegendTenacity/LegendTenacity.png",
  "Legend: Tenacity": "perk-images/Styles/Precision/LegendTenacity/LegendTenacity.png",
  "Lenda: Linhagem": "perk-images/Styles/Precision/LegendBloodline/LegendBloodline.png",
  "Legend: Bloodline": "perk-images/Styles/Precision/LegendBloodline/LegendBloodline.png",
  "Blood": "perk-images/Styles/Precision/LegendBloodline/LegendBloodline.png",
  "Bloodl": "perk-images/Styles/Precision/LegendBloodline/LegendBloodline.png", 
  "Golpe de Misericórdia": "perk-images/Styles/Precision/CoupDeGrace/CoupDeGrace.png",
  "Coup de Grace": "perk-images/Styles/Precision/CoupDeGrace/CoupDeGrace.png",
  "Coup": "perk-images/Styles/Precision/CoupDeGrace/CoupDeGrace.png",
  "Dilacerar": "perk-images/Styles/Precision/CutDown/CutDown.png",
  "Cut Down": "perk-images/Styles/Precision/CutDown/CutDown.png",
  "CutD": "perk-images/Styles/Precision/CutDown/CutDown.png",
  "Cutd": "perk-images/Styles/Precision/CutDown/CutDown.png", 
  "Até a Morte": "https://wiki.leagueoflegends.com/en-us/images/thumb/Last_Stand_rune.png/52px-Last_Stand_rune.png?e94e6",
  "Last Stand": "https://wiki.leagueoflegends.com/en-us/images/thumb/Last_Stand_rune.png/52px-Last_Stand_rune.png?e94e6",
  "Last": "https://wiki.leagueoflegends.com/en-us/images/thumb/Last_Stand_rune.png/52px-Last_Stand_rune.png?e94e6",
  "LastS": "https://wiki.leagueoflegends.com/en-us/images/thumb/Last_Stand_rune.png/52px-Last_Stand_rune.png?e94e6", 
  "Lasts": "https://wiki.leagueoflegends.com/en-us/images/thumb/Last_Stand_rune.png/52px-Last_Stand_rune.png?e94e6", 
  "Cura Excessiva": "perk-images/Styles/Precision/Overheal/Overheal.png",
  "Overheal": "perk-images/Styles/Precision/Overheal/Overheal.png", 
  "OverH": "perk-images/Styles/Precision/Overheal/Overheal.png",
  "Oheal": "perk-images/Styles/Precision/Overheal/Overheal.png", 

  // Secundárias - Domination
  "Golpe Desleal": "perk-images/Styles/Domination/CheapShot/CheapShot.png",
  "Cheap Shot": "perk-images/Styles/Domination/CheapShot/CheapShot.png",
  "Gosto de Sangue": "https://wiki.leagueoflegends.com/en-us/images/thumb/Taste_of_Blood_rune.png/52px-Taste_of_Blood_rune.png?12630",
  "Taste of Blood": "https://wiki.leagueoflegends.com/en-us/images/thumb/Taste_of_Blood_rune.png/52px-Taste_of_Blood_rune.png?12630",
  "ToB": "https://wiki.leagueoflegends.com/en-us/images/thumb/Taste_of_Blood_rune.png/52px-Taste_of_Blood_rune.png?12630",
  "Impacto Repentino": "perk-images/Styles/Domination/SuddenImpact/SuddenImpact.png",
  "Sudden Impact": "perk-images/Styles/Domination/SuddenImpact/SuddenImpact.png",
  "Globos Oculares": "perk-images/Styles/Domination/EyeballCollection/EyeballCollection.png",
  "Eyeball Collection": "perk-images/Styles/Domination/EyeballCollection/EyeballCollection.png",
  "Sentinela Zumbi": "perk-images/Styles/Domination/ZombieWard/ZombieWard.png",
  "Zombie Ward": "perk-images/Styles/Domination/ZombieWard/ZombieWard.png",
  "Deep Ward": "perk-images/Styles/Domination/ZombieWard/ZombieWard.png", // Alias from JSON
  "Poro Fantasma": "perk-images/Styles/Domination/GhostPoro/GhostPoro.png",
  "Ghost Poro": "perk-images/Styles/Domination/GhostPoro/GhostPoro.png",
  "Caçador de Tesouros": "perk-images/Styles/Domination/TreasureHunter/TreasureHunter.png",
  "Treasure Hunter": "perk-images/Styles/Domination/TreasureHunter/TreasureHunter.png",
  "Caça Ardilosa": "perk-images/Styles/Domination/IngeniousHunter/IngeniousHunter.png",
  "Ingenious Hunter": "perk-images/Styles/Domination/IngeniousHunter/IngeniousHunter.png",
  "Caça Incansável": "perk-images/Styles/Domination/RelentlessHunter/RelentlessHunter.png",
  "Relentless Hunter": "perk-images/Styles/Domination/RelentlessHunter/RelentlessHunter.png",
  "Caça Suprema": "perk-images/Styles/Domination/UltimateHunter/UltimateHunter.png",
  "Ultimate Hunter": "perk-images/Styles/Domination/UltimateHunter/UltimateHunter.png",
  "UltH": "perk-images/Styles/Domination/UltimateHunter/UltimateHunter.png",
  "UItH": "perk-images/Styles/Domination/UltimateHunter/UltimateHunter.png", 

  // Secundárias - Sorcery
  "Orbe Anulador": "perk-images/Styles/Sorcery/NullifyingOrb/NullifyingOrb.png",
  "Nullifying Orb": "perk-images/Styles/Sorcery/NullifyingOrb/NullifyingOrb.png",
  "Faixa de Fluxo de Mana": "perk-images/Styles/Sorcery/ManaflowBand/ManaflowBand.png",
  "Manaflow Band": "perk-images/Styles/Sorcery/ManaflowBand/ManaflowBand.png",
  "ManaFB": "perk-images/Styles/Sorcery/ManaflowBand/ManaflowBand.png",
  
  "Manto de Nimbus": "perk-images/Styles/Sorcery/NimbusCloak/NimbusCloak.png",
  "manto de nimbus": "perk-images/Styles/Sorcery/NimbusCloak/NimbusCloak.png", // Fallback
  "Nimbus Cloak": "perk-images/Styles/Sorcery/NimbusCloak/NimbusCloak.png",
  "Nimb": "perk-images/Styles/Sorcery/NimbusCloak/NimbusCloak.png",
  "Nimbus": "perk-images/Styles/Sorcery/NimbusCloak/NimbusCloak.png", 
  
  "Transcendência": "perk-images/Styles/Sorcery/Transcendence/Transcendence.png",
  "Transcendence": "perk-images/Styles/Sorcery/Transcendence/Transcendence.png",
  "Arcanista do Axioma": "perk-images/Styles/Sorcery/Transcendence/Transcendence.png", // Placeholder, no official "Axiom Arcanist" rune. Using Transcendence as a similar utility one.
  "Axiom Arcanist": "perk-images/Styles/Sorcery/Transcendence/Transcendence.png", // Placeholder
  
  "Celeridade": "https://wiki.leagueoflegends.com/en-us/images/thumb/Celerity_rune.png/52px-Celerity_rune.png?088d9",
  "celeridade": "https://wiki.leagueoflegends.com/en-us/images/thumb/Celerity_rune.png/52px-Celerity_rune.png?088d9", 
  "Celerity": "https://wiki.leagueoflegends.com/en-us/images/thumb/Celerity_rune.png/52px-Celerity_rune.png?088d9",
  "Cele": "https://wiki.leagueoflegends.com/en-us/images/thumb/Celerity_rune.png/52px-Celerity_rune.png?088d9",
  
  "Foco Absoluto": "perk-images/Styles/Sorcery/AbsoluteFocus/AbsoluteFocus.png",
  "Absolute Focus": "perk-images/Styles/Sorcery/AbsoluteFocus/AbsoluteFocus.png",
  "AbsL": "perk-images/Styles/Sorcery/AbsoluteFocus/AbsoluteFocus.png",
  
  "Chamuscar": "perk-images/Styles/Sorcery/Scorch/Scorch.png",
  "Scorch": "perk-images/Styles/Sorcery/Scorch/Scorch.png",
  "Scor": "perk-images/Styles/Sorcery/Scorch/Scorch.png",
  
  "Caminhar Sobre as Águas": "perk-images/Styles/Sorcery/Waterwalking/Waterwalking.png",
  "Waterwalking": "perk-images/Styles/Sorcery/Waterwalking/Waterwalking.png",
  
  "Tempestade Crescente": "perk-images/Styles/Sorcery/GatheringStorm/GatheringStorm.png",
  "tempestade crescente": "perk-images/Styles/Sorcery/GatheringStorm/GatheringStorm.png", // Fallback
  "Gathering Storm": "perk-images/Styles/Sorcery/GatheringStorm/GatheringStorm.png",
  "GS": "perk-images/Styles/Sorcery/GatheringStorm/GatheringStorm.png",
  "Gstrm": "perk-images/Styles/Sorcery/GatheringStorm/GatheringStorm.png", 

  // Secundárias - Resolve
  "Demolir": "perk-images/Styles/Resolve/Demolish/Demolish.png",
  "Demolish": "perk-images/Styles/Resolve/Demolish/Demolish.png",
  "Dem": "perk-images/Styles/Resolve/Demolish/Demolish.png",
  "Demo": "perk-images/Styles/Resolve/Demolish/Demolish.png", 
  "Fonte da Vida": "perk-images/Styles/Resolve/FontOfLife/FontOfLife.png",
  "Font of Life": "perk-images/Styles/Resolve/FontOfLife/FontOfLife.png",
  "Golpe de Escudo": "perk-images/Styles/Resolve/ShieldBash/ShieldBash.png",
  "Shield Bash": "perk-images/Styles/Resolve/ShieldBash/ShieldBash.png", 
  "Condicionamento": "perk-images/Styles/Resolve/Conditioning/Conditioning.png",
  "Conditioning": "perk-images/Styles/Resolve/Conditioning/Conditioning.png",
  "Cond": "perk-images/Styles/Resolve/Conditioning/Conditioning.png",
  "Ventos Revigorantes": "perk-images/Styles/Resolve/SecondWind/SecondWind.png",
  "Second Wind": "perk-images/Styles/Resolve/SecondWind/SecondWind.png",
  "2ndW": "perk-images/Styles/Resolve/SecondWind/SecondWind.png",
  "2ndw": "perk-images/Styles/Resolve/SecondWind/SecondWind.png",
  "Osso Revestido": "perk-images/Styles/Resolve/BonePlating/BonePlating.png",
  "Bone Plating": "perk-images/Styles/Resolve/BonePlating/BonePlating.png",
  "BP": "perk-images/Styles/Resolve/BonePlating/BonePlating.png",
  "BoneP": "perk-images/Styles/Resolve/BonePlating/BonePlating.png", 
  "Crescimento Excessivo": "perk-images/Styles/Resolve/Overgrowth/Overgrowth.png",
  "Overgrowth": "perk-images/Styles/Resolve/Overgrowth/Overgrowth.png",
  "Over": "perk-images/Styles/Resolve/Overgrowth/Overgrowth.png", 
  "OG": "perk-images/Styles/Resolve/Overgrowth/Overgrowth.png", 
  "OverG": "perk-images/Styles/Resolve/Overgrowth/Overgrowth.png",
  "Overg": "perk-images/Styles/Resolve/Overgrowth/Overgrowth.png", 
  "Revitalizar": "perk-images/Styles/Resolve/Revitalize/Revitalize.png",
  "Revitalize": "perk-images/Styles/Resolve/Revitalize/Revitalize.png",
  "Inabalável": "perk-images/Styles/Resolve/Unflinching/Unflinching.png",
  "Unflinching": "perk-images/Styles/Resolve/Unflinching/Unflinching.png",
  
  // Secundárias - Inspiration
  "Flashtração Hextec": "perk-images/Styles/Inspiration/HextechFlashtraption/HextechFlashtraption.png",
  "Hextech Flashtraption": "perk-images/Styles/Inspiration/HextechFlashtraption/HextechFlashtraption.png",
  "Calçados Mágicos": "perk-images/Styles/Inspiration/MagicalFootwear/MagicalFootwear.png",
  "Magical Footwear": "perk-images/Styles/Inspiration/MagicalFootwear/MagicalFootwear.png",
  "Sincronia Perfeita": "perk-images/Styles/Inspiration/PerfectTiming/PerfectTiming.png",
  "Perfect Timing": "perk-images/Styles/Inspiration/PerfectTiming/PerfectTiming.png",
  "Mercado do Futuro": "perk-images/Styles/Inspiration/FuturesMarket/FuturesMarket.png",
  "Future's Market": "perk-images/Styles/Inspiration/FuturesMarket/FuturesMarket.png",
  "Pulverizador de Tropas": "perk-images/Styles/Inspiration/MinionDematerializer/MinionDematerializer.png",
  "Minion Dematerializer": "perk-images/Styles/Inspiration/MinionDematerializer/MinionDematerializer.png",
  "Entrega de Biscoitos": "perk-images/Styles/Inspiration/BiscuitDelivery/BiscuitDelivery.png",
  "Biscuit Delivery": "perk-images/Styles/Inspiration/BiscuitDelivery/BiscuitDelivery.png",
  "Perspicácia Cósmica": "perk-images/Styles/Inspiration/CosmicInsight/CosmicInsight.png",
  "Cosmic Insight": "perk-images/Styles/Inspiration/CosmicInsight/CosmicInsight.png",
  "Velocidade de Aproximação": "perk-images/Styles/Inspiration/ApproachVelocity/ApproachVelocity.png",
  "Approach Velocity": "perk-images/Styles/Inspiration/ApproachVelocity/ApproachVelocity.png",
  "Tônico de Distorção no Tempo": "perk-images/Styles/Inspiration/TimeWarpTonic/TimeWarpTonic.png",
  "Time Warp Tonic": "perk-images/Styles/Inspiration/TimeWarpTonic/TimeWarpTonic.png",
};

export const getRuneIconCdnUrl = (iconPath: string): string => {
  if (iconPath.startsWith('http://') || iconPath.startsWith('https://')) {
    return iconPath; // It's already a full URL
  }
  return `${DDRAGON_BASE_URL}/cdn/img/${iconPath}`;
};

// Mapeamento de nomes de runas para nomes completos em português
// Este mapa ainda pode ser útil para Shards ou se o JSON usar abreviações inesperadas.
export const runeFullNameMap: Record<string, string> = {
  // Keystones (já cobertos pelo runeIconMap por nome completo)
  "PR": "Ímpeto Gradual", "PTA": "Pressione o Ataque", "FF": "Agilidade nos Pés", "GoU": "Aperto dos Mortos-Vivos",
  "Aery": "Invocar Aery", "DH": "Colheita Sombria", "LT": "Ritmo Fatal", "Conq": "Conquistador",
  "Glacial": "Aprimoramento Glacial", "Elec": "Eletrocutar", "First Strike": "Primeiro Ataque",
  "Predator": "Predador", "Guardian": "Guardião", "Aftershock": "Pós-choque", "HoB": "Chuva de Lâminas",
  "Arcane Comet": "Cometa Arcano", "Unsealed Spellbook": "Livro de Feitiços Deslacrado",
  "Grasp": "Aperto dos Mortos-Vivos",

  // Precision Tree (Secundárias)
  "OverH": "Cura Excessiva", "Overheal": "Cura Excessiva", "Oheal": "Cura Excessiva",
  "Trium": "Triunfo", "Triumph": "Triunfo",
  "POM": "Presença de Espírito", "Presence of Mind": "Presença de Espírito",
  "Alac": "Lenda: Espontaneidade", "Legend: Alacrity": "Lenda: Espontaneidade",
  "Tenacity": "Lenda: Tenacidade", "Legend: Tenacity": "Lenda: Tenacidade",
  "Blood": "Lenda: Linhagem", "Bloodl": "Lenda: Linhagem", "BloodL": "Lenda: Linhagem", "Legend: Bloodline": "Lenda: Linhagem",
  "Coup": "Golpe de Misericórdia", "Coup de Grace": "Golpe de Misericórdia",
  "CutD": "Dilacerar", "Cutd": "Dilacerar", "Cut Down": "Dilacerar",
  "Last": "Até a Morte", "LastS": "Até a Morte", "Lasts": "Até a Morte", "Last Stand": "Até a Morte",

  // Domination Tree (Secundárias)
  "ToB": "Gosto de Sangue", "Taste of Blood": "Gosto de Sangue",
  "Sudden": "Impacto Repentino", "Sudden Impact": "Impacto Repentino",
  "Eyeball": "Globos Oculares", "Eyeball Collection": "Globos Oculares",
  "Zombie": "Sentinela Zumbi", "Zombie Ward": "Sentinela Zumbi",
  "GhostP": "Poro Fantasma", "Ghost Poro": "Poro Fantasma",
  "TresH": "Caçador de Tesouros", "Treasure Hunter": "Caçador de Tesouros",
  "IngH": "Caça Ardilosa", "Ingenious Hunter": "Caça Ardilosa",
  "RelH": "Caça Incansável", "Relentless Hunter": "Caça Incansável",
  "UltH": "Caça Suprema", "UItH": "Caça Suprema", "Ultimate Hunter": "Caça Suprema",

  // Sorcery Tree (Secundárias)
  "NullO": "Orbe Anulador", "Nullifying Orb": "Orbe Anulador",
  "ManaFB": "Faixa de Fluxo de Mana", "Manaflow Band": "Faixa de Fluxo de Mana",
  "Nimb": "Manto de Nimbus", "Nimbus": "Manto de Nimbus", "Nimbus Cloak": "Manto de Nimbus",
  "Trans": "Transcendência", "Transcendence": "Transcendência",
  "Cele": "Celeridade", "Celerity": "Celeridade",
  "AbsL": "Foco Absoluto", "Absolute Focus": "Foco Absoluto",
  "Scor": "Chamuscar", "Scorch": "Chamuscar",
  "WaterW": "Caminhar Sobre as Águas", "Waterwalking": "Caminhar Sobre as Águas",
  "GS": "Tempestade Crescente", "Gstrm": "Tempestade Crescente", "Gathering Storm": "Tempestade Crescente",

  // Resolve Tree (Secundárias)
  "Dem": "Demolir", "Demo": "Demolir", "Demolish": "Demolir",
  "FontL": "Fonte da Vida", "Font of Life": "Fonte da Vida",
  "ShieldB": "Golpe de Escudo", "Shield Bash": "Golpe de Escudo",
  "Cond": "Condicionamento", "Conditioning": "Condicionamento",
  "2ndW": "Ventos Revigorantes", "2ndw": "Ventos Revigorantes", "Second Wind": "Ventos Revigorantes",
  "BP": "Osso Revestido", "BoneP": "Osso Revestido", "Bone Plating": "Osso Revestido",
  "Over": "Crescimento Excessivo", "OG": "Crescimento Excessivo", "OverG": "Crescimento Excessivo", "Overg": "Crescimento Excessivo", "Overgrowth": "Crescimento Excessivo",
  "Rev": "Revitalizar", "Revitalize": "Revitalizar",
  "Unfl": "Inabalável", "Unflinching": "Inabalável",

  // Inspiration Tree (Secundárias)
  "HexFlash": "Flashtração Hextec", "Hextech Flashtraption": "Flashtração Hextec",
  "MagFoot": "Calçados Mágicos", "Magical Footwear": "Calçados Mágicos",
  "PerfTim": "Sincronia Perfeita", "Perfect Timing": "Sincronia Perfeita",
  "FutMark": "Mercado do Futuro", "Future's Market": "Mercado do Futuro",
  "MinDem": "Pulverizador de Tropas", "Minion Dematerializer": "Pulverizador de Tropas",
  "BisDel": "Entrega de Biscoitos", "Biscuit Delivery": "Entrega de Biscoitos",
  "CosIns": "Perspicácia Cósmica", "Cosmic Insight": "Perspicácia Cósmica",
  "AppVel": "Velocidade de Aproximação", "Approach Velocity": "Velocidade de Aproximação",
  "TimWarp": "Tônico de Distorção no Tempo", "Time Warp Tonic": "Tônico de Distorção no Tempo",
  
  // Shards (Nomes completos conforme o novo JSON, caso precise de fallback ou tradução)
  "Velocidade de Ataque": "Velocidade de Ataque",
  "Força Adaptativa": "Força Adaptativa",
  "Vida (Escalonável)": "Vida (Escalonável)",
  "Velocidade de Movimento": "Velocidade de Movimento",
  "Tenacidade e Resistência a Lentidão": "Tenacidade e Resistência a Lentidão",
  // Abreviações para shards se ainda aparecerem
  "As": "Velocidade de Ataque",
  "Ms": "Velocidade de Movimento",
  "Shp": "Vida (Escalonável)", // Pode ser HP Scaling, Vida Escalável
  "Dmg": "Força Adaptativa",  // Pode ser Adaptive Force
  "Fhp": "Vida Fixa",       // Pode ser Flat HP
  "Sres": "Resistência Mágica", // Shard de RM
};

// Mapeamento de nomes de itens (e abreviações) para seus IDs
export const itemNameOrAbbreviationToIdMap: Record<string, string> = {
  // Starting Items / Consumables
  "Poção de Vida": "2003",
  "Poção": "2003", 
  "Anel de Doran": "1056",
  "Dring": "1056",
  "Selo Negro": "1082",
  "Dark Seal": "1082",
  "Poção com Refil": "2031",
  "Refillable Potion": "2031",
  "Adaga": "1042",
  "Dagger": "1042",

  // Boots
  "Botas": "1001", 
  "Boots": "1001",
  "Botas da Rapidez": "3009",
  "SwiftyBoots": "3009",
  "Passos de Mercúrio": "3111",
  "MercTreads": "3111",
  "Botas Revestidas de Aço": "3047",
  "PlatedSC": "3047",
  "Grevas do Berserker": "3006",
  "Sapatos do Feiticeiro": "3020",
  "Sorcerer's Shoes": "3020",
  "Botas Ionianas da Lucidez": "3158",
  "Ionian Boots of Lucidity": "3158",

  // AP Items
  "Dente de Nashor": "3115",
  "Nashor's Tooth": "3115",
  "Nash": "3115",
  "Tormento de Liandry": "6653",
  "Liandry's Torment": "6653",
  "Liandry": "6653",
  "Malevolência": "4644",
  "Malignance": "4644",
  "Malig": "4644", 
  "Cajado do Vazio": "3135",
  "Void Staff": "3135",
  "Void": "3135",
  "Capuz da Morte de Rabadon": "3089",
  "Rabadon's Deathcap": "3089",
  "Dcap": "3089",
  "Tocha de Fogo Negro": "4630",
  "Blackfire Torch": "4630",
  "BlackFT": "4630", 
  "Morellonomicon": "3165",
  "Morello": "3165",
  "Chama Sombria": "4645",
  "Shadowflame": "4645",
  "ShadF": "4645",
  "Cetro de Cristal de Rylai": "3116",
  "Rylai's Crystal Scepter": "3116",
  "RapC": "3116", 
  "Florescera Espectral": "3916", 
  "Cryptbloom": "3916",
  "CryptB": "3916",
  "Limite da Razão": "3101", 
  "Wit's End": "3101",
  "Wits": "3101",
  "Véu da Banshee": "3102",
  "Banshee's Veil": "3102",
  "Bansh": "3102",
  "Ampulheta de Zhonya": "3157",
  "Zhonya's Hourglass": "3157",
  "ZHG": "3157",
  "Perdição de Lich": "3100",
  "Lich Bane": "3100",
  "Ladrão de Almas de Mejai": "3041",
  "Mejai's Soulstealer": "3041",
  "Surto da Tempestade": "4628",
  "Stormsurge": "4628",

  // On-Hit / AD Items
  "Espada do Rei Destruído": "3153",
  "Blade of the Ruined King": "3153",
  "Bork": "3153",
  "Lâmina da Fúria de Guinsoo": "3124",
  "Guinsoo's Rageblade": "3124",
  "Rageb": "3124",
  "Mata-Cráquens": "6672", 
  "Kraken Slayer": "6672",
  "Krak": "6672",
  "Lembrete Mortal": "3033",
  "Mortal Reminder": "3033",
  "Mort": "3033",
  "Terminus": "6677", 
  "Arco Recurvo": "1043",
  "Recurve Bow": "1043",

  // Tank / Bruiser Items
  "Jak'Sho, O Proteico": "3084", 
  "Jak'Sho, The Protean": "3084",
  "Jaks": "3084", 
  "Kaenic Rookern": "8025", 
  "Rook": "8025",
  "Couraça do Defunto": "3742", 
  "Dead Man's Plate": "3742",
  "Corrente de Anátema": "8001", 
  "Anathema's Chains": "8001",
  "Armadura de Espinhos": "3075", 
  "Thornmail": "3075",
  "Couraça da Força da Natureza": "3083", // This is actually Force of Nature (new ID if changed, old ID for Warmog was 3083)
  "Force of Nature": "3083", // Keeping for FoN, "Warmog" was a mistake here in original
  "Armadura de Warmog": "3083", // Correcting Warmog
  "Warmog's Armor": "3083",
  "Warmog": "3083", 
  "Coração Congelado": "3110", 
  "Frozen Heart": "3110",
  "Abraço Demoníaco": "4637", 
  "Demonic Embrace": "4637",
  "Égide de Fogo Solar": "3068", // Sunfire Aegis (new or old, now often component Bami's track)
  "Sunfire Aegis": "3068",
  "Coração de Aço": "6662", 
  "Heartsteel": "6662",
  "Manopla dos Glacinatas": "6665", // Iceborn Gauntlet
  "Iceborn Gauntlet": "6665",
  "Máscara Abissal": "8020", 
  "Abyssal Mask": "8020",

  // Components
  "Capa de Negatrons": "1057", 
  "Negatron Cloak": "1057",
  "Cristal de Rubi": "1028", 
  "Ruby Crystal": "1028",
  "Manto Anula-Magia": "1033", 
  "Null-Magic Mantle": "1033",
  "Orbe do Oblívio": "3011", 
  "Oblivion Orb": "3011",
  "Chamado do Carrasco": "3123", 
  "Executioner's Calling": "3123",
  "Colete de Cota de Malha": "1031", 
  "Chain Vest": "1031",
  "Cetro Vampírico": "1053", 
  "Vampiric Scepter": "1053",
  "Cinzas Predestinadas": "4632", // Mapped to Haunting Guise as a key Liandry's component
  "Haunting Guise": "4632",
  "Armadura de Pano": "1029",
  "Cloth Armor": "1029",
  "Proteção de Braço da Caçadora": "3191",
  "Seeker's Armguard": "3191",
  
  // Other specific items
  "Bandana de Mercúrio": "3140", // Quicksilver Sash (QSS)
  "Quicksilver Sash": "3140",
  "QSS": "3140", 
  "Cimitarra Mercurial": "3139", 
  "Mercurial Scimitar": "3139",
  "Lâmina Fantasma de Youmuu": "3142", 
  "Youmuu's Ghostblade": "3142",
  "Lâminas Rápidas Navori": "6675", 
  "Navori Quickblades": "6675",
  "Lembranças do Lorde Dominik": "3036", 
  "Lord Dominik's Regards": "3036",
  "LDR": "3036", 
  "Presságio de Randuin": "3143", 
  "Randuin's Omen": "3143",
  "Mandíbula de Malmortius": "3156", 
  "Maw of Malmortius": "3156",
  "Hexdrinker": "3155", 
  "Arco-escudo Imortal": "6673", 
  "Immortal Shieldbow": "6673",
  "Hidra Titânica": "3748", 
  "Titanic Hydra": "3748",
  "Quebracascos": "3181", 
  "Hullbreaker": "3181",
  "Manamune": "3004",
  "Muramana": "3042",
  "Faca de Statikk": "3087", 
  "Statikk Shiv": "3087",
  "Serrespada Quimiopunk": "6609", 
  "Chempunk Chainsword": "6609",
  "Placa Gargolítica": "3193", 
  "Gargoyle Stoneplate": "3193",
  "Força da Trindade": "3078", 
  "Trinity Force": "3078",
  "Cutelo Negro": "3071", 
  "Black Cleaver": "3071",
  "Lança de Shojin": "3161", 
  "Spear of Shojin": "3161",

  // Jungle Items
  "Cria de Andarilho do Vento": "1103", // Gustwalker Hatchling
  "Mascote Garra de Brasa": "1101", // Scorchclaw Pup

  // Support Items
  "Espinho Dimensional de Zaz'Zak": "4643", // Zaz'Zak's Realmspike

  // Trinkets
  "Lente do Oráculo": "3364", // Oracle Lens
  "Sentinela de Controle": "2055", // Control Ward
};

// Mapeamento de nomes de feitiços de invocador para seus nomes de arquivo de imagem
export const summonerSpellToIconFileMap: Record<string, string> = {
  "Flash": "SummonerFlash.png",
  "Incendiar": "SummonerDot.png",
  "Fantasma": "SummonerHaste.png",
  "Teleporte": "SummonerTeleport.png",
  "Curar": "SummonerHeal.png",
  "Barreira": "SummonerBarrier.png",
  "Exaustão": "SummonerExhaust.png",
  "Purificar": "SummonerBoost.png", // Cleanse
  "Golpear": "SummonerSmite.png", // Smite
  // Adicionar outros conforme necessário
};

export const getSummonerSpellImageUrl = (version: string, spellImageFileName: string): string =>
  `${DDRAGON_BASE_URL}/cdn/${version}/img/spell/${spellImageFileName}`;
