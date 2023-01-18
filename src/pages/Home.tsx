import LevelCard from '../components/LevelCard';
import useLevels from '../hooks/useLevels';
function Home() {
  const [levels, isLoading, error] = useLevels();
  // TODO: Handle loading and error

  return (
    <main className="py-6 px-4">
      <ul className="mx-auto grid min-h-screen max-w-screen-2xl auto-rows-max grid-cols-1 justify-items-stretch gap-6 md:grid-cols-2 xl:grid-cols-3">
        {levels.map((level, i) => {
          return (
            <li key={i}>
              <LevelCard level={level} />
            </li>
          );
        })}
      </ul>
    </main>
  );
}

export default Home;
