import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import { Levels, Level } from '../hooks/useLevels';
import useScores from '../hooks/useScores';
import { getLevelById } from '../utils';

type LeaderboardProps = {
  levels: Levels;
};

function Leaderboard({ levels }: LeaderboardProps) {
  const { levelId } = useParams();
  const [currentLevel, setCurrentLevel] = useState<Level | undefined>();
  const [scores, isLoading, isError] = useScores(currentLevel?.id);

  const handleClick = (levelId: Level) => {
    setCurrentLevel(levelId);
  };

  useEffect(() => {
    if (levelId) {
      const level = getLevelById(levels, Number(levelId));
      setCurrentLevel(level);
    } else {
      setCurrentLevel(levels[0]);
    }
  }, [levels, levelId]);

  return (
    <main className="mx-auto max-w-screen-lg py-6 px-4 font-semibold tracking-wide">
      <div>
        <ul className="grid grid-cols-2 justify-items-center gap-3 sm:grid-cols-3 md:justify-items-stretch">
          {levels.map((level, i) => {
            return (
              <Link to={`/leaderboard/${level.id}`} key={i}>
                <li
                  onClick={() => handleClick(level)}
                  className="cursor-pointer overflow-hidden rounded-sm"
                >
                  <div className="relative">
                    <h1
                      className={`absolute z-10 w-full ${
                        currentLevel?.id === level.id
                          ? 'bg-yellow-600'
                          : 'bg-primary-500'
                      } text-center text-white`}
                    >
                      {level.name}
                    </h1>
                    <img
                      alt={`Image for ${level.name}`}
                      src={level.imageURL}
                      className="relative aspect-square h-40 object-cover md:w-full"
                    />
                  </div>
                </li>
              </Link>
            );
          })}
        </ul>
        <Link
          to={`/level/${currentLevel?.id}`}
          className="mt-4 block w-full rounded-sm bg-primary-500 p-2 text-center text-lg font-semibold tracking-wide text-white"
        >
          Play {currentLevel?.name}
        </Link>
      </div>
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
