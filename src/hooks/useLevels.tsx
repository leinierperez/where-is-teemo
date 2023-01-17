import { useEffect, useState } from 'react';
import supabase from '../supabaseClient';

type Position = {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
};

type ChampionPosition = {
  name: string;
  position: Position;
};

type ChampionIcon = {
  name: string;
  url: string;
};

type Level = {
  id: number;
  name: string;
  imageURL: string;
  championIcons: ChampionIcon[];
  championPositions: ChampionPosition[];
};

type Levels = Level[];

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
    setLevels(data);
  };

  useEffect(() => {
    getLevels();
  }, []);

  return [levels, isLoading, errorData] as const;
}

export default useLevels;
