import { getLevelById } from '../utils';
import { useQuery } from '@tanstack/react-query';

type ChampionIconsProps = {
  id: string;
  championsFound: string[];
};

function ChampionIconList({ id, championsFound }: ChampionIconsProps) {
  const { data: level } = useQuery({
    queryKey: ['levels', id],
    queryFn: () => getLevelById(id),
  });
  return (
    <div className="flex gap-3">
      {level?.championIcons?.map((icon, i) => {
        if (championsFound.includes(icon.name)) return;
        return (
          <img
            alt={`Icon for champion ${icon.name}`}
            className="h-8 w-8 rounded-full border-2 border-primary-100 lg:h-12 lg:w-12"
            src={icon.url}
            key={i}
          />
        );
      })}
    </div>
  );
}

export default ChampionIconList;
