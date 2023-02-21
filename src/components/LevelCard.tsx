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
      <div className="flex items-center justify-between bg-secondary py-1 px-2">
        <p className="text-xl font-semibold text-primary-100">{level.name}</p>
        <div className="flex gap-2">
          {level.championIcons.map((icon, i) => {
            return (
              <img
                alt={`Icon for champion ${icon.name}`}
                key={i}
                className="h-9 w-9 rounded-full border-2 border-primary-500"
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
