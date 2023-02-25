import { Profanity, ProfanityOptions } from '@2toad/profanity';
import { ChampionPosition, Level, Levels } from './types/Level';
import { ClickedPosition } from './types/ClickedPosition';
import supabase from './supabaseClient';

type Score = {
  username: string;
  levelTimeScore: number;
};

export function isClickPositionInChampionPosition(
  clickedPosition: ClickedPosition,
  targetChampion: ChampionPosition
) {
  return (
    clickedPosition.championX >= targetChampion.position.minX &&
    clickedPosition.championX <= targetChampion.position.maxX &&
    clickedPosition.championY >= targetChampion.position.minY &&
    clickedPosition.championY <= targetChampion.position.maxY
  );
}

export function getProfanity() {
  const options = new ProfanityOptions();
  options.wholeWord = false;
  return new Profanity(options);
}

export async function getLevelById(id: number) {
  const { data } = await supabase.from('levels').select('*').eq('id', id);
  if (!data) return;
  return data[0] as unknown as Level;
}

export async function getLevels() {
  const { data } = await supabase
    .from('levels')
    .select('*')
    .order('id', { ascending: true });
  return data as Levels;
}

export async function getScores(levelId: number) {
  const { data } = await supabase
    .from('levels')
    .select('scores(username, levelTimeScore)')
    .eq('id', levelId)
    .order('levelTimeScore', { foreignTable: 'scores', ascending: true });
  if (data) {
    return data[0].scores as Score[];
  }
}
