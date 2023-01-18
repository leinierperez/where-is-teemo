import useLevels from '../hooks/useLevels';
import { Level } from '../hooks/useLevels';
function Home() {
  const [levels, isLoading, error] = useLevels();
  // TODO: Handle loading and error

  return (
    <main className="py-6 px-4">
      <ul className="mx-auto grid min-h-screen max-w-screen-2xl auto-rows-max grid-cols-1 justify-items-stretch gap-6 md:grid-cols-2 xl:grid-cols-3">
        {levels.map((lvl: Level, i) => {
          return (
            <li
              className="cursor-pointer overflow-hidden rounded-md transition-transform duration-200 hover:scale-105 focus:rounded-sm focus:border-4 focus:border-primary-500 focus:outline-none"
              tabIndex={0}
              key={i}
            >
              <img
                src={lvl.imageURL}
                className="h-48 w-full object-cover blur-[6px]"
              />
              <div className="flex items-center justify-between bg-secondary py-1 px-2">
                <p className="text-xl font-semibold text-primary-100">
                  {lvl.name}
                </p>
                <div className="flex gap-2">
                  {lvl.championIcons.map((icon, i) => {
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
            </li>
          );
        })}
      </ul>
    </main>
  );
}

export default Home;
