import supabase from '../supabaseClient';
import { useEffect, useState } from 'react';

type Score = {
  username: string;
  levelTimeScore: number;
};

function useScores(currentLevel: number | undefined) {
  const [scores, setScores] = useState<Score[]>();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const getScores = async (levelId: number) => {
    setIsLoading(true);
    const { error, data } = await supabase
      .from('levels')
      .select('scores(username, levelTimeScore)')
      .eq('id', levelId)
      .order('levelTimeScore', { foreignTable: 'scores', ascending: true });
    if (error) {
      setIsError(true);
      setIsLoading(false);
      return;
    }
    setIsError(false);
    const scores = data[0].scores as Score[];
    setScores(scores);
    setIsLoading(false);
  };

  useEffect(() => {
    if (currentLevel) {
      getScores(currentLevel);
    }
  }, [currentLevel]);

  return [scores, isLoading, isError] as const;
}

export default useScores;
