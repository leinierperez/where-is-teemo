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

export type ImageURL = {
  small: string;
  large: string;
};

export type Level = {
  id: string;
  name: string;
  imageURL: ImageURL;
  championIcons: ChampionIcon[];
  championPositions: ChampionPosition[];
};

export type Levels = Level[];
