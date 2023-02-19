import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import supabase from '../supabaseClient';
import { getProfanity } from '../utils';

type GameOverModalProps = {
  elapsedSeconds: number;
  setIsGameOver: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentLevel: React.Dispatch<React.SetStateAction<number | undefined>>;
};

function GameOverModal({
  elapsedSeconds,
  setIsGameOver,
  setCurrentLevel,
}: GameOverModalProps) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>('');
  const [isUsernameProfane, setIsUsernameProfane] = useState(false);
  const profanity = getProfanity();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (profanity.exists(username)) {
      setIsUsernameProfane(true);
      return;
    }
    setIsGameOver(false);
    setCurrentLevel(Number(id));
    await saveScore();
  };

  const handleChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    if (isUsernameProfane) {
      setIsUsernameProfane(false);
    }
  };

  const saveScore = async () => {
    try {
      const result = await supabase.from('scores').insert({
        username,
        levelId: id,
        levelTimeScore: elapsedSeconds,
      });
      if (result.error) {
        throw new Error(result.error.message);
      }
    } catch (error) {
      console.error('Error saving score: ', error);
      navigate('/error');
      return;
    }
    navigate('/leaderboard');
  };

  return (
    <div className="fixed flex h-full w-full items-center justify-center bg-gray-900 bg-opacity-60">
      <form
        onSubmit={handleSubmit}
        className="mx-auto max-w-lg rounded-sm bg-secondary text-primary-100"
      >
        <div>
          <div className="border-b-2 border-white p-4">
            <h4 className="text-2xl font-bold tracking-wider text-white">
              You finished in{' '}
              <span className="text-primary-100">
                {elapsedSeconds.toFixed(2)}
              </span>{' '}
              seconds
            </h4>
          </div>
          <div className="border-b-2 border-white px-4 py-6">
            <p className="text-xl leading-none text-white">
              Save your score on the leaderboard
            </p>
            <fieldset className="mt-2 flex flex-col">
              <label htmlFor="username" className="text-md font-semibold">
                Username
              </label>
              <input
                type="text"
                name="username"
                id="username"
                required
                maxLength={20}
                autoComplete="off"
                className="mt-1 rounded-sm border-2 border-transparent px-2 py-1 font-medium tracking-wide outline-none focus:border-2 focus:border-primary-100"
                value={username}
                onChange={handleChangeUsername}
              />
              {isUsernameProfane && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                  Username is inappropriate!
                </p>
              )}
            </fieldset>
          </div>
          <div className="flex items-center justify-end gap-2 p-4">
            <Link
              to="/"
              className="rounded-sm border-2 py-1 px-4 text-lg font-semibold text-primary-100 outline-none focus:border-primary-100 focus:text-white"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="rounded-sm border-2 py-1 px-4 text-lg font-semibold text-primary-100 outline-none focus:border-primary-100 focus:text-white"
            >
              Submit Score
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default GameOverModal;
