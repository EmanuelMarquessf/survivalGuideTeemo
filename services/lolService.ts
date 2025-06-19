import { ChampionDataResponse, ApiVersion, ChampionFullDataResponse, ChampionFullData } from '../types';
import { DDRAGON_API_VERSIONS_URL, getChampionDataUrl, getChampionFullDataUrl } from '../constants';

export const fetchLatestVersion = async (): Promise<string> => {
  const response = await fetch(DDRAGON_API_VERSIONS_URL);
  if (!response.ok) {
    throw new Error(`Falha ao buscar versões da API: ${response.statusText}`);
  }
  const versions: ApiVersion[] = await response.json();
  if (versions && versions.length > 0) {
    return versions[0]; // The first one is usually the latest
  }
  throw new Error('Nenhuma versão da API encontrada.');
};

export const fetchChampionsData = async (version: string, language: string): Promise<ChampionDataResponse> => {
  const url = getChampionDataUrl(version, language);
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Falha ao buscar dados dos campeões: ${response.statusText}`);
  }
  const championsData: ChampionDataResponse = await response.json();
  return championsData;
};

export const fetchChampionFullData = async (version: string, language: string, championId: string): Promise<ChampionFullData> => {
  const url = getChampionFullDataUrl(version, language, championId);
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Falha ao buscar dados detalhados do campeão ${championId}: ${response.statusText}`);
  }
  const championFullResponse: ChampionFullDataResponse = await response.json();
  return championFullResponse.data[championId];
};
