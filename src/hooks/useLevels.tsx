import { useEffect, useState } from 'react';
import supabase from '../supabaseClient';

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

function useLevels() {
  const [levels, setLevels] = useState<Levels>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorData, setErrorData] = useState<string | null>(null);

  const getLevels = async () => {
    setIsLoading(true);
    const { error, data } = await supabase.from('levels').select('*');
    if (error) {
      setIsLoading(false);
      setErrorData(error.message);
      return;
    }
    const sortedData: Levels = data.sort((a, b) => a.id - b.id);
    setLevels(sortedData);
    setIsLoading(false);
  };

  useEffect(() => {
    getLevels();
  }, []);

  return [levels, isLoading, errorData] as const;
}

export default useLevels;
