import teemo from '../assets/teemo.webp';
import { Link, useParams } from 'react-router-dom';
import ChampionIconList from './ChampionIconList';
import { useQuery } from '@tanstack/react-query';
import { getLevels } from '../utils';

type NavbarProps = {
  championsFound: string[];
};

function Navbar({ championsFound }: NavbarProps) {
  const { id } = useParams();
  const { data: levels } = useQuery({
    queryKey: ['levels'],
    queryFn: () => getLevels(),
  });
  return (
    <header
      className={`
      bg-secondary py-1 px-4 text-lg font-bold text-primary-100 md:text-xl lg:text-3xl 
      ${id && 'sticky top-0 z-20'}`}
    >
      <div className="mx-auto flex max-w-screen-2xl items-center justify-between">
        <Link to="/">
          <div className="flex items-center gap-4">
            <img alt="Teemo: website logo" className="h-20 w-20" src={teemo} />
            <h1 className="block">Where's Teemo?</h1>
          </div>
        </Link>
        {id && <ChampionIconList id={id} championsFound={championsFound} />}
        <nav>
          <ul>
            <li>
              <Link to={`/leaderboard/${levels?.[0].id}`}>Leaderboard</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
