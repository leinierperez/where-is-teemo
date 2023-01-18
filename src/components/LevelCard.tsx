import { Level } from '../hooks/useLevels';
function LevelCard({ level }: { level: Level }) {
  return (
    <div
      className="cursor-pointer overflow-hidden rounded-md transition-transform duration-200 hover:scale-105 focus:rounded-sm focus:border-4 focus:border-primary-500 focus:outline-none"
      tabIndex={0}
    >
      <img
        src={level.imageURL}
        className="h-48 w-full object-cover blur-[6px]"
      />
      <div className="flex items-center justify-between bg-secondary py-1 px-2">
        <p className="text-xl font-semibold text-primary-100">{level.name}</p>
        <div className="flex gap-2">
          {level.championIcons.map((icon, i) => {
            return (
              <img
                key={i}
                className="h-9 w-9 rounded-full border-2 border-primary-500"
                src={icon.url}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default LevelCard;
