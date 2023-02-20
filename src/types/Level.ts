export type Position = {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
};

export type ChampionPosition = {
  name: string;
  position: Position;
};

export type ChampionIcon = {
  name: string;
  url: string;
};

export type Level = {
  id: number;
  name: string;
  imageURL: string;
  championIcons: ChampionIcon[];
  championPositions: ChampionPosition[];
};

export type Levels = Level[];
