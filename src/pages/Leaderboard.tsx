import { useEffect, useState } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';
import { Levels } from '../hooks/useLevels';
import useScores from '../hooks/useScores';

type LeaderboardProps = {
  levels: Levels;
  currentLevel: number | undefined;
  setCurrentLevel: React.Dispatch<React.SetStateAction<number | undefined>>;
};

function Leaderboard({
  levels,
  currentLevel,
  setCurrentLevel,
}: LeaderboardProps) {
  const [scores, isLoading, isError] = useScores(currentLevel);

  const handleClick = (levelId: number) => {
    setCurrentLevel(levelId);
  };

  useEffect(() => {
    setCurrentLevel(levels[0]?.id);
  }, [levels]);

  return (
    <main className="mx-auto max-w-screen-lg py-6 px-4 font-semibold tracking-wide">
      <ul className="grid grid-cols-2 justify-items-center gap-3 sm:grid-cols-3 md:justify-items-stretch">
        {levels.map((level, i) => {
          return (
            <li
              key={i}
              onClick={() => handleClick(level.id)}
              className="cursor-pointer overflow-hidden rounded-sm"
            >
              <div className="relative">
                <h1 className="absolute z-10 w-full bg-primary-500 text-center text-white">
                  {level.name}
                </h1>
                <img
                  src={level.imageURL}
                  className="relative aspect-square h-40 object-cover md:w-full"
                />
              </div>
            </li>
          );
        })}
      </ul>
      <div className="mt-4 text-white">
        {isError ? (
          <p className="text-center text-3xl">
            There was an error retrieving scores
          </p>
        ) : isLoading ? (
          <div className="flex justify-center">
            <LoadingSpinner />
          </div>
        ) : scores?.length ? (
          <table className="w-full border-2">
            <thead className="border-b-2 bg-gray-800 text-left">
              <tr className="text-primary-100">
                <th className="border-r-2 py-1 px-3">Rank</th>
                <th className="border-r-2 py-1 px-3">Name</th>
                <th className="py-1 px-3">Time(seconds)</th>
              </tr>
            </thead>
            <tbody className="text-white">
              {scores?.map((user, i) => {
                i++;
                return (
                  <tr
                    key={crypto.randomUUID()}
                    className={`${
                      i % 2 === 0 ? 'bg-gray-800' : 'bg-gray-600'
                    } border-collapse border-b-2`}
                  >
                    <td className="border-r-2 py-1 px-3">{i}</td>
                    <td className="w-1/2 border-r-2 py-1 px-3">
                      {user.username}
                    </td>
                    <td className="py-1 px-3">
                      {user.levelTimeScore.toFixed(2)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          scores && (
            <p className="text-center text-3xl">
              There are no scores for this level yet
            </p>
          )
        )}
      </div>
    </main>
  );
}

export default Leaderboard;
