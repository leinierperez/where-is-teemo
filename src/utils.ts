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
