import { Link } from 'react-router-dom';
import { Level } from '../types/Level';
function LevelCard({ level }: { level: Level }) {
  return (
    <Link
      to={`/level/${level.id}`}
      className="block overflow-hidden rounded-md transition-transform duration-200 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-white"
    >
      <img
        alt={`Image for ${level.name}`}
        src={level.imageURL.small}
        className="h-48 w-full object-cover blur-[6px]"
      />
      <div className="flex items-center justify-between gap-4 bg-secondary py-1 px-2">
        <p className="whitespace-nowrap text-sm font-semibold text-primary-100 sm:text-xl">
          {level.name}
        </p>
        <div className="flex flex-wrap gap-1">
          {level.championIcons.map((icon, i) => {
            return (
              <img
                alt={`Icon for champion ${icon.name}`}
                key={i}
                className="h-6 w-6 rounded-full border-2 border-primary-500 sm:h-9 sm:w-9 
                xl:h-8 xl:w-8 2xl:h-9 2xl:w-9"
                src={icon.url}
              />
            );
          })}
        </div>
      </div>
    </Link>
  );
}

export default LevelCard;
