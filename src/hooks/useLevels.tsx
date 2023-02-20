import { useEffect, useState } from 'react';
import supabase from '../supabaseClient';
import { Levels } from '../types/Level';

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
