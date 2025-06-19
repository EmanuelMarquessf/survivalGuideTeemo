
export interface ChampionImage {
  full: string;
  sprite: string;
  group: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface Champion { // Renamed from ChampionInfo
  version: string;
  id: string; // Champion ID (e.g., "Aatrox")
  key: string; // Champion key (numeric e.g., "266")
  name: string; // Champion name (e.g., "Aatrox")
  title: string; // Champion title (e.g., "a Espada Darkin")
  blurb: string;
  info: {
    attack: number;
    defense: number;
    magic: number;
    difficulty: number;
  };
  image: ChampionImage;
  tags: string[]; // E.g. ["Fighter", "Tank"]
  partype: string; // Resource type (e.g. "Mana", "Energy")
  stats: Record<string, number>; // Champion stats
}

export interface ChampionDataResponse {
  type: string;
  format: string;
  version: string;
  data: {
    [championKey: string]: Champion; 
  };
}

// For versions.json
export type ApiVersion = string;

export interface ChampionSpell {
  id: string;
  name: string;
  description: string;
  tooltip: string;
  image: ChampionImage;
}

export interface ChampionPassive {
  name: string;
  description: string;
  image: ChampionImage;
}

export interface ChampionFullData extends Champion {
  spells: ChampionSpell[];
  passive: ChampionPassive;
  lore: string;
  skins: any[]; 
  allytips: string[];
  enemytips: string[];
}

export interface ChampionFullDataResponse {
  type: string;
  format: string;
  version: string;
  data: {
    [championKey: string]: ChampionFullData;
  };
}

// New types for the Teemo-specific JSON data
export interface DicaGeral {
  titulo: string;
  descricao: string;
}

export interface HabilidadeChave {
  nome: string;
  descricao: string;
}

export interface OpcaoRuna {
  nome: string;
  descricao: string;
}

export interface RunasSugeridasContra {
  observacao: string;
  opcoes: OpcaoRuna[];
}

export interface OrdemDeHabilidades {
  estrategia: string;
}

export interface EstrategiaDeItens {
  descricao: string;
}

export interface ChampionMatchupJSONData {
  campeao: string;
  tipo_de_dano: string;
  nivel_de_ameaca: string;
  observacao: string;
  dicas_gerais: DicaGeral[];
  habilidades_chave: HabilidadeChave[];
  runas_sugeridas_contra: RunasSugeridasContra;
  ordem_de_habilidades_para_enfrenta_lo: OrdemDeHabilidades;
  estrategia_de_itens?: EstrategiaDeItens;
}

// New types for the structured Alternative Runes Data (as per the new JSON)
export interface AlternativeRuneSet {
  primary_tree: string;
  keystone: string;
  primary_runes: string[];
  secondary_tree: string;
  secondary_runes: string[];
  shards: string[];
}

export interface AlternativeMatchupData {
  champion: string;
  ap_runes: AlternativeRuneSet | null;
  ap_ss: string[] | null;
  ap_items: string[] | null;
  on_hit_runes: AlternativeRuneSet | null;
  on_hit_ss: string[] | null;
  on_hit_items: string[] | null;
  experiences: string | null;
  difficulty: string | null;
}

export interface StreamerMetadata {
  streamer_twitch: string;
  streamer_youtube: string;
  item_set_link: string;
  strategy_info: {
    patch: string;
    date: string;
    description: string;
  };
  default_setup: {
    runes: string; 
    summoner_spells: string; 
  };
  bans: string[];
}

export interface AlternativeRunesRoot {
  metadata: StreamerMetadata;
  matchups: AlternativeMatchupData[];
}

// For generalTeemoTips.json
export interface GeneralTeemoTipItem {
  title: string;
  description: string;
}

export interface GeneralTeemoTipsData {
  generalTips: {
    title: string;
    introduction: string;
    tips: GeneralTeemoTipItem[];
  };
}

// For teemoRuneGuide.json
export interface RuneInfo {
  nome: string;
  icone: string; // This path from JSON will be ignored in favor of mapping 'nome' to runeIconMap
}

export interface RunePath {
  nome: string;
  runaPrincipal?: RuneInfo;
  runas: RuneInfo[];
}

export interface RunePage {
  nomePagina: string;
  dicaDoAutor: string;
  caminhoPrimario: RunePath;
  caminhoSecundario: RunePath;
  fragmentos: string[];
}

export interface LaneRunePages {
  nomeRota: string;
  paginasDeRunas: RunePage[];
}

export interface TeemoRuneGuideData {
  guiaDeRunasTeemo: {
    autor: string;
    descricaoGeral: string;
    rotas: LaneRunePages[];
  };
}

// For teemoItemGuide.json
export interface ItemDetail {
  nome: string;
  quantidade?: number; 
}

export interface ItemSet {
  nomeConjunto: string;
  dicaDoAutor?: string;
  itens: (string | ItemDetail)[]; // Can be simple names or detailed objects
}

export interface ItemBuildCategory {
  categoria: string;
  conjuntos: ItemSet[];
}

export interface LaneItemBuilds {
  nomeRota: string;
  buildsDeItens: ItemBuildCategory[];
}

export interface TeemoItemGuideData {
  guiaDeItensTeemo: {
    autor: string;
    descricaoGeral: string;
    rotas: LaneItemBuilds[];
  };
}

// For AllRunesGuideSection
export interface RuneDetailFromJSON {
  name: string;
  icon: string; // This is a URL
  status?: 'recommended' | 'not_recommended' | string; // Status for rune recommendation
  description: string;
}

export interface RuneTreeCategoryFromJSON {
  name: string; // Name of the rune tree (e.g., "Feitiçaria")
  keystones: RuneDetailFromJSON[];
  row_one: RuneDetailFromJSON[];
  row_two: RuneDetailFromJSON[];
  row_three: RuneDetailFromJSON[];
}

export interface RuneShardOption {
  name: string;
  icon: string;
}

export interface RuneShardOptionsByRow {
  row_1_offense: RuneShardOption[];
  row_2_flex: RuneShardOption[];
  row_3_defense: RuneShardOption[];
}

export interface RuneShardData {
  name: string;
  description: string;
  options_by_row: RuneShardOptionsByRow;
}

export interface AllRunesData { // Represents the value of "all_runes" key
  sorcery: RuneTreeCategoryFromJSON;
  domination: RuneTreeCategoryFromJSON;
  precision: RuneTreeCategoryFromJSON;
  resolve: RuneTreeCategoryFromJSON;
  inspiration: RuneTreeCategoryFromJSON;
  rune_shards: RuneShardData; // Added rune_shards section
}

export interface AllRunesRoot { // Root of the provided JSON
    all_runes: AllRunesData;
}

// For TeemoItemExplanationSection
export interface ItemExplanation {
  nome: string;
  icon: string; // URL from the new JSON
  descricao: string;
}

export interface ItemExplanationCategories {
  itens_iniciais: ItemExplanation[];
  escolhas_de_botas: ItemExplanation[];
  itens_principais_e_situacionais: ItemExplanation[];
}

export interface ItemExplanationData {
  guia_de_itens: ItemExplanationCategories;
}
