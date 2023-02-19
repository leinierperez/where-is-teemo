import { Profanity, ProfanityOptions } from '@2toad/profanity';
import { ChampionPosition } from '../src/hooks/useLevels';

export function isClickPositionInChampionPosition(
  clickedPosition: {
    championX: number;
    championY: number;
  },
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
